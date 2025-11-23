'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Check, Sparkles, Zap, Shield } from 'lucide-react';

export default function PaywallPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push('/login');
      return;
    }

    setUser(session.user);
    setLoading(false);
  };

  const handleSubscribe = async (planType: string) => {
    if (!user) return;

    try {
      // Aqui você integraria com um sistema de pagamento real (Stripe, etc)
      // Por enquanto, vamos criar uma assinatura de teste
      const { error } = await supabase.from('subscriptions').insert({
        user_id: user.id,
        status: 'active',
        plan_type: planType,
        started_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
      });

      if (error) {
        console.error('Erro ao criar assinatura:', error);
        alert('Erro ao processar assinatura. Tente novamente.');
        return;
      }

      // Redirecionar para o dashboard
      router.push('/');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar assinatura. Tente novamente.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Desbloqueie Todo o Potencial do{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Postura Fit
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acesse exercícios personalizados, acompanhamento de progresso e muito mais!
          </p>
        </div>

        {/* Planos */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Plano Mensal */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200 hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Plano Mensal</h3>
              <Zap className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold text-gray-900">R$ 29,90</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Acesso completo a todos os exercícios</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Planos personalizados de alongamento</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Acompanhamento de progresso</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Lembretes diários</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Suporte prioritário</span>
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe('monthly')}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Assinar Agora
            </button>
          </div>

          {/* Plano Anual - Destaque */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-all duration-300">
            <div className="absolute top-4 right-4 bg-yellow-400 text-indigo-900 px-4 py-1 rounded-full text-sm font-bold">
              ECONOMIZE 40%
            </div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Plano Anual</h3>
              <Shield className="w-8 h-8" />
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold">R$ 179,90</span>
              <span className="text-indigo-100">/ano</span>
              <p className="text-sm text-indigo-100 mt-2">Apenas R$ 14,99/mês</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Tudo do plano mensal</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Economia de R$ 178,80 por ano</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Conteúdo exclusivo premium</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Acesso antecipado a novos recursos</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Consultoria personalizada mensal</span>
              </li>
            </ul>
            <button
              onClick={() => handleSubscribe('annual')}
              className="w-full bg-white text-indigo-600 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Assinar Plano Anual
            </button>
          </div>
        </div>

        {/* Garantia */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            🔒 Pagamento 100% seguro • Cancele quando quiser
          </p>
          <p className="text-sm text-gray-500">
            Garantia de 7 dias - Se não gostar, devolvemos seu dinheiro
          </p>
        </div>
      </div>
    </div>
  );
}
