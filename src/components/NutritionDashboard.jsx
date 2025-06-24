import React, { useState } from 'react';
import StopBangQuestionnaire from './StopBangQuestionnaire'; // asegúrate de que la ruta sea correcta

const NutritionDashboard = () => {
  const [selected, setSelected] = useState(null);

  const questionnaires = [
    {
      id: 'nutrition',
      title: "Evaluación",
      description: "Cuestionario completo sobre hábitos alimentarios, historial médico y preferencias dietéticas.",
      gradient: "from-violet-400 via-purple-500 to-indigo-600",
      pattern: "🥗",
      bgPattern: "bg-gradient-to-br from-violet-50 to-purple-100",
    },
    {
      id: 'health',
      title: "Análisis de Salud",
      description: "Evaluación de condiciones médicas, alergias, intolerancias y factores de riesgo relacionados con la nutrición.",
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      pattern: "💚",
      bgPattern: "bg-gradient-to-br from-emerald-50 to-teal-100",
    },
    {
      id: 'weight',
      title: "Control de Peso",
      description: "Seguimiento de objetivos de peso, medidas corporales y progreso en el plan nutricional establecido.",
      gradient: "from-orange-400 via-pink-500 to-rose-600",
      pattern: "⚖️",
      bgPattern: "bg-gradient-to-br from-orange-50 to-pink-100",
    },
    {
      id: 'stopbang',
      title: "STOP-Bang",
      description: "Cuestionario para evaluar el riesgo de apnea del sueño mediante preguntas clínicas clave.",
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      pattern: "😴",
      bgPattern: "bg-gradient-to-br from-blue-50 to-indigo-100",
    },
  ];

  if (selected === 'stopbang') {
    return <StopBangQuestionnaire />;
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="px-6 py-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-8">
            <div className="text-4xl">🏥</div>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-6">
            Panel de Cuestionarios
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Selecciona el tipo de evaluación que deseas realizar con tu paciente
          </p>
          <div className="mt-8 h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
          {questionnaires.map((q) => (
            <div
              key={q.id}
              className={`group relative ${q.bgPattern} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-white/50 backdrop-blur-sm`}
            >
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${q.gradient} rounded-t-3xl`} />
              <div className="text-6xl mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300">
                {q.pattern}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                {q.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 min-h-[6rem]">
                {q.description}
              </p>
              <button
                onClick={() => setSelected(q.id)}
                className={`w-full bg-gradient-to-r ${q.gradient} text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden`}
              >
                <span className="relative z-10">Iniciar Cuestionario</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/30 rounded-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 bg-white/40 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionDashboard;
