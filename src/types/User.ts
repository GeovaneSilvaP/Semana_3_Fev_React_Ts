export type User = {
  id: number;
  name: string;
  email: string;
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type Task = {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
};
