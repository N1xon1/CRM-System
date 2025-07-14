interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

interface UserRegistration {
  login: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

interface AuthData {
  login: string;
  password: string;
}

interface RefreshToken {
  refreshToken: string;
}

interface Profile {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  // roles: Role[];
  phonenumber: string;
}

interface ProfileRequest {
  userName: string;
  email: string;
  phoneNumber: string;
}

interface PasswordRequest {
  password: string;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

// type Role = ADMIN | USER | MODERATOR

type TaskStatus = "all" | "inWork" | "completed";

type LoadTask = (taskFilter: TaskStatus) => Promise<void>;

export type {
  Todo,
  TodoRequest,
  TodoInfo,
  MetaResponse,
  UserRegistration,
  AuthData,
  RefreshToken,
  Profile,
  ProfileRequest,
  PasswordRequest,
  Token,
  TaskStatus,
  LoadTask,
};
