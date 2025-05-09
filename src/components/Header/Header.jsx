import { postTask } from "../api";
import "./Header.css";
import {useState } from "react";

export default function Header({receivingCards}) {
  const [taskTitle, setTaskTitle] = useState('');
  async function handleSubmit(event) {
      event.preventDefault();
      await postTask({
        title:taskTitle,
    })
    setTaskTitle('');
    receivingCards();
  }

  return (
    <header>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input className="task_name" 
          onChange={(event) => setTaskTitle(event.target.value)} 
          type="text" 
          name='task'
          value={taskTitle} 
          id='task' 
          placeholder="Task To Be Done..."
          minLength='2'
          maxLength='64'
          required
        />
        <button className="header__button">Add</button>
      </form>
    </header>
  );
}