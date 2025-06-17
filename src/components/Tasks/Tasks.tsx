import styles from "./Tasks.module.scss";
import TodoItem from "../TodoItem/TodoItem";
import { TaskStatus, Todo, LoadTask } from "@/models/todo";
import { List } from "antd";
type TasksProps = {
  tasks: Todo[];
  loadTasks: LoadTask;
  taskFilter: TaskStatus;
};

export default function Tasks({ tasks, loadTasks, taskFilter }: TasksProps) {
  return (
    <List className={styles.tasks} dataSource={tasks} >
      {tasks.map((task: Todo) => (
        <TodoItem
          task={task}
          taskFilter={taskFilter}
          loadTasks={loadTasks}
          key={task.id}
        />
      ))}
    </List>
  );
}
