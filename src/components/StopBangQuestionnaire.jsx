import React, { useState } from 'react';
import {
  CheckCircle, AlertCircle, Download, ArrowLeft, Volume2,
  Coffee, Eye, Heart, Weight, Calendar, Ruler, User, Home, Moon
} from 'lucide-react';
import { evaluateStopBang } from '../utils/stopbangEvaluator';

const questions = [
  { id: 'snoring', text: '¿Ronca fuerte?', category: 'S - Snoring', icon: Volume2 },
  { id: 'tired', text: '¿Se siente cansado durante el día?', category: 'T - Tired', icon: Coffee },
  { id: 'observed', text: '¿Alguien ha notado que deja de respirar al dormir?', category: 'O - Observed', icon: Eye },
  { id: 'pressure', text: '¿Tiene presión arterial alta?', category: 'P - Pressure', icon: Heart },
  { id: 'bmi', text: '¿Su IMC es mayor a 35?', category: 'B - BMI', icon: Weight },
  { id: 'age', text: '¿Es mayor de 50 años?', category: 'A - Age', icon: Calendar },
  { id: 'neck', text: '¿Su cuello es grande?', category: 'N - Neck', icon: Ruler },
  { id: 'gender', text: '¿Su género es masculino?', category: 'G - Gender', icon: User },
];

const StopBangQuestionnaire = () => {
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
      setTimeout(() => setCurrent(current + 1), 300);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  };

  const downloadCSV = () => {
    const evaluation = evaluateStopBang(answers);
    const fecha = new Date().toISOString().slice(0, 10);
    const data = {
      patient_name: patientInfo.name,
      patient_age: patientInfo.age,
      patient_gender: patientInfo.gender,
      ...answers,
      score: evaluation.score,
      risk_level: evaluation.riskLevel,
      reason: evaluation.reason,
      date: fecha,
    };
    
    const headers = Object.keys(data).join(',');
    const values = Object.values(data).join(',');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${values}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${patientInfo.name}_${fecha}_stopbang.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const goBack = () => current > 0 && setCurrent(current - 1);
  
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
    window.location.reload();
  };

  const progress = Math.round(((current + 1) / questions.length) * 100);
  const evaluation = evaluateStopBang(answers);

  // Formulario de información del paciente
  if (showPatientInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
        {/* Navigation Bar */}
        <div className="w-full bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Moon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-800">Cuestionario STOP-Bang</h1>
                  <p className="text-sm text-gray-500">Evaluación de riesgo de apnea del sueño</p>
                </div>
              </div>
              <button
                onClick={goBackToHome}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300 font-medium"
              >
                <Home className="w-4 h-4" />
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Información del Paciente</h1>
                <p className="text-gray-600">Por favor, complete la siguiente información antes de comenzar el cuestionario STOP-Bang</p>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Comenzar Cuestionario
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
      {/* Navigation Bar */}
      <div className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Moon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">Cuestionario STOP-Bang</h1>
                <p className="text-sm text-gray-500">Evaluación de riesgo de apnea del sueño</p>
              </div>
            </div>
            <button
              onClick={goBackToHome}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300 font-medium"
            >
              <Home className="w-4 h-4" />
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {showResult ? (
          <div className="max-w-4xl w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">¡Cuestionario STOP-Bang Completado!</h1>
                <p className="text-gray-600">Resultados de la evaluación de riesgo de apnea del sueño</p>
                
                {/* Información del paciente */}
                <div className="bg-gray-50 rounded-xl p-4 mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Paciente:</strong> {patientInfo.name} | 
                    <strong> Edad:</strong> {patientInfo.age} años | 
                    <strong> Género:</strong> {patientInfo.gender}
                  </p>
                </div>
              </div>

              <div className={`border-2 rounded-2xl p-6 space-y-4 ${
                evaluation.riskLevel === 'Muy Alto' ? 'bg-red-50 border-red-200' :
                evaluation.riskLevel === 'Alto' ? 'bg-yellow-50 border-yellow-200' :
                'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Puntuación Total</h3>
                    <p className="text-gray-600">Respuestas positivas</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gray-800">{evaluation.score}</div>
                    <div className="text-sm text-gray-500">de {questions.length}</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-medium text-gray-700">Nivel de Riesgo:</span>
                    <span className={`text-xl font-bold ${
                      evaluation.riskLevel === 'Muy Alto' ? 'text-red-600' :
                      evaluation.riskLevel === 'Alto' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>{evaluation.riskLevel}</span>
                  </div>
                  <p className="text-sm text-gray-600">{evaluation.reason}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  Interpretación de Resultados
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>• Riesgo Bajo (0-2):</strong> Baja probabilidad de apnea del sueño</p>
                  <p><strong>• Riesgo Intermedio (3-4):</strong> Probabilidad intermedia de apnea del sueño</p>
                  <p><strong>• Riesgo Alto (5-8):</strong> Alta probabilidad de apnea del sueño</p>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800 font-medium">
                    <strong>Nota:</strong> Este cuestionario es una herramienta de evaluación. 
                    Consulte con un profesional de la salud para un diagnóstico preciso.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={downloadCSV}
                  className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-2xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
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
                  className="flex-1 bg-purple-600 text-white px-6 py-4 rounded-2xl hover:bg-purple-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl"
                >
                  <Home className="w-5 h-5" />
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">Cuestionario STOP-BANG</h1>
                <p className="text-gray-600">Evaluación de riesgo de apnea del sueño</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Pregunta {current + 1} de {questions.length}</span>
                  <span>{progress}% completado</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-blue-800 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-gray-50 rounded-2xl p-8 space-y-6 border border-gray-200">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      {React.createElement(questions[current].icon, { 
                        className: "w-8 h-8 text-white" 
                      })}
                    </div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
                      {questions[current].category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 leading-relaxed text-center">
                    {questions[current].text}
                  </h2>
                </div>
              </div>

              {/* Answer Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleAnswer('Yes')}
                  className="flex-1 bg-green-500 text-white px-8 py-4 rounded-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg"
                >
                  Sí
                </button>
                <button
                  onClick={() => handleAnswer('No')}
                  className="flex-1 bg-red-500 text-white px-8 py-4 rounded-2xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-lg"
                >
                  No
                </button>
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
        )}
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

export default StopBangQuestionnaire;
