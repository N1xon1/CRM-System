import "./Tasks.css";
import { getTasks } from "../api";
import { useEffect, useState } from "react";

export default function Tasks() {
  // const [userTask, setUserTask] = useState();
  const [task, setTask] = useState([])
  useEffect (() => {
    (async() => 
    {const tasks = await getTasks();
      setTask(tasks.data);
    })();
  }, []);

  return (
    <ul className="tasks">
      {task.map(elem => (
      <li className="task" key={elem.id}>
        <div className="task__possition alignment">
          <label htmlFor="complitionTask"></label>
          <input
            className="checkbox-round"
            type="checkbox"
            name="complitionTask"
          />
          <p className="task__title">{elem.title}</p>
        </div>
        <div className="task__possition">
          <button className="button task__rename"><img className='rename__img' src="src/assets/rename.png"/></button>
          <button className="button task__delete"><img className='img' src="src/assets/delete.svg"/></button>
        </div>
      </li>))}
    </ul>
  );
}
