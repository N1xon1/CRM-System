// Конфигурация API
const config = {
  baseUrl: "https://easydev.club/api/v1", // Базовый URL API
  headers: {
    "Content-Type": "application/json", // Заголовки запросов
  },
};

// Обработчик ответа от сервера
async function handleResponse(res) {
  if (!res.ok) {
    throw new Error("Запрос не удался"); // Ошибка при неудачном запросе
  }
  return await res.json(); // Парсинг JSON при успешном ответе
}

// Функция получения списка задач
export async function getTasks(taskFilter) {
  try {
    const res = await fetch(`${config.baseUrl}/todos?filter=${taskFilter}`, {
      headers: config.headers,
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Ошибка:", error.message); // Логирование ошибок
  }
}

// Функция создания новой задачи
export async function postTask(taskData) {
  try {
    const res = await fetch(`${config.baseUrl}/todos`, {
      headers: config.headers,
      method: "POST",
      body: JSON.stringify(taskData),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

// Функция удаления задачи
export async function deleteTask(id) {
  try {
    await fetch(`${config.baseUrl}/todos/${id}`, {
      headers: config.headers,
      method: "DELETE",
    });
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

// Функция редактирования задачи
export async function updateTask(id, taskData) {
  try {
    const res = await fetch(`${config.baseUrl}/todos/${id}`, {
      headers: config.headers,
      method: "PUT",
      body: JSON.stringify(taskData),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error("Ошибка", error.message);
  }
}

// Тестовый вызов функции получения задач (для отладки)
// const q = await getTasks();
// console.log(q);
