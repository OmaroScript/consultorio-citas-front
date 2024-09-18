import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';

interface Cita {
  id: number;
  nombrePaciente: string;
  horarioConsulta: string;
  doctor: { id: number; nombre: string };
  consultorio: { id: number; numeroConsultorio: number };
}

const CitasList: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axiosInstance.get('/citas/todas');
        setCitas(response.data);
      } catch (error) {
        console.error('Error al cargar las citas:', error);
      }
    };

    fetchCitas();
  }, []);

  const handleCancelarCita = async (id: number) => {
    try {
      await axiosInstance.delete(`/citas/cancelar/${id}`);
      setCitas(citas.filter((cita) => cita.id !== id));
    } catch (error) {
      console.error('Error al cancelar la cita:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Citas Agendadas</h2>
      <ul className="space-y-4">
        {citas.map((cita) => (
          <li key={cita.id} className="bg-white p-4 rounded shadow-md">
            <p><strong>Paciente:</strong> {cita.nombrePaciente}</p>
            <p><strong>Doctor:</strong> {cita.doctor.nombre}</p>
            <p><strong>Consultorio:</strong> {cita.consultorio.numeroConsultorio}</p>
            <p><strong>Horario:</strong> {new Date(cita.horarioConsulta).toLocaleString()}</p>
            <button
              onClick={() => handleCancelarCita(cita.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-2 rounded"
            >
              Cancelar Cita
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitasList;
