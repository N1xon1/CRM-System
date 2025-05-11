import "./Tasks.css";
import { deleteTask, editingTask} from "../api";
import { useState } from "react";
import deleteIcon from '@/assets/delete.svg';
import renameIcon from '@/assets/rename.png';

export default function Tasks({task, receivingCards, infoTask}) {
  
  // Состояния для управления редактированием задачи
  const [taskTitle, setTaskTitle] = useState();
  const [taskId, setTaskId] = useState('');
  const [activeButton, setActiveButton] = useState('1')

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
  async function handleSaveEdit(id) {
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
    setTaskTitle()
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
          <div className="possition__title">
            <input className="task__title" 
              type="text" 
              name='task'
              id='task'
              onChange={(event) => setTaskTitle(event.target.value)}
              {...(taskId === elem.id ? {value:taskTitle || elem.title} : {value:elem.title})} 
              minLength='2'
              maxLength='64'
              required
              {...(taskId === elem.id ? {disabled:false} : {disabled:true})}
            />
          </div>
          <div className="task__possition">
            {taskId === elem.id ?
            <>
              <button className="button button__save" onClick={() => handleSaveEdit(elem.id)}>Save</button>
              <button className="button button__back" onClick={handleBack}>Back</button>
            </> 
            : <button className="button button__rename" onClick={() => setTaskId(elem.id)}>
                <img className='rename__img' src={renameIcon}/>
              </button>}
            <button className="button button__delete" onClick={() => handleDelete(elem.id)}>
              <img className='img' src={deleteIcon}/>
            </button>
          </div>
        </li>): '')}
      </ul>
    </>
  );
}
