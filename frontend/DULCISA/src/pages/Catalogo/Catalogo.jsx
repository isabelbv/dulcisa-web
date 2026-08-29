import React, { useState, useEffect } from "react";
import Producto from "../Productos/Productos";
import "./estilos.css";
import { useCarrito } from "../../hooks/useCarrito";
import { db } from "../../service/db";

const Catalogo = () => {
  const { agregarAlCarrito } = useCarrito();
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch("api/productos");
        const data = await response.json();
        setListaProductos(data);
      } catch (error) {
        console.error("Error al conectar con TiDB:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  if (cargando) {
    return <div className="loading-container">Cargando dulces...</div>;
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
