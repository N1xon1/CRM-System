import styles from "./Tasks.module.scss";
import TodoItem from "../TodoItem/TodoItem";
export default function Tasks({ tasks, loadTasks, taskFilter }) {
  return (
    <ul className={styles.tasks}>
      {tasks.map((task) => (
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
