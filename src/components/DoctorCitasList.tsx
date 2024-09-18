import React, { useState } from 'react';
import axiosInstance from '../utils/axiosConfig';

interface Cita {
  id: number;
  nombrePaciente: string;
  horarioConsulta: string;
  consultorio: { numeroConsultorio: number };
}

interface DoctorCitasListProps {
  doctorId: number;
}

const DoctorCitasList: React.FC<DoctorCitasListProps> = ({ doctorId }) => {
  const [fecha, setFecha] = useState('');
  const [citas, setCitas] = useState<Cita[]>([]);

  const handleConsultarCitas = async () => {
    try {
      const response = await axiosInstance.get(`/citas/doctor/${doctorId}/fecha?fecha=${fecha}`);
      setCitas(response.data);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Consultar Citas del Doctor</h2>
      <div className="mb-4">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleConsultarCitas}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Consultar Citas
        </button>
  
        <ul className="mt-4 space-y-4">
          {citas.map((cita) => (
            <li key={cita.id} className="bg-white p-4 rounded shadow-md">
              <p><strong>Paciente:</strong> {cita.nombrePaciente}</p>
              <p><strong>Horario:</strong> {new Date(cita.horarioConsulta).toLocaleString()}</p>
              <p><strong>Consultorio:</strong> {cita.consultorio.numeroConsultorio}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DoctorCitasList;
  
