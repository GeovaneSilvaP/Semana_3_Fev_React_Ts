import { useState, useEffect } from "react";
import { api } from "../services/api";
import { User } from "../types/User";

const JSONServeEx4 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  //GET (Buscar usuários)
  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        setIsFetching(true);

        const response = await api.get<User[]>("/users");
        setUsers(response.data);
      } catch (e) {
        setError("Erro ao buscar usuários");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUser();
  }, []);

  //POST (Criar usuário)
  const handleCreate = async (): Promise<void> => {
    if (!name || !email) return alert("Preencha todos os campos");

    try {
      setIsCreating(true);

      const response = await api.post<User>("/users", {
        name,
        email,
      });

      setUsers((prev) => [...prev, response.data]);
      setName("");
      setEmail("");
    } catch (error) {
      setError("Erro ao criar usuário");
    } finally {
      setIsCreating(false);
    }
  };

  //PUT (Atualizar)
  const handleUpdate = async (id: number): Promise<void> => {
    try {
      setIsUpdating(id);
      await api.put<User>(`/users/${id}`, {
        name,
        email,
      });

      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, name, email } : user)),
      );
    } catch (e) {
      setError("Erro ao atualizar");
    } finally {
      setIsUpdating(null);
    }
  };

  //DELETE (Profissional)
  const handleDelete = async (id: number): Promise<void> => {
    try {
      setIsDeleting(id);

      await api.delete<User>(`/users/${id}`);

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (e) {
      setError("Erro ao deletar");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧠 EXERCÍCIO 5 — Loading por ação (nível pleno)</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error} <button onClick={() => setError(null)}>x</button>
        </p>
      )}

      {isFetching && <p>Carregando usuários...</p>}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome..."
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
        />

        <button onClick={handleCreate} disabled={isCreating}>
          {isCreating ? "Criando" : "Criar"}
        </button>
      </div>

      <hr />

      {isFetching ? (
        <p>Carregando lista...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>Nome: </strong>
              {user.name} - <strong>Email: </strong>
              {user.email}
              <br />
              <button
                onClick={() => handleUpdate(user.id)}
                disabled={isUpdating === user.id}
              >
                {isUpdating === user.id
                  ? "Salvando..."
                  : "Atualizar com dados do form"}
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                disabled={isDeleting === user.id}
                style={{ marginLeft: "10px" }}
              >
                {isDeleting === user.id ? "Removendo..." : "Remover"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {!isFetching && users.length === 0 && <p>Nenhum usuário encontrado.</p>}
    </div>
  );
};

export default JSONServeEx4;
