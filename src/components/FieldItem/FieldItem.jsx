import React from "react";
import { FaTrash } from "react-icons/fa";
import "./FieldItem.css";

const FieldItem = ({ field, onChange, onDelete }) => {
  const handleLabelChange = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange({ ...field, label: e.target.value });
    }
  };

  const handleOptionsChange = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange({ ...field, options: e.target.value });
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="field-item">
      <input
        type="text"
        value={field.label}
        onChange={handleLabelChange}
        placeholder="Label"
        className="field-label-input"
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
      {onDelete && (
        <button
          className="delete-field-btn"
          onClick={handleDelete}
          title="Delete Field"
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default FieldItem;
