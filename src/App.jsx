import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import TasksState from './components/TasksState/TasksState';

function App() {
  // const {setUserTask, handleSubmit } = useAppLogic();
  return (
    <>
      <Header 
        // setUserTask={setUserTask} 
        // handleSubmit={handleSubmit} 
        />
      <main>
        <TasksState/> 
        <Tasks/>
      </main>
    </>
  )
}

export default App;
