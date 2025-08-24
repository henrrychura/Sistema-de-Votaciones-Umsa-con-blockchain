import { ethers } from "ethers";
import VotingABI from "./VotingABI.json";

const contractAddress = "0xfE545Aaa9c1D9b9DB334309F21283cAfB3bdD2E8"; 

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask no está instalado");
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(contractAddress, VotingABI, signer);
};
