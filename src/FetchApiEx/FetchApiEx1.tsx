type Post = {
  id: number;
  title: string;
  body: string;
};

const getPost = async (): Promise<Post[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Erro ao buscar posts");
    }

    const data: Post[] = await response.json();

    return data.slice(0,5);
  } catch (e) {
    console.error("Falhou", e);
    throw e;
  }
};

const FetchApiEx1 = () => {
  getPost().then((post) => {
    console.log(post);
  });
  return (
    <div>
      <h2>🟢 Exercício 1 — Fetch simples tipado (fundação)</h2>
    </div>
  );
};

export default FetchApiEx1;
