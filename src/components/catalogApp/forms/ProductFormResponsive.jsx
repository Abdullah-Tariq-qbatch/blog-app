import React from "react";

const ProductFormResponsive = ({ containers }) => {
  return (
    <div className="grid grid-cols-1 gap-2 w-full lg:grid-cols-2">
      {containers.map((container, index) => (
        <div className="flex flex-col" key={index}>
          {container}
        </div>
      ))}
    </div>
  );
};

export default ProductFormResponsive;
