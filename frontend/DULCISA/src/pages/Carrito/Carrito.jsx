import { useState } from "react";
import "./Carrito.css";
import { useCarrito } from "../../hooks/useCarrito";
import { Link } from "react-router-dom";

const Carrito = () => {
  const {
    carrito,
    eliminarVariosDelCarrito,
    agregarVariosAlCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
  } = useCarrito();

  const [cantidadesAjustar, setCantidadesAjustar] = useState({});

  const manejarCambioInput = (id, valor) => {
    setCantidadesAjustar({ ...cantidadesAjustar, [id]: valor });
  };

  const carritoAgrupado = (carrito || []).reduce((acc, producto) => {
    if (!producto) return acc;
    const encontrado = acc.find((item) => item.id === producto.id);
    const precioNum = parseFloat(producto.precio) || 0;
    if (encontrado) {
      encontrado.cantidad += 1;
      encontrado.subtotal += precioNum;
    } else {
      acc.push({
        ...producto,
        precio: precioNum,
        cantidad: 1,
        subtotal: precioNum,
      });
    }
    return acc;
  }, []);

  const totalFinal = (carrito || []).reduce(
    (acc, p) => acc + (parseFloat(p.precio) || 0),
    0,
  );

  return (
    <div className="carrito-container">
      <h1 className="carrito-titulo">Resumen de tu pedido</h1>

      {!carrito || carrito.length === 0 ? (
        <div className="carrito-vacio-container">
          <p className="carrito-vacio">¡Tu carrito está vacío! 🛍️</p>
          <Link to="/productos" className="boton-volver">
            Ver Catálogo
          </Link>
        </div>
      ) : (
        <div className="carrito-layout">
          <div className="lista-items">
            {carritoAgrupado.map((item) => (
              <div key={item.id} className="card-item">
                <div className="item-detalles">
                  <h3>{item.nombre}</h3>
                  <p>
                    Cantidad en la cesta: <strong>{item.cantidad}</strong>
                  </p>

                  <div className="ajuste-cantidad-box">
                    <div className="input-group">
                      <button
                        className="btn-ajuste btn-restar"
                        onClick={() => {
                          const valorInput = cantidadesAjustar[item.id];
                          if (valorInput && parseInt(valorInput) > 0) {
                            eliminarVariosDelCarrito(
                              item.id,
                              parseInt(valorInput),
                            );
                            manejarCambioInput(item.id, "");
                          } else {
                            eliminarDelCarrito(item.id);
                          }
                        }}
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min="0"
                        value={cantidadesAjustar[item.id] || ""}
                        placeholder="1" 
                        onChange={(e) => {
                          const v = parseInt(e.target.value);
                          if (v >= 0 || e.target.value === "")
                            manejarCambioInput(item.id, e.target.value);
                        }}
                        className="input-ajuste"/>

                      <button
                        className="btn-ajuste btn-sumar"
                        onClick={() => {
                          const valorInput = cantidadesAjustar[item.id];
                          if (valorInput && parseInt(valorInput) > 0) {
                            agregarVariosAlCarrito(item, parseInt(valorInput));
                            manejarCambioInput(item.id, "");
                          } else {
                            agregarAlCarrito(item);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="item-totales">
                  <p className="subtotal-texto">
                    Subtotal: {item.subtotal.toFixed(2)}€
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="total-box">
            <h2>Finalizar pedido</h2>
            <div className="divisor"></div>
            <p className="total-label">Total a pagar:</p>
            <p className="precio-final">{totalFinal.toFixed(2)}€</p>
            <button className="boton-pagar">Pagar ahora</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
