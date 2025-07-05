import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import "./FieldToolbox.css";

const fields = [
  { type: "Single-Line", label: "Single-Line" },
  { type: "Multi-Line", label: "Multi-Line" },
  { type: "Picklist", label: "Picklist" },
  { type: "Number", label: "Number" },
];

const FieldToolbox = ({ onAddSection }) => {
  return (
    <div className="toolbox">
      <h4>New Fields</h4>

      <Droppable droppableId="TOOLBOX" isDropDisabled={true}>
        {(provided) => (
          <div
            className="toolbox-items"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {fields.map((field, index) => (
              <Draggable
                key={field.type}
                draggableId={field.type}
                index={index}
              >
                {(provided) => (
                  <div
                    className="toolbox-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {field.label}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <button className="section-btn" onClick={onAddSection}>
        + Add Section
      </button>
    </div>
  );
};

export default FieldToolbox;
