import { useState, useEffect } from "react";
import { api } from "../services/api";
import { User } from "../types/User";

const JSONServeEx2 = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        setLoading(true);

        const response = await api.get<User[]>("/users");
        setUsers(response.data);
      } catch (e) {
        setError("Error ao buscar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdate = async (): Promise<void> => {
    if (!editingUser) return;

    try {
      await api.put(`/users/${editingUser.id}`, {
        id: editingUser.id,
        name,
        email,
      });

      setEditingUser(null);
      setName("");
      setEmail("");
    } catch (e) {
      setError("Erro ao atuaçizar usuário");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>🟠 Exercício 3 — Editar usuário</h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Editar</button>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div>
          <h3>Editando usuário</h3>

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

          <button onClick={handleUpdate}>Salvar</button>
        </div>
      )}
    </div>
  );
};

export default JSONServeEx2;
