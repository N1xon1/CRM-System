// import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
// import TasksState from './components/TasksState/TasksState';
import { getTasks } from ".//components/api.js";
import { useEffect, useState } from "react";

function App() {
   const [task, setTask] = useState([]);
   const [infoTask, setInfoTask] = useState([]);
   const receivingCards = 
     async() => 
     {const tasks = await getTasks();
       setTask(tasks.data);
       setInfoTask(tasks.info);
      //  task.map(elem => (console.log(elem.isDone, elem.id)))
     };
     
    useEffect (() => {
      receivingCards();
    }, []);
  return (
    <>
      <Header receivingCards={receivingCards}/>
      <main>
        {/* <TasksState infoTask={infoTask} receivingCards={receivingCards}/>  */}
        <Tasks task={task} receivingCards={receivingCards} infoTask={infoTask}/>
      </main>
    </>
  )
}

export default App;
