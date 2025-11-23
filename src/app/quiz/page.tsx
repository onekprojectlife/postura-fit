'use client';

import { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, Target, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 1,
    question: 'Qual é a sua maior preocupação relacionada à sua saúde atualmente?',
    options: [
      { id: 'a', text: 'Dores nas costas' },
      { id: 'b', text: 'Problemas de postura' },
      { id: 'c', text: 'Rigidez muscular' },
      { id: 'd', text: 'Nenhuma, estou bem!' },
    ],
  },
  {
    id: 2,
    question: 'Com que frequência você experimenta dores no corpo durante ou após o trabalho?',
    options: [
      { id: 'a', text: 'Quase todos os dias' },
      { id: 'b', text: 'Algumas vezes na semana' },
      { id: 'c', text: 'Raramente' },
      { id: 'd', text: 'Nunca' },
    ],
  },
  {
    id: 3,
    question: 'Você costuma passar mais de 6 horas sentado por dia?',
    options: [
      { id: 'a', text: 'Sim, definitivamente' },
      { id: 'b', text: 'Em torno de 6 horas' },
      { id: 'c', text: 'Menos de 6 horas' },
      { id: 'd', text: 'Não trabalho sentado' },
    ],
  },
  {
    id: 4,
    question: 'Como você avalia sua postura ao sentar-se?',
    options: [
      { id: 'a', text: 'Sempre encosto para trás, sem me preocupar' },
      { id: 'b', text: 'Às vezes, percebo que não estou na posição correta' },
      { id: 'c', text: 'Tento manter uma postura adequada' },
      { id: 'd', text: 'Estou sempre consciente da minha postura' },
    ],
  },
  {
    id: 5,
    question: 'Quando foi a última vez que você fez alongamentos?',
    options: [
      { id: 'a', text: 'Não me lembro' },
      { id: 'b', text: 'Foi há alguns dias' },
      { id: 'c', text: 'Faço regularmente' },
      { id: 'd', text: 'Faço parte da minha rotina diária' },
    ],
  },
  {
    id: 6,
    question: 'O que você gostaria de melhorar na sua saúde?',
    options: [
      { id: 'a', text: 'Aliviar as dores musculares' },
      { id: 'b', text: 'Melhorar a postura' },
      { id: 'c', text: 'Aumentar a flexibilidade' },
      { id: 'd', text: 'Tudo isso e mais!' },
    ],
  },
  {
    id: 7,
    question: 'Você já procurou maneiras de aliviar suas dores ou melhorar sua postura?',
    options: [
      { id: 'a', text: 'Sim, já tentei várias coisas, sem sucesso' },
      { id: 'b', text: 'Fiz algumas pesquisas, mas ainda estou perdido' },
      { id: 'c', text: 'Estava pensando em começar algo' },
      { id: 'd', text: 'Não, nunca fiz nada a respeito' },
    ],
  },
  {
    id: 8,
    question: 'Você estaria disposto a investir 5-10 minutos do seu dia para cuidar do seu corpo?',
    options: [
      { id: 'a', text: 'Sim, com certeza!' },
      { id: 'b', text: 'Talvez, dependendo do que é' },
      { id: 'c', text: 'Não sei se tenho esse tempo' },
      { id: 'd', text: 'Não, não estou interessado' },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion]: optionId });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6BAEDC] via-[#AECBE3] to-[#6BAEDC] flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1E3F66] mb-4">
              Transforme Sua Saúde com o Postura Fit!
            </h1>
            <p className="text-lg text-[#1E3F66]/80">
              Obrigado por responder ao nosso quiz! Com base nas suas respostas, o Postura Fit é a solução ideal para você.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4 p-4 bg-[#E6E7EB] rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-[#6BAEDC] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#1E3F66] mb-1">Dores nas costas ou postura ruim?</h3>
                <p className="text-[#1E3F66]/70">O app oferece alongamentos personalizados que se adequam à sua rotina!</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-[#E6E7EB] rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-[#6BAEDC] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#1E3F66] mb-1">Não sabe por onde começar?</h3>
                <p className="text-[#1E3F66]/70">O quiz inicial ajudará a montar um plano de exercícios feito sob medida para você.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-[#E6E7EB] rounded-xl">
              <CheckCircle2 className="w-6 h-6 text-[#6BAEDC] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#1E3F66] mb-1">Resultados rápidos</h3>
                <p className="text-[#1E3F66]/70">Em apenas 5-10 minutos por dia, você pode começar a sentir diferença!</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] text-white rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg group"
            >
              Experimente o Postura Fit Agora!
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-sm text-[#1E3F66]/60">
              Seu corpo merece esse cuidado! Comece sua jornada rumo a uma vida sem dores e mais saudável! 💙
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6BAEDC] via-[#AECBE3] to-[#6BAEDC] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6BAEDC] to-[#AECBE3] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-medium text-[#1E3F66]/60">Quiz Postura Fit</h2>
                <p className="text-xs text-[#1E3F66]/40">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-[#E6E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1E3F66] mb-6">
            {currentQ.question}
          </h1>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full p-4 sm:p-5 rounded-xl border-2 text-left transition-all duration-300 ${
                  selectedAnswer === option.id
                    ? 'border-[#6BAEDC] bg-[#6BAEDC]/10 shadow-lg scale-[1.02]'
                    : 'border-[#E6E7EB] hover:border-[#AECBE3] hover:bg-[#E6E7EB]/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      selectedAnswer === option.id
                        ? 'border-[#6BAEDC] bg-[#6BAEDC]'
                        : 'border-[#1E3F66]/30'
                    }`}
                  >
                    {selectedAnswer === option.id && (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span
                    className={`text-base sm:text-lg font-medium ${
                      selectedAnswer === option.id ? 'text-[#6BAEDC]' : 'text-[#1E3F66]'
                    }`}
                  >
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentQuestion === 0
                ? 'bg-[#E6E7EB] text-[#1E3F66]/40 cursor-not-allowed'
                : 'bg-[#E6E7EB] text-[#1E3F66] hover:bg-[#AECBE3]/20 hover:scale-105'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Anterior
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              !selectedAnswer
                ? 'bg-[#E6E7EB] text-[#1E3F66]/40 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#6BAEDC] to-[#AECBE3] text-white hover:scale-105 shadow-lg'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
