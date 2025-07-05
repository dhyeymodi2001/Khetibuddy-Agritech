// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutEditor from "./views/LayoutEditor/LayoutEditor";
import ProjectFormView from "./views/ProjectFormView/ProjectFormView";
import { FormProvider } from "./context/FormContext";

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutEditor />} />
          <Route path="/view-layout" element={<ProjectFormView />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
