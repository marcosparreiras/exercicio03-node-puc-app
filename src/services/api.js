import axios from "axios";

const api = axios.create({
  baseURL: "https://exercicio03-node-puc-api.onrender.com/",
});

export default api;
