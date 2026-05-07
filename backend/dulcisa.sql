-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-05-2026 a las 21:35:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dulcisa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergenos`
--

CREATE TABLE `alergenos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `icono` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alergenos`
--

INSERT INTO `alergenos` (`id`, `nombre`, `icono`) VALUES
(1, 'Azúcar', 'http://localhost/apidulcisa/iconos_aler/azucar.png'),
(2, 'aceite', 'http://localhost/apidulcisa/iconos_aler/aceite.png'),
(3, 'cafe', 'http://localhost/apidulcisa/iconos_aler/cafe.png'),
(4, 'frutos secos', 'http://localhost/apidulcisa/iconos_aler/frutossecos.png'),
(5, 'gluten', 'http://localhost/apidulcisa/iconos_aler/gluten.png'),
(6, 'huevos', 'http://localhost/apidulcisa/iconos_aler/huevos.png'),
(7, 'lacteos', 'http://localhost/apidulcisa/iconos_aler/lacteos.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `categoria` enum('tartas','galletas','bizcochos','') DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `ingredientes` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `categoria`, `descripcion`, `ingredientes`, `precio`, `img`, `stock`) VALUES
(1, 'Tarta de Fresas', 'tartas', 'Deliciosa tarta artesana', 'Fresas, nata, harina,azúcar,huevos', 25.50, 'http://localhost/apidulcisa/img/tarta-fresas.jpg', 5),
(2, 'Tartaletas de Limón', 'tartas', 'Masa quebrada con crema de limón y merengue italiano', 'Limónes,Azúcar,Harina,Huevos,Mantequilla', 6.00, 'http://localhost/apidulcisa/img/tartaleta-limon.jpg', 17),
(3, 'Galletas con Chips', 'galletas', 'Ricas Galletas con pizcas de chocolate', 'Harina,Lagrimas de chocolate con leche, Azúcar blanco, Azúcar moreno, Mantequilla,Huevos,Vainilla', 3.00, 'http://localhost/apidulcisa/img/galletas-chips.jpg\r\n', 8),
(4, 'Bizcocho de Chocolate', 'bizcochos', 'Suave Bizcocho de chocolate con cobertura de Chocolate Negro', 'Chocolate,Huevos,Harina,Leche,Mantequilla,Azúcar', 12.00, 'http://localhost/apidulcisa/img/bizcocho-choco.jpg', 9),
(5, 'Tarta de Café', 'tartas', 'Suave y cremosa Tarta de Café', 'Café,Azucar,Harina,Huevos,Frutos rojos, Nata', 37.00, 'http://localhost/apidulcisa/img/tarta-cafe.jpg', 3),
(6, 'Galletas de Avena y Pasas', 'galletas', 'Crujientes galletas de avena y pasas', 'Avena,Miel,Azúcar Moreno,Vainilla,Harina,Huevos,Mantequilla', 3.00, 'http://localhost/apidulcisa/img/galletas-avenapasas.jpg', 12),
(7, 'Bizcocho Red Velvet', '', 'Esponjoso Bizcocho sabor red Velvet', 'Colorante rojo, Cacao en Polvo, Harina, Bicarbonato Sodico, Vinagre, Harina, Azúcar blanco, Huevos', 20.00, 'http://localhost/apidulcisa/img/bizcocho-red.jpg', 3),
(8, 'Tartaletas de Fresas', 'tartas', 'Sedosas y cremosas tartaletas de fresas y crema pastelera', 'Fresas,Pistacho,Huevos,Azúcar,Harina,Mantequilla', 4.00, 'http://localhost/apidulcisa/img/tartaletas-fresa.jpeg', 8),
(9, 'Bizcocho de Zanahoria', 'bizcochos', 'Sabroso e Intenso Bizcocho de Zanahoria', 'Zanahoria,Azúcar Moreno, Azúcar Blanco,Comino,Canela,Harina,Huevos,Aceite de oliva,nueces', 9.00, 'http://localhost/apidulcisa/img/bizcocho-zana.jpg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_alergenos`
--

CREATE TABLE `producto_alergenos` (
  `producto_id` int(11) NOT NULL,
  `alergeno_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_alergenos`
--

INSERT INTO `producto_alergenos` (`producto_id`, `alergeno_id`) VALUES
(1, 1),
(1, 5),
(1, 6),
(1, 7),
(2, 1),
(2, 5),
(2, 6),
(2, 7),
(3, 1),
(3, 5),
(3, 6),
(3, 7),
(4, 1),
(4, 5),
(4, 6),
(4, 7),
(5, 1),
(5, 3),
(5, 5),
(5, 6),
(5, 7),
(6, 1),
(6, 5),
(6, 6),
(6, 7),
(7, 1),
(7, 5),
(7, 6),
(8, 1),
(8, 4),
(8, 5),
(8, 6),
(8, 7),
(9, 1),
(9, 2),
(9, 4),
(9, 5),
(9, 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alergenos`
--
ALTER TABLE `alergenos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto_alergenos`
--
ALTER TABLE `producto_alergenos`
  ADD PRIMARY KEY (`producto_id`,`alergeno_id`),
  ADD KEY `alergeno_id` (`alergeno_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alergenos`
--
ALTER TABLE `alergenos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto_alergenos`
--
ALTER TABLE `producto_alergenos`
  ADD CONSTRAINT `producto_alergenos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `producto_alergenos_ibfk_2` FOREIGN KEY (`alergeno_id`) REFERENCES `alergenos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
