import './TasksState.css';
export default function Tasks() {
    function handleClick() {
        console.log('fsafafs')
    }
    return (
        <>
        <div className='tasks__state'>
            <button className="tasks__button" onClick={handleClick}>Все (1)</button>
            <button className="tasks__button">В работе (3)</button>
            <button className="tasks__button">Сделано (4)</button>
        </div>
        </>
    )
}