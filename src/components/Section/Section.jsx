// src/components/Section/Section.jsx
import React from "react";
import FieldItem from "../FieldItem/FieldItem";
import { Droppable, Draggable } from "@hello-pangea/dnd"; // updated import
import { FaTrash } from "react-icons/fa";
import "./Section.css";

const Section = ({
  section,
  sectionIndex,
  onFieldClick,
  onSectionTitleChange,
  onDeleteSection,
  onDeleteField,
}) => {
  return (
    <div className="section">
      <div className="section-header">
        <input
          type="text"
          className="section-title"
          placeholder={`Section ${sectionIndex + 1} Title`}
          value={section.title}
          onChange={(e) => onSectionTitleChange(section.id, e.target.value)}
        />
        <button
          className="delete-section-btn"
          title="Delete Section"
          onClick={() => onDeleteSection(section.id)}
        >
          <FaTrash />
        </button>
      </div>

      <Droppable droppableId={section.id}>
        {(provided) => (
          <div
            className="section-droppable"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {section.fields.map((field, idx) => (
              <Draggable key={field.id} draggableId={field.id} index={idx}>
                {(provided) => (
                  <div
                    className="draggable-field"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onFieldClick(field, section.id, idx)}
                  >
                    <FieldItem field={field} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Section;
