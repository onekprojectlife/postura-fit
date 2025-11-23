'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Target, User, Mail, Save, LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatar_url: '',
    bio: '',
  });
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          name: data.name || '',
          email: user.email || '',
          avatar_url: data.avatar_url || '',
          bio: data.bio || '',
        });
      } else {
        setProfile({
          name: user.user_metadata?.name || '',
          email: user.email || '',
          avatar_url: '',
          bio: '',
        });
      }
    } catch (error: any) {
      console.error('Erro ao carregar perfil:', error);
      setMessage('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: profile.name,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setMessage('Perfil atualizado com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error);
      setMessage('Erro ao salvar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#6BAEDC] rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-[#1E3F66]">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <header className="border-b border-[#E6E7EB] backdrop-blur-sm bg-[#FFFFFF]/80 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6BAEDC] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFFFFF]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E3F66]">Postura Fit</h1>
                <p className="text-xs text-[#6BAEDC] font-medium">Meu Perfil</p>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#6BAEDC] hover:text-[#6BAEDC]/80 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Dashboard
        </Link>

        <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-full flex items-center justify-center text-4xl">
              {profile.avatar_url || '👤'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#1E3F66]">Editar Perfil</h2>
              <p className="text-[#1E3F66]/60">Personalize suas informações</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#1E3F66] mb-2">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6BAEDC]" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-[#E6E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BAEDC] focus:border-transparent text-[#1E3F66] bg-[#FFFFFF]"
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E3F66] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6BAEDC]" />
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full pl-12 pr-4 py-3 border border-[#E6E7EB] rounded-xl bg-[#E6E7EB] text-[#1E3F66]/60 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-[#1E3F66]/60 mt-1">O email não pode ser alterado</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E3F66] mb-2">
                Avatar (Emoji)
              </label>
              <input
                type="text"
                value={profile.avatar_url}
                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                className="w-full px-4 py-3 border border-[#E6E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BAEDC] focus:border-transparent text-[#1E3F66] bg-[#FFFFFF]"
                placeholder="😊"
                maxLength={2}
              />
              <p className="text-xs text-[#1E3F66]/60 mt-1">Escolha um emoji para seu avatar</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E3F66] mb-2">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full px-4 py-3 border border-[#E6E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BAEDC] focus:border-transparent text-[#1E3F66] bg-[#FFFFFF] resize-none"
                placeholder="Conte um pouco sobre você..."
                rows={4}
                maxLength={200}
              />
              <p className="text-xs text-[#1E3F66]/60 mt-1">
                {profile.bio.length}/200 caracteres
              </p>
            </div>

            {message && (
              <div
                className={`p-4 rounded-xl text-center font-medium ${
                  message.includes('sucesso')
                    ? 'bg-[#6BAEDC]/10 border border-[#6BAEDC] text-[#6BAEDC]'
                    : 'bg-red-50 border border-red-200 text-red-600'
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] text-[#FFFFFF] rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-[#6BAEDC]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {saving ? (
                'Salvando...'
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Salvar Alterações
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
