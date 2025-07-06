import React, { useEffect, useState } from "react";
import "./ProjectFormView.css";

const ProjectFormView = () => {
  const [sections, setSections] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const layout = localStorage.getItem("layout");
    if (layout) setSections(JSON.parse(layout));
  }, []);

  const handleChange = (fieldKey, value) => {
    setFormValues((prev) => ({ ...prev, [fieldKey]: value }));
  };

  return (
    <div className="form-view">
      <h2>Saved Project Layout</h2>
      {sections.map((section, idx) => (
        <div className="view-section" key={idx}>
          <h4>Section {idx + 1}</h4>
          {section.fields.map((field, i) => (
            <div key={i} className="form-field">
              <label>{field.label}</label>
              {field.type === "Single-Line" && (
                <input
                  type="text"
                  value={formValues[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
              {field.type === "Multi-Line" && (
                <textarea
                  value={formValues[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
              {field.type === "Number" && (
                <input
                  type="number"
                  value={formValues[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
              {field.type === "Picklist" && (
                <select
                  value={formValues[field.label] || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                >
                  {(Array.isArray(field.options)
                    ? field.options
                    : (field.options || "").split(",")
                  ).map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectFormView;
