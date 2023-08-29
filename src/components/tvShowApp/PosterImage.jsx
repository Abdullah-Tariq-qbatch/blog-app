/* eslint-disable react/prop-types */
import React from "react";

const PosterImage = (props) => (
  <img
    className="w-full h-80 rounded-t-lg"
    src={props.data.image_thumbnail_path}
    alt="TV Show Poster"
  />
);

export default PosterImage;
