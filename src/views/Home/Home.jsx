// src/views/Home/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [formName, setFormName] = useState("");
  const navigate = useNavigate();

  const handleCreateForm = () => {
    if (!formName.trim()) {
      alert("Please enter a form name.");
      return;
    }
    navigate(`/editor?name=${encodeURIComponent(formName.trim())}`);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Kheti Buddy Form Builder!</h1>
      <input
        type="text"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        placeholder="Enter Form Name"
        className="form-name-input"
      />
      <button className="create-form-btn" onClick={handleCreateForm}>
        Create Form
      </button>
    </div>
  );
};

export default Home;
