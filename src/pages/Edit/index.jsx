import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./edit.css";

function Edit() {
  const [name, setName] = useState("");
  const [description, setDescpriction] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  async function handleDelete() {
    if (confirm("Deseja mesmo excluir esse produto?")) {
      try {
        await api.delete(`/products/${params.id}`);
        toast("Produto excluido com sucesso!");
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
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/products/${params.id}`, {
        name,
        description,
        price,
        quantity,
      });
      toast("Produto alterado com sucesso!");
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

  useEffect(() => {
    async function fecthProduct() {
      try {
        const respose = await api.get(`/products/${params.id}`);
        const { product } = respose.data;
        setName(product.name);
        setDescpriction(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error("Algo deu errado, tente novamente!");
        return;
      }
    }

    fecthProduct();
  }, []);

  return (
    <div className="edit">
      <Header />
      <div className="edit-main">
        <Link to="/">Voltar</Link>
        <form onSubmit={handleSubmit}>
          <h1>Editar Produto</h1>
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
            <button type="button" onClick={handleDelete}>
              Deletar Produto
            </button>
            <button type="submit">Salvar Alterações</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Edit;
