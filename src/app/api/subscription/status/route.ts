import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Verificar se o usuário está autenticado
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Não autenticado', hasActiveSubscription: false },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Consultar a tabela subscriptions
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (subscriptionError && subscriptionError.code !== 'PGRST116') {
      // PGRST116 = nenhum resultado encontrado
      console.error('Erro ao verificar assinatura:', subscriptionError);
      return NextResponse.json(
        { error: 'Erro ao verificar assinatura', hasActiveSubscription: false },
        { status: 500 }
      );
    }

    // Verificar se a assinatura existe e está ativa
    const hasActiveSubscription = !!subscription;

    return NextResponse.json({
      hasActiveSubscription,
      subscription: subscription || null,
      userId,
    });
  } catch (error) {
    console.error('Erro na API de verificação de assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', hasActiveSubscription: false },
      { status: 500 }
    );
  }
}
