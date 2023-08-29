/* eslint-disable react/prop-types */
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImageSlider = ({ images, backUpImg }) => {
  return (
    <Carousel className="w-screen lg:w-5/12 lg:h-5/12 lg:items-center">
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
