import React, { useState, useEffect } from "react";
import { getContract } from "../contracts/getContract";
import defaultImage from "../assets/candidato.png"; // 👈 pon aquí una imagen en /src/assets/

export default function StudentPanel({ ru, onLogout }) {
  const [candidates, setCandidates] = useState([]);

  // 🔹 Cargar candidatos al entrar
  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const contract = await getContract();
        const total = await contract.getCandidateCount();
        let temp = [];

        for (let i = 0; i < total; i++) {
          const candidate = await contract.getCandidate(i); 
         
          temp.push({ id: i, name: candidate[0] });
        }

        setCandidates(temp);
      } catch (err) {
        console.error("Error al cargar candidatos:", err);
      }
    };

    loadCandidates();
  }, []);

 
  const vote = async (id) => {
    try {
      const contract = await getContract();
      const tx = await contract.vote(id, ru.trim()); 
      await tx.wait();
      alert("✅ Voto registrado!");
    } catch (err) {
      alert("⚠️ Error: " + err.message);
    }
  };

  return (
    <div className="panel">
      <h2>Panel Estudiante</h2>
      <p>RU: {ru}</p>

      <div className="candidates-grid">
        {candidates.map((c) => (
          <div key={c.id} className="candidate-card">
            <img src={defaultImage} alt="Candidato" className="candidate-img" />
            <h3>{c.name}</h3>
            <button onClick={() => vote(c.id)}>Votar</button>
          </div>
        ))}
      </div>

      <hr />
      <button
        onClick={onLogout}
        style={{
          marginTop: "1rem",
          backgroundColor: "#e74c3c",
          color: "white",
          borderRadius: "5px",
          padding: "0.5rem 1rem",
          border: "none",
          cursor: "pointer"
        }}
      >
        Salir
      </button>
    </div>
  );
}
