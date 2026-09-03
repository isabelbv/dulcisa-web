import { useState } from 'react';

export const usePaginacion = (elementos = [], elementosPorPagina = 9) => {
  const [paginaActual, setPaginaActual] = useState(1);

  const totalPaginas = Math.ceil(elementos.length / elementosPorPagina);

  const ultimoIndice = paginaActual * elementosPorPagina;
  const primerIndice = ultimoIndice - elementosPorPagina;
  const elementosPaginados = elementos.slice(primerIndice, ultimoIndice);

  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const resetearPaginacion = () => {
    setPaginaActual(1);
  };

  return {
    paginaActual,
    totalPaginas,
    elementosPaginados,
    irAPagina,
    resetearPaginacion,
  };
};
