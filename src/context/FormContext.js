// src/context/FormContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem("layout");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed.sections) ? parsed.sections : [];
      } catch (error) {
        console.error("Error parsing layout in FormProvider:", error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    console.log("Saving sections to localStorage", sections);
    localStorage.setItem("layout", JSON.stringify(sections));
  }, [sections]);

  return (
    <FormContext.Provider value={{ sections, setSections }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
