import React, { useState } from 'react';
import { Stethoscope, Moon, Brain, ArrowRight, FileText, Utensils } from 'lucide-react';
import StopBangQuestionnaire from './StopBangQuestionnaire';
import HADQuestionnaire from './HADQuestionnaire';
import TFEQQuestionnaire from './TFEQQuestionnaire';

const NutritionDashboard = () => {
  const [selected, setSelected] = useState(null);

  const questionnaires = [
    {
      id: 'stopbang',
      title: "STOP-Bang",
      description: "Cuestionario para evaluar el riesgo de apnea del sueño mediante preguntas clínicas clave.",
      icon: Moon,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "from-blue-600 to-blue-700",
      shadowColor: "shadow-blue-500/20",
      borderColor: "border-blue-100",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 'had',
      title: "HAD",
      description: "Escala Hospitalaria de Ansiedad y Depresión para evaluar el estado emocional del paciente.",
      icon: Brain,
      gradient: "from-purple-500 to-purple-600",
      hoverGradient: "from-purple-600 to-purple-700",
      shadowColor: "shadow-purple-500/20",
      borderColor: "border-purple-100",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 'tfeq',
      title: "TFEQ-R18",
      description: "Inventario de Alimentación de Tres Factores para evaluar patrones de comportamiento alimentario.",
      icon: Utensils,
      gradient: "from-green-500 to-green-600",
      hoverGradient: "from-green-600 to-green-700",
      shadowColor: "shadow-green-500/20",
      borderColor: "border-green-100",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  if (selected === 'stopbang') {
    return <StopBangQuestionnaire />;
  }

  if (selected === 'had') {
    return <HADQuestionnaire />;
  }

  if (selected === 'tfeq') {
    return <TFEQQuestionnaire />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/25 mb-8">
            <Stethoscope className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6">
            Panel de Evaluación Médica
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Selecciona el instrumento de evaluación clínica más apropiado para tu diagnóstico
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <div className="w-8 h-px bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {questionnaires.map((q) => {
            const IconComponent = q.icon;
            return (
              <div
                key={q.id}
                className={`group relative bg-white rounded-3xl p-8 shadow-xl ${q.shadowColor} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${q.borderColor} overflow-hidden`}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-50 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 ${q.iconBg} rounded-2xl shadow-sm`}>
                      <IconComponent className={`w-8 h-8 ${q.iconColor}`} />
                    </div>
                    <FileText className="w-6 h-6 text-gray-300" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                    {q.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    {q.description}
                  </p>
                  
                  <button
                    onClick={() => setSelected(q.id)}
                    className={`w-full bg-gradient-to-r ${q.gradient} hover:bg-gradient-to-r hover:${q.hoverGradient} text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${q.shadowColor} hover:shadow-xl flex items-center justify-center gap-3 group`}
                  >
                    <span>Iniciar Cuestionario</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600 font-medium">Sistema de Evaluación Profesional</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;