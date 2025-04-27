// import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import TasksState from './components/TasksState/TasksState';

function App() {
  return (
    <>
      <Header />
      <main>
        <TasksState/> 
        <Tasks/>
      </main>
    </>
  )
}

export default App;
