import styles from "./Tasks.module.scss";
import TodoItem from "../TodoItem/TodoItem";
import { TaskStatus, Todo, LoadTask } from "@/models/todo";
type TasksProps = {
  tasks: Todo[];
  loadTasks: LoadTask;
  taskFilter: TaskStatus;
};

export default function Tasks({ tasks, loadTasks, taskFilter }: TasksProps) {
  return (
    <ul className={styles.tasks}>
      {tasks.map((task: Todo) => (
        <TodoItem
          task={task}
          taskFilter={taskFilter}
          loadTasks={loadTasks}
          key={task.id}
        />
      ))}
    </ul>
  );
}
