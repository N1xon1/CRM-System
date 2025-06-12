import { TodoInfo, TaskStatus, Todo, MetaResponse } from "@/models/todo";
import axios, { AxiosError} from "axios";

// Конфигурация API
const configApi = axios.create({
  baseURL: "https://easydev.club/api/v1", // Базовый URL API
  headers: {
    "Content-Type": "application/json", // Заголовки запросов
  },
  transformRequest: [(data) => JSON.stringify(data)],
});
//Обработчики ошибок
configApi.interceptors.response.use(
  (res) => {
    console.log(res.status, "int res");
    return res;
  },
  (err) => console.log(err)
);
configApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => console.log(err)
);

// Функция получения списка задач
export const getTasks = async (
  taskFilter: TaskStatus
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const res = await configApi.get<MetaResponse<Todo, TodoInfo>>(
      `/todos?filter=${taskFilter}`
    );
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
};

// Функция создания новой задачи
export const postTask = async (taskData: {
  title: string;
}): Promise<Todo> => {
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
