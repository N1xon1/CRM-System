import AddTask from "@/components/AddTask/AddTask";
import Tasks from "@/components/Tasks/Tasks";
import TasksState from "@/components/TasksState/TasksState";
import { getTasks } from "@/api/api.js";
import { useEffect, useState } from "react";

import { TodoInfo, TaskStatus, Todo} from "@/models/todo";

export default function TodoListPage() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [tasksInfo, setTasksInfo] = useState<TodoInfo | undefined>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [taskFilter, setTaskFilter] = useState<TaskStatus>("all");
  // Функция получения и обновления задач с сервера
  const loadTasks = async (taskFilter: TaskStatus): Promise<void> => {
    try {
      const data = await getTasks(taskFilter);
      setTasks(data.data); // Обновление списка задач
      setTasksInfo(data.info);
    } catch (error) {
      alert(error);
    }
  };
  const handleFilterChange = (isDoneValue: TaskStatus) => {
    setTaskFilter(isDoneValue);
  };
  // Первоначальная загрузка задач при монтировании
  useEffect(() => {
    loadTasks(taskFilter);
    const interval = setInterval(()=>{loadTasks(taskFilter)}, 5000)

    return () => clearInterval(interval)

  }, [taskFilter]);

  return (
    <>
      {/* Компонент добавления новых задач */}
      <AddTask loadTasks={loadTasks} taskFilter={taskFilter} />
      {tasksInfo && (
        <TasksState
          tasksInfo={tasksInfo}
          onFilterChange={handleFilterChange}
          loadTasks={loadTasks}
        />
      )}
      <main>
        {/* Основной компонент отображения задач */}
        <Tasks tasks={tasks} loadTasks={loadTasks} taskFilter={taskFilter} />
      </main>
    </>
  );
}
