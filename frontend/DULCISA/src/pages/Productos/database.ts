export interface ICategoria {
  id_categoria: number;
  nombre: string;
}

export interface IProductoAlergeno {
  producto_id: number;
  alergeno_id: number;
}

export interface IProducto {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  img: string;
  id_categoria: number;
}
