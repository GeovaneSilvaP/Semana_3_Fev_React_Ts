import { useState, useEffect } from "react";
import { apiDB } from "../services/api";
import { Task } from "../types/User";

const JSONServeEx6 = () => {
  const [taks, setTaks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const userId = 1;

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        setIsFetching(true);
        const response = await apiDB.get<Task[]>(`/tasks?userId=${userId}`);
        setTaks(response.data);
      } catch (e) {
        setError("Erro ao buscar tasks");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUser();
  }, []);

  const handlePosts = async (): Promise<void> => {
    if (!title.trim()) {
      setError("Digite um titulo valido");
      return;
    }
    try {
      setIsCreating(true);

      const response = await apiDB.post<Task>("/tasks", {
        userId,
        title,
        completed: false,
      });

      setTaks((prev) => [...prev, response.data]);
      setTitle("");
    } catch (e) {
      setError("Erro ao criar titulo");
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <div>
      <h2>🟡 Exercício 2 — Criar Nova Tarefa</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Novo title"
      />

      <button onClick={handlePosts}>
        {isCreating ? "Criando..." : "Adicionar..."}
      </button>

      {isFetching && <p>Carregando tarefa...</p>}

      {taks.length === 0 && !isFetching ? (
        <p>Nemhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {taks.map((task) => (
            <li key={task.id}>
              {task.title} - {task.completed ? "Concluída" : "Pendente"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JSONServeEx6;
