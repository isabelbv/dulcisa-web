import React, { useState, useEffect } from "react"; // 1. Añadimos hooks
import Producto from "../Productos/Productos";
import "./estilos.css";
import { useCarrito } from "../../Components/Carrito/CarritoContext";

const Catalogo = () => {
  const { agregarAlCarrito } = useCarrito();

  // 2. Estados para guardar los productos de la BD y el estado de la carga
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 3. Llamada a la base de datos cuando el componente se monta
  useEffect(() => {
    // CAMBIA ESTA URL por la ruta real donde esté tu conexion.php
    // Ejemplo: "http://localhost/tu_proyecto/conexion.php"
    fetch("http://localhost/apidulcisa/conexion.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error desde PHP:", data.error);
        } else {
          setListaProductos(data);
        }
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al conectar con el servidor:", error);
        setCargando(false);
      });
  }, []);

  // Mensaje de espera mientras cargan los datos
  if (cargando) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Cargando dulces...
      </div>
    );
  }

  return (
    <div className="catalogo-container">
      <div className="productos-grid">
        {listaProductos.length > 0 ? (
          listaProductos.map((p) => (
            <Producto
              key={p.id}
              id={p.id}
              nombre={p.nombre}
              precio={p.precio}
              imagen={p.img}
              descripcion={p.descripcion}
              stock={p.stock}
              onAgregar={() => agregarAlCarrito(p)}
              ingredientes={p.ingredientes}
              alergenos={p.iconos_alergenos}
            />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
