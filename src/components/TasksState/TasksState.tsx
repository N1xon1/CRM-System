import styles from "./TasksState.module.scss";
import { useEffect, useState } from "react";
import { TodoInfo, TaskStatus, LoadTask } from "@/models/todo";
import { Button } from "antd";

type TasksStateProps = {
  tasksInfo: TodoInfo;
  onFilterChange: (isDoneValue: TaskStatus) => void;
  loadTasks: LoadTask;
};

export default function TasksState({
  tasksInfo,
  onFilterChange,
  loadTasks,
}: TasksStateProps) {
  // Состояние для фильтрации задач (все/в работе/выполненные)
  const [currentFilter, setCurrentFilter] = useState<TaskStatus>("all");
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
        <Button
          className={`${styles.tasks__Button} ${
            currentFilter === "all" ? styles["tasks__Button--active"] : ""
          }`}
          onClick={() => {
            setCurrentFilter("all");
            loadTasks("all");
          }}
        >
          Все ({countAllTask})
        </Button>
        <Button
          className={`${styles.tasks__Button} ${
            currentFilter === "inWork" ? styles["tasks__Button--active"] : ""
          }`}
          onClick={() => {
            setCurrentFilter("inWork");
            loadTasks("inWork");
          }}
        >
          В работе ({countInWorkTask})
        </Button>
        <Button
          className={`${styles.tasks__Button} ${
            currentFilter === "completed" ? styles["tasks__Button--active"] : ""
          }`}
          onClick={() => {
            setCurrentFilter("completed");
            loadTasks("completed");
          }}
        >
          Сделано ({countCompletedTask})
        </Button>
      </div>
    </>
  );
}
