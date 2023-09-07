import React from "react";

const ColorsToShow = ({ sizeData, colors, selectedSize }) => {
  return (
    <>
      {colors[sizeData[selectedSize]?.name] ? (
        <>
          <p className="text-sm text-center text-gray-950 dark:text-gray-200">
            Colors Available
          </p>
          <div className="flex justify-center py-3 items-center">
            {colors[sizeData[selectedSize]?.name].map((color, index) => {
              return (
                <span
                  key={`${index}`}
                  className={`border rounded-full border-gray-800 mr-3 p-2 dark:border-gray-200`}
                  style={{ backgroundColor: color.hex }}
                ></span>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ColorsToShow;
