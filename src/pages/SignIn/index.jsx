import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import "./signin.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    await login({ email, password });
  }

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
          <Link to="/register">Cadastrar</Link>
        </div>
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
        <button>Entrar</button>
      </form>
    </div>
  );
}

export default SignIn;
