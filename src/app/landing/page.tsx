'use client';

import Link from 'next/link';
import { Target, AlertTriangle, Users, CheckCircle2, Play, Award, TrendingUp, Star, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#E6E7EB] to-[#AECBE3]">
      {/* Header */}
      <header className="border-b border-[#E6E7EB] backdrop-blur-sm bg-[#FFFFFF]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#6BAEDC] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFFFFF]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1E3F66]">Postura Fit</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#6BAEDC] text-[#FFFFFF] rounded-lg font-medium hover:bg-[#5A9DCB] transition-all duration-300 text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                href="/"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#E6E7EB] border border-[#AECBE3] text-[#1E3F66] rounded-lg font-medium hover:bg-[#6BAEDC] hover:text-[#FFFFFF] hover:border-[#6BAEDC] transition-all duration-300 text-sm sm:text-base"
              >
                Início
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-3xl mb-8 shadow-2xl shadow-[#6BAEDC]/30">
            <Target className="w-12 h-12 sm:w-14 sm:h-14 text-[#FFFFFF]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E3F66] mb-6">
            Transforme Sua Vida: Diga Adeus às Dores Musculares e Melhore Sua Postura com o App Postura Fit!
          </h1>
          <p className="text-lg sm:text-xl text-[#1E3F66]/70 mb-10 max-w-3xl mx-auto">
            Você sabia? As dores musculares e a má postura são os novos males do século XXI. Se você passa horas sentado, trabalhando, é quase certo que já experimentou aquela dor insuportável no pescoço, lombar ou ombros. O corpo travado e a sensação de rigidez são mais comuns do que imaginamos. E o pior: essas condições podem levar a problemas artríticos e uma qualidade de vida comprometida a longo prazo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] text-[#FFFFFF] rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#6BAEDC]/30 text-base sm:text-lg"
            >
              👉 Clique Aqui e Baixe Agora!
            </Link>
          </div>
        </div>
      </section>

      {/* A Realidade Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-[#FFFFFF]/50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1E3F66] mb-12">
          A Realidade de Quem Trabalha Sentado
        </h2>
        <p className="text-lg text-[#1E3F66]/70 mb-8 text-center max-w-3xl mx-auto">
          A cada dia, milhões de pessoas enfrentam os impactos negativos de uma rotina sedentária. O trabalho em frente ao computador se tornou um "inimigo oculto", provocando:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-[#6BAEDC] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Postura Ruim</h3>
            <p className="text-[#1E3F66]/60">Encostar-se na cadeira ou olhar para a tela de forma inadequada é o primeiro passo para uma postura errada.</p>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-[#6BAEDC] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Dores Crônicas</h3>
            <p className="text-[#1E3F66]/60">A pressão constante nas articulações e músculos leva a dores que podem se tornar parte do seu cotidiano.</p>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-[#6BAEDC] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Sensação de Corpo Travado</h3>
            <p className="text-[#1E3F66]/60">Movimentar-se torna-se uma tarefa árdua.</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-[#1E3F66] mb-4">A Consequência é?</h3>
          <p className="text-lg text-[#1E3F66]/70 max-w-2xl mx-auto">
            A falta de cuidado com a postura não é apenas um pequeno incômodo. Pode significar desgaste articular, comprometendo sua saúde e, consequentemente, sua qualidade de vida. É hora de você tomar as rédeas da sua saúde, e 5-10 minutos por dia podem mudar essa realidade!
          </p>
        </div>
      </section>

      {/* Apresentando Postura Fit */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1E3F66] mb-12">
          Apresentando o Postura Fit: A Solução Personalizada para Suas Dores!
        </h2>
        <p className="text-lg text-[#1E3F66]/70 mb-8 text-center max-w-3xl mx-auto">
          Imagine um aplicativo que se adapta inteiramente a você. Com o Postura Fit, nós oferecemos uma solução personalizada, baseada em um quiz inicial que identifica suas necessidades específicas. Você receberá:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6">
            <Play className="w-10 h-10 text-[#6BAEDC] mb-4" />
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Rotinas Rápidas</h3>
            <p className="text-[#1E3F66]/60">Exercícios de 5 a 10 minutos, alinhados à sua realidade.</p>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6">
            <Target className="w-10 h-10 text-[#6BAEDC] mb-4" />
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Exercícios Personalizados</h3>
            <p className="text-[#1E3F66]/60">Após responder ao quiz, você receberá um plano de alongamento e mobilidade específico para suas dores e posturas.</p>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6">
            <TrendingUp className="w-10 h-10 text-[#6BAEDC] mb-4" />
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Acompanhamento Guiado</h3>
            <p className="text-[#1E3F66]/60">Vídeos explicativos que garantem a execução correta dos movimentos.</p>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6">
            <Award className="w-10 h-10 text-[#6BAEDC] mb-4" />
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Conteúdos Educativos</h3>
            <p className="text-[#1E3F66]/60">Aprenda sobre postura e saúde em linguagem acessível.</p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-[#FFFFFF]/50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1E3F66] mb-12">
          Benefícios que Você Sentirá!
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-[#6BAEDC] mt-1" />
            <div>
              <h3 className="text-xl font-bold text-[#1E3F66] mb-2">Alívio Imediato</h3>
              <p className="text-[#1E3F66]/60">Sinta a diferença já na primeira sessão de alongamento!</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-[#6BAEDC] mt-1" />
            <div>
              <h3 className="text-xl font-bold text-[#1E3F66] mb-2">Melhora da Postura</h3>
              <p className="text-[#1E3F66]/60">Diga adeus à má postura e olá a um olhar mais confiante!</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-[#6BAEDC] mt-1" />
            <div>
              <h3 className="text-xl font-bold text-[#1E3F66] mb-2">Prevenção de Problemas Articulares</h3>
              <p className="text-[#1E3F66]/60">Cuide do seu corpo antes que seja tarde!</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-8 h-8 text-[#6BAEDC] mt-1" />
            <div>
              <h3 className="text-xl font-bold text-[#1E3F66] mb-2">Aumento da Mobilidade</h3>
              <p className="text-[#1E3F66]/60">Movimente-se com leveza e liberdade novamente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1E3F66] mb-12">
          Como Funciona na Prática?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#6BAEDC] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FFFFFF] font-bold text-xl">1</span>
            </div>
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Baixe o App</h3>
            <p className="text-[#1E3F66]/60">Baixe o App Postura Fit em seu celular.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#6BAEDC] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FFFFFF] font-bold text-xl">2</span>
            </div>
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Responda ao Quiz</h3>
            <p className="text-[#1E3F66]/60">Responda ao Quiz Personalizado: Identifique suas necessidades e dores específicas.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#6BAEDC] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FFFFFF] font-bold text-xl">3</span>
            </div>
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Receba Exercícios</h3>
            <p className="text-[#1E3F66]/60">Receba Exercícios Direcionados baseados nas suas respostas.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#6BAEDC] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FFFFFF] font-bold text-xl">4</span>
            </div>
            <h3 className="text-xl font-bold text-[#1E3F66] mb-3">Siga os Vídeos</h3>
            <p className="text-[#1E3F66]/60">Siga os vídeos guiados e monitore seu progresso!</p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-[#FFFFFF]/50">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#1E3F66] mb-12">
          Depoimentos de Quem Já Mudou de Vida
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 text-[#6BAEDC]" />
              <Star className="w-5 h-5 text-[#6BAEDC]" />
              <Star className="w-5 h-5 text-[#6BAEDC]" />
              <Star className="w-5 h-5 text-[#6BAEDC]" />
              <Star className="w-5 h-5 text-[#6BAEDC]" />
            </div>
            <p className="text-[#1E3F66]/70 mb-4">"Eu trabalho em um escritório e passava o dia todo sentindo dor nas costas. Depois de usar o Postura Fit, as dores diminuíram e minha postura melhorou. Os exercícios são feitos sob medida para mim!"</p>
            <p className="font-bold text-[#1E3F66]">– Juliana, 32 anos</p>
          </div>
          <div className="bg-[#FFFFFF] border border-[#E6E7EB] rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 text-[#6BAEDC]" />
              <Star className="w-5 h-5 text-[#6BAEDC]" />
              <Star className="w-5 h-5 text-[#6BAEDC]" />
              <Star className="w-5 h-5 text-[#6BAEDC]" />
              <Star className="w-5 h-5 text-[#6BAEDC]" />
            </div>
            <p className="text-[#1E3F66]/70 mb-4">"Meu corpo estava travado, e eu não conseguia me mover como queria. Com as rotinas personalizadas do app, encontrei uma solução eficaz! Recomendo a todos!"</p>
            <p className="font-bold text-[#1E3F66]">– Lucas, 29 anos</p>
          </div>
        </div>
      </section>

      {/* Garantia */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-[#6BAEDC]/30">
          <Shield className="w-16 h-16 text-[#FFFFFF] mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-6">
            Garantia de Satisfação
          </h2>
          <p className="text-lg sm:text-xl text-[#FFFFFF]/90 mb-8 max-w-2xl mx-auto">
            Confiança é fundamental. Por isso, oferecemos uma garantia de 30 dias para experimentar o Postura Fit. Se em um mês você não perceber melhora nas suas dores ou na sua postura, devolvemos seu dinheiro sem perguntas!
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-[#FFFFFF]/50">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E3F66] mb-6">
            Pronto para Transformar Sua Vida?
          </h2>
          <p className="text-lg sm:text-xl text-[#1E3F66]/70 mb-10 max-w-3xl mx-auto">
            Não deixe para amanhã o que você pode fazer hoje. O cuidado com seu corpo é essencial para uma vida mais saudável e produtiva. Baixe o Postura Fit agora e comece a vivenciar uma nova fase sem dores e com mais mobilidade!
          </p>
          <Link
            href="/"
            className="inline-block px-10 py-5 bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] text-[#FFFFFF] rounded-xl font-bold hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#6BAEDC]/30 text-base sm:text-lg"
          >
            👉 Clique Aqui e Baixe Agora! <ArrowRight className="inline w-5 h-5 ml-2" />
          </Link>
          <p className="text-[#1E3F66]/60 mt-6">Sua saúde agradece!</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E6E7EB] mt-12 sm:mt-16 bg-[#FFFFFF]/50 backdrop-blur-sm">
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
            <p className="text-[#1E3F66]/60 mt-4">
              Dê o Primeiro Passo para uma Vida Sem Dores! Estamos aqui para ajudá-lo a redescobrir o prazer de se movimentar. A cada alongamento, você está mais próximo de um corpo saudável e livre de tensões. Transforme sua postura. Transforme sua vida.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}