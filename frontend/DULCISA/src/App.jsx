import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Inicio from "./pages/inicio/Inicio"; // Revisa si la carpeta es 'pages' o 'Pages'
import Catalogo from "./pages/Catalogo/Catalogo";
import Footer from "./Components/Footer/Footer";
import { CarritoProvider } from "./Components/Carrito/CarritoContext";
import Carrito from "./pages/Carrito/Carrito";
import Contacto from "./pages/Contacto/Contacto"; // Revisa si la carpeta es 'Pages' o 'pages'

function App() {
  return (
    <CarritoProvider>
      <Router>
        <Navbar />
        {/* El main asegura que el footer no se pegue arriba en pantallas grandes */}
        <main style={{ minHeight: "80vh" }}>
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
