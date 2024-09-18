import React from 'react';
import CitaForm from './components/CitaForm';
import CitasList from './components/CitasList';
import DoctorCitasList from './components/DoctorCitasList';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center bg-blue-50"> {/* Pantalla completa, centrado y fondo azul claro */}
      <div className="text-center max-w-3xl w-full p-8 bg-white shadow-lg rounded-lg border-4 border-blue-300"> {/* Contenedor centrado con borde azul cielo */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Consultorio Médico</h1> {/* Título estilizado */}

        {/* Crear nueva cita */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Crear o Editar Cita</h2>
          <CitaForm 
            doctorId={1} 
            consultorios={[{ id: 1, numeroConsultorio: 101 }, { id: 2, numeroConsultorio: 102 }]} 
            onSubmitSuccess={() => console.log('Cita creada/editada exitosamente')} 
          />
        </section>

        {/* Listar todas las citas */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Listado de Citas</h2>
          <CitasList />
        </section>

        {/* Consultar citas por doctor y fecha */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Consultar Citas por Doctor y Fecha</h2>
          <DoctorCitasList doctorId={1} />
        </section>
      </div>
    </div>
  );
};

export default App;
