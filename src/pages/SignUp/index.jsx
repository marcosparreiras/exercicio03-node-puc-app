import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import { toast } from "react-toastify";
import api from "../../services/api";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Confirmação de senha invalida");
      return;
    }
    try {
      await api.post("/users", { name, email, password });
      toast("Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error("Algo deu errado, tente novamente!");
      return;
    }
  }

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Cadastre-se</h1>
          <Link to="/">Login</Link>
        </div>
        <label>
          <span>Nome</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Confirmar senha</span>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </label>
        <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default SignUp;
