import React, { createContext, useState, useContext } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // 1. Función para añadir uno solo (ya la tenías)
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const cantidadEnCarrito = prev.filter(
        (item) => item.id === producto.id,
      ).length;

      if (cantidadEnCarrito >= producto.stock) {
        return prev;
      }
      return [...prev, producto];
    });
  };

  // 2. Función para añadir VARIOS de golpe
  const agregarVariosAlCarrito = (producto, cantidad) => {
    setCarrito((prev) => {
      const cantidadEnCarrito = prev.filter(
        (item) => item.id === producto.id,
      ).length;
      const cantidadFinal = cantidadEnCarrito + cantidad;

      // Si lo que quiere añadir supera el stock, solo añadimos hasta llenar el stock
      if (cantidadFinal > producto.stock) {
        const espacioDisponible = producto.stock - cantidadEnCarrito;
        if (espacioDisponible <= 0) return prev;
        const nuevos = Array(espacioDisponible).fill(producto);
        return [...prev, ...nuevos];
      }

      const nuevos = Array(cantidad).fill(producto);
      return [...prev, ...nuevos];
    });
  };

  // 3. Función para quitar productos uno a uno (ya la tenías)
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index !== -1) {
        const nuevoCarrito = [...prev];
        nuevoCarrito.splice(index, 1);
        return nuevoCarrito;
      }
      return prev;
    });
  };

  // 4. Función para eliminar VARIOS de golpe
  const eliminarVariosDelCarrito = (id, cantidadARestar) => {
    setCarrito((prev) => {
      let contador = 0;
      // Quitamos solo la cantidad solicitada
      return prev.filter((item) => {
        if (item.id === id && contador < cantidadARestar) {
          contador++;
          return false; // Se elimina
        }
        return true; // Se queda
      });
    });
  };

  const totalItems = carrito.length;

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        agregarVariosAlCarrito, // <--- EXPORTADO
        eliminarVariosDelCarrito, // <--- EXPORTADO
        totalItems,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
