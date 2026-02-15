import { useState, useEffect } from "react";
import { Task } from "../types/User";
import { apiDB } from "../services/api";

const JSONServerEx5 = () => {
  const [tasks, setTaks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaks = async (): Promise<void> => {
      try {
        setLoading(true);

        const response = await apiDB.get<Task[]>("/tasks?userId=1");
        setTaks(response.data);
      } catch (e) {
        setError("Erro ao buscar taks");
      } finally {
        setLoading(false);
      }
    };

    fetchTaks();
  }, []);

  if (tasks.length === 0) return <p>Nenhuma tastk encontrada...</p>;
  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>🟢 Exercício 1 — Listar tarefas por usuário</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {""}
            <strong>{task.completed ? "Concluido" : "Pendente"}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JSONServerEx5;
