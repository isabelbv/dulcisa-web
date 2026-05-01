import React, { useState } from "react";
import { useCarrito } from "../../hooks/useCarrito";
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
      {cantidadEnCesta > 0 && !isFlipped && (
        <div className="badge-whatsapp">{cantidadEnCesta}</div>
      )}

      <div
        className={`flip-container ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flipper">
          <div className="front">
            <img className="stock-img" src={imagen} alt={nombre} />
          </div>

          <div className="back">
            <h2 className="titulo-extension">{nombre}</h2>

            <p className="descripcion-detallada">{descripcion}</p>

            <p className="ingredientes">{ingredientes}</p>

            <div className="list-alergenos">
              {listaAlergenos.map((url, index) => (
                <img
                  className="icono-alerge"
                  key={index}
                  src={url}
                  alt="Alérgeno"
                />
              ))}
            </div>

            <div className="precio-extension">{precio}€</div>

            <span className="pie-card">(Toca para cerrar)</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <h3>{nombre}</h3>
        <p style={{ fontWeight: "bold", color: "#790a9a" }}>{precio}€</p>
        <button
          disabled={limiteAlcanzado || stock === 0}
          onClick={(e) => {
            e.stopPropagation();
            onAgregar();
          }}
          className={`sin-stock ${limiteAlcanzado || stock === 0 ? "disabled" : ""}`}
        >
          {stock === 0 ? "Agotado" : limiteAlcanzado ? "Sin Stock" : "Añadir"}
        </button>
      </div>
    </div>
  );
};

export default Producto;
