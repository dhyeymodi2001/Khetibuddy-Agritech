import React from "react";
import "./FieldItem.css";

const FieldItem = ({ field, onChange }) => {
  const handleLabelChange = (e) => {
    onChange({ ...field, label: e.target.value });
  };

  const handleOptionsChange = (e) => {
    onChange({ ...field, options: e.target.value });
  };

  return (
    <div className="field-item">
      <input
        type="text"
        value={field.label}
        onChange={handleLabelChange}
        placeholder="Label"
      />
      {field.type === "Single-Line" && (
        <input type="text" placeholder="Text input" disabled />
      )}
      {field.type === "Multi-Line" && (
        <textarea placeholder="Multiline" disabled />
      )}
      {field.type === "Number" && (
        <input type="number" placeholder="Number input" disabled />
      )}
      {field.type === "Picklist" && (
        <input
          type="text"
          placeholder="Comma-separated options"
          value={field.options || ""}
          onChange={handleOptionsChange}
        />
      )}
    </div>
  );
};

export default FieldItem;
