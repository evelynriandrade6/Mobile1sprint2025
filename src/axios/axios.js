import axios from "axios";
import * as SecureStorage from 'expo-secure-store';

const api = axios.create({
  baseURL: "http://10.89.240.67:5000/api/reservas/v1/",
  headers: {
    accept: "application/json",
  },
});

// Interceptador para incluir o token automaticamente em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStorage.getItem("token");
    console.log("Token no interceptor:", token); // só para debug, pode remover depois
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Métodos da API sem a barra inicial para evitar URLs com barra dupla
const sheets = {
  postLogin: (user) => api.post("user/login/", user),
  postCadastro: (user) => api.post("user/", user),
  getAllClassrooms: () => api.get("classroom"),
  getSchedulesByIdClassroom: (id) => api.get(`schedule/${id}`),
  createSchedule: (dados) => api.post("schedule", dados),
  getSchedulesByIdClassroomRanges: (id, dataInicio, dataFim) =>
    api.get(`schedule/ranges/${id}?weekStart=${dataInicio}&weekEnd=${dataFim}`),
  getSchedulesByUser: (cpf) => api.get(`scheduleUser/${cpf}`),
  deleteSchedule: (id) => api.delete(`schedule/${id}`),
  updateUser: (cpf, dados) => api.put(`user/${cpf}`, dados),
  deleteUser: (cpf) => api.delete(`user/${cpf}`),
};

export default sheets;
