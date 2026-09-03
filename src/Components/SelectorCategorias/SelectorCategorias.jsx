import React from 'react';
import './SelectorCategorias.css';

const FiltroCategorias = ({
  categoriaSeleccionada,
  alCambiarCategoria,
  categorias,
}) => {
  return (
    <div className='filtro-categorias-container'>
      <label htmlFor='categoria-select'>Filtrar por categoría: </label>
      <select
        id='categoria-select'
        value={categoriaSeleccionada}
        onChange={(e) => alCambiarCategoria(e.target.value)}
        className='categoria-select'
      >
        <option value='todas'>Todas las categorías</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroCategorias;
