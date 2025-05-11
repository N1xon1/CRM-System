import './App.css'
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import { getTasks } from ".//components/api.js";
import { useEffect, useState } from "react";

function App() {
  // Состояние для хранения списка задач и метаданных
  const [task, setTask] = useState([]);
  const [infoTask, setInfoTask] = useState([]);

  // Функция получения и обновления задач с сервера
  const receivingCards = async() => {
    const tasks = await getTasks();
    setTask(tasks.data);         // Обновление списка задач
    setInfoTask(tasks.info);   
  };
  
  // Первоначальная загрузка задач при монтировании
  useEffect(() => {
    receivingCards();
  }, []);

  return (
    <>
      {/* Компонент добавления новых задач */}
      <Header receivingCards={receivingCards}/>
      
      <main>
        {/* Основной компонент отображения задач */}
        <Tasks task={task} receivingCards={receivingCards} infoTask={infoTask}/>
      </main>
    </>
  )
}

export default App;