'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Target, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage('Login realizado com sucesso! Redirecionando...');
        
        // Redirecionar para o dashboard (página principal do app)
        await new Promise(resolve => setTimeout(resolve, 500));
        window.location.href = '/dashboard';
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });

        if (error) throw error;

        setMessage('Conta criada com sucesso! Verifique seu email.');
      }
    } catch (error: any) {
      setMessage(error.message || 'Ocorreu um erro. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BAEDC] via-[#AECBE3] to-[#6BAEDC] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/landing" className="inline-flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-[#FFFFFF] rounded-xl flex items-center justify-center shadow-lg">
              <Target className="w-8 h-8 text-[#6BAEDC]" />
            </div>
            <span className="text-3xl font-bold text-[#FFFFFF]">Postura Fit</span>
          </Link>
          <p className="text-[#FFFFFF]/90 text-lg">Transforme sua postura, transforme sua vida</p>
        </div>

        {/* Auth Card */}
        <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-[#E6E7EB]">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-[#E6E7EB] rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-[#6BAEDC] text-[#FFFFFF] shadow-lg'
                  : 'text-[#1E3F66]/60 hover:text-[#1E3F66]'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-[#6BAEDC] text-[#FFFFFF] shadow-lg'
                  : 'text-[#1E3F66]/60 hover:text-[#1E3F66]'
              }`}
            >
              Cadastro
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-[#1E3F66] mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6BAEDC]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-[#E6E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BAEDC] focus:border-transparent text-[#1E3F66] bg-[#FFFFFF]"
                    placeholder="Seu nome"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#1E3F66] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6BAEDC]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#E6E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BAEDC] focus:border-transparent text-[#1E3F66] bg-[#FFFFFF]"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E3F66] mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6BAEDC]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#E6E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6BAEDC] focus:border-transparent text-[#1E3F66] bg-[#FFFFFF]"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-xl flex items-center gap-3 ${
                  message.includes('sucesso')
                    ? 'bg-[#6BAEDC]/10 border border-[#6BAEDC] text-[#6BAEDC]'
                    : 'bg-red-50 border border-red-200 text-red-600'
                }`}
              >
                {message.includes('sucesso') && <CheckCircle2 className="w-5 h-5" />}
                <p className="text-sm font-medium">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] text-[#FFFFFF] rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-[#6BAEDC]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                'Processando...'
              ) : (
                <>
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6 text-center">
              <button className="text-sm text-[#6BAEDC] hover:text-[#6BAEDC]/80 transition-colors font-medium">
                Esqueceu sua senha?
              </button>
            </div>
          )}
        </div>

        {/* Back to Landing */}
        <div className="mt-6 text-center">
          <Link
            href="/landing"
            className="text-[#FFFFFF] hover:text-[#FFFFFF]/80 transition-colors text-sm font-medium inline-flex items-center gap-2"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
