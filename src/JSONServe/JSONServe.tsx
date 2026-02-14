import { useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types/User";

//🟢GET - Buscar usuários
//GET /users
//GET /users/1

//🔵 POST — Criar usuário
//POST /users

//🟡 PUT — Atualizar usuário
//PUT /users/1

//🔴 DELETE — Remover usuário
//DELETE /users/1

//💻 Consumindo no React + TypeScript

//🟢 GET exemplo
const [users, setUsers] = useState<User[]>([]);

useEffect(() => {
  const fetchUsers = async () => {
    const response = await api.get("");
    setUsers(response.data);
  };
}, []);

//🔵 POST exemplo
const createUser = async () => {
  await api.post("/users", {
    name: "Novo",
    email: "novo@email.com",
  });
};

//🟡 PUT exemplo
const updateUser = async (id: number) => {
  await api.put(`/users/${id}`, {
    id,
    name: "Atualizado",
    email: "atualizado@email.com",
  });
};

//🔴 DELETE exemplo
const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`);
};

const JSONServe = () => {
  return <div></div>;
};

export default JSONServe;
