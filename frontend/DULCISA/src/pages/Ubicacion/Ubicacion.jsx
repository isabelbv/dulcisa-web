import React from "react";
import "./Ubicacion.css";

const Ubicacion = () => {
  return (
    <div className="ubicacion-container">
      <h1 className="titulo-seccion">¿Dónde encontrarnos?</h1>

      <div className="ubicacion-content">
        {/* MAPA A LA IZQUIERDA (O ARRIBA EN MÓVIL) */}
        <div className="mapa-box">
          <iframe
            title="Google Maps Dulcisa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.123456789!2d-3.703790!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228870703c167%3A0x401614210b42d70!2sMadrid%2C%20Spain!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "15px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* INFORMACIÓN A LA DERECHA */}
        <div className="info-box">
          <div className="card-info">
            <h3>Nuestra Tienda</h3>
            <p>📍 Calle de la Dulzura, 123</p>
            <p>28001, Madrid, España</p>
          </div>

          <div className="card-info">
            <h3>Horario de Atención</h3>
            <ul className="lista-horarios">
              <li>
                <span>Lunes - Viernes:</span> 09:00 - 20:00
              </li>
              <li>
                <span>Sábados:</span> 10:00 - 14:00
              </li>
              <li>
                <span>Domingos:</span> Cerrado por descanso
              </li>
            </ul>
          </div>

          <div className="card-info contacto-directo">
            <h3>Contacto</h3>
            <p>📞 +34 600 000 000</p>
            <p>📧 hola@dulcisa.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ubicacion;
