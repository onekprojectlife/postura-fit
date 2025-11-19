'use client';

import { CheckCircle2, Play, Shield, Clock, Target, TrendingUp, Award, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#6BAEDC] via-[#AECBE3] to-[#6BAEDC] text-[#FFFFFF]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#FFFFFF]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 sm:mb-8">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Postura Fit Premium</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              Transforme Sua Vida: Diga Adeus às Dores Musculares
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 text-[#FFFFFF]/90 leading-relaxed">
              Melhore sua postura com o App Postura Fit! Exercícios personalizados de 5-10 minutos que se adaptam à sua rotina.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-[#FFFFFF] text-[#6BAEDC] rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 group"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="w-full sm:w-auto px-8 py-4 bg-[#FFFFFF]/10 backdrop-blur-sm border-2 border-[#FFFFFF] text-[#FFFFFF] rounded-xl font-bold text-lg hover:bg-[#FFFFFF]/20 transition-all duration-300 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Ver Demonstração
              </button>
            </div>
            
            <div className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-8 sm:gap-12 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Garantia 30 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Resultados comprovados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-24 bg-[#E6E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#1E3F66]">
              Você Sabia?
            </h2>
            <p className="text-lg sm:text-xl text-[#1E3F66]/80 leading-relaxed">
              As dores musculares e a má postura são os novos males do século XXI. Se você passa horas sentado, trabalhando, é quase certo que já experimentou aquela dor insuportável no pescoço, lombar ou ombros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: '😣',
                title: 'Postura Ruim',
                description: 'Encostar-se na cadeira ou olhar para a tela de forma inadequada é o primeiro passo para uma postura errada.',
              },
              {
                icon: '😰',
                title: 'Dores Crônicas',
                description: 'A pressão constante nas articulações e músculos leva a dores que podem se tornar parte do seu cotidiano.',
              },
              {
                icon: '🔒',
                title: 'Corpo Travado',
                description: 'Movimentar-se torna-se uma tarefa árdua. A sensação de rigidez é mais comum do que imaginamos.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#AECBE3] hover:border-[#6BAEDC] hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl sm:text-6xl mb-4">{item.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-[#1E3F66]">{item.title}</h3>
                <p className="text-[#1E3F66]/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 bg-gradient-to-br from-[#6BAEDC]/10 to-[#AECBE3]/10 rounded-2xl p-6 sm:p-10 border border-[#6BAEDC] text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1E3F66]">A Consequência?</h3>
            <p className="text-lg sm:text-xl text-[#1E3F66]/80 max-w-3xl mx-auto leading-relaxed">
              A falta de cuidado com a postura não é apenas um pequeno incômodo. Pode significar desgaste articular, comprometendo sua saúde e, consequentemente, sua qualidade de vida. <span className="font-bold text-[#6BAEDC]">É hora de você tomar as rédeas da sua saúde, e 5-10 minutos por dia podem mudar essa realidade!</span>
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#1E3F66]">
              Apresentando o Postura Fit
            </h2>
            <p className="text-lg sm:text-xl text-[#1E3F66]/80 leading-relaxed">
              A Solução Personalizada para Suas Dores! Imagine um aplicativo que se adapta inteiramente a você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Clock,
                title: 'Rotinas Rápidas',
                description: 'Exercícios de 5 a 10 minutos, alinhados à sua realidade.',
                color: 'from-[#6BAEDC] to-[#AECBE3]',
              },
              {
                icon: Target,
                title: 'Exercícios Personalizados',
                description: 'Plano de alongamento específico para suas dores e posturas.',
                color: 'from-[#6BAEDC] to-[#AECBE3]',
              },
              {
                icon: Play,
                title: 'Acompanhamento Guiado',
                description: 'Vídeos explicativos que garantem a execução correta.',
                color: 'from-[#6BAEDC] to-[#AECBE3]',
              },
              {
                icon: TrendingUp,
                title: 'Conteúdos Educativos',
                description: 'Aprenda sobre postura e saúde em linguagem acessível.',
                color: 'from-[#6BAEDC] to-[#AECBE3]',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E6E7EB] hover:border-[#6BAEDC] hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFFFFF]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#1E3F66]">{feature.title}</h3>
                <p className="text-[#1E3F66]/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-[#E6E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#1E3F66]">
              Benefícios que Você Sentirá!
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: '⚡',
                title: 'Alívio Imediato',
                description: 'Sinta a diferença já na primeira sessão de alongamento!',
              },
              {
                icon: '🎯',
                title: 'Melhora da Postura',
                description: 'Diga adeus à má postura e olá a um olhar mais confiante!',
              },
              {
                icon: '🛡️',
                title: 'Prevenção de Problemas',
                description: 'Cuide do seu corpo antes que seja tarde!',
              },
              {
                icon: '🚀',
                title: 'Aumento da Mobilidade',
                description: 'Movimente-se com leveza e liberdade novamente.',
              },
            ].map((benefit, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#AECBE3] hover:border-[#6BAEDC] hover:shadow-xl transition-all duration-300 flex items-start gap-4"
              >
                <div className="text-4xl sm:text-5xl flex-shrink-0">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#1E3F66]">{benefit.title}</h3>
                  <p className="text-[#1E3F66]/70 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#1E3F66]">
              Como Funciona na Prática?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                step: '1',
                title: 'Baixe o App',
                description: 'Baixe o App Postura Fit em seu celular.',
              },
              {
                step: '2',
                title: 'Quiz Personalizado',
                description: 'Identifique suas necessidades e dores específicas.',
              },
              {
                step: '3',
                title: 'Exercícios Direcionados',
                description: 'Receba exercícios baseados nas suas respostas.',
              },
              {
                step: '4',
                title: 'Monitore Progresso',
                description: 'Siga os vídeos guiados e acompanhe sua evolução!',
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold text-[#FFFFFF] mx-auto mb-4 shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#1E3F66]">{step.title}</h3>
                <p className="text-[#1E3F66]/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-[#E6E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#1E3F66]">
              Depoimentos de Quem Já Mudou de Vida
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Juliana',
                age: '32 anos',
                avatar: '👩‍💼',
                text: 'Eu trabalho em um escritório e passava o dia todo sentindo dor nas costas. Depois de usar o Postura Fit, as dores diminuíram e minha postura melhorou. Os exercícios são feitos sob medida para mim!',
                rating: 5,
              },
              {
                name: 'Lucas',
                age: '29 anos',
                avatar: '👨‍💻',
                text: 'Meu corpo estava travado, e eu não conseguia me mover como queria. Com as rotinas personalizadas do app, encontrei uma solução eficaz! Recomendo a todos!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#AECBE3] hover:border-[#6BAEDC] hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-full flex items-center justify-center text-3xl sm:text-4xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#1E3F66]">{testimonial.name}</h4>
                    <p className="text-sm text-[#1E3F66]/60">{testimonial.age}</p>
                  </div>
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#6BAEDC] text-[#6BAEDC]" />
                  ))}
                </div>
                
                <p className="text-[#1E3F66]/80 leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#6BAEDC]/10 to-[#AECBE3]/10 rounded-2xl p-8 sm:p-12 border border-[#6BAEDC] text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFFFFF]" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1E3F66]">Garantia de Satisfação</h2>
            <p className="text-lg sm:text-xl text-[#1E3F66]/80 leading-relaxed mb-6">
              Confiança é fundamental. Por isso, oferecemos uma <span className="font-bold text-[#6BAEDC]">garantia de 30 dias</span> para experimentar o Postura Fit. Se em um mês você não perceber melhora nas suas dores ou na sua postura, devolvemos seu dinheiro sem perguntas!
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#6BAEDC] via-[#AECBE3] to-[#6BAEDC] text-[#FFFFFF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Pronto para Transformar Sua Vida?
          </h2>
          
          <p className="text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed">
            Não deixe para amanhã o que você pode fazer hoje. O cuidado com seu corpo é essencial para uma vida mais saudável e produtiva. Baixe o Postura Fit agora e comece a vivenciar uma nova fase sem dores e com mais mobilidade!
          </p>
          
          <Link
            href="/login"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#FFFFFF] text-[#6BAEDC] rounded-xl font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl group"
          >
            Clique Aqui e Baixe Agora!
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="mt-6 text-sm text-[#FFFFFF]/80">Sua saúde agradece! 💙</p>
          
          <div className="mt-12 sm:mt-16 pt-12 border-t border-[#FFFFFF]/20">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Dê o Primeiro Passo para uma Vida Sem Dores!
            </h3>
            <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Estamos aqui para ajudá-lo a redescobrir o prazer de se movimentar. A cada alongamento, você está mais próximo de um corpo saudável e livre de tensões.
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-6">
              Transforme sua postura. Transforme sua vida. ✨
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3F66] text-[#FFFFFF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#6BAEDC] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-[#FFFFFF]" />
              </div>
              <span className="text-xl font-bold">Postura Fit</span>
            </div>
            <p className="text-[#FFFFFF]/60 text-sm">
              © 2024 Postura Fit. Seu bem-estar em primeiro lugar.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
