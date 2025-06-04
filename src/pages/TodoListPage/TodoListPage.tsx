import AddTask from "@/components/AddTask/AddTask";
import Tasks from "@/components/Tasks/Tasks";
import TasksState from "@/components/TasksState/TasksState";
import { getTasks } from "@/api/api.js";
import { useEffect, useState } from "react";
import { TodoInfo, taskStatus, Todo, MetaResponse, LoadTask } from "@/models/todo";

export default function TodoListPage() {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [tasksInfo, setTasksInfo] = useState<TodoInfo | undefined>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [taskFilter, setTaskFilter] = useState<taskStatus>("all");
  // Функция получения и обновления задач с сервера
  const loadTasks = async <Todo, TodoInfo>(
    taskFilter: taskStatus
  ): Promise<MetaResponse<Todo, TodoInfo> | undefined> => {
    try {
      const tasks = await getTasks(taskFilter);
      if (tasks !== undefined) {
        setTasks(tasks.data); // Обновление списка задач
        setTasksInfo(tasks.info);
      }
    } catch (error) {
      alert(error);
      return undefined;
    }
  };
  const handleFilterChange = (isDoneValue: taskStatus) => {
    setTaskFilter(isDoneValue);
  };
  // Первоначальная загрузка задач при монтировании
  useEffect(() => {
    loadTasks(taskFilter);
  }, []);

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
