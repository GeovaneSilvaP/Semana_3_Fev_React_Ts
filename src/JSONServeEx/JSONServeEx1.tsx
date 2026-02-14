import { useEffect, useState } from "react";
import { User } from "../types/User";
import { api } from "../services/api";

const JSONServeEx1 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApi = async (): Promise<void> => {
      try {
        setLoading(true);

        const response = await api.get<User[]>("/users");
        setUsers(response.data);
      } catch (e) {
        setError("Erro ao buscar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (users.length === 0) return <p></p>;
  return (
    <div>
      <h2>🟢 Exercício 1 — Listagem Completa (Nível Mercado)</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Nome: </strong>
            {user.name} - <strong>Email: </strong>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JSONServeEx1;
