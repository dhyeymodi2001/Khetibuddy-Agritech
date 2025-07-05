// src/components/FormCanvas/FormCanvas.jsx
import React from "react";
import Section from "../Section/Section";
import "./FormCanvas.css";

const FormCanvas = ({
  sections,
  onFieldClick,
  onSectionTitleChange,
  onDeleteSection,
  onDeleteField,
}) => {
  return (
    <div className="canvas">
      {sections.map((section, index) => (
        <Section
          key={section.id}
          section={section}
          sectionIndex={index}
          onFieldClick={onFieldClick}
          onSectionTitleChange={onSectionTitleChange}
          onDeleteSection={onDeleteSection}
          onDeleteField={onDeleteField}
        />
      ))}
    </div>
  );
};

export default FormCanvas;
