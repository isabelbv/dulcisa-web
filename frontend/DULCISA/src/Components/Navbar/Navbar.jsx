import { Link } from 'react-router-dom';
import { useCarrito } from '../../hooks/useCarrito';
import './Navbar.css';
const Navbar = () => {
  const { totalItems } = useCarrito();
  return (
    <header className='header-container'>
      <h1 className='main-title'>Dulcisa</h1>
      <nav className='navbar-box'>
        <ul className='navbar-list'>
          <li>
            <Link to='/Home' className='navbar-item'>
              Inicio
            </Link>
          </li>
          <li>
            <Link to='/productos' className='navbar-item'>
              Productos
            </Link>
          </li>
          <li>
            <Link to='/contacto' className='navbar-item'>
              Contacto/Ubicacion
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to='/carrito' className='cart-link'>
              🛒 Carrito ({totalItems})
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
