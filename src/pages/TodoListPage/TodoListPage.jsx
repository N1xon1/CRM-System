import AddTask from "../../components/AddTask/AddTask.jsx";
import Tasks from "../../components/Tasks/Tasks";
import TasksState from "../../components/TasksState/TasksState";
import { getTasks } from "../../api/api.js";
import { useEffect, useState } from "react";

export default function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [tasksInfo, setTasksInfo] = useState([]);
  const [taskFilter, setStateTask] = useState("all");
  // Функция получения и обновления задач с сервера
  const loadTasks = async (taskFilter) => {
    try {
      const tasks = await getTasks(taskFilter);
      setTasks(tasks.data); // Обновление списка задач
      setTasksInfo(tasks.info);
    } catch (error) {
      alert(error);
    }
  };
  const handleFilterChange = (isDoneValue) => {
    setStateTask(isDoneValue);
  };
  // Первоначальная загрузка задач при монтировании
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      {/* Компонент добавления новых задач */}
      <AddTask loadTasks={loadTasks} taskFilter={taskFilter} />
      <TasksState
        tasksInfo={tasksInfo}
        onFilterChange={handleFilterChange}
        loadTasks={loadTasks}
      />
      <main>
        {/* Основной компонент отображения задач */}
        <Tasks tasks={tasks} loadTasks={loadTasks} taskFilter={taskFilter} />
      </main>
    </>
  );
}
