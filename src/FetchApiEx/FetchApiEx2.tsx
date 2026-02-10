type Post = {
  id: number;
  title: string;
  body: string;
};

const FetchApiEx2 = () => {
  const getPostById = async (id: number): Promise<Post> => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data: Post = await response.json();
      return data;
    } catch (error) {
      console.error("Erro", error);
      throw error;
    }
  };

  getPostById(1)
    .then((post) => {
      console.log(post.title);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      <h2>🟡 Exercício 2 — Buscar um único item</h2>
    </div>
  );
};

export default FetchApiEx2;
