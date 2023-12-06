import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [data, setData] = useState({});

  async function login({ email, password }) {
    try {
      const response = await api.post("/users/session", { email, password });
      const { token, user } = response.data;
      setData({ token, user });
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("@node-puc:user", JSON.stringify(user));
      localStorage.setItem("@node-puc:token", token);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error("Algo deu errado, tente novamente!");
      return;
    }
  }

  function logout() {
    localStorage.removeItem("@node-puc:user");
    localStorage.removeItem("@node-puc:token");
    setData({});
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("@node-puc:user"));
    const token = localStorage.getItem("@node-puc:token");
    if (user && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, user: data.user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const data = useContext(AuthContext);
  return data;
}
