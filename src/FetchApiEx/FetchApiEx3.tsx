type Post = {
  id: number;
  title: string;
  body: string;
};

const FetchApiEx3 = () => {
  const getPostById = async (): Promise<Post> => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/invalid-url");

      if (!response.ok) {
        throw new Error("Erro na requisição, url invalida");
      }

      const data: Post = await response.json();
      return data;
    } catch (error) {
      console.error("Erro", error);
      throw error;
    }
  };

  getPostById()
    .then((post) => {
      console.log(post);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      <h2>🟡 Exercício 3 — Tratamento de erro real</h2>
    </div>
  )
}

export default FetchApiEx3