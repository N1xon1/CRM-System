import { postTask } from "../api";
import "./Header.css";
import { useState } from "react";

export default function Header({ receivingCards }) {
  // Хранит текст новой задачи
  const [taskTitle, setTaskTitle] = useState('');

  // Отправка новой задачи на сервер
  async function handleSubmit(event) {
      event.preventDefault();
      await postTask({ title: taskTitle });
      setTaskTitle(''); // Очистка поля ввода
      receivingCards(); // Обновление списка задач
  }

  return (
    <header>
      {/* Форма добавления задачи */}
      <form onSubmit={handleSubmit}>
        <input 
          className="task_name" 
          onChange={(e) => setTaskTitle(e.target.value)} 
          value={taskTitle}
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