import { useState } from "react";
import { CarritoContext } from "./CarritoContext";

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const cantidadEnCarrito = prev.filter(
        (item) => item.id === producto.id,
      ).length;
      return cantidadEnCarrito >= producto.stock ? prev : [...prev, producto];
    });
  };

  const agregarVariosAlCarrito = (producto, cantidad) => {
    setCarrito((prev) => {
      const cantidadEnCarrito = prev.filter(
        (item) => item.id === producto.id,
      ).length;
      const cantidadFinal = cantidadEnCarrito + cantidad;
      if (cantidadFinal > producto.stock) {
        const disponible = producto.stock - cantidadEnCarrito;
        return disponible <= 0
          ? prev
          : [...prev, ...Array(disponible).fill(producto)];
      }
      return [...prev, ...Array(cantidad).fill(producto)];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index !== -1) {
        const nuevo = [...prev];
        nuevo.splice(index, 1);
        return nuevo;
      }
      return prev;
    });
  };

  const eliminarVariosDelCarrito = (id, cantidad) => {
    setCarrito((prev) => {
      let contador = 0;
      return prev.filter((item) => {
        if (item.id === id && contador < cantidad) {
          contador++;
          return false;
        }
        return true;
      });
    });
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        agregarVariosAlCarrito,
        eliminarVariosDelCarrito,
        totalItems: carrito.length,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
