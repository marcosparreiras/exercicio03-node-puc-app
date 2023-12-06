import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import ROLES from "../../utils/roles";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import "./home.css";

function Home() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get(`/products?search=${search}`);
        setProducts(response.data.products);
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error("Algo deu errado, tente novamente!");
        return;
      }
    }

    fetchProducts();
  }, [search]);

  return (
    <div className="home">
      <Header />
      <div className="home-main">
        <div className="home-card-container">
          <label className="home-search">
            <FaSearch />
            <input
              placeholder="Procure pelo nome ou descrição"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {user?.role === ROLES.ADMIN && (
              <Link to="/create">
                <FiPlus />
              </Link>
            )}
          </label>
          {products &&
            products.map((product, index) => (
              <Card
                key={product.id}
                delay={index * 0.3}
                name={product.name}
                description={product.description}
                price={product.price}
                quantity={product.quantity}
                id={product.id}
              />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
