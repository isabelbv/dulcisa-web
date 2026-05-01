import React, { useState, useEffect } from "react";
import "./Contacto.css";

const Contacto = () => {
  const [categorias, setCategorias] = useState([]);

  const [nombre, setNombre] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [detalles, setDetalles] = useState("");

  useEffect(() => {
    fetch("http://localhost/apidulcisa/conexion.php")
      .then((res) => res.json())
      .then((data) => {
        const categoriasUnicas = [
          ...new Set(data.map((item) => item.categoria)),
        ];
        setCategorias(categoriasUnicas);
      })
      .catch((error) => console.error("Error al cargar categorías:", error));
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (nombre.trim().length < 3) {
      alert("Por favor, introduce un nombre válido.");
      return;
    }

    const datosFormulario = {
      nombre,
      categoria: categoriaSeleccionada,
      fecha,
      hora,
      detalles,
    };

    fetch("http://localhost/apidulcisa/conexion.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosFormulario),
    })
      .then((res) => res.json())
      .then((respuesta) => {
        if (respuesta.error) {
          alert("Error: " + respuesta.mensaje);
        } else {
          alert("¡Encargo enviado correctamente!");
          setNombre("");
          setCategoriaSeleccionada("");
          setFecha("");
          setHora("");
          setDetalles("");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="contacto-page-container">
      <h1 className="titulo-seccion">Encuéntranos y Contáctanos</h1>

      <div className="contacto-grid">
        <div className="seccion-ubicacion">
          <div className="mapa-contenedor">
            <iframe
              title="Mapa Dulcisa"
              className="mapa-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2772.3720696957603!2d-3.8974771205605383!3d40.51899519681956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41832ffa9a2a8b%3A0xb00ce534110e4f6c!2sC.%20Camilo%20Jos%C3%A9%20Cela%2C%206-8%2C%2028232%20Las%20Rozas%20de%20Madrid%2C%20Madrid!5e1!3m2!1ses!2ses!4v1776799177541!5m2!1ses!2ses"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="info-tienda">
            <h3>Nuestra Tienda</h3>
            <p>📍 Calle Camilo José Cela, 6-8 Las Rozas Madrid</p>
            <p>
              ⏰ <strong>Horario:</strong> Lun a Sáb: 10:00 - 20:30
            </p>
          </div>
        </div>

        <div className="seccion-formulario">
          <div className="card-formulario">
            <h3>Haz tu encargo personalizado</h3>
            <form className="form-dulcisa" onSubmit={manejarEnvio}>
              <input
                type="text"
                placeholder="Tu nombre completo"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <select
                className="input-dulcisa"
                required
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona el tipo de dulce
                </option>
                {categorias.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>

              <div className="encargo-detalles">
                <div className="fecha-box">
                  <label>Día de recogida:</label>
                  <input
                    type="date"
                    required
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                </div>
                <div className="fecha-box">
                  <label>Hora de recogida:</label>
                  <select
                    required
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                  >
                    <option value="" disabled>
                      Selecciona la hora
                    </option>
                    <option value="10:00-12:00">10:00 - 12:00</option>
                    <option value="12:00-14:00">12:00 - 14:00</option>
                    <option value="17:00-19:00">17:00 - 19:00</option>
                    <option value="19:00-20:30">19:00 - 20:30</option>
                  </select>
                </div>
              </div>

              <textarea
                placeholder="Detalles (alérgenos, nombres, sabores...)"
                rows="3"
                required
                value={detalles}
                onChange={(e) => setDetalles(e.target.value)}
              ></textarea>

              <button type="submit" className="btn-enviar-contacto">
                Enviar Encargo
              </button>
            </form>

            <div className="contacto-adicional-footer">
              <hr className="linea-separadora" />
              <h4>Otras formas de contacto</h4>
              <div className="datos-contacto">
                <p>
                  📞 <strong>Teléfono:</strong> +34 912 34 56 78
                </p>
                <p>
                  📧 <strong>Email:</strong> pedidos@dulcisa.com
                </p>
                <p>
                  📸 <strong>Instagram:</strong> @Dulcisa_Pasteleria
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
