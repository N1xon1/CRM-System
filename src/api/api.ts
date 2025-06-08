import { TodoInfo, TaskStatus, Todo, MetaResponse } from "@/models/todo";

// Конфигурация API
const config = {
  baseUrl: "https://easydev.club/api/v1", // Базовый URL API
  headers: {
    "Content-Type": "application/json", // Заголовки запросов
  },
};

// Обработчик ответа от сервера
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error("Запрос не удался"); // Ошибка при неудачном запросе
  }
  return await res.json(); // Парсинг JSON при успешном ответе
}

// Функция получения списка задач
export async function getTasks(
  taskFilter: TaskStatus
): Promise<MetaResponse<Todo, TodoInfo> | undefined> {
  try {
    const res = await fetch(`${config.baseUrl}/todos?filter=${taskFilter}`, {
      headers: config.headers,
    });
    return await handleResponse<MetaResponse<Todo, TodoInfo>>(res);
  } catch (error) {
    console.error("Ошибка:", (error as Error).message); // Логирование ошибок
    return undefined;
  }
}

// Функция создания новой задачи
export async function postTask(taskData: {
  title: string;
}): Promise<Todo | undefined> {
  try {
    const res = await fetch(`${config.baseUrl}/todos`, {
      headers: config.headers,
      method: "POST",
      body: JSON.stringify(taskData),
    });
    return await handleResponse<Todo>(res);
  } catch (error) {
    console.error("Ошибка:", (error as Error).message);
    return undefined;
  }
}

// Функция удаления задачи
export async function deleteTask(id: number): Promise<void> {
  try {
    await fetch(`${config.baseUrl}/todos/${id}`, {
      headers: config.headers,
      method: "DELETE",
    });
  } catch (error) {
    console.error("Ошибка:", (error as Error).message);
  }
}

// Функция редактирования задачи
export async function updateTask(
  id: number,
  taskData: { title?: string; isDone?: boolean }
): Promise<Todo | undefined> {
  try {
    const res = await fetch(`${config.baseUrl}/todos/${id}`, {
      headers: config.headers,
      method: "PUT",
      body: JSON.stringify(taskData),
    });
    return await handleResponse<Todo>(res);
  } catch (error) {
    console.error("Ошибка", (error as Error).message);
    return undefined;
  }
}
