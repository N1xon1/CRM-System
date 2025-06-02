import styles from "./TodoItem.module.scss";
import { deleteTask, updateTask } from "../../api/api.js";
import { useState } from "react";

export default function TodoItem({ task, taskFilter, loadTasks }) {
  // Состояния для управления редактированием задачи
  const [taskTitle, setTaskTitle] = useState();
  const [taskId, setTaskId] = useState("");

  const [formValid, setFormValid] = useState(false);
  const [nameTaskDirty, setNameTaskDirty] = useState(false);
  const [nameTaskError, setNameTaskError] = useState(
    "Название задачи не может быть пустым"
  );

  // Функция удаления задачи
  async function handleDelete(id) {
    try {
      await deleteTask(id);
      await loadTasks(taskFilter); // Обновление списка задач после удаления
    } catch (error) {
      alert(error);
    }
  }

  // Функция сохранения изменений задачи
  async function handleEditSubmit(id, event) {
    try {
      event.preventDefault();
      await updateTask(id, {
        title: taskTitle,
      });
      await loadTasks(taskFilter); // Обновление списка задач после редактирования
      setTaskId(""); // Сброс ID редактируемой задачи
      setTaskTitle(undefined); // Сброс заголовка задачи
      setNameTaskDirty(false); // Сброс валидации
    } catch (error) {
      alert(error);
    }
  }

  // Функция отмены редактирования
  function handleBack() {
    setTaskId("");
    setTaskTitle();
  }

  // Функция изменения статуса выполнения задачи
  async function handleCheckboxChange(id, isChecked) {
    try {
      await updateTask(id, {
        isDone: isChecked,
      });
      await loadTasks(taskFilter); // Обновление списка задач после изменения статуса
    } catch (error) {
      alert(error);
    }
  }

  // Валидация при потери фокуса на input
  const blurHandler = (e) => {
    if (!e.target.value) {
      setNameTaskDirty(true);
      setFormValid(true);
    }
  };

  // валидация поля ввода при изменение данных
  const nameTaskHandler = (e) => {
    if (e.target.value.length < 2 || e.target.value.length > 64) {
      setNameTaskDirty(true);
      setFormValid(true);
      setNameTaskError("Название задачи должно быть от 2 до 64 сиволов");
      if (!e.target.value) {
        setNameTaskError("Название задачи не может быть пустым");
      }
    } else {
      setNameTaskError("");
      setNameTaskDirty(false);
      setFormValid(false);
    }
  };

  return (
    <>
      <li className={styles.task} key={task.id}>
        <div style={{ display: "flex", flexDirection:'column'}}> 
          <form
            className={styles.task__form}
            onSubmit={(event) => handleEditSubmit(task.id, event)}
            noValidate
          >
            <input
              className={styles["task__checkbox-round"]}
              type="checkbox"
              name="complitionTask"
              onChange={(event) =>
                handleCheckboxChange(task.id, event.target.checked)
              }
              checked={task.isDone}
            />
              <input
                className={styles.task__title}
                type="text"
                name="task"
                id="task__name"
                onChange={(event) => {
                  setTaskTitle(event.target.value);
                  nameTaskHandler(event);
                }}
                onBlur={(e) => blurHandler(e)}
                value={taskId === task.id ? taskTitle : task.title}
                required
                disabled={taskId !== task.id}
              />
            <div className={styles.possition}>
              {taskId === task.id ? (
                <>
                  <button className={styles.button__save} disabled={formValid}>Save</button>
                  <button className={styles.button__back} onClick={handleBack}>
                    Back
                  </button>
                </>
              ) : (
                <button
                  className={styles.button__rename}
                  onClick={() => {
                    setTaskId(task.id);
                    setTaskTitle(task.title);
                  }}
                ></button>
              )}
              <button
                className={styles.button__delete}
                type="button"
                onClick={() => handleDelete(task.id)}
              ></button>
            </div>
          </form>
          {nameTaskDirty && nameTaskError && (
            <span style={{ display: "flex", color: "red", marginLeft:'60px'}}>
              {nameTaskError}
            </span>
          )}
        </div>
      </li>
    </>
  );
}
