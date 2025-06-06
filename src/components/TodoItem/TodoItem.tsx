import styles from "./TodoItem.module.scss";
import { deleteTask, updateTask } from "@/api/api.js";
import { useState } from "react";
import { TaskStatus, Todo, LoadTask } from "@/models/todo";

type TodoItemProps = {
  task: Todo;
  taskFilter: TaskStatus;
  loadTasks: LoadTask;
};

export default function TodoItem({
  task,
  taskFilter,
  loadTasks,
}: TodoItemProps) {
  // Состояния для управления редактированием задачи
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // валидация
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [nameTaskError, setNameTaskError] = useState<string>(
    "Название задачи не может быть пустым"
  );

  // Функция удаления задачи
  async function handleDelete(id: number) {
    try {
      await deleteTask(id);
      await loadTasks(taskFilter); // Обновление списка задач после удаления
    } catch (error) {
      alert(error);
    }
  }

  // Функция сохранения изменений задачи
  async function handleEditSubmit(
    id: number,
    e: React.FormEvent<HTMLFormElement>
  ): Promise<Todo | undefined> {
    try {
      e.preventDefault();
      await updateTask(id, {
        title: taskTitle,
      });
      await loadTasks(taskFilter); // Обновление списка задач после редактирования
      setIsEdit(false);
      setTaskTitle(""); // Сброс заголовка задачи
    } catch (error) {
      alert(error);
      return undefined;
    }
  }

  // Функция отмены редактирования
  function handleBack() {
    // setTaskId(null);
    setIsEdit(false);
    setTaskTitle("");
  }

  // Функция изменения статуса выполнения задачи
  async function handleCheckboxChange(
    id: number,
    isChecked: boolean
  ): Promise<Todo | undefined> {
    try {
      await updateTask(id, {
        isDone: isChecked,
      });
      await loadTasks(taskFilter); // Обновление списка задач после изменения статуса
    } catch (error) {
      alert(error);
      return undefined;
    }
  }

  // Валидация при потери фокуса на input
  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsFormValid(true);
    }
  };

  // валидация поля ввода при изменение данных
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 64) {
      setIsFormValid(true);
      setNameTaskError("Название задачи должно быть от 2 до 64 символов");
      if (!e.target.value) {
        setNameTaskError("Название задачи не может быть пустым");
      }
    } else {
      setNameTaskError("");
      setIsFormValid(false);
    }
  }

  function handleRenameClick(taskTitle:string) {
    setIsEdit(true);
    setTaskTitle(taskTitle);
  }

  return (
    <>
      <li className={styles.task} key={task.id}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <form
            className={styles.task__form}
            onSubmit={(e) => handleEditSubmit(task.id, e)}
            noValidate
          >
            <input
              className={styles["task__checkbox-round"]}
              type="checkbox"
              name="complitionTask"
              onChange={(e) => handleCheckboxChange(task.id, e.target.checked)}
              checked={task.isDone}
            />
            <input
              className={styles.task__title}
              type="text"
              name="task"
              id="task__name"
              onChange={(e) => handleInputChange(e)}
              onBlur={(e) => blurHandler(e)}
              value={isEdit ? taskTitle : task.title}
              required
              disabled={!isEdit}
            />
            <div className={styles.possition}>
              {isEdit ? (
                <>
                  <button
                    className={styles.button__save}
                    disabled={isFormValid}
                  >
                    Save
                  </button>
                  <button
                    className={styles.button__back}
                    onClick={handleBack}
                    type="button"
                  >
                    Back
                  </button>
                </>
              ) : (
                <button
                  className={styles.button__rename}
                  onClick={() => handleRenameClick(task.title)}
                ></button>
              )}
              <button
                className={styles.button__delete}
                type="button"
                onClick={() => handleDelete(task.id)}
              ></button>
            </div>
          </form>
          {isFormValid && (
            <span style={{ display: "flex", color: "red", marginLeft: "60px" }}>
              {nameTaskError}
            </span>
          )}
        </div>
      </li>
    </>
  );
}
