import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Web3 from "web3";
import VotingABI from "../contracts/VotingABI.json";

const VerifyVotePanel = ({ onLogout }) => {
  const [ru, setRu] = useState("");
  const [status, setStatus] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const contractAddress = "0xfE545Aaa9c1D9b9DB334309F21283cAfB3bdD2E8";
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(VotingABI, contractAddress);

  const handleVerify = async () => {
    try {
      const result = await contract.methods.yaVoto(ru).call();
      setStatus(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overlay" style={{ paddingTop: "20vh" }}>
      <div className="access-section">
        <h2 style={{ fontSize: "2.2rem", marginBottom: "1.5rem", textShadow: "0 0 6px #00ffff" }}>
          🔎 Verificar Voto
        </h2>

        <input
          type="text"
          placeholder="Ingrese su ID"
          value={ru}
          onChange={(e) => setRu(e.target.value)}
        />

        <button onClick={handleVerify}>Verificar Voto</button>
        <button className="btn-salir" onClick={onLogout}>Salir</button>

        {status !== null && (
          <div style={{ marginTop: "2rem", backgroundColor: "rgba(255,255,255,0.1)", padding: "1rem", borderRadius: "8px" }}>
            {status ? (
              <>
                <p style={{ color: "#2ecc71", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "1rem" }}>
                  ✅ Este ID ya votó
                </p>
                <button onClick={() => setShowReceipt(true)}>Imprimir comprobante</button>
              </>
            ) : (
              <p style={{ color: "#e74c3c", fontWeight: "bold", fontSize: "1.2rem" }}>
                ❌ Este ID no votó aún
              </p>
            )}
          </div>
        )}

        {showReceipt && (
          <div style={{ marginTop: "2rem", backgroundColor: "rgba(255,255,255,0.1)", padding: "1rem", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "bold", marginBottom: "0.5rem" }}>🧾 Comprobante de Voto</h3>
            <p><strong>ID:</strong> {ru}</p>
            <p><strong>Fecha:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Hash:</strong> 0x123abc... (ejemplo)</p>
            <div style={{ marginTop: "1rem" }}>
              <QRCodeCanvas value={`ID:${ru}, Votó: Sí`} size={128} includeMargin={true} />
            </div>
            <p style={{ fontSize: "0.9rem", color: "#ccc", marginTop: "0.5rem" }}>*Este es un ejemplo de impresión*</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyVotePanel;
