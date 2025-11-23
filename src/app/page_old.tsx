'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Play, Award, TrendingUp, Calendar, Users, Target, CheckCircle2, Clock, Flame, LogOut, UserCircle, Coins, ShoppingCart, Plus, Filter } from 'lucide-react';

interface Exercise {
  id: number;
  title: string;
  duration: string;
  difficulty: string;
  thumbnail: string;
  video_url: string;
}

interface UserProgress {
  exercise_id: number;
  completed: boolean;
  completed_at: string | null;
}

interface Badge {
  id: number;
  name: string;
  icon: string;
  unlocked: boolean;
  reward: number; // moedas por desbloquear
}

interface PostureScore {
  score: number;
  date: string;
}

interface Category {
  id: number;
  name: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  category_id: number;
  created_at: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'videos' | 'postura' | 'monitor' | 'comunidade' | 'loja'>('dashboard');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState('Usuário');
  const [userAvatar, setUserAvatar] = useState('👤');
  const [coins, setCoins] = useState(0);
  
  // Dados reais do usuário
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [postureScore, setPostureScore] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState<any[]>([]);
  const [stats, setStats] = useState({
    streak: 0,
    totalMinutes: 0,
    completedExercises: 0,
    totalExercises: 0,
  });

  // Novos estados para vídeos
  const [categories, setCategories] = useState<Category[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    video_url: '',
    thumbnail_url: '',
    category_id: 0,
  });

  const router = useRouter();

  useEffect(() => {
    checkUser();
    // Carregar moedas do localStorage
    const savedCoins = localStorage.getItem('user_coins');
    if (savedCoins) setCoins(parseInt(savedCoins));
  }, []);

  const addCoins = (amount: number) => {
    setCoins(prev => {
      const newCoins = prev + amount;
      localStorage.setItem('user_coins', newCoins.toString());
      return newCoins;
    });
  };

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
        await loadUserData(user.id);
        await loadVideosData();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      setLoading(false);
    }
  };

  const loadVideosData = async () => {
    try {
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('id');

      if (categoriesData) {
        setCategories(categoriesData);
        if (!selectedCategory && categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0].id);
        }
      }

      const { data: videosData } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (videosData) {
        setVideos(videosData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados de vídeos:', error);
    }
  };

  const loadUserData = async (userId: string) => {
    try {
      // Carregar perfil
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profile) {
        setUserName(profile.name || 'Usuário');
        setUserAvatar(profile.avatar_url || '👤');
      }

      // Carregar exercícios
      const { data: exercisesData } = await supabase
        .from('exercises')
        .select('*')
        .order('id');

      if (exercisesData) {
        setExercises(exercisesData);
        setStats(prev => ({ ...prev, totalExercises: exercisesData.length }));
      }

      // Carregar progresso do usuário
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (progressData) {
        setUserProgress(progressData);
        const completed = progressData.filter(p => p.completed).length;
        setStats(prev => ({ ...prev, completedExercises: completed }));
        
        // Calcular minutos totais
        const totalMinutes = progressData.reduce((acc, p) => {
          if (p.completed) {
            const exercise = exercisesData?.find(e => e.id === p.exercise_id);
            if (exercise) {
              const minutes = parseInt(exercise.duration.replace(' min', ''));
              return acc + minutes;
            }
          }
          return acc;
        }, 0);
        setStats(prev => ({ ...prev, totalMinutes }));
      }

      // Carregar badges
      const { data: badgesData } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', userId);

      if (badgesData) {
        const allBadges: Badge[] = [
          { id: 1, name: 'Primeira Semana', icon: '🎯', unlocked: badgesData.some(b => b.badge_name === 'Primeira Semana'), reward: 50 },
          { id: 2, name: '7 Dias Seguidos', icon: '🔥', unlocked: badgesData.some(b => b.badge_name === '7 Dias Seguidos'), reward: 100 },
          { id: 3, name: 'Mestre da Postura', icon: '👑', unlocked: badgesData.some(b => b.badge_name === 'Mestre da Postura'), reward: 200 },
          { id: 4, name: '30 Dias Consecutivos', icon: '💎', unlocked: badgesData.some(b => b.badge_name === '30 Dias Consecutivos'), reward: 500 },
        ];
        setBadges(allBadges);
      }

      // Carregar score de postura
      const { data: scoreData } = await supabase
        .from('posture_scores')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(1)
        .single();

      if (scoreData) {
        setPostureScore(scoreData.score);
      }

      // Calcular progresso semanal
      const today = new Date();
      const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      const weekly = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dayName = weekDays[date.getDay()];
        
        const dayProgress = progressData?.filter(p => {
          if (!p.completed_at) return false;
          const completedDate = new Date(p.completed_at);
          return completedDate.toDateString() === date.toDateString();
        }) || [];

        const minutes = dayProgress.reduce((acc, p) => {
          const exercise = exercisesData?.find(e => e.id === p.exercise_id);
          if (exercise) {
            return acc + parseInt(exercise.duration.replace(' min', ''));
          }
          return acc;
        }, 0);

        weekly.push({
          day: dayName,
          completed: minutes > 0,
          minutes,
        });
      }
      
      setWeeklyProgress(weekly);

      // Calcular streak
      let streak = 0;
      for (let i = weekly.length - 1; i >= 0; i--) {
        if (weekly[i].completed) {
          streak++;
        } else {
          break;
        }
      }
      setStats(prev => ({ ...prev, streak }));

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleCompleteExercise = async (exerciseId: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          exercise_id: exerciseId,
          completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Dar moedas por completar exercício
      addCoins(10);

      // Recarregar dados
      await loadUserData(user.id);
      setSelectedVideo(null);
    } catch (error) {
      console.error('Erro ao marcar exercício:', error);
    }
  };

  const handleAddVideo = async () => {
    if (!user || !newVideo.title || !newVideo.video_url || !newVideo.category_id) return;

    try {
      const { error } = await supabase
        .from('videos')
        .insert([{
          title: newVideo.title,
          description: newVideo.description,
          video_url: newVideo.video_url,
          thumbnail_url: newVideo.thumbnail_url,
          category_id: newVideo.category_id,
        }]);

      if (error) throw error;

      setNewVideo({ title: '', description: '', video_url: '', thumbnail_url: '', category_id: 0 });
      setShowAddVideo(false);
      await loadVideosData();
    } catch (error) {
      console.error('Erro ao adicionar vídeo:', error);
    }
  };

  const isAdmin = user?.email?.includes('admin') || user?.email === 'your-admin-email@example.com'; // Ajustar conforme necessário

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#6BAEDC] rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-[#1E3F66]">Carregando...</p>
        </div>
      </div>
    );
  }

  const exercisesWithProgress = exercises.map(ex => ({
    ...ex,
    completed: userProgress.some(p => p.exercise_id === ex.id && p.completed),
  }));

  const filteredVideos = selectedCategory ? videos.filter(v => v.category_id === selectedCategory) : videos;

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1E3F66]">
      {/* Header */}
      <header className="border-b border-[#E6E7EB] backdrop-blur-sm bg-[#FFFFFF]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6BAEDC] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFFFFF]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E3F66]">Postura Fit</h1>
                {user && <p className="text-xs text-[#6BAEDC] font-medium">Olá, {userName}!</p>}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-lg font-medium">
                    <Coins className="w-4 h-4" />
                    <span className="font-bold">{coins}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#E6E7EB] border border-[#AECBE3] text-[#1E3F66] rounded-lg font-medium hover:bg-[#6BAEDC] hover:text-[#FFFFFF] hover:border-[#6BAEDC] transition-all duration-300 text-sm sm:text-base"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Perfil</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm sm:text-base"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sair</span>
                  </button>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-full flex items-center justify-center text-xl">
                    {userAvatar}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-[#6BAEDC] text-[#FFFFFF] rounded-lg font-medium hover:bg-[#5A9DCB] transition-all duration-300 text-sm sm:text-base"
                  >
                    Login
                  </Link>
                  <Link
                    href="/landing"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-[#E6E7EB] border border-[#AECBE3] text-[#1E3F66] rounded-lg font-medium hover:bg-[#6BAEDC] hover:text-[#FFFFFF] hover:border-[#6BAEDC] transition-all duration-300 text-sm sm:text-base"
                  >
                    Início
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {user ? (
        <>
          {/* Navigation */}
          <nav className="border-b border-[#E6E7EB] bg-[#FFFFFF]/95 backdrop-blur-sm sticky top-16 sm:top-20 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide py-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                  { id: 'videos', label: 'Vídeos', icon: Play },
                  { id: 'postura', label: 'Postura', icon: Target },
                  { id: 'monitor', label: 'Monitor', icon: Calendar },
                  { id: 'comunidade', label: 'Comunidade', icon: Users },
                  { id: 'loja', label: 'Loja', icon: ShoppingCart },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-[#6BAEDC] text-[#FFFFFF] shadow-lg shadow-[#6BAEDC]/20'
                        : 'text-[#1E3F66]/60 hover:text-[#1E3F66] hover:bg-[#E6E7EB]'
                    }`}
                  >
                    <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
                {/* Welcome Message */}
                <div className="bg-gradient-to-r from-[#6BAEDC]/10 to-[#AECBE3]/10 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-[#1E3F66]">Bem-vindo de volta, {userName}! 👋</h2>
                  <p className="text-[#1E3F66]/70">Continue sua jornada para uma melhor postura. Você tem {coins} moedas para gastar na loja!</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                  {[
                    { label: 'Sequência', value: `${stats.streak} dias`, icon: Flame, color: 'from-[#6BAEDC] to-[#AECBE3]' },
                    { label: 'Total Minutos', value: `${stats.totalMinutes} min`, icon: Clock, color: 'from-[#6BAEDC] to-[#AECBE3]' },
                    { label: 'Exercícios', value: `${stats.completedExercises}/${stats.totalExercises}`, icon: CheckCircle2, color: 'from-[#6BAEDC] to-[#AECBE3]' },
                    { label: 'Score Postura', value: `${postureScore}%`, icon: Target, color: 'from-[#6BAEDC] to-[#AECBE3]' },
                    { label: 'Moedas', value: `${coins} 🪙`, icon: Coins, color: 'from-yellow-400 to-yellow-600' },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 hover:border-[#6BAEDC] hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="w-6 h-6 text-[#FFFFFF]" />
                      </div>
                      <p className="text-[#1E3F66]/60 text-sm mb-1">{stat.label}</p>
                      <p className="text-2xl sm:text-3xl font-bold text-[#1E3F66]">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Weekly Progress */}
                <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3 text-[#1E3F66]">
                    <Calendar className="w-6 h-6 text-[#6BAEDC]" />
                    Progresso Semanal
                  </h2>
                  <div className="grid grid-cols-7 gap-2 sm:gap-4">
                    {weeklyProgress.map((day, idx) => (
                      <div key={idx} className="text-center">
                        <div
                          className={`h-24 sm:h-32 rounded-xl mb-2 flex items-end justify-center p-2 transition-all duration-300 ${
                            day.completed
                              ? 'bg-gradient-to-t from-[#6BAEDC] to-[#AECBE3] shadow-lg shadow-[#6BAEDC]/20'
                              : 'bg-[#E6E7EB] border border-[#AECBE3]'
                          }`}
                        >
                          {day.completed && (
                            <div className="text-[#FFFFFF] font-bold text-xs sm:text-sm">{day.minutes}m</div>
                          )}
                        </div>
                        <p className={`text-xs sm:text-sm font-medium ${day.completed ? 'text-[#6BAEDC]' : 'text-[#1E3F66]/40'}`}>
                          {day.day}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3 text-[#1E3F66]">
                    <Award className="w-6 h-6 text-[#6BAEDC]" />
                    Conquistas - Ganhe Moedas!
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {badges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`text-center p-4 sm:p-6 rounded-xl transition-all duration-300 ${
                          badge.unlocked
                            ? 'bg-gradient-to-br from-[#6BAEDC]/20 to-[#AECBE3]/10 border border-[#6BAEDC] hover:scale-105 shadow-lg'
                            : 'bg-[#E6E7EB] border border-[#AECBE3] opacity-40'
                        }`}
                      >
                        <div className="text-3xl sm:text-4xl mb-2">{badge.icon}</div>
                        <p className="text-xs sm:text-sm font-medium text-[#1E3F66] mb-1">{badge.name}</p>
                        {badge.unlocked && (
                          <p className="text-xs text-[#6BAEDC] font-bold">+{badge.reward} moedas conquistadas!</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3F66]">Biblioteca de Vídeos</h2>
                  {isAdmin && (
                    <button
                      onClick={() => setShowAddVideo(!showAddVideo)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#6BAEDC] text-[#FFFFFF] rounded-lg font-medium hover:bg-[#5A9DCB] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar Vídeo
                    </button>
                  )}
                </div>

                {showAddVideo && isAdmin && (
                  <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold mb-4 text-[#1E3F66]">Adicionar Novo Vídeo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Título"
                        value={newVideo.title}
                        onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                        className="px-4 py-2 border border-[#E6E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BAEDC]"
                      />
                      <select
                        value={newVideo.category_id}
                        onChange={(e) => setNewVideo({ ...newVideo, category_id: parseInt(e.target.value) })}
                        className="px-4 py-2 border border-[#E6E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BAEDC]"
                      >
                        <option value={0}>Selecione uma categoria</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="URL do Vídeo"
                        value={newVideo.video_url}
                        onChange={(e) => setNewVideo({ ...newVideo, video_url: e.target.value })}
                        className="px-4 py-2 border border-[#E6E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BAEDC]"
                      />
                      <input
                        type="text"
                        placeholder="URL da Thumbnail"
                        value={newVideo.thumbnail_url}
                        onChange={(e) => setNewVideo({ ...newVideo, thumbnail_url: e.target.value })}
                        className="px-4 py-2 border border-[#E6E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BAEDC]"
                      />
                    </div>
                    <textarea
                      placeholder="Descrição"
                      value={newVideo.description}
                      onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                      className="w-full px-4 py-2 border border-[#E6E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6BAEDC] mb-4"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddVideo}
                        className="px-6 py-2 bg-[#6BAEDC] text-[#FFFFFF] rounded-lg font-medium hover:bg-[#5A9DCB] transition-colors"
                      >
                        Adicionar
                      </button>
                      <button
                        onClick={() => setShowAddVideo(false)}
                        className="px-6 py-2 bg-[#E6E7EB] text-[#1E3F66] rounded-lg font-medium hover:bg-[#D1D5DB] transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === null
                        ? 'bg-[#6BAEDC] text-[#FFFFFF]'
                        : 'bg-[#E6E7EB] text-[#1E3F66] hover:bg-[#6BAEDC] hover:text-[#FFFFFF]'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                    Todos
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                        selectedCategory === cat.id
                          ? 'bg-[#6BAEDC] text-[#FFFFFF]'
                          : 'bg-[#E6E7EB] text-[#1E3F66] hover:bg-[#6BAEDC] hover:text-[#FFFFFF]'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {selectedVideo ? (
                  <div className="space-y-6">
                    <button
                      onClick={() => setSelectedVideo(null)}
                      className="text-[#6BAEDC] hover:text-[#6BAEDC]/80 transition-colors flex items-center gap-2 text-sm sm:text-base"
                    >
                      ← Voltar aos vídeos
                    </button>
                    <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl overflow-hidden">
                      <div className="aspect-video bg-[#1E3F66]">
                        <iframe
                          width="100%"
                          height="100%"
                          src={videos.find((v) => v.id === selectedVideo)?.video_url}
                          title="Video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                      <div className="p-6 sm:p-8">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1E3F66]">
                          {videos.find((v) => v.id === selectedVideo)?.title}
                        </h3>
                        <p className="text-[#1E3F66]/70 mb-4">
                          {videos.find((v) => v.id === selectedVideo)?.description}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-4 py-2 bg-[#6BAEDC]/10 border border-[#6BAEDC] rounded-lg text-[#6BAEDC] text-sm font-medium">
                            {categories.find(c => c.id === videos.find((v) => v.id === selectedVideo)?.category_id)?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredVideos.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => setSelectedVideo(video.id)}
                        className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl overflow-hidden hover:border-[#6BAEDC] hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={video.thumbnail_url || '/placeholder-video.jpg'}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1E3F66] via-transparent to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-[#6BAEDC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#6BAEDC]/30">
                              <Play className="w-8 h-8 text-[#FFFFFF] ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#1E3F66]">{video.title}</h3>
                          <p className="text-sm text-[#1E3F66]/60 mb-3 line-clamp-2">{video.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-[#6BAEDC]">{categories.find(c => c.id === video.category_id)?.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Postura Tab */}
            {activeTab === 'postura' && (
              <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#1E3F66]">Acompanhamento de Postura</h2>

                {/* Posture Score */}
                <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex-1 w-full">
                      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[#1E3F66]">Score de Postura Atual</h3>
                      <div className="relative w-full h-4 bg-[#E6E7EB] rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] transition-all duration-1000 shadow-lg shadow-[#6BAEDC]/30"
                          style={{ width: `${postureScore}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-[#1E3F66]/60">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl font-bold text-[#6BAEDC] mb-2">{postureScore}%</div>
                      <p className="text-[#1E3F66]/60 text-sm">
                        {postureScore >= 80 ? 'Excelente!' : postureScore >= 60 ? 'Bom!' : 'Continue praticando!'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Posture Tips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    {
                      title: 'Alinhamento da Coluna',
                      status: 'Bom',
                      tip: 'Mantenha os ombros relaxados e alinhados',
                      icon: '🎯',
                    },
                    {
                      title: 'Posição dos Ombros',
                      status: 'Atenção',
                      tip: 'Evite curvar os ombros para frente',
                      icon: '⚠️',
                    },
                    {
                      title: 'Posição da Cabeça',
                      status: 'Ótimo',
                      tip: 'Cabeça alinhada com a coluna',
                      icon: '✅',
                    },
                    {
                      title: 'Posição Lombar',
                      status: 'Bom',
                      tip: 'Mantenha a curvatura natural',
                      icon: '💪',
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 hover:border-[#6BAEDC] transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl sm:text-4xl">{item.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-base sm:text-lg text-[#1E3F66]">{item.title}</h4>
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                item.status === 'Ótimo'
                                  ? 'bg-[#6BAEDC]/20 text-[#6BAEDC]'
                                  : item.status === 'Bom'
                                  ? 'bg-[#AECBE3]/30 text-[#1E3F66]'
                                  : 'bg-yellow-500/20 text-yellow-600'
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <p className="text-sm text-[#1E3F66]/60">{item.tip}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Monitor Tab */}
            {activeTab === 'monitor' && (
              <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#1E3F66]">Monitoramento Diário</h2>

                {/* Daily Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { label: 'Hoje', value: `${weeklyProgress[weeklyProgress.length - 1]?.minutes || 0} min`, change: '+5 min', positive: true },
                    { label: 'Esta Semana', value: `${stats.totalMinutes} min`, change: '+12 min', positive: true },
                    { label: 'Este Mês', value: `${stats.totalMinutes} min`, change: '-', positive: true },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6"
                    >
                      <p className="text-[#1E3F66]/60 text-sm mb-2">{stat.label}</p>
                      <p className="text-3xl sm:text-4xl font-bold mb-2 text-[#1E3F66]">{stat.value}</p>
                      <p className={`text-sm ${stat.positive ? 'text-[#6BAEDC]' : 'text-red-400'}`}>
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Activity Log */}
                <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#1E3F66]">Atividades Recentes</h3>
                  <div className="space-y-4">
                    {userProgress
                      .filter(p => p.completed)
                      .slice(-4)
                      .reverse()
                      .map((log, idx) => {
                        const exercise = exercises.find(e => e.id === log.exercise_id);
                        if (!exercise) return null;
                        
                        const date = log.completed_at ? new Date(log.completed_at) : new Date();
                        const timeAgo = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
                        const timeText = timeAgo < 24 ? `Hoje, ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}` : `${timeAgo < 48 ? 'Ontem' : `${Math.floor(timeAgo / 24)} dias atrás`}`;
                        
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 bg-[#E6E7EB] rounded-xl border border-[#AECBE3] hover:border-[#6BAEDC] transition-all duration-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-[#6BAEDC]/20 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-[#6BAEDC]" />
                              </div>
                              <div>
                                <p className="font-medium text-sm sm:text-base text-[#1E3F66]">{exercise.title}</p>
                                <p className="text-xs sm:text-sm text-[#1E3F66]/60">{timeText}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[#6BAEDC] font-medium text-sm sm:text-base">{exercise.duration}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}

            {/* Comunidade Tab */}
            {activeTab === 'comunidade' && (
              <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#1E3F66]">Comunidade Postura Fit</h2>

                {/* Community Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { label: 'Membros Ativos', value: '12.5K', icon: Users },
                    { label: 'Exercícios Hoje', value: '3.2K', icon: TrendingUp },
                    { label: 'Badges Desbloqueados', value: '8.7K', icon: Award },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 text-center"
                    >
                      <stat.icon className="w-8 h-8 text-[#6BAEDC] mx-auto mb-3" />
                      <p className="text-3xl sm:text-4xl font-bold mb-2 text-[#1E3F66]">{stat.value}</p>
                      <p className="text-sm text-[#1E3F66]/60">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Motivational Quote */}
                <div className="bg-gradient-to-br from-[#6BAEDC]/10 to-[#AECBE3]/10 backdrop-blur-sm border border-[#6BAEDC] rounded-2xl p-6 sm:p-8 text-center">
                  <p className="text-xl sm:text-2xl font-bold mb-4 text-[#6BAEDC]">
                    "A postura correta é o primeiro passo para uma vida saudável"
                  </p>
                  <p className="text-[#1E3F66]/60 text-sm sm:text-base">Continue assim, {userName}! Você está no caminho certo. 💪</p>
                </div>
              </div>
            )}

            {/* Loja Tab */}
            {activeTab === 'loja' && (
              <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-500">
                <div className="text-center">
                  <ShoppingCart className="w-16 h-16 text-[#6BAEDC] mx-auto mb-4" />
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1E3F66]">Loja Postura Fit</h2>
                  <p className="text-[#1E3F66]/70 mb-8">Em breve você poderá gastar suas moedas aqui! Novos itens chegando logo.</p>
                  <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-8">
                    <p className="text-lg text-[#1E3F66]/60">Loja vazia por enquanto. Continue completando exercícios para ganhar mais moedas!</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-3xl mb-8 shadow-2xl shadow-[#6BAEDC]/30">
            <Target className="w-12 h-12 sm:w-14 sm:h-14 text-[#FFFFFF]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1E3F66] mb-6">
            Bem-vindo ao Postura Fit
          </h1>
          <p className="text-lg sm:text-xl text-[#1E3F66]/70 mb-10 max-w-2xl mx-auto">
            Faça login para acessar seus exercícios, acompanhar seu progresso e transformar sua postura.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] text-[#FFFFFF] rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#6BAEDC]/30 text-base sm:text-lg"
            >
              Fazer Login
            </Link>
            <Link
              href="/landing"
              className="px-8 py-4 bg-[#FFFFFF] border-2 border-[#6BAEDC] text-[#6BAEDC] rounded-xl font-bold hover:bg-[#6BAEDC] hover:text-[#FFFFFF] transition-all duration-300 text-base sm:text-lg"
            >
              Saiba Mais
            </Link>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-[#E6E7EB] mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#6BAEDC] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-[#FFFFFF]" />
              </div>
              <span className="text-xl font-bold text-[#1E3F66]">Postura Fit</span>
            </div>
            <p className="text-[#1E3F66]/40 text-sm">
              © 2024 Postura Fit. Seu bem-estar em primeiro lugar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}