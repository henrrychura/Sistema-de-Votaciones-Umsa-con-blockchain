import React, { useState } from "react";
import { getContract } from "../contracts/getContract";

export default function ResultPanel({ onLogout }) {
  const [candidates, setCandidates] = useState([]);

  const loadCandidates = async () => {
    try {
      const contract = await getContract();
      const count = await contract.getCandidateCount();
      let list = [];
      for (let i = 0; i < count; i++) {
        const [name, votes] = await contract.getCandidate(i);
        list.push({ name, votes: parseInt(votes.toString()) });
      }
      setCandidates(list);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="overlay">
      <div className="access-section">
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", textShadow: "0 0 5px #00ffff" }}>
          Resultados
        </h2>

        <button onClick={loadCandidates}>Cargar Resultados</button>

        <div style={{ marginTop: "2rem" }}>
          {candidates.map((c, i) => (
            <div key={i} style={{ marginBottom: "1rem", textAlign: "left" }}>
              <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>
                {c.name} - {c.votes} votos
              </div>
              <div
                style={{
                  height: "20px",
                  backgroundColor: "#00bfff",
                  width: `${Math.min(c.votes * 10, 100)}%`,
                  borderRadius: "6px",
                  transition: "width 0.5s ease"
                }}
              />
            </div>
          ))}
        </div>

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
