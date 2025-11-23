import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const publicRoutes = ['/login', '/landing', '/quiz', '/api']
  const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Redirecionar não autenticados para login
  if (!session && !isPublicRoute && req.nextUrl.pathname !== '/paywall') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Verificar assinatura para usuários autenticados
  if (session && !isPublicRoute && req.nextUrl.pathname !== '/paywall') {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', session.user.id)
      .maybeSingle()

    // Se não tem assinatura ativa, redirecionar para paywall
    if (!subscription || subscription.status !== 'active') {
      if (req.nextUrl.pathname !== '/paywall') {
        return NextResponse.redirect(new URL('/paywall', req.url))
      }
    }
  }

  // Redirecionar usuários autenticados que acessam /login
  if (session && req.nextUrl.pathname === '/login') {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', session.user.id)
      .maybeSingle()

    if (subscription && subscription.status === 'active') {
      return NextResponse.redirect(new URL('/', req.url))
    } else {
      return NextResponse.redirect(new URL('/paywall', req.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
