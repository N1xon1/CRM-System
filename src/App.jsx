import './App.css'
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import TasksState from './components/TasksState/TasksState';
import TodoItem  from './components/TodoItem/TodoItem.jsx';
import { getTasks } from ".//components/api.js";
import { useEffect, useState } from "react";

function App() {
  // Состояние для хранения списка задач и метаданных
  const [task, setTask] = useState([]);
  const [infoTask, setInfoTask] = useState([]);
  const [stateTask, setStateTask] = useState(null)
  // Функция получения и обновления задач с сервера
  const receivingCards = async() => {
    const tasks = await getTasks();
    setTask(tasks.data);         // Обновление списка задач
    setInfoTask(tasks.info);   
  };
  const handleIsDone = (isDoneValue) => {
    setStateTask(isDoneValue)
  }
  // Первоначальная загрузка задач при монтировании
  useEffect(() => {
    receivingCards();
  }, []);

  return (
    <>
      {/* Компонент добавления новых задач */}
      <Header receivingCards={receivingCards}/>
      <TasksState infoTask={infoTask} onIsDoneChange={handleIsDone}/>
      <main>
        {/* Основной компонент отображения задач */}
        <Tasks task={task} receivingCards={receivingCards} stateTask={stateTask}/>
      </main>
    </>
  )
}

export default App;