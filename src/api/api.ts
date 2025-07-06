import {
  TodoInfo,
  TaskStatus,
  Todo,
  MetaResponse,
  UserRegistration,
  RefreshToken,
  ProfileRequest,
  PasswordRequest,
} from "@/models/todo";
import axios, { AxiosError } from "axios";

// Конфигурация API
const configApi = axios.create({
  baseURL: "https://easydev.club/api/v1", // Базовый URL API
  headers: {
    "Content-Type": "application/json", // Заголовки запросов
  },
});
//Обработчики ошибок
configApi.interceptors.response.use((res) => {
  return res;
});
// Функция получения списка задач
export const getTasks = async (
  taskFilter: TaskStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const res = await configApi.get<MetaResponse<Todo, TodoInfo>>(`/todos`, {
      params: { filter: taskFilter },
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
};

// Функция создания новой задачи
export const postTask = async (taskData: { title: string }): Promise<Todo> => {
  try {
    const res = await configApi.post<Todo>("/todos", taskData);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
};

// Функция удаления задачи
export async function deleteTask(id: number): Promise<void> {
  try {
    await configApi.delete(`/todos/${id}`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

// Функция редактирования задачи
export async function updateTask(
  id: number,
  taskData: { title?: string; isDone?: boolean }
): Promise<Todo> {
  try {
    const res = await configApi.put(`/todos/${id}`, taskData);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}
///// Регистрация и авторизация

// Авторизация пользователя
export async function loginUser(userData: { login: string; password: string }) {
  try {
    const res = await configApi.post(`/auth/signin`, userData);
    return res.data;
  } catch (error: any) {
    const axiosError = error as AxiosError;
    console.error("Данные ошибки:", error.response.data);
    console.error("Ошибка:", axiosError.message);
    if (axiosError.response?.status === 401) {
      throw new Error("Вы ввели неверный логин или пароль");
    }
    throw new AxiosError("Запрос не удался");
  }
}

// Регистрация пользователя
export async function registerUser(userData: UserRegistration) {
  try {
    const res = await configApi.post(`/auth/signup`, userData);
    return res.data;
  } catch (error: any) {
    console.error("Данные ошибки:", error.response.data);
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    if (axiosError.response?.status === 409) {
      throw new Error(
        "Пользователь с такими данными уже существует. ЛОГИН И ПОЧТА ДОЛЖНЫ БЫТЬ УНИКАЛЬНЫМИ"
      );
    }
    throw new AxiosError("Запрос не удался");
  }
}

// Обновления токена доступа пользователя
export async function refreshAccessToken(refreshToken:RefreshToken) {
  try {
    const res = await configApi.post(`/auth/signin`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

// Получить профиль пользователя  
export async function getUserProfile() {
  try {
    const res = await configApi.get(`/user/profile`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

// Обновить профиль пользователь  
export async function updateUserProfile(userData:ProfileRequest) {
  try {
    const res = await configApi.put(`/user/profile`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

// Изменение пароля
export async function updateUserPassword(password:PasswordRequest) {
  try {
    const res = await configApi.post(`/user/profile/reset-password`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

// Выход пользователя из приложения 
export async function logoutUser() {
  try {
    const res = await configApi.post(`/user/logout`);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}