import styles from "./TasksState.module.scss";
import { useEffect, useState } from "react";
import { TodoInfo, TaskStatus, LoadTask } from "@/models/todo";
import { Button, Menu } from "antd";

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

  function handleClick(state: TaskStatus) {
    setCurrentFilter(state);
    loadTasks(state);
  }

  return (
    <>
      <Menu className={styles.tasks__state}
      style={{ width:'100%', gap:0, textAlign:'center', border: '2px solid white', background:"rgb(245, 245, 245)", borderRadius:70}}
      defaultSelectedKeys={["all"]}
      onClick={(e) => {
            handleClick(e.key as TaskStatus);
          }}
      items={[
            {key: 'all',
            label: 'Все'},
            {key: 'inWork',
            label: 'В работе'},
            {key: 'completed',
            label: 'Сделано'},

      ]}>
      </Menu>
    </>
  );
}

