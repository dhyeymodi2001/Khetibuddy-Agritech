// src/context/FormContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem("layout");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("layout", JSON.stringify(sections));
  }, [sections]);

  return (
    <FormContext.Provider value={{ sections, setSections }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
