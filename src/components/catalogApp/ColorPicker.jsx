import React, { useState } from "react";

import { ChromePicker } from "react-color";
import RenderIf from "./RenderIf";

const ColorPicker = ({ field, form }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleChange = (color) => {
    form.setFieldValue(field.name, color.hex);
  };

  return (
    <div className="flex flex-col items-center justify-between space-y-4">
      <button
        className="w-full rounded-md bg-blue-custom px-4 py-2 text-white hover:bg-blue-800"
        onClick={(e) => {
          e.preventDefault();
          setShowColorPicker(!showColorPicker);
        }}
      >
        {!showColorPicker ? "Choose Color" : "Cancel"}
      </button>
      <RenderIf isTrue={showColorPicker}>
        <ChromePicker color={field.value} onChange={handleChange} />
      </RenderIf>
    </div>
  );
};

export default ColorPicker;
