import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleButton = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(inputValue);
  };

  return (
    <div className="container">
      <h1>Criar uma Nota Compartilhada Temporaria</h1>
      <h3>Escolha um id para criar ou entrar em uma nota</h3>
      <textarea
        className="url-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="button" onClick={handleButton}>
        Criar ou Entrar
      </button>
    </div>
  );
};

export default Home;
