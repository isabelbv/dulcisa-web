import React, { useState } from "react";
import { useCarrito } from "../../Components/Carrito/CarritoContext";
import "./Productos.css";

const Producto = ({
  id,
  nombre,
  precio,
  imagen,
  descripcion,
  stock,
  onAgregar,
  ingredientes,
  alergenos,
}) => {
  const { carrito } = useCarrito();
  const [isFlipped, setIsFlipped] = useState(false);

  const cantidadEnCesta = (carrito || []).filter(
    (item) => item.id === id,
  ).length;
  const limiteAlcanzado = cantidadEnCesta >= stock;
  const listaAlergenos = alergenos ? alergenos.split(",") : [];
  return (
    <div className="producto-card">
      {/* El badge desaparece cuando entramos en modo gigante */}
      {cantidadEnCesta > 0 && !isFlipped && (
        <div className="badge-whatsapp">{cantidadEnCesta}</div>
      )}

      <div
        className={`flip-container ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flipper">
          {/* CARA DELANTE */}
          <div className="front">
            <img
              src={imagen}
              alt={nombre}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />
          </div>

          {/* CARA DETRÁS (EXTENSIÓN GIGANTE) */}
          <div className="back">
            {/* Título incrustado en el borde superior */}
            <h2 className="titulo-extension">{nombre}</h2>

            {/* La descripción bien grande en el centro */}
            <p className="descripcion-detallada">{descripcion}</p>

            <p className="ingredientes">{ingredientes}</p>

            {listaAlergenos.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Alérgeno"
                style={{
                  width: "60px",
                  height: "60px",
                }}
              />
            ))}

            {/* Precio en una burbuja abajo */}
            <div className="precio-extension">{precio}€</div>

            <span className="pie-card">(Toca para cerrar)</span>
          </div>
        </div>
      </div>

      {/* Lo que se ve en el catálogo normal (abajo de la foto) */}
      <div style={{ marginTop: "15px" }}>
        <h3>{nombre}</h3>
        <p style={{ fontWeight: "bold", color: "#790a9a" }}>{precio}€</p>
        <button
          disabled={limiteAlcanzado || stock === 0}
          onClick={(e) => {
            e.stopPropagation();
            onAgregar();
          }}
          style={{
            backgroundColor:
              limiteAlcanzado || stock === 0 ? "#ccc" : "#890cae",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            width: "100%",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          {stock === 0 ? "Agotado" : limiteAlcanzado ? "Límite" : "Añadir"}
        </button>
      </div>
    </div>
  );
};

export default Producto;
