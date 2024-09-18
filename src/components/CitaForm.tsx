import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';

interface CitaFormProps {
  doctorId?: number;
  citaId?: number; // Para edición
  consultorios: { id: number; numeroConsultorio: number }[];
  onSubmitSuccess: () => void; // Callback para actualizar la lista de citas
}

const CitaForm: React.FC<CitaFormProps> = ({ doctorId, citaId, consultorios, onSubmitSuccess }) => {
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [horarioConsulta, setHorarioConsulta] = useState('');
  const [consultorioId, setConsultorioId] = useState(consultorios[0]?.id || 1);

  // Efecto para prellenar los datos si estamos editando una cita existente
  useEffect(() => {
    const fetchCita = async () => {
      if (citaId) {
        try {
          const response = await axiosInstance.get(`/citas/${citaId}`);
          const cita = response.data;
          setNombrePaciente(cita.nombrePaciente);
          setHorarioConsulta(cita.horarioConsulta);
          setConsultorioId(cita.consultorio.id);
        } catch (error) {
          console.error('Error al obtener los datos de la cita:', error);
        }
      }
    };

    fetchCita();
  }, [citaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        nombrePaciente,
        horarioConsulta,
        doctor: { id: doctorId }, // Relacionar con doctor
        consultorio: { id: consultorioId }, // Relacionar con consultorio
      };

      if (citaId) {
        // Editar cita existente
        await axiosInstance.put(`/citas/editar/${citaId}`, data);
      } else {
        // Agendar nueva cita
        await axiosInstance.post('/citas/nueva', data);
      }

      onSubmitSuccess(); // Llama el callback para refrescar la lista de citas
    } catch (error) {
      console.error('Error al agendar/editar la cita:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Paciente</label>
        <input
          type="text"
          value={nombrePaciente}
          onChange={(e) => setNombrePaciente(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          placeholder="Nombre del Paciente"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Horario de Consulta</label>
        <input
          type="datetime-local"
          value={horarioConsulta}
          onChange={(e) => setHorarioConsulta(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Consultorio</label>
        <select
          value={consultorioId}
          onChange={(e) => setConsultorioId(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
        >
          {consultorios.map((consultorio) => (
            <option key={consultorio.id} value={consultorio.id}>
              Consultorio {consultorio.numeroConsultorio}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {citaId ? 'Editar Cita' : 'Agendar Cita'}
      </button>
    </form>
  );
};

export default CitaForm;
