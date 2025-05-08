// import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import TasksState from './components/TasksState/TasksState';
import { getTasks } from ".//components/api.js";
import { useEffect, useState } from "react";

function App() {
   const [task, setTask] = useState([]);
   const receivingCards = 
     async() => 
     {const tasks = await getTasks();
       setTask(tasks.data);
     };
     
    useEffect (() => {
      receivingCards();
    }, []);
  return (
    <>
      <Header receivingCards={receivingCards}/>
      <main>
        <TasksState/> 
        <Tasks task={task} receivingCards={receivingCards}/>
      </main>
    </>
  )
}

export default App;
