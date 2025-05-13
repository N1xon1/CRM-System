import "./Tasks.css";
import { deleteTask, editingTask} from "../api";
import { useState, useEffect } from "react";
// import {useKeyEsc} from '../useKeyEsc';

export default function Tasks({task, receivingCards, infoTask}) {
  
  // Состояния для управления редактированием задачи
  const [taskTitle, setTaskTitle] = useState();
  const [taskId, setTaskId] = useState('');
  const [activeButton, setActiveButton] = useState('1')

  // Функция выхода из режима редактирования с помощью кнопки esc
    const handleKeyDown = (event) => {
        if(event.key==='Escape' ) {
            handleBack();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

  // Состояние для фильтрации задач (все/в работе/выполненные)
  const [isDone, setIsDone] = useState(null)
  // Получение счетчиков задач из props
  const countAllTask = infoTask.all;
  const countCompletedTAsk = infoTask.completed;
  const countinWorkTask = infoTask.inWork;

  // Функция удаления задачи
  async function handleDelete(id) {
    await deleteTask(id);
    await receivingCards(); // Обновление списка задач после удаления
  }

  // Функция сохранения изменений задачи
  async function handleSaveEdit(id,event) {
    event.preventDefault();
    await editingTask(id, {
      title: taskTitle,
    });
    await receivingCards(); // Обновление списка задач после редактирования
    setTaskId(''); // Сброс ID редактируемой задачи
    setTaskTitle(undefined); // Сброс заголовка задачи
  }

  // Функция отмены редактирования
  function handleBack() {
    setTaskId('');
    setTaskTitle();
  }

  // Функция изменения статуса выполнения задачи
  async function handleCheckboxChange(id, isChecked) {
    await editingTask(id,{
      isDone:isChecked
    })
    await receivingCards(); // Обновление списка задач после изменения статуса
  }

  return (
    <>
      {/* Блок активации кнопок */}
      <div className='tasks__state'>
          <button className={`tasks__button ${activeButton==='1' ? 'active' : ''}`} onClick={()=>{setIsDone(null); setActiveButton('1')}}>Все ({countAllTask})</button>
          <button className={`tasks__button ${activeButton==='2' ? 'active' : ''}`} onClick={()=>{setIsDone(false); setActiveButton('2')}}>В работе ({countinWorkTask})</button>
          <button className={`tasks__button ${activeButton==='3' ? 'active' : ''}`} onClick={()=>{setIsDone(true); setActiveButton('3')}}>Сделано ({countCompletedTAsk})</button>
      </div>
      <ul className="tasks">
        {/* Блок фильтрации задач по категориям*/}
        {task.slice().reverse().map(elem => elem.isDone===isDone || isDone===null ? (  
        <li className="task" key={elem.id}>
          <div className="task__possition alignment">
            <input
              className="checkbox-round"
              type="checkbox"
              name="complitionTask" 
              onChange={(event) => handleCheckboxChange(elem.id, event.target.checked)}
              checked={elem.isDone}
            />
          </div>
          <form className="form_task" onSubmit={(event) => handleSaveEdit(elem.id,event)}>
          <div className="possition__title">
            <input className="task__title" 
              type="text" 
              name='task'
              id='task'
              onChange={(event) => setTaskTitle(event.target.value)}
              value={taskId === elem.id ? taskTitle : elem.title}
              minLength='2'
              maxLength='64'
              required
              disabled={taskId !== elem.id}
            />
          </div>
          <div className="task__possition">
            {taskId === elem.id ?
            <>
              <button className="button button__save" >Save</button>
              <button className="button button__back" onClick={handleBack}>Back</button>
            </> 
            : <button className="button button__rename" onClick={() => {setTaskId(elem.id); setTaskTitle(elem.title);}}>
              </button>}
            <button className="button button__delete" onClick={() => handleDelete(elem.id)}>
            </button>
          </div>
          </form>
        </li>): '')}
      </ul>
    </>
  );
}
