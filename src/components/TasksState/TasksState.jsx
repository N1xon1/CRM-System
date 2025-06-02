import styles from "./TasksState.module.scss";
import { useEffect, useState } from "react";
export default function TasksState({ tasksInfo, onFilterChange, loadTasks }) {
  // Состояние для фильтрации задач (все/в работе/выполненные)
  const [currentFilter, setActiveButton] = useState("all");
  // Получение счетчиков задач из props
  const countAllTask = tasksInfo.all;
  const countCompletedTask = tasksInfo.completed;
  const countInWorkTask = tasksInfo.inWork;
  //Передача состояния isDone в родительский компонент
  useEffect(() => {
    onFilterChange(currentFilter);
  }, [currentFilter, onFilterChange]);

  return (
    <>
      {/* Блок активации кнопок */}
      <div className={styles.tasks__state}>
        <button
          className={`${styles.tasks__button} ${
            currentFilter === "all" ? styles["tasks__button--active"] : ""
          }`}
          onClick={() => {
            setActiveButton("all");
            loadTasks("all");
          }}
        >
          Все ({countAllTask})
        </button>
        <button
          className={`${styles.tasks__button} ${
            currentFilter === "inWork" ? styles["tasks__button--active"] : ""
          }`}
          onClick={() => {
            setActiveButton("inWork");
            loadTasks("inWork");
          }}
        >
          В работе ({countInWorkTask})
        </button>
        <button
          className={`${styles.tasks__button} ${
            currentFilter === "completed" ? styles["tasks__button--active"] : ""
          }`}
          onClick={() => {
            setActiveButton("completed");
            loadTasks("completed");
          }}
        >
          Сделано ({countCompletedTask})
        </button>
      </div>
    </>
  );
}
