// src/components/FieldModal/FieldModal.jsx
import React, { useState } from "react";
import "./FieldModal.css";

const FieldModal = ({ field, onSave, onClose }) => {
  const [label, setLabel] = useState(field.label);
  const [placeholder, setPlaceholder] = useState(field.placeholder || "");
  const [required, setRequired] = useState(field.required || false);
  const [options, setOptions] = useState(field.options || "");

  const handleSave = () => {
    onSave({ ...field, label, placeholder, required, options });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
      >
        <h2>Edit Field</h2>
        <label>Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          autoFocus
        />

        <label>Placeholder</label>
        <input
          type="text"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={required}
            onChange={() => setRequired(!required)}
          />
          Required
        </label>

        {field.type === "Picklist" && (
          <>
            <label>Options (comma separated)</label>
            <input
              type="text"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />
          </>
        )}

        <div className="modal-buttons">
          <button className="btn save" onClick={handleSave}>
            Save
          </button>
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldModal;
