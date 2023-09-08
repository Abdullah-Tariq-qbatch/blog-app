import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import React from "react";

const ImageSlider = ({ images, backUpImg }) => {
  return (
    <Carousel className="lg:h-5/12 mx-auto w-[95vw] lg:w-5/12">
      {images ? (
        images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))
      ) : (
        <div>
          <img src={backUpImg} alt="Poster" />
        </div>
      )}
    </Carousel>
  );
};
export default ImageSlider;
