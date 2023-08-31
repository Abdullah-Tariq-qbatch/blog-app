import React from "react";
import Button from "../Button";

const Colors = ({ sizeData, colors, selectedSize }) => {
  return (
    <>
      {colors[sizeData[selectedSize]?.name] !== undefined ? (
        colors[sizeData[selectedSize]?.name].map((color, index) => {
          return (
            <span
              key={`${index}`}
              className={`border-2 rounded-full border-transparent mr-3 p-2`}
              style={{ backgroundColor: color.hex }}
              onClick={() => {}}
            ></span>
          );
        })
      ) : (
        <Button
          className="text-sm border-0 border-black mr-3"
          label="Colors Not Available"
        />
      )}
    </>
  );
};

export default Colors;
