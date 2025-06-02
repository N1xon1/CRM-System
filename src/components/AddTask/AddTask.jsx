import { postTask } from "../../api/api.js";
import styles from "./AddTask.module.scss";
import { useState } from "react";

export default function AddTask({ loadTasks, taskFilter }) {
  // Хранит текст новой задачи
  const [taskTitle, setTaskTitle] = useState("");
  // валидация
  const [formValid, setFormValid] = useState(true);
  const [nameTaskDirty, setNameTaskDirty] = useState(false);
  const [nameTaskError, setNameTaskError] = useState("Название задачи не может быть пустым");

  // Отправка новой задачи на сервер
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      await postTask({ title: taskTitle });
      setTaskTitle(""); // Очистка поля ввода
      loadTasks(taskFilter); // Обновление списка задач
      setNameTaskDirty(false); // Сброс валидации
      setFormValid(true)
    } catch (error) {
      alert(error);
    }
  }
// Валидация при потери фокуса на input
  const blurHandler = (e) => {
    if (!e.target.value) {
      setNameTaskDirty(true);
      setFormValid(true)
    }
  };

  // валидация поля ввода при изменение данных
  const nameTaskHandler = (e) => {
    if (e.target.value.length < 2 || e.target.value.length > 64) {
      setNameTaskDirty(true);
      setFormValid(true)
      setNameTaskError("Название задачи должно быть от 2 до 64 сиволов");
      if (!e.target.value) {
        setNameTaskError("Название задачи не может быть пустым");
      }
    } else {
      setNameTaskError("");
      setNameTaskDirty(false);
      setFormValid(false)
    }
  };

  return (
    <header>
      {/* Форма добавления задачи */}
      <form onSubmit={handleSubmit} noValidate>
        <input
          onBlur={(e) => blurHandler(e)}
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
          // className={formValid ? styles.button_disabled : styles.button_add}
          className={styles.button_add}
          type="submit"
        >
          Add
        </button>
      </form>
      {nameTaskDirty && nameTaskError && (
        <div style={{ display: "flex", color: "red", marginTop: "10px"}}>
          {nameTaskError}
        </div>
      )}
    </header>
  );
}
