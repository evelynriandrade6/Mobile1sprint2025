import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://10.89.240.67:5000/api/reservas/v1/",
  headers: {
    accept: "application/json",
  },
});

// Interceptador para incluir o token automaticamente
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Métodos da API
const sheets = {
  postLogin: (user) => api.post("user/login/", user),
  postCadastro: (user) => api.post("user/", user),
  getAllClassrooms: () => api.get("/classroom"),
  getSchedulesByIdClassroom: (id) => api.get(`/schedule/${id}`),
  createSchedule: (dados) => api.post("/schedule", dados),
  getSchedulesByIdClassroomRanges: (id, dataInicio, dataFim) =>
    api.get(
      `/schedule/ranges/${id}?weekStart=${dataInicio}&weekEnd=${dataFim}`
    ),
  getSchedulesByUser: (cpf) => api.get(`/scheduleUser/${cpf}`),
  deleteSchedule: (id) => api.delete(`/schedule/${id}`),
  updateUser: (cpf, dados) => api.put(`/user/${cpf}`, dados),
};

export default sheets;
