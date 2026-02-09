import React from "react";

//Passo 1 — Criar o tipo (model do dado)
type Users = {
  id: number;
  name: string;
  email: string;
};

//Passo 2 — Fetch tipado com async/await
const fetchUsers = async (): Promise<Users[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("Erro ao buscar usuário");
  }

  const data: Users[] = await response.json();
  return data;
};

//Usando a função
fetchUsers()
  .then((users) => {
    users.forEach((user) => {
      console.log(user.name);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });

//🔄 Fetch com POST (envio de dados)
type NewUser = {
  name: string;
  email: string;
};

const createUser = async (user: NewUser): Promise<Users> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user)
  });

  return response.json()
};

const FetchApi = () => {
  return <div></div>;
};

export default FetchApi;
