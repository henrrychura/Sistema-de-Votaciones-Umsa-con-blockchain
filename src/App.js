import React, { useState } from "react";
import AdminPanel from "./components/AdminPanel";
import StudentPanel from "./components/StudentPanel";
import ResultPanel from "./components/ResultPanel";
import VerifyVotePanel from "./components/VerifyVotePanel";
import Home from "./components/Home";
import "./styles.css";

function App() {
  const [view, setView] = useState("home");
  const [studentRU, setStudentRU] = useState("");

  const handleAccess = (panel, ru = "") => {
    setView(panel);
    if (ru) setStudentRU(ru);
  };

  const handleLogout = () => {
    setView("home");
    setStudentRU("");
  };

  return (
    <div className="App">
      {/* 🎥 Video de fondo */}
      <video
        className="background-video"
        src="/p.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 🗳 Contenido principal */}
      <div className="overlay">
        <h1 style={{ fontSize: "3rem", textShadow: "0 0 10px #000" }}>
          Bienvenido al Sistema de Votación UMSA 🗳
        </h1>

        {view === "home" && <Home onAccess={handleAccess} />}
        {view === "admin" && <AdminPanel onLogout={handleLogout} />}
        {view === "student" && (
          <StudentPanel ru={studentRU} onLogout={handleLogout} />
        )}
        {view === "results" && <ResultPanel onLogout={handleLogout} />}
        {view === "verify" && <VerifyVotePanel onLogout={handleLogout} />}
      </div>
    </div>
  );
}

export default App;
