import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Inicio from "./pages/inicio/Inicio";
import Catalogo from "./pages/Catalogo/Catalogo";
import Footer from "./Components/Footer/Footer";
import Carrito from "./pages/Carrito/Carrito";
import Contacto from "./pages/Contacto/Contacto";
import { CarritoProvider } from "./context/CarritoProvider";
import "./App.css";

function App() {
  return (
    <CarritoProvider>
      <Router>
        <Navbar />
        <main className="home-container">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Home" element={<Inicio />} />
            <Route path="/productos" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CarritoProvider>
  );
}

export default App;
