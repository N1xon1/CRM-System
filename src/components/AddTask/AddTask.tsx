import { postTask } from "@/api/api.js";
import styles from "./AddTask.module.scss";
import { useState } from "react";
import { taskStatus, LoadTask, Todo } from "@/models/todo";

type AddTaskProps = {
  loadTasks: LoadTask;
  taskFilter: taskStatus;
};

export default function AddTask({ loadTasks, taskFilter }: AddTaskProps) {
  // Хранит текст новой задачи
  const [taskTitle, setTaskTitle] = useState<string>("");
  // валидация
  const [formValid, setFormValid] = useState<boolean>(true);
  const [nameTaskDirty, setNameTaskDirty] = useState<boolean>(false);
  const [nameTaskError, setNameTaskError] = useState<string>(
    "Название задачи не может быть пустым"
  );

  // Отправка новой задачи на сервер
  async function handleSubmit(e: React.FormEvent):Promise<Todo | undefined> {
    try {
      e.preventDefault();
      await postTask({ title: taskTitle });
      setTaskTitle(""); // Очистка поля ввода
      loadTasks(taskFilter); // Обновление списка задач
      setNameTaskDirty(false); // Сброс валидации
      setFormValid(true);
    } catch (error) {
      alert(error);
      return undefined;
    }
  }
  // Валидация при потери фокуса на input
  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setNameTaskDirty(true);
      setFormValid(true);
    }
  };

  // валидация поля ввода при изменение данных
  const nameTaskHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 2 || e.target.value.length > 64) {
      setNameTaskDirty(true);
      setFormValid(true);
      setNameTaskError("Название задачи должно быть от 2 до 64 символов");
      if (!e.target.value) {
        setNameTaskError("Название задачи не может быть пустым");
      }
    } else {
      setNameTaskError("");
      setNameTaskDirty(false);
      setFormValid(false);
    }
  };

  return (
    <header>
      {/* Форма добавления задачи */}
      <form onSubmit={handleSubmit} noValidate>
        <input
          onBlur={blurHandler}
          className={styles.task_name}
          onChange={(e) => {
            setTaskTitle(e.target.value);
            nameTaskHandler(e);
          }}
          value={taskTitle}
          id="name"
          placeholder="Task To Be Done..."
          required
        />

        <button
          disabled={formValid}
          className={styles.button_add}
          type="submit"
        >
          Add
        </button>
      </form>
      {nameTaskDirty && nameTaskError && (
        <div style={{ display: "flex", color: "red", marginTop: "10px" }}>
          {nameTaskError}
        </div>
      )}
    </header>
  );
}
