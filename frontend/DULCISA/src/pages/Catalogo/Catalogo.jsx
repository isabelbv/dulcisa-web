import React, { useState, useEffect } from 'react';
import Producto from '../Productos/Productos';
import FiltroCategorias from '../../Components/SelectorCategorias/SelectorCategorias';
import './estilos.css';
import { useCarrito } from '../../hooks/useCarrito';
import { usePaginacion } from '../../hooks/usePaginacion';

const Catalogo = () => {
  const { agregarAlCarrito } = useCarrito();
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('/api/productos');
        const data = await response.json();
        setListaProductos(data);
      } catch (error) {
        console.error('Error al conectar con TiDB:', error);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  const categoriasUnicas = [
    ...new Set(listaProductos.map((p) => p.categoria).filter(Boolean)),
  ];

  const productosFiltrados =
    categoriaSeleccionada === 'todas'
      ? listaProductos
      : listaProductos.filter(
          (p) =>
            p.categoria?.toLowerCase() === categoriaSeleccionada.toLowerCase(),
        );
  const {
    paginaActual,
    totalPaginas,
    elementosPaginados: productosPaginados,
    irAPagina,
    resetearPaginacion,
  } = usePaginacion(productosFiltrados, 9);

  const manejarCambioCategoria = (cat) => {
    setCategoriaSeleccionada(cat);
    resetearPaginacion();
  };

  if (cargando) {
    return <div className='loading-container'>Cargando dulces...</div>;
  }

  return (
    <div className='catalogo-container'>
      <FiltroCategorias
        categoriaSeleccionada={categoriaSeleccionada}
        alCambiarCategoria={manejarCambioCategoria}
        categorias={categoriasUnicas}
      />

      <div className='productos-grid'>
        {productosPaginados.length > 0 ? (
          productosPaginados.map((p) => (
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
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>

      {/* Control de Paginación */}
      {totalPaginas > 1 && (
        <div className='paginacion-container'>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
            (numero) => (
              <button
                key={numero}
                className={`btn-pagina ${paginaActual === numero ? 'activo' : ''}`}
                onClick={() => irAPagina(numero)}
              >
                {numero}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default Catalogo;
