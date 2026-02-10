import { useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types/User";

const AxiosEx1 = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const response = await api.get<User[]>("/users");
        setUsers(response.data.slice(0, 5));
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h2>🟢 Exercício 1 — GET tipado (fundação)</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AxiosEx1;
