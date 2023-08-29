/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ChromePicker } from "react-color";
import RenderIf from "./RenderIf";

const ColorPicker = ({ field, form }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleChange = (color) => {
    form.setFieldValue(field.name, color.hex);
  };

  return (
    <div>
      <p
        className="bg-blue-500 text-white px-4 py-2 rounded float-left"
        onClick={() => setShowColorPicker(!showColorPicker)}
      >
        Choose Color
      </p>
      <RenderIf isTrue={showColorPicker}>
        <ChromePicker color={field.value} onChange={handleChange} />
      </RenderIf>
    </div>
  );
};

export default ColorPicker;
