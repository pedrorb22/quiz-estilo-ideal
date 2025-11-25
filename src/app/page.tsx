"use client"

import { useState } from "react"
import { Sparkles, ArrowRight, Mail, Check, Loader2 } from "lucide-react"

type Answer = string | null

interface QuizData {
  age: Answer
  gender: Answer
  appearance: Answer
  difficulty: Answer
  imageReflection: Answer
  feeling: Answer
  compliments: Answer
  lifestyle: Answer
  changeFrequency: Answer
  email: string
}

const styleResults = {
  elegante: {
    name: "Elegante Clássico",
    description: "Você valoriza sofisticação e atemporalidade. Seu estilo reflete confiança e bom gosto.",
    benefits: [
      "Transmitir autoridade e profissionalismo",
      "Criar uma imagem memorável e respeitada",
      "Sentir-se confiante em qualquer ocasião"
    ]
  },
  moderno: {
    name: "Moderno Urbano",
    description: "Você está sempre antenado nas tendências e gosta de expressar sua personalidade através da moda.",
    benefits: [
      "Destacar-se com originalidade",
      "Expressar sua criatividade",
      "Atrair olhares admirados"
    ]
  },
  casual: {
    name: "Casual Confortável",
    description: "Você prioriza conforto sem abrir mão do estilo. Seu visual é autêntico e descontraído.",
    benefits: [
      "Sentir-se à vontade em qualquer situação",
      "Manter um visual autêntico",
      "Combinar praticidade com estilo"
    ]
  },
  sofisticado: {
    name: "Sofisticado Refinado",
    description: "Você aprecia detalhes e qualidade. Seu estilo é impecável e transmite elegância natural.",
    benefits: [
      "Causar excelente primeira impressão",
      "Receber elogios constantes",
      "Sentir-se especial e valorizado"
    ]
  }
}

export default function QuizPage() {
  const [step, setStep] = useState(1)
  const [quizData, setQuizData] = useState<QuizData>({
    age: null,
    gender: null,
    appearance: null,
    difficulty: null,
    imageReflection: null,
    feeling: null,
    compliments: null,
    lifestyle: null,
    changeFrequency: null,
    email: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof styleResults>("elegante")

  const updateAnswer = (field: keyof QuizData, value: string) => {
    setQuizData({ ...quizData, [field]: value })
  }

  const nextStep = () => {
    if (step === 7) {
      setIsLoading(true)
      calculateStyle()
      setTimeout(() => {
        setIsLoading(false)
        setStep(step + 1)
      }, 3000)
    } else {
      setStep(step + 1)
    }
  }

  const calculateStyle = () => {
    let scores = { elegante: 0, moderno: 0, casual: 0, sofisticado: 0 }

    // Lógica de pontuação baseada nas respostas
    if (quizData.feeling === "elegante") scores.elegante += 3
    if (quizData.feeling === "confiante") scores.sofisticado += 2
    if (quizData.feeling === "confortavel") scores.casual += 3
    if (quizData.feeling === "atraente") scores.moderno += 2

    if (quizData.compliments === "sofisticacao") scores.sofisticado += 3
    if (quizData.compliments === "estilo") scores.elegante += 2
    if (quizData.compliments === "originalidade") scores.moderno += 3
    if (quizData.compliments === "beleza") scores.elegante += 2

    if (quizData.lifestyle === "profissional") scores.elegante += 3
    if (quizData.lifestyle === "criativo") scores.moderno += 3
    if (quizData.lifestyle === "casual") scores.casual += 3
    if (quizData.lifestyle === "ativo") scores.casual += 2

    if (quizData.difficulty === "nao-combina") scores.sofisticado += 2
    if (quizData.difficulty === "nao-favorece") scores.elegante += 2

    // Determinar estilo com maior pontuação
    const maxScore = Math.max(...Object.values(scores))
    const winner = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as keyof typeof styleResults
    setSelectedStyle(winner || "elegante")
  }

  // Etapa 1: Tela de Abertura
  if (step === 1) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-medium text-white">Estilo Certo</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Qual é o seu<br />
            <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              estilo ideal?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300">
            Descubra como realçar sua imagem em apenas 3 minutos!
          </p>
          
          <button
            onClick={nextStep}
            className="group bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            Começar o quiz!
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 2: Perguntas Iniciais
  if (step === 2) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-400">Pergunta 1 de 9</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Qual a sua idade?</h2>
          </div>

          <div className="space-y-3">
            {[
              { value: "18-24", label: "18-24 anos" },
              { value: "25-34", label: "25-34 anos" },
              { value: "35-44", label: "35-44 anos" },
              { value: "45+", label: "45 anos ou mais" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateAnswer("age", option.value)
                  setTimeout(nextStep, 300)
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-amber-600 hover:bg-amber-900/20 transition-all duration-200 font-medium text-gray-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Etapa 3: Gênero
  if (step === 3) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-400">Pergunta 2 de 9</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Qual é o seu gênero?</h2>
          </div>

          <div className="space-y-3">
            {[
              { value: "masculino", label: "Masculino" },
              { value: "feminino", label: "Feminino" },
              { value: "nao-binario", label: "Não-binário" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateAnswer("gender", option.value)
                  setTimeout(nextStep, 300)
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-amber-600 hover:bg-amber-900/20 transition-all duration-200 font-medium text-gray-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Etapa 4: Frequência de preocupação com aparência
  if (step === 4) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-400">Pergunta 3 de 9</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Com que frequência você se preocupa com a sua aparência?</h2>
          </div>

          <div className="space-y-3">
            {[
              { value: "diariamente", label: "Diariamente" },
              { value: "algumas-vezes", label: "Algumas vezes na semana" },
              { value: "raramente", label: "Raramente" },
              { value: "nunca", label: "Nunca" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateAnswer("appearance", option.value)
                  setTimeout(nextStep, 300)
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-amber-600 hover:bg-amber-900/20 transition-all duration-200 font-medium text-gray-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Etapa 5: Dificuldade ao escolher roupas
  if (step === 5) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-400">Pergunta 4 de 9</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full" style={{ width: '44%' }}></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Qual é sua maior dificuldade ao escolher suas roupas?</h2>
          </div>

          <div className="space-y-3">
            {[
              { value: "nao-combina", label: "Não sei o que combina comigo" },
              { value: "nao-favorece", label: "Sinto que nada me favorece" },
              { value: "sem-tempo", label: "Não tenho tempo de escolher bem" },
              { value: "nao-importo", label: "Não me importo muito" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateAnswer("difficulty", option.value)
                  setTimeout(nextStep, 300)
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-amber-600 hover:bg-amber-900/20 transition-all duration-200 font-medium text-gray-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Etapa 6: Imagem reflete quem você é
  if (step === 6) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-400">Pergunta 5 de 9</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Você já sentiu que sua imagem não reflete quem você realmente é?</h2>
          </div>

          <div className="space-y-3">
            {[
              { value: "frequentemente", label: "Sim, frequentemente" },
              { value: "as-vezes", label: "Às vezes" },
              { value: "raramente", label: "Raramente" },
              { value: "nunca", label: "Nunca" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateAnswer("imageReflection", option.value)
                  setTimeout(nextStep, 300)
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-amber-600 hover:bg-amber-900/20 transition-all duration-200 font-medium text-gray-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Etapa 7: Como gostaria de se sentir
  if (step === 7) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-400">Pergunta 6 de 9</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full" style={{ width: '66%' }}></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Como você gostaria de se sentir ao se olhar no espelho?</h2>
          </div>

          <div className="space-y-3">
            {[
              { value: "confiante", label: "Confiante" },
              { value: "elegante", label: "Elegante" },
              { value: "atraente", label: "Atraente" },
              { value: "confortavel", label: "Confortável" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateAnswer("feeling", option.value)
                  setTimeout(nextStep, 300)
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-amber-600 hover:bg-amber-900/20 transition-all duration-200 font-medium text-gray-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Etapa 8: Tipo de elogios
  if (step === 8) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-400">Pergunta 7 de 9</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full" style={{ width: '77%' }}></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Que tipo de elogios você gostaria de receber sobre sua aparência?</h2>
          </div>

          <div className="space-y-3">
            {[
              { value: "estilo", label: "Estilo" },
              { value: "beleza", label: "Beleza" },
              { value: "sofisticacao", label: "Sofisticação" },
              { value: "originalidade", label: "Originalidade" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateAnswer("compliments", option.value)
                  setTimeout(nextStep, 300)
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-amber-600 hover:bg-amber-900/20 transition-all duration-200 font-medium text-gray-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Etapa 9: Estilo de vida
  if (step === 9) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-400">Pergunta 8 de 9</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Qual é o seu estilo de vida?</h2>
          </div>

          <div className="space-y-3">
            {[
              { value: "profissional", label: "Profissional (trabalho formal)" },
              { value: "casual", label: "Casual (trabalho informal)" },
              { value: "criativo", label: "Criativo (artes, moda)" },
              { value: "ativo", label: "Ativo (esporte, fitness)" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateAnswer("lifestyle", option.value)
                  setTimeout(nextStep, 300)
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-amber-600 hover:bg-amber-900/20 transition-all duration-200 font-medium text-gray-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Etapa 10: Frequência de mudança de visual
  if (step === 10) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-400">Pergunta 9 de 9</span>
              <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full" style={{ width: '99%' }}></div>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Quantas vezes você tenta mudar seu visual a cada ano?</h2>
          </div>

          <div className="space-y-3">
            {[
              { value: "primeira-vez", label: "Primeira vez" },
              { value: "1-2", label: "1-2 vezes" },
              { value: "3-5", label: "3-5 vezes" },
              { value: "muitas", label: "Muitas vezes" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  updateAnswer("changeFrequency", option.value)
                  setTimeout(nextStep, 300)
                }}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-700 hover:border-amber-600 hover:bg-amber-900/20 transition-all duration-200 font-medium text-gray-300 hover:text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Etapa 11: Autoridade e Prova Social
  if (step === 11) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white">O Poder do Visagismo</h2>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              O visagismo é a arte de harmonizar sua imagem com sua essência. 
              <span className="font-semibold text-amber-400"> Centenas de pessoas já transformaram suas vidas</span> com o método 'Estilo Certo'!
            </p>

            <div className="grid grid-cols-3 gap-4 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">500+</div>
                <div className="text-sm text-gray-400">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">98%</div>
                <div className="text-sm text-gray-400">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">4.9★</div>
                <div className="text-sm text-gray-400">Avaliação</div>
              </div>
            </div>
          </div>

          <button
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 12: Captura de Lead
  if (step === 12) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white">Quase lá!</h2>
            
            <p className="text-lg text-gray-300">
              Para descobrir seu estilo personalizado, informe seu e-mail e receba seus resultados!
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="seu@email.com"
              value={quizData.email}
              onChange={(e) => updateAnswer("email", e.target.value)}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-700 bg-gray-800 text-white focus:border-amber-600 focus:outline-none text-lg placeholder:text-gray-500"
            />

            <button
              onClick={nextStep}
              disabled={!quizData.email || !quizData.email.includes("@")}
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              Enviar e descobrir meu estilo!
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Seus dados estão seguros conosco. Não compartilhamos com terceiros.
          </p>
        </div>
      </div>
    )
  }

  // Etapa 13: Loading de Análise
  if (step === 13 && isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 text-center">
          <Loader2 className="w-16 h-16 text-amber-400 animate-spin mx-auto" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-white">Analisando suas respostas...</h2>
          
          <p className="text-lg text-gray-300">
            Isso levará apenas alguns segundos!
          </p>

          <div className="space-y-3 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3 text-gray-300">
              <Check className="w-5 h-5 text-green-500" />
              <span>Identificando seu perfil</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Check className="w-5 h-5 text-green-500" />
              <span>Calculando compatibilidade de estilos</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
              <span>Gerando recomendações personalizadas</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Etapa 14: Resultados Personalizados
  if (step === 14) {
    const result = styleResults[selectedStyle]
    
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full animate-bounce">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white">Parabéns! Seu estilo ideal é</h2>
            
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              {result.name}
            </h3>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              {result.description}
            </p>
          </div>

          <button
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Ver benefícios do meu estilo
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 15: Benefícios do Estilo
  if (step === 15) {
    const result = styleResults[selectedStyle]
    
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
              Com o estilo <span className="text-amber-400">{result.name}</span>, você pode:
            </h2>
            
            <div className="space-y-4">
              {result.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-amber-900/20 rounded-xl border border-amber-800/30">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg text-gray-300 pt-1">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextStep}
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Ver oferta especial
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  // Etapa 16: Oferta Final
  if (step === 16) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 py-12">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Pronto para uma transformação?
            </h2>
            <p className="text-xl text-gray-300">
              Conheça nosso programa 'Estilo Certo'! Oferecemos consultoria personalizada e dicas práticas para você brilhar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Pacote Básico */}
            <div className="bg-gray-900 rounded-3xl shadow-xl p-8 space-y-6 hover:scale-105 transition-transform duration-300 border border-gray-800">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Básico</h3>
                <div className="text-4xl font-bold text-amber-400">R$ 297</div>
                <p className="text-gray-400">Consultoria online</p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">1 sessão de consultoria online</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Análise de coloração pessoal</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Guia de estilo personalizado</span>
                </li>
              </ul>

              <button className="w-full bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                Escolher Básico
              </button>
            </div>

            {/* Pacote Avançado */}
            <div className="bg-gradient-to-br from-amber-600 to-yellow-600 rounded-3xl shadow-2xl p-8 space-y-6 hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                MAIS POPULAR
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Avançado</h3>
                <div className="text-4xl font-bold text-white">R$ 697</div>
                <p className="text-amber-100">Consultoria + Acompanhamento</p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">3 sessões de consultoria</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Acompanhamento semanal por 1 mês</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Personal shopper virtual</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">Lookbook personalizado</span>
                </li>
              </ul>

              <button className="w-full bg-white text-amber-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Escolher Avançado
              </button>
            </div>

            {/* Pacote Premium */}
            <div className="bg-gray-900 rounded-3xl shadow-xl p-8 space-y-6 hover:scale-105 transition-transform duration-300 border border-gray-800">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Premium</h3>
                <div className="text-4xl font-bold text-amber-400">R$ 1.497</div>
                <p className="text-gray-400">Transformação completa</p>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">6 sessões de consultoria</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Acompanhamento por 3 meses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Personal shopper presencial</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Acesso a todos os cursos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Grupo VIP exclusivo</span>
                </li>
              </ul>

              <button className="w-full bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                Escolher Premium
              </button>
            </div>
          </div>

          <div className="text-center pt-8">
            <p className="text-gray-400 mb-4">Garantia de 7 dias - 100% do seu dinheiro de volta</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Check className="w-4 h-4 text-green-500" />
              <span>Pagamento seguro</span>
              <span className="text-gray-700">•</span>
              <Check className="w-4 h-4 text-green-500" />
              <span>Suporte dedicado</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}