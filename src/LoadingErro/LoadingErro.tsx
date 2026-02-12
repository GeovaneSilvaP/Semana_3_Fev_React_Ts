import React, { useState } from "react";

//1️⃣ Conceito Base (Muito Importante)
//toda requisição tem 3 estados:
//1️⃣ Carregando (loading)
//2️⃣ Sucesso (data)
//3️⃣ Erro (error)
const [data, setData] = useState<string>("");
const [isLoading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

try {
  setData("Teste erro");
} catch (error) {
  setError(null);
} finally {
  setLoading(false);
}

const LoadingErro = () => {
  return (
    <div>
      <h2>🔴 Estados de Loading e Error (OBRIGATÓRIO)</h2>
    </div>
  );
};

export default LoadingErro;
