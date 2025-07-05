import React, { useState } from "react";
import "./ProjectForm.css";

const ProjectForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    owner: "",
    template: "",
    startDate: "",
    endDate: "",
    overview: "",
    status: "",
    group: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  return (
    <div className="form-container">
      <div className="form-grid">
        {Object.entries(formData).map(([field, value]) => (
          <div key={field} className="form-field">
            <label>{field.replace(/([A-Z])/g, " $1")}</label>
            {isEditing ? (
              <input
                type={field.includes("Date") ? "date" : "text"}
                name={field}
                value={value}
                onChange={handleChange}
              />
            ) : (
              <p className="read-only">{value || "-"}</p>
            )}
          </div>
        ))}
      </div>

      <button className="edit-btn" onClick={toggleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default ProjectForm;
