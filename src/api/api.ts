import {
  TodoInfo,
  TaskStatus,
  Todo,
  MetaResponse,
  UserRegistration,
  RefreshToken,
  ProfileRequest,
  PasswordRequest,
  Profile,
  Token,
} from "@/models/todo";
import { tokenService } from "@/services/authToken";
import { isAuthUser } from "@/store/slices/userSlice";
import { store } from "@/store/store";
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
export async function loginUser(userData: {
  login: string;
  password: string;
}): Promise<Token> {
  try {
    const res = await configApi.post(`/auth/signin`, userData);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    if (axiosError.response?.status === 401) {
      throw new Error("Вы ввели неверный логин или пароль");
    }
    throw new AxiosError("Запрос не удался");
  }
}

// Регистрация пользователя
export async function registerUser(
  userData: UserRegistration
): Promise<Profile> {
  try {
    const res = await configApi.post(`/auth/signup`, userData);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    if (axiosError.response?.status === 409) {
      throw new Error(
        "Пользователь с такими данными уже существует. ЛОГИН И ПОЧТА ДОЛЖНЫ БЫТЬ УНИКАЛЬНЫМИ. ЗАМЕНИТЕ ИХ"
      );
    }
    throw new AxiosError("Запрос не удался");
  }
}

// Обновления токена доступа пользователя
export async function refreshAccessToken(
  refreshToken: RefreshToken
): Promise<Token> {
  try {
    const res = await configApi.post(`/auth/refresh`, refreshToken);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

// Получить данные для профиля пользователя
export async function getUserProfile(): Promise<Profile> {
  try {
    const res = await configApi.get(`/user/profile`);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

// Обновить профиль пользователь
export async function updateUserProfile(
  userData: ProfileRequest
): Promise<void> {
  try {
    const res = await configApi.put(`/user/profile`, { userData });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

// Изменение пароля
export async function updateUserPassword(
  password: PasswordRequest
): Promise<void> {
  try {
    const res = await configApi.post(`/user/profile/reset-password`, {
      password,
    });
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

// Выход пользователя из приложения
export async function logoutUser(): Promise<void> {
  try {
    const res = await configApi.post(`/user/logout`);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Ошибка:", axiosError.message);
    throw new AxiosError("Запрос не удался");
  }
}

configApi.interceptors.request.use((config) => {
  if (!config.url?.endsWith("/auth/refresh")) {
    const token = tokenService.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

configApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refToken");

    if (
      originalRequest.url?.endsWith("/auth/signup") ||
      originalRequest.url?.endsWith("/auth/signin") ||
      originalRequest.url?.endsWith("/user/logout")
    ) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 &&
        originalRequest.url?.endsWith("/auth/refresh")) 
    ) {
      tokenService.clear();
      localStorage.removeItem("refToken");
      store.dispatch(isAuthUser(false));
      // window.location.href = "/";
    }

    if (!refreshToken) {
      tokenService.clear();
      store.dispatch(isAuthUser(false));
      // window.location.href = "/login";
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      !originalRequest._isRetry &&
      originalRequest
    ) {
      try {
        originalRequest._isRetry = true;
        const res: Token = await refreshAccessToken({ refreshToken });
        originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
        tokenService.set(res.accessToken);
        localStorage.setItem("refToken", res.refreshToken);
        store.dispatch(isAuthUser(true));
        console.log(store.getState().user.isAuth);
        return configApi(originalRequest);
      } catch (error) {
        console.log("Пользоваетль не авторизован", error);
        console.log(store.getState().user.isAuth);
        store.dispatch(isAuthUser(false));
        tokenService.clear();
      }
    }
    if (!store.getState().user.isAuth) {
      window.location.href = "/";
      return Promise.reject(error);
    }
  }
);
