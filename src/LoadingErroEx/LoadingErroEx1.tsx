import { useState, useEffect } from "react";
import { Post } from "../types/User";

const LoadingErroEx1 = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fecthApi = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar posts");
      }
      const data: Post[] = await response.json();
      setPosts(data.slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthApi();
  }, []);

  if (loading) return <p>Carregando...</p>;
  return (
    <div>
      <h2>🟢 Exercício 1 — Loading Simples</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default LoadingErroEx1;
