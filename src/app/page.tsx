'use client';

import { useState } from 'react';
import { Play, Award, TrendingUp, Calendar, Users, Target, CheckCircle2, Clock, Flame } from 'lucide-react';

// Mock Data
const exercises = [
  {
    id: 1,
    title: 'Alongamento Cervical',
    duration: '5 min',
    difficulty: 'Iniciante',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    completed: true,
  },
  {
    id: 2,
    title: 'Postura de Ombros',
    duration: '8 min',
    difficulty: 'Intermediário',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    completed: false,
  },
  {
    id: 3,
    title: 'Flexibilidade Lombar',
    duration: '10 min',
    difficulty: 'Avançado',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    completed: false,
  },
  {
    id: 4,
    title: 'Mobilidade de Quadril',
    duration: '7 min',
    difficulty: 'Intermediário',
    thumbnail: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    completed: true,
  },
];

const badges = [
  { id: 1, name: 'Primeira Semana', icon: '🎯', unlocked: true },
  { id: 2, name: '7 Dias Seguidos', icon: '🔥', unlocked: true },
  { id: 3, name: 'Mestre da Postura', icon: '👑', unlocked: false },
  { id: 4, name: '30 Dias Consecutivos', icon: '💎', unlocked: false },
];

const weeklyProgress = [
  { day: 'Seg', completed: true, minutes: 15 },
  { day: 'Ter', completed: true, minutes: 20 },
  { day: 'Qua', completed: true, minutes: 18 },
  { day: 'Qui', completed: false, minutes: 0 },
  { day: 'Sex', completed: false, minutes: 0 },
  { day: 'Sáb', completed: false, minutes: 0 },
  { day: 'Dom', completed: false, minutes: 0 },
];

const communityFeed = [
  { id: 1, user: 'Ana Silva', action: 'completou 7 dias seguidos!', time: '2h atrás', avatar: '👩' },
  { id: 2, user: 'Carlos Mendes', action: 'desbloqueou o badge Mestre da Postura', time: '5h atrás', avatar: '👨' },
  { id: 3, user: 'Maria Santos', action: 'completou Alongamento Cervical', time: '1d atrás', avatar: '👩‍🦰' },
];

export default function PosturaFit() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'videos' | 'postura' | 'monitor' | 'comunidade'>('dashboard');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [postureScore, setPostureScore] = useState(78);

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
                <p className="text-xs text-[#6BAEDC] font-medium">Premium Wellness</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#E6E7EB] rounded-lg border border-[#AECBE3]">
                <Flame className="w-5 h-5 text-[#6BAEDC]" />
                <span className="text-sm font-semibold text-[#1E3F66]">3 dias</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-full flex items-center justify-center text-xl">
                👤
              </div>
            </div>
          </div>
        </div>
      </header>

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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Sequência', value: '3 dias', icon: Flame, color: 'from-[#6BAEDC] to-[#AECBE3]' },
                { label: 'Total Minutos', value: '127 min', icon: Clock, color: 'from-[#6BAEDC] to-[#AECBE3]' },
                { label: 'Exercícios', value: '12/20', icon: CheckCircle2, color: 'from-[#6BAEDC] to-[#AECBE3]' },
                { label: 'Score Postura', value: `${postureScore}%`, icon: Target, color: 'from-[#6BAEDC] to-[#AECBE3]' },
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

            {/* Badges */}
            <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3 text-[#1E3F66]">
                <Award className="w-6 h-6 text-[#6BAEDC]" />
                Conquistas
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`text-center p-4 sm:p-6 rounded-xl transition-all duration-300 ${
                      badge.unlocked
                        ? 'bg-gradient-to-br from-[#6BAEDC]/20 to-[#AECBE3]/10 border border-[#6BAEDC] hover:scale-105'
                        : 'bg-[#E6E7EB] border border-[#AECBE3] opacity-40'
                    }`}
                  >
                    <div className="text-3xl sm:text-4xl mb-2">{badge.icon}</div>
                    <p className="text-xs sm:text-sm font-medium text-[#1E3F66]">{badge.name}</p>
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3F66]">Biblioteca de Exercícios</h2>
              <div className="text-sm text-[#1E3F66]/60">{exercises.length} vídeos</div>
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
                      src={exercises.find((e) => e.id === selectedVideo)?.videoUrl}
                      title="Video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1E3F66]">
                      {exercises.find((e) => e.id === selectedVideo)?.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="px-4 py-2 bg-[#6BAEDC]/10 border border-[#6BAEDC] rounded-lg text-[#6BAEDC] text-sm font-medium">
                        {exercises.find((e) => e.id === selectedVideo)?.duration}
                      </span>
                      <span className="px-4 py-2 bg-[#E6E7EB] border border-[#AECBE3] rounded-lg text-[#1E3F66] text-sm">
                        {exercises.find((e) => e.id === selectedVideo)?.difficulty}
                      </span>
                    </div>
                    <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] text-[#FFFFFF] rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#6BAEDC]/20">
                      Marcar como Concluído
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    onClick={() => setSelectedVideo(exercise.id)}
                    className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl overflow-hidden hover:border-[#6BAEDC] hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={exercise.thumbnail}
                        alt={exercise.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E3F66] via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-[#6BAEDC] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#6BAEDC]/30">
                          <Play className="w-8 h-8 text-[#FFFFFF] ml-1" />
                        </div>
                      </div>
                      {exercise.completed && (
                        <div className="absolute top-3 right-3 w-8 h-8 bg-[#6BAEDC] rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-[#FFFFFF]" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#1E3F66]">{exercise.title}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#6BAEDC]">{exercise.duration}</span>
                        <span className="text-[#1E3F66]/60">{exercise.difficulty}</span>
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
                  <p className="text-[#1E3F66]/60 text-sm">Excelente!</p>
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
                { label: 'Hoje', value: '25 min', change: '+5 min', positive: true },
                { label: 'Esta Semana', value: '127 min', change: '+12 min', positive: true },
                { label: 'Este Mês', value: '480 min', change: '-8 min', positive: false },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6"
                >
                  <p className="text-[#1E3F66]/60 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl sm:text-4xl font-bold mb-2 text-[#1E3F66]">{stat.value}</p>
                  <p className={`text-sm ${stat.positive ? 'text-[#6BAEDC]' : 'text-red-400'}`}>
                    {stat.change} vs semana passada
                  </p>
                </div>
              ))}
            </div>

            {/* Activity Log */}
            <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#1E3F66]">Atividades Recentes</h3>
              <div className="space-y-4">
                {[
                  { time: 'Hoje, 14:30', activity: 'Alongamento Cervical', duration: '5 min', completed: true },
                  { time: 'Hoje, 09:15', activity: 'Mobilidade de Quadril', duration: '7 min', completed: true },
                  { time: 'Ontem, 18:45', activity: 'Postura de Ombros', duration: '8 min', completed: true },
                  { time: 'Ontem, 12:00', activity: 'Flexibilidade Lombar', duration: '10 min', completed: true },
                ].map((log, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-[#E6E7EB] rounded-xl border border-[#AECBE3] hover:border-[#6BAEDC] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#6BAEDC]/20 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-[#6BAEDC]" />
                      </div>
                      <div>
                        <p className="font-medium text-sm sm:text-base text-[#1E3F66]">{log.activity}</p>
                        <p className="text-xs sm:text-sm text-[#1E3F66]/60">{log.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#6BAEDC] font-medium text-sm sm:text-base">{log.duration}</p>
                    </div>
                  </div>
                ))}
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

            {/* Community Feed */}
            <div className="bg-[#FFFFFF] backdrop-blur-sm border border-[#E6E7EB] rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-[#1E3F66]">Feed de Atividades</h3>
              <div className="space-y-4">
                {communityFeed.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start gap-4 p-4 bg-[#E6E7EB] rounded-xl border border-[#AECBE3] hover:border-[#6BAEDC] transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base text-[#1E3F66]">
                        <span className="font-bold">{post.user}</span>{' '}
                        <span className="text-[#1E3F66]/80">{post.action}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-[#1E3F66]/40 mt-1">{post.time}</p>
                    </div>
                    <button className="text-[#6BAEDC] hover:text-[#6BAEDC]/80 transition-colors text-xl flex-shrink-0">
                      👏
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="bg-gradient-to-br from-[#6BAEDC]/10 to-[#AECBE3]/10 backdrop-blur-sm border border-[#6BAEDC] rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-xl sm:text-2xl font-bold mb-4 text-[#6BAEDC]">
                "A postura correta é o primeiro passo para uma vida saudável"
              </p>
              <p className="text-[#1E3F66]/60 text-sm sm:text-base">Continue assim! Você está no caminho certo. 💪</p>
            </div>
          </div>
        )}
      </main>

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
