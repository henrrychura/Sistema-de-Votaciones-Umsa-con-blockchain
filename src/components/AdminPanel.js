import React, { useState } from "react";
import { getContract } from "../contracts/getContract";

export default function AdminPanel({ onLogout }) {
  const [name, setName] = useState("");
  const [ru, setRu] = useState("");

  const registerCandidate = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.registerCandidate(name);
      await tx.wait();
      alert("Candidato registrado!");
      setName("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const registerStudent = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.registerStudent(ru);
      await tx.wait();
      alert("Estudiante registrado!");
      setRu("");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="overlay">
      <div className="access-section">
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", textShadow: "0 0 5px #000" }}>
          Panel de Administración
        </h2>

        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Registrar candidato</h3>
        <input
          type="text"
          placeholder="Nombre candidato"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={registerCandidate}>Registrar candidato</button>

        <h3 style={{ fontSize: "1.2rem", marginTop: "2rem", marginBottom: "0.5rem" }}>
          Registrar estudiante
        </h3>
        <input
          type="text"
          placeholder="RU del estudiante"
          value={ru}
          onChange={(e) => setRu(e.target.value)}
        />
        <button onClick={registerStudent}>Registrar estudiante</button>

        <button
          onClick={onLogout}
          style={{
            marginTop: "2rem",
            backgroundColor: "#e74c3c",
            color: "white",
            borderRadius: "6px",
            padding: "12px 24px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            width: "100%"
          }}
        >
          Salir
        </button>
      </div>
    </div>
  );
}
