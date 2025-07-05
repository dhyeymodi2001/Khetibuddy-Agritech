// src/views/LayoutEditor/LayoutEditor.jsx
import React, { useState } from "react";
import FieldToolbox from "../../components/FieldToolBox/FieldToolbox";
import FormCanvas from "../../components/FormCanvas/FormCanvas";
import "./LayoutEditor.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../../context/FormContext";
import FieldModal from "../../components/FieldModal/FieldModal";
import { DragDropContext } from "@hello-pangea/dnd";

const LayoutEditor = () => {
  const { sections, setSections } = useFormContext();
  const navigate = useNavigate();

  const [modalField, setModalField] = useState(null); // field to edit
  const [modalSectionId, setModalSectionId] = useState(null);
  const [modalFieldIndex, setModalFieldIndex] = useState(null);

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData("field", JSON.stringify(field));
  };

  const handleDeleteSection = (sectionId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this entire section and all its fields?"
      )
    ) {
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
    }
  };

  const handleDeleteField = (sectionId, fieldId) => {
    if (window.confirm("Are you sure you want to delete this field?")) {
      const updatedSections = sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.filter((field) => field.id !== fieldId),
          };
        }
        return section;
      });
      setSections(updatedSections);
    }
  };

  // Drop field into last section
  const handleDrop = (e) => {
    e.preventDefault();
    const field = JSON.parse(e.dataTransfer.getData("field"));
    if (sections.length === 0) return alert("Please add a section first!");
    const updatedSections = [...sections];
    updatedSections[updatedSections.length - 1].fields.push({
      ...field,
      id: uuidv4(),
      label: field.label,
    });
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections((prev) => [...prev, { id: uuidv4(), title: "", fields: [] }]);
  };

  const handleFieldChange = (sectionId, fieldIndex, updatedField) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const updatedFields = [...section.fields];
        updatedFields[fieldIndex] = updatedField;
        return { ...section, fields: updatedFields };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSectionTitleChange = (sectionId, newTitle) => {
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId ? { ...sec, title: newTitle } : sec
      )
    );
  };

  // Drag & Drop reorder fields inside a section
  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    // Drag from toolbox → section
    if (source.droppableId === "TOOLBOX") {
      const field = {
        id: uuidv4(),
        type: draggableId,
        label: draggableId,
      };

      const updatedSections = sections.map((sec) => {
        if (sec.id === destination.droppableId) {
          const newFields = [...sec.fields];
          newFields.splice(destination.index, 0, field);
          return { ...sec, fields: newFields };
        }
        return sec;
      });

      setSections(updatedSections);
      return;
    }

    // Reorder within same section
    if (source.droppableId === destination.droppableId) {
      const sectionIndex = sections.findIndex(
        (s) => s.id === source.droppableId
      );
      if (sectionIndex === -1) return;

      const updatedSections = [...sections];
      const fields = [...updatedSections[sectionIndex].fields];
      const [moved] = fields.splice(source.index, 1);
      fields.splice(destination.index, 0, moved);
      updatedSections[sectionIndex].fields = fields;
      setSections(updatedSections);
      return;
    }

    // Move between sections (optional)
  };

  const openFieldModal = (field, sectionId, fieldIndex) => {
    setModalField(field);
    setModalSectionId(sectionId);
    setModalFieldIndex(fieldIndex);
  };

  const closeModal = () => {
    setModalField(null);
    setModalSectionId(null);
    setModalFieldIndex(null);
  };

  const saveFieldModal = (updatedField) => {
    if (modalSectionId == null || modalFieldIndex == null) return;
    const updatedSections = sections.map((section) => {
      if (section.id === modalSectionId) {
        const newFields = [...section.fields];
        newFields[modalFieldIndex] = {
          ...newFields[modalFieldIndex],
          ...updatedField,
        };
        return { ...section, fields: newFields };
      }
      return section;
    });
    setSections(updatedSections);
    closeModal();
  };

  const handleSave = () => {
    localStorage.setItem("layout", JSON.stringify(sections));
    navigate("/view-layout");
  };

  return (
    <div className="layout-editor">
      <div className="canvas-area">
        {/* ✅ All drag-enabled children go inside this */}
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* ✅ Move FieldToolbox inside */}
          <FieldToolbox onAddSection={handleAddSection} />

          <FormCanvas
            sections={sections}
            onFieldClick={openFieldModal}
            onSectionTitleChange={handleSectionTitleChange}
            onDeleteSection={handleDeleteSection}
            onDeleteField={handleDeleteField}
          />
        </DragDropContext>

        <button className="save-btn" onClick={handleSave}>
          Save Layout
        </button>
      </div>

      {modalField && (
        <FieldModal
          field={modalField}
          onSave={saveFieldModal}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default LayoutEditor;
