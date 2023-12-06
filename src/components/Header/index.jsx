import { useAuth } from "../../hooks/auth";
import "./header.css";

function Header() {
  const { logout, user } = useAuth();

  return (
    <div className="header">
      <h3>Olá, {user.name}</h3>
      <button onClick={() => logout()}>sair</button>
    </div>
  );
}

export default Header;
