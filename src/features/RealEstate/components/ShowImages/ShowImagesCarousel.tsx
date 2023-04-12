import React, { useState } from "react";
import { Carousel } from "antd";

import "./ShowImagesCarousel.scss";

interface IShowImagesCarouselProps {
  images: string[];
}

const ShowImagesCarousel: React.FC<IShowImagesCarouselProps> = ({ images }) => {

  return (
    <div className="carousel-wrapper">
      <Carousel
        autoplay
        effect="fade"
      >
        {images.map((image, i) => (
          <div key={i}>
            <img src={image} alt={`Slide ${i}`}/>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ShowImagesCarousel;
