import { useState, useEffect } from "react";
import { api } from "../services/api";
import { User } from "../types/User";

const JSONServeEx3 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const response = await api.get<User[]>("/users");
        setUsers(response.data);
      } catch (e) {
        setError("Error ao buscar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  });

  const handleCreate = async (): Promise<void> => {
    if (!name || !email) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await api.post<User>("/users", {
        name,
        email,
      });

      setUsers((prev) => [...prev, response.data]);

      setName("");
      setEmail("");
    } catch (e) {
      setError("Erro ao criar usuário");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>🟡 Exercício 2 — Criar usuário</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <button onClick={handleCreate} disabled={isSubmitting}>
        {isSubmitting ? "Criando..." : "Criar"}
      </button>

      <hr />

      <h3>Lista de Usuários</h3>

      {users.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JSONServeEx3;
