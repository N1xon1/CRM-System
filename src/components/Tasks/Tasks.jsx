import "./Tasks.css";
import TodoItem from "../TodoItem/TodoItem";
export default function Tasks({task, receivingCards, stateTask}) {
  return (
    <>
      <ul className="tasks">
        <TodoItem task={task} stateTask={stateTask} receivingCards={receivingCards}/>
      </ul>
    </>
  );
}
