import { useState, useEffect } from "react";
import { api } from "../services/api";
import { User } from "../types/User";

const AxiosEx2 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fecthUsers = async (): Promise<void> => {
      try {
        const response = await api.get<User[]>("/users");
        setUsers(response.data.slice(0, 3));
      } catch (e) {
        setError("Erro ao buscar usuários");
      } finally {
        setLoading(false);
      }
    };

    fecthUsers();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>🟡 Exercício 2 — Loading + Error (mercado)</h2>
      {users.length === 0 ? (
        <p>Nenhum usuário encontrado</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              Nome: {user.name} - Email: {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AxiosEx2;
