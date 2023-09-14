import React from "react";

const PosterImage = ({ img }) => (
  <img
    src={img}
    className="h-64 w-96 rounded-t-lg 2xl:object-scale-down"
    alt="TV Show Poster"
  />
);

export default PosterImage;
