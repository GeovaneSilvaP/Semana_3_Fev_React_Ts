import React, { useState } from "react";
//📅 SEMANA 3 — DIA 3 - Tipagem de Respostas da API (ESSENCIAL)

//1️⃣ Tipando dados da API
type User = {
  id: number;
  name: string;
  email: string;
};

const simulandoApi: User = {
  id: 1,
  name: "Geovane",
  email: "geogmail.com",
};

const TipagemApi = () => {
  //2️⃣ Tipando o useState corretamente
  const [user, setUser] = useState<User | null>(null);

  //3️⃣ Tipando loading e error
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //4️⃣ Tipando função async
  const getUser = async (): Promise<User> => {
    const response = await fetch("url");
    const data: User = await response.json();
    return data;
  };
  return <div></div>;
};

export default TipagemApi;
