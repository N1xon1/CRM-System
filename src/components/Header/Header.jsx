import { postTask } from "../api";
import "./Header.css";
import {useState } from "react";

export default function Header() {
  const [taskTitle, setTaskTitle] = useState('');
  async function handleSubmit() {
    // event.preventDefault();
    const addTask = await postTask({
        title:taskTitle,
        isDone:true
    })
  }

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input 
          onChange={(event) => setTaskTitle(event.target.value)} 
          type="text" 
          name='task' 
          id='task' 
          placeholder="Task To Be Done..."
        />
        <button className="header__button">Add</button>
      </form>
    </header>
  );
}