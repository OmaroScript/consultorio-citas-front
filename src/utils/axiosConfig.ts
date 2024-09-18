import axios from 'axios';

// Configuración de Axios para realizar peticiones al backend de Spring Boot
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
