import React from "react";

const ColorsToShow = ({ sizeData, colors, selectedSize }) => {
  return (
    <>
      {colors[sizeData[selectedSize]?.name] ? (
        colors[sizeData[selectedSize]?.name].map((color, index) => {
          return (
            <span
              key={`${index}`}
              className={`border-2 rounded-full border-transparent mr-3 p-2`}
              style={{ backgroundColor: color.hex }}
            ></span>
          );
        })
      ) : (
        <p className="text-sm border-0 border-black mr-3">
          Colors Not Available
        </p>
      )}
    </>
  );
};

export default ColorsToShow;
