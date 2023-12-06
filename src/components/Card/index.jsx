import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoPricetagOutline } from "react-icons/io5";
import { DiUnitySmall } from "react-icons/di";
import { CiEdit } from "react-icons/ci";
import { useAuth } from "../../hooks/auth";
import ROLES from "../../utils/roles";
import productImage from "../../assets/default-product.png";
import "./card.css";

function Card({ delay, name, description, price, quantity, id }) {
  const { user } = useAuth();

  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      <img
        src={productImage}
        alt="Product"
        onClick={() => {
          toast.error("Funcionalidade não implementada");
        }}
      />
      <div className="card-content">
        <div>
          <div className="card-title">
            <h3>{name}</h3>
            {user?.role === ROLES.ADMIN && (
              <Link to={`/edit/${id}`}>
                <CiEdit />
              </Link>
            )}
          </div>
          <p>{description}</p>
        </div>
        <div className="card-values">
          <div className="card-qty">
            <IoPricetagOutline />
            <p>{String(price).split(".").join(",")} R$</p>
          </div>
          <div className="card-qty">
            <DiUnitySmall />
            <p>{quantity} unidades</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
