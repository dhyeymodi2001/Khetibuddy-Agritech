// src/components/FieldModal/FieldModal.jsx
import React, { useState } from "react";
import "./FieldModal.css";
import { FaTrash } from "react-icons/fa";

const FieldModal = ({ field, onSave, onClose }) => {
  const [label, setLabel] = useState(field.label);
  const [placeholder, setPlaceholder] = useState(field.placeholder || "");
  const [required, setRequired] = useState(field.required || false);
  const [options, setOptions] = useState(
    Array.isArray(field.options)
      ? field.options
      : (field.options || "")
          .split(",")
          .map((opt) => opt.trim())
          .filter(Boolean)
  );

  const handleSave = () => {
    const finalOptions = options.filter((opt) => opt.trim() !== "");
    onSave({ ...field, label, placeholder, required, options: finalOptions });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
      >
        <h2>Edit Field</h2>
        <div className="input-group">
          <label>Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            autoFocus
          />
        </div>

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
          <div className="option-list">
            <label>Options</label>

            {options.map((opt, idx) => (
              <div key={idx} className="option-item">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[idx] = e.target.value;
                    setOptions(newOptions);
                  }}
                  placeholder={`Option ${idx + 1}`}
                />
                <button
                  type="button"
                  className="delete-option-btn"
                  onClick={() => {
                    setOptions(options.filter((_, i) => i !== idx));
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            <button
              type="button"
              className="add-option-btn"
              onClick={() => setOptions([...options, ""])}
            >
              + Add Option
            </button>
          </div>
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
