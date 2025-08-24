import React, { useState } from "react";
import { getContract } from "../contracts/getContract";

export default function Home({ onAccess }) {
  const [adminPass, setAdminPass] = useState("");
  const [studentRU, setStudentRU] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = () => {
    if (adminPass === "umsa2025") {
      onAccess("admin");
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const handleStudentLogin = async () => {
    const ruLimpio = studentRU.trim();
    if (ruLimpio === "") {
      setError("Ingresa tu RU");
      return;
    }

    try {
      const contract = await getContract();
      const registrado = await contract.estaRegistrado(ruLimpio); 

      if (registrado) {
        onAccess("student", ruLimpio);
      } else {
        setError("Este RU no está registrado.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al verificar RU: " + err.message);
    }
  };

  return (
    <div className="home-container">

      <div className="access-section">
        <h2>Administrador</h2>
        <input
          type="password"
          placeholder="Contraseña"
          value={adminPass}
          onChange={(e) => setAdminPass(e.target.value)}
        />
        <button onClick={handleAdminLogin}>Entrar como Admin</button>
      </div>

   
      <div className="access-section">
        <h2>Estudiante</h2>
        <input
          type="text"
          placeholder="RU"
          value={studentRU}
          onChange={(e) => setStudentRU(e.target.value)}
        />
        <button onClick={handleStudentLogin}>Entrar como Estudiante</button>
      </div>


      <div className="access-section">
        <h2>Resultados</h2>
        <button onClick={() => onAccess("results")}>Ver Resultados</button>
      </div>

      {/* 🔹 Nuevo botón Verificar Voto */}
      <div className="access-section">
        <h2>Verificación</h2>
        <button onClick={() => onAccess("verify")}>Verificar Voto</button>
      </div>

  
      {error && <p className="error">{error}</p>}
    </div>
  );
}
