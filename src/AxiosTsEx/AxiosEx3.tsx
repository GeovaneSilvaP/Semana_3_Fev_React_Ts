import { useState, useEffect } from "react";
import { api } from "../services/api";
import { User } from "../types/User";

const AxiosEx3 = () => {
  const [users, setUsers] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fecthUsers = async (id: number): Promise<void> => {
    try {
      const response = await api.get<User>(`/users/${id}`);
      setUsers(response.data);
    } catch (e:unknown) {
      setError("Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthUsers(5);
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!users) return <p>Usuário não encontrado</p>;

  return (
    <div>
      <h2>🟡 Exercício 3 — GET por ID (entrevista)</h2>
      <p>
        <strong>Nome:</strong> {users.name}
      </p>
      <p>
        <strong>Email:</strong> {users.email}
      </p>
    </div>
  );
};

export default AxiosEx3;
