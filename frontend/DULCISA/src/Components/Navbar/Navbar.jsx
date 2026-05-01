import { Link, useLocation } from "react-router-dom";
import { useCarrito } from "../../hooks/useCarrito";
import "./Navbar.css";
const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCarrito();
  return (
    <header className="header-container">
      <div className="nav-wrapper">
        <h1 className="main-title">Dulcisa</h1>

        <nav className="navbar-box">
          <ul className="navbar-list">
            <li>
              <Link to="/Home">Inicio</Link>
            </li>
            <li>
              <Link to="/productos">Productos</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto/Ubicacion</Link>
            </li>
            <li>
              <Link to="/carrito" className="cart-link">
                🛒 Carrito ({totalItems})
              </Link>
            </li>  
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
