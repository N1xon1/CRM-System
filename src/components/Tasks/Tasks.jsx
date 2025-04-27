import "./Tasks.css";
export default function Tasks() {
  return (
    <ul className="tasks">
      <li className="task">
        <div className="task__possition alignment">
          <label htmlFor="complitionTask"></label>
          <input
            className="checkbox-round"
            type="checkbox"
            name="complitionTask"
          />
          <p>QWRwrw</p>
        </div>
        <div className="task__possition">
          <button className="button task__rename"><img className='rename__img' src="src/assets/rename.png"/></button>
          <button className="button task__delete"><img className='img' src="src/assets/delete.svg"/></button>
        </div>
      </li>
    </ul>
  );
}
