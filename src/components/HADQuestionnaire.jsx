import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Download, ArrowLeft, Brain, Heart, Moon, Smile, Frown, Zap, Clock, User, Home } from 'lucide-react';

const questions = [
  {
    id: 'anxiety1',
    text: 'Me siento tenso o nervioso',
    type: 'anxiety',
    category: 'Ansiedad',
    icon: Brain
  },
  {
    id: 'depression1',
    text: 'Sigo disfrutando de las cosas como siempre',
    type: 'depression',
    category: 'Estado de Ánimo',
    icon: Smile,
    reverse: true
  },
  {
    id: 'anxiety2',
    text: 'Siento una especie de temor, como si algo malo fuera a suceder',
    type: 'anxiety',
    category: 'Ansiedad',
    icon: Heart
  },
  {
    id: 'depression2',
    text: 'Soy capaz de reírme y ver el lado bueno de las cosas',
    type: 'depression',
    category: 'Estado de Ánimo',
    icon: Smile,
    reverse: true
  },
  {
    id: 'anxiety3',
    text: 'Tengo la cabeza llena de preocupaciones',
    type: 'anxiety',
    category: 'Ansiedad',
    icon: Brain
  },
  {
    id: 'depression3',
    text: 'Me siento alegre',
    type: 'depression',
    category: 'Estado de Ánimo',
    icon: Smile,
    reverse: true
  },
  {
    id: 'anxiety4',
    text: 'Soy capaz de permanecer sentado tranquila y relajadamente',
    type: 'anxiety',
    category: 'Ansiedad',
    icon: Moon,
    reverse: true
  },
  {
    id: 'depression4',
    text: 'Me siento lento y torpe',
    type: 'depression',
    category: 'Estado de Ánimo',
    icon: Clock
  },
  {
    id: 'anxiety5',
    text: 'Experimento una desagradable sensación de nervios y hormigueos en el estómago',
    type: 'anxiety',
    category: 'Ansiedad',
    icon: Heart
  },
  {
    id: 'depression5',
    text: 'He perdido el interés por mi aspecto personal',
    type: 'depression',
    category: 'Estado de Ánimo',
    icon: Frown
  },
  {
    id: 'anxiety6',
    text: 'Me siento inquieto, como si no pudiera parar de moverme',
    type: 'anxiety',
    category: 'Ansiedad',
    icon: Zap
  },
  {
    id: 'depression6',
    text: 'Espero las cosas con ilusión',
    type: 'depression',
    category: 'Estado de Ánimo',
    icon: Smile,
    reverse: true
  },
  {
    id: 'anxiety7',
    text: 'Experimento de repente sensaciones de gran angustia o temor',
    type: 'anxiety',
    category: 'Ansiedad',
    icon: Heart
  },
  {
    id: 'depression7',
    text: 'Soy capaz de disfrutar con un buen libro, la radio o un programa de televisión',
    type: 'depression',
    category: 'Estado de Ánimo',
    icon: Smile,
    reverse: true
  }
];

const answerOptions = [
  { value: 0, label: 'Nunca' },
  { value: 1, label: 'A veces' },
  { value: 2, label: 'Bastante' },
  { value: 3, label: 'Mucho' }
];

const reverseAnswerOptions = [
  { value: 3, label: 'Siempre' },
  { value: 2, label: 'A menudo' },
  { value: 1, label: 'A veces' },
  { value: 0, label: 'Nunca' }
];

const HADQuestionnaire = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(true);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: ''
  });

  const handlePatientInfoSubmit = (e) => {
    e.preventDefault();
    if (patientInfo.name.trim() && patientInfo.age.trim() && patientInfo.gender) {
      setShowPatientInfo(false);
    }
  };

  const handlePatientInfoChange = (field, value) => {
    setPatientInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAnswer = (value) => {
    const currentId = questions[current].id;
    const newAnswers = { ...answers, [currentId]: value };
    setAnswers(newAnswers);
    
    if (current < questions.length - 1) {
      setTimeout(() => {
        setCurrent(current + 1);
      }, 300);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  };

  const calculateScores = () => {
    const anxietyQuestions = questions.filter(q => q.type === 'anxiety');
    const depressionQuestions = questions.filter(q => q.type === 'depression');
    
    const anxietyScore = anxietyQuestions.reduce((sum, q) => {
      const answer = answers[q.id];
      return sum + (answer !== undefined ? answer : 0);
    }, 0);
    
    const depressionScore = depressionQuestions.reduce((sum, q) => {
      const answer = answers[q.id];
      return sum + (answer !== undefined ? answer : 0);
    }, 0);
    
    return { anxietyScore, depressionScore };
  };
  const getScoreLevel = (score, type) => {
    if (score <= 8) {
      return { 
        level: 'Leve', 
        color: 'text-yellow-600', 
        bg: 'bg-yellow-50', 
        border: 'border-yellow-200',
        description: `${type} leve`
      };
    }
    if (score <= 10) {
      return { 
        level: 'Moderado', 
        color: 'text-orange-600', 
        bg: 'bg-orange-50', 
        border: 'border-orange-200',
        description: `${type} moderada`
      };
    }
    return { 
      level: 'Alto', 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      border: 'border-red-200',
      description: `${type} alta`
    };
  };
  const downloadCSV = () => {
    const { anxietyScore, depressionScore } = calculateScores();
    const anxietyLevel = getScoreLevel(anxietyScore, 'ansiedad');
    const depressionLevel = getScoreLevel(depressionScore, 'depresión');
    
    const data = { 
      patient_name: patientInfo.name,
      patient_age: patientInfo.age,
      patient_gender: patientInfo.gender,
      ...answers, 
      anxiety_score: anxietyScore,
      depression_score: depressionScore,
      anxiety_level: anxietyLevel.level,
      depression_level: depressionLevel.level
    };
    
    const headers = Object.keys(data).join(',');
    const values = Object.values(data).join(',');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${values}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'had_resultados.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setIsComplete(false);
    setShowResult(false);
    setShowPatientInfo(true);
    setPatientInfo({
      name: '',
      age: '',
      gender: ''
    });
  };

  const goBackToHome = () => {
    window.location.reload(); // Esto volverá al dashboard principal
  };

  const progress = Math.round(((current + 1) / questions.length) * 100);
  const { anxietyScore, depressionScore } = calculateScores();
  const anxietyData = getScoreLevel(anxietyScore, 'ansiedad');
  const depressionData = getScoreLevel(depressionScore, 'depresión');

  const currentOptions = questions[current]?.reverse ? reverseAnswerOptions : answerOptions;

  // Formulario de información del paciente
  if (showPatientInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <User className="w-10 h-10 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">Información del Paciente</h1>
              <p className="text-gray-600">Por favor, complete la siguiente información antes de comenzar el cuestionario HAD</p>
            </div>

            <form onSubmit={handlePatientInfoSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={patientInfo.name}
                    onChange={(e) => handlePatientInfoChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Ingrese su nombre completo"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Edad *
                  </label>
                  <input
                    type="number"
                    id="age"
                    value={patientInfo.age}
                    onChange={(e) => handlePatientInfoChange('age', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Ingrese su edad"
                    min="1"
                    max="120"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Género *
                  </label>
                  <select
                    id="gender"
                    value={patientInfo.gender}
                    onChange={(e) => handlePatientInfoChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    required
                  >
                    <option value="">Seleccione su género</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero_no_decir">Prefiero no decir</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-4 px-8 rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Comenzar Cuestionario
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8 animate-fade-in">            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">¡Cuestionario HAD Completado!</h1>
              <p className="text-gray-600">Resultados de la Escala Hospitalaria de Ansiedad y Depresión</p>
              
              {/* Información del paciente */}
              <div className="bg-gray-50 rounded-xl p-4 mt-4">
                <p className="text-sm text-gray-600">
                  <strong>Paciente:</strong> {patientInfo.name} | 
                  <strong> Edad:</strong> {patientInfo.age} años | 
                  <strong> Género:</strong> {patientInfo.gender}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ansiedad */}
              <div className={`${anxietyData.bg} ${anxietyData.border} border-2 rounded-2xl p-6 space-y-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <Brain className="w-6 h-6 text-purple-600" />
                      Ansiedad
                    </h3>
                    <p className="text-gray-600">Puntuación obtenida</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gray-800">{anxietyScore}</div>
                    <div className="text-sm text-gray-500">de 21</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-medium text-gray-700">Nivel:</span>
                    <span className={`text-xl font-bold ${anxietyData.color}`}>{anxietyData.level}</span>
                  </div>
                  <p className="text-sm text-gray-600">{anxietyData.description}</p>
                </div>
              </div>

              {/* Depresión */}
              <div className={`${depressionData.bg} ${depressionData.border} border-2 rounded-2xl p-6 space-y-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-pink-600" />
                      Depresión
                    </h3>
                    <p className="text-gray-600">Puntuación obtenida</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gray-800">{depressionScore}</div>
                    <div className="text-sm text-gray-500">de 21</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-medium text-gray-700">Nivel:</span>
                    <span className={`text-xl font-bold ${depressionData.color}`}>{depressionData.level}</span>
                  </div>
                  <p className="text-sm text-gray-600">{depressionData.description}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-600" />
                Interpretación de Resultados
              </h4>              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium mb-2">Puntuación de Ansiedad:</p>
                  <p><strong>• 0-8:</strong> Leve</p>
                  <p><strong>• 9-10:</strong> Moderada</p>
                  <p><strong>• 11-21:</strong> Alta</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Puntuación de Depresión:</p>
                  <p><strong>• 0-8:</strong> Leve</p>
                  <p><strong>• 9-10:</strong> Moderada</p>
                  <p><strong>• 11-21:</strong> Alta</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                <p className="text-sm text-purple-800 font-medium">
                  <strong>Nota:</strong> Este cuestionario es una herramienta de evaluación clínica. 
                  Los resultados deben ser interpretados por un profesional de la salud mental.
                </p>
              </div>
            </div>            <div className="flex gap-4">
              <button
                onClick={downloadCSV}
                className="flex-1 bg-purple-600 text-white px-6 py-4 rounded-2xl hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Descargar Resultados
              </button>
              <button
                onClick={restart}
                className="flex-1 bg-gray-600 text-white px-6 py-4 rounded-2xl hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
              >
                Reiniciar Cuestionario
              </button>
              <button
                onClick={goBackToHome}
                className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-2xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
              >
                <Home className="w-5 h-5" />
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Cuestionario HAD</h1>
            <p className="text-gray-600">Escala Hospitalaria de Ansiedad y Depresión</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Pregunta {current + 1} de {questions.length}</span>
              <span>{progress}% completado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-600 to-purple-800 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-gray-50 rounded-2xl p-8 space-y-6 border border-gray-200">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(questions[current].icon, { 
                    className: "w-8 h-8 text-white" 
                  })}
                </div>
                <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-lg text-sm font-medium">
                  {questions[current].category}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 leading-relaxed text-center">
                {questions[current].text}
              </h2>
            </div>
          </div>

          {/* Answer Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {currentOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-sm"
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={goBack}
              disabled={current === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                current === 0 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>
            
            <div className="text-sm text-gray-500">
              {Object.keys(answers).length} respuestas guardadas
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HADQuestionnaire;
