import React, { useEffect, useState } from "react";
import "./ProjectFormView.css";

const ProjectFormView = () => {
  const [formValues, setFormValues] = useState({});
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("layout");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.sections && parsed.projectFields) {
          setLayout(parsed);
        }
      } catch (e) {
        console.error("Error parsing layout:", e);
      }
    }
  }, []);

  if (!layout) return <p>Loading layout...</p>;

  const { projectFields, sections } = layout;

  const handleChange = (fieldKey, value) => {
    setFormValues((prev) => ({ ...prev, [fieldKey]: value }));
  };

  return (
    <div className="form-view">
      <h2>{projectFields.projectName || "Project Form"}</h2>

      {/* Show all project fields */}
      <div className="project-card">
        <div className="form-grid">
          <div className="form-field">
            <label>Project Name</label>
            <input type="text" value={projectFields.projectName} disabled />
          </div>
          <div className="form-field">
            <label>Owner</label>
            <input type="text" value="Kheti Buddy" disabled />
          </div>

          {Object.entries(projectFields)
            .filter(([key]) => key !== "projectName" && key !== "owner")
            .map(([key, value]) => (
              <div key={key} className="form-field">
                <label>{key.replace(/([A-Z])/g, " $1")}</label>
                <input type="text" value={value || "-"} disabled />
              </div>
            ))}
        </div>
      </div>

      {/* Show all sections and fields */}
      {Array.isArray(sections) &&
        sections.map((section, idx) => (
          <div className="view-section" key={idx}>
            <h4>{section.title || `Section ${idx + 1}`}</h4>
            {section.fields.map((field, i) => (
              <div key={i} className="form-field">
                <label>
                  {field.label}
                  {field.required && <span style={{ color: "red" }}> *</span>}
                </label>

                {field.type === "Single-Line" && (
                  <input
                    type="text"
                    placeholder={field.placeholder || ""}
                    required={field.required}
                    value={formValues[field.label] || ""}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        [field.label]: e.target.value,
                      }))
                    }
                  />
                )}

                {field.type === "Multi-Line" && (
                  <textarea
                    placeholder={field.placeholder || ""}
                    required={field.required}
                    value={formValues[field.label] || ""}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        [field.label]: e.target.value,
                      }))
                    }
                  />
                )}

                {field.type === "Number" && (
                  <input
                    type="number"
                    placeholder={field.placeholder || ""}
                    required={field.required}
                    value={formValues[field.label] || ""}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        [field.label]: e.target.value,
                      }))
                    }
                  />
                )}

                {field.type === "Picklist" && (
                  <select
                    required={field.required}
                    value={formValues[field.label] || ""}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        [field.label]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select an option</option>
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
