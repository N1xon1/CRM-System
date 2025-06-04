import styles from "./TasksState.module.scss";
import { useEffect, useState } from "react";
import { TodoInfo, taskStatus, LoadTask } from "@/models/todo";

type TasksStateProps = {
  tasksInfo: TodoInfo;
  onFilterChange: (isDoneValue: taskStatus) => void;
  loadTasks: LoadTask;
};

export default function TasksState({
  tasksInfo,
  onFilterChange,
  loadTasks,
}: TasksStateProps) {
  // Состояние для фильтрации задач (все/в работе/выполненные)
  const [currentFilter, setCurrentFilter] = useState<taskStatus>("all");
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
            setCurrentFilter("all");
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
            setCurrentFilter("inWork");
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
            setCurrentFilter("completed");
            loadTasks("completed");
          }}
        >
          Сделано ({countCompletedTask})
        </button>
      </div>
    </>
  );
}
