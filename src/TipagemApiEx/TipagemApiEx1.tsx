import { useState, useEffect } from "react";
import { User } from "../types/User";

const TipagemApiEx1 = () => {
  const [users, setUsers] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApi = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1",
        );
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        const data: User = await response.json();
        setUsers(data);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  return (
    <div>
      <h2>🟢 Exercício 1 — Fetch simples tipado</h2>

      {loading && <p>Carregando...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
      </div>
    </div>
  );
};

export default TipagemApiEx1;
