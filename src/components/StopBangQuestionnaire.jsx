import React, { useState } from 'react';
import Modal from 'react-modal';
import {
  CheckCircle, AlertCircle, Download, ArrowRight, ArrowLeft, Volume2,
  Coffee, Eye, Heart, Weight, Calendar, Ruler, User
} from 'lucide-react';
import { generateCSV } from '../utils/csvUtils';
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
  const [modalOpen, setModalOpen] = useState(true);
  const [patientInfo, setPatientInfo] = useState({ nombre: '', edad: '', genero: '' });

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
        autoSaveCSV(); // Guardado automático al terminar
      }, 500);
    }
  };




  const autoSaveCSV = () => {
    const evaluation = evaluateStopBang(answers);
    const fecha = new Date().toISOString().slice(0, 10);
    const data = {
      Nombre: patientInfo.nombre,
      Edad: patientInfo.edad,
      Género: patientInfo.genero,
      ...answers,
      Puntuación: evaluation.score,
      Riesgo: evaluation.riskLevel,
      Justificación: evaluation.reason,
      Fecha: fecha,
    };

    const filename = `${patientInfo.nombre}_${fecha}_stopbang`;
    generateCSV(data, filename);
  };

  const goBack = () => current > 0 && setCurrent(current - 1);
  const restart = () => {
    setCurrent(0);
    setAnswers({});
    setIsComplete(false);
    setShowResult(false);
    setModalOpen(true);
  };

  const progress = Math.round(((current + 1) / questions.length) * 100);
  const evaluation = evaluateStopBang(answers);


  return (
  <div className="min-h-screen bg-white flex items-center justify-center p-4">
    <Modal isOpen={modalOpen} ariaHideApp={false} className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Información del Paciente</h2>
      <input type="text" placeholder="Nombre" className="w-full border px-4 py-2 rounded" value={patientInfo.nombre}
        onChange={(e) => setPatientInfo({ ...patientInfo, nombre: e.target.value })} />
      <input type="number" placeholder="Edad" className="w-full border px-4 py-2 rounded" value={patientInfo.edad}
        onChange={(e) => setPatientInfo({ ...patientInfo, edad: e.target.value })} />
      <select className="w-full border px-4 py-2 rounded" value={patientInfo.genero}
        onChange={(e) => setPatientInfo({ ...patientInfo, genero: e.target.value })}>
        <option value="">Selecciona género</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
        <option value="Otro">Otro</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4 hover:bg-blue-700"
        onClick={() => setModalOpen(false)}
        disabled={!patientInfo.nombre || !patientInfo.edad || !patientInfo.genero}>
        Comenzar Cuestionario
      </button>
    </Modal>

    {showResult ? (
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">¡Cuestionario Completado!</h1>
            <p className="text-gray-600">Estos son sus resultados del cuestionario STOP-BANG</p>
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
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700">Nivel de Riesgo:</span>
                <span className={`text-xl font-bold ${
                  evaluation.riskLevel === 'Muy Alto' ? 'text-red-600' :
                  evaluation.riskLevel === 'Alto' ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {evaluation.riskLevel}
                </span>
              </div>
              <p className="text-sm text-gray-600 italic mt-2">{evaluation.reason}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Interpretación de Resultados
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>• Bajo:</strong> 0–2 respuestas “Sí”</p>
              <p><strong>• Alto:</strong> 3–4 respuestas o combinación STOP + masculino</p>
              <p><strong>• Muy Alto:</strong> 5–8 respuestas, o IMC alto + otros factores</p>
            </div>
          </div>

          <button
            onClick={restart}
            className="w-full bg-gray-600 text-white px-6 py-4 rounded-2xl hover:bg-gray-700 transition-all duration-300 shadow-lg"
          >
            Reiniciar Cuestionario
          </button>
        </div>
      </div>
    ) : (
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Cuestionario STOP-BANG</h1>
            <p className="text-gray-600">Evaluación de riesgo de apnea del sueño</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Pregunta {current + 1} de {questions.length}</span>
              <span>{progress}% completado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 space-y-6 border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {React.createElement(questions[current].icon, { className: "w-8 h-8 text-white" })}
              </div>
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">
                {questions[current].category}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 leading-relaxed text-center">
              {questions[current].text}
            </h2>
          </div>

          <div className="flex gap-4">
            <button onClick={() => handleAnswer('Yes')}
              className="flex-1 bg-green-500 text-white px-8 py-4 rounded-2xl hover:bg-green-600 transition-all font-medium text-lg shadow-lg">
              Sí
            </button>
            <button onClick={() => handleAnswer('No')}
              className="flex-1 bg-red-500 text-white px-8 py-4 rounded-2xl hover:bg-red-600 transition-all font-medium text-lg shadow-lg">
              No
            </button>
          </div>

          <div className="flex justify-between items-center">
            <button onClick={goBack}
              disabled={current === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                current === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}>
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>
            <div className="text-sm text-gray-500">{Object.keys(answers).length} respuestas guardadas</div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default StopBangQuestionnaire;
