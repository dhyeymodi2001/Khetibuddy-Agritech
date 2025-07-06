// EditProjectForm.jsx
import React, { useState } from "react";
import "../ProjectForm/ProjectForm.css";
import { useNavigate } from "react-router-dom";

const EditProjectForm = ({ initialData }) => {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved Data for Kheti Buddy:", formData);
    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>Edit Project - Kheti Buddy</h2>
      <div className="form-grid">
        {Object.entries(formData).map(([field, value]) => (
          <div key={field} className="form-field">
            <label>{field.replace(/([A-Z])/g, " $1")}</label>
            <input
              type={field.includes("Date") ? "date" : "text"}
              name={field}
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button className="edit-btn" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditProjectForm;
