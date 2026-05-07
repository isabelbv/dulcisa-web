import "./Inicio.css";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Inicio = () => {
  const postres = [
    "https://images.pexels.com/photos/7474290/pexels-photo-7474290.jpeg",
    "https://images.pexels.com/photos/33012123/pexels-photo-33012123.jpeg",
    "https://images.pexels.com/photos/30694835/pexels-photo-30694835.jpeg",
    "https://images.pexels.com/photos/29961482/pexels-photo-29961482.jpeg",
    "https://images.pexels.com/photos/32695941/pexels-photo-32695941.jpeg",
    "https://images.pexels.com/photos/34638147/pexels-photo-34638147.jpeg",
    "https://images.pexels.com/photos/32220819/pexels-photo-32220819.jpeg",
  ];

  return (
    <main className="inicio-page">
      <p className="frase-motivadora">"Pequeños bocados,grandes momentos"</p>
      <div className="carrusel-recogido-container">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={25}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000, delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
          }}
        >
          {postres.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={"Postres ${index}"}
                className="img-postres-glow"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
};
export default Inicio;
