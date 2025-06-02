import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.67:5000/api/reservas/v1/",
  headers: {
    accept: "application/json",
  },
});

const sheets = {
  postLogin: (user) => api.post("user/login/", user),
  postCadastro: (user) => api.post("user/", user),
  getAllClassrooms: () => api.get("/classroom"),
  getSchedulesByIdClassroom: (id) => api.get(`/schedule/${id}`),
  createSchedule: (dados) => api.post("/schedule", dados),
  getSchedulesByIdClassroomRanges: (id, dataInicio, dataFim) => api.get(`/schedule/ranges/${id}?weekStart=${dataInicio}&weekEnd=${dataFim}`),
  getSchedulesByUser: (cpf) => api.get(`/scheduleUser/${cpf}`),
  deleteSchedule: (id) => api.delete(`/reservas/${id}`),
  updateUser: (cpf, dados) => api.put(`/user/${cpf}`, dados), 
};

export default sheets;
