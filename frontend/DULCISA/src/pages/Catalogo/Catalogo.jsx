import React, { useState, useEffect } from "react";
import Producto from "../Productos/Productos";
import "./estilos.css";
import { useCarrito } from "../../hooks/useCarrito";

const Catalogo = () => {
  const { agregarAlCarrito } = useCarrito();
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
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

  if (cargando) {
    return (
      <div className="loading-container">Cargando dulces...</div>
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
