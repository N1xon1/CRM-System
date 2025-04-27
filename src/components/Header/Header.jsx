import "./Header.css";
export default function Header() {
  function handleClick() {
    console.log('dsdsad')
  }
    return (
    <header>
        <form action="" onSubmit={1}>
          <label htmlFor="task"></label>
          <input onChange={1} type="text" name='task' id='task' placeholder="Task To Be Done..."/>
          <button className="header__button" onClick={handleClick}>Add</button>
        </form>
    </header>
  );
}
 