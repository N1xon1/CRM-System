import './TasksState.css';
import { useEffect, useState } from "react";
export default function TasksState({infoTask, onIsDoneChange}) {
    
    // Состояние для фильтрации задач (все/в работе/выполненные)
    const [isDone, setIsDone] = useState(null);
    const [activeButton, setActiveButton] = useState('1');
    // Получение счетчиков задач из props
    const countAllTask = infoTask.all;
    const countCompletedTAsk = infoTask.completed;
    const countinWorkTask = infoTask.inWork;
    //Передача состояния isDone в родительский компонент
    useEffect(()=>{
        onIsDoneChange(isDone)
    },[isDone,onIsDoneChange])
    
    return (   
        <>
        {/* Блок активации кнопок */}
        <div className='tasks__state'>
            <button className={`tasks__button ${activeButton==='1' ? 'active' : ''}`} onClick={()=>{setIsDone(null); setActiveButton('1')}}>Все ({countAllTask})</button>
            <button className={`tasks__button ${activeButton==='2' ? 'active' : ''}`} onClick={()=>{setIsDone(false); setActiveButton('2')}}>В работе ({countinWorkTask})</button>
            <button className={`tasks__button ${activeButton==='3' ? 'active' : ''}`} onClick={()=>{setIsDone(true); setActiveButton('3')}}>Сделано ({countCompletedTAsk})</button>
        </div>
      </>
    )
}