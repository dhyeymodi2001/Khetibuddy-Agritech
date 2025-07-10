import { Droppable, Draggable } from "@hello-pangea/dnd";
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
    <Droppable droppableId="sections" type="SECTION">
      {(provided) => (
        <div
          className="canvas"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {Array.isArray(sections) &&
            sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className="draggable-section"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div {...provided.dragHandleProps}>
                      {/* You can move only the drag handle inside the section-header if you want */}
                      <Section
                        section={section}
                        sectionIndex={index}
                        onFieldClick={onFieldClick}
                        onSectionTitleChange={onSectionTitleChange}
                        onDeleteSection={onDeleteSection}
                        onDeleteField={onDeleteField}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FormCanvas;
