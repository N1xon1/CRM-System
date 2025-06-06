import { postTask } from "@/api/api.js";
import styles from "./AddTask.module.scss";
import { useState } from "react";
import { TaskStatus, LoadTask, Todo } from "@/models/todo";

type AddTaskProps = {
  loadTasks: LoadTask;
  taskFilter: TaskStatus;
};

export default function AddTask({ loadTasks, taskFilter }: AddTaskProps) {
  // Хранит текст новой задачи
  const [taskTitle, setTaskTitle] = useState<string>("");
  // валидация
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [nameTaskError, setNameTaskError] = useState<string>("");

  // Отправка новой задачи на сервер
  async function handleSubmit(e: React.FormEvent): Promise<Todo | undefined> {
    try {
      e.preventDefault();
      await postTask({ title: taskTitle });
      setTaskTitle(""); // Очистка поля ввода
      loadTasks(taskFilter); // Обновление списка задач
      setIsFormValid(true);
    } catch (error) {
      alert(error);
      return undefined;
    }
  }
  // Валидация при потери фокуса на input
  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsFormValid(true);
      setNameTaskError("Название задачи не может быть пустым");
    }
  };

  // валидация поля ввода при изменение данных
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 64) {
      setIsFormValid(true);
      setNameTaskError("Название задачи должно быть от 2 до 64 символов");
      if (!e.target.value) {
        setNameTaskError("Название задачи не может быть пустым");
      }
    } else {
      setNameTaskError("");
      setIsFormValid(false);
    }
  }

  return (
    <header>
      {/* Форма добавления задачи */}
      <form onSubmit={handleSubmit} noValidate>
        <input
          onBlur={blurHandler}
          className={styles.task_name}
          onChange={(e) => handleInputChange(e)}
          value={taskTitle}
          id="name"
          placeholder="Task To Be Done..."
          required
        />

        <button
          disabled={isFormValid}
          className={styles.button_add}
          type="submit"
        >
          Add
        </button>
      </form>
      {isFormValid && (
        <div style={{ display: "flex", color: "red", marginTop: "10px" }}>
          {nameTaskError}
        </div>
      )}
    </header>
  );
}
