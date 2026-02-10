//📘 Dia 2 — Axios + TypeScript (padrão de mercado)
import axios from "axios";

//1️⃣ axios.get<T>()
type User = {
  id: number;
  name: string;
};

axios.get<User[]>("/users");

//2️⃣ axios.post<T>()
function newUser(): void {}

axios.post<User>("/users", newUser);

//3️⃣ axios.create (instância)
const api = axios.create({
  baseURL: "http://localhost:3000",
});

//4️⃣ Tipagem do data
const testeApi = async () => {
  const response = await api.get<User[]>("/users");
};

const AxiosTs = () => {
  return <div></div>;
};

export default AxiosTs;
