import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./create.css";
import api from "../../services/api";

function Create() {
  const [name, setName] = useState("");
  const [description, setDescpriction] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/products", { name, description, price, quantity });
      toast("Produto criado com sucesso!");
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

  function handleClear() {
    setName("");
    setDescpriction("");
    setPrice("");
    setQuantity("");
  }

  return (
    <div className="create">
      <Header />
      <div className="create-main">
        <Link to="/">Voltar</Link>
        <form onSubmit={handleSubmit}>
          <h1>Cadastrar Produto</h1>
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
            <span>Descrição</span>
            <textarea
              value={description}
              onChange={(e) => setDescpriction(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Preço</span>
            <input
              type="number"
              step={0.01}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Quantidade</span>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>
          <div>
            <button type="button" onClick={handleClear}>
              Descartar
            </button>
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Create;
