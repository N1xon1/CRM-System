import styles from "./TodoItem.module.scss";
import { deleteTask, updateTask } from "@/api/api.js";
import { useState} from "react";
import { TaskStatus, Todo, LoadTask } from "@/models/todo";
import { Form, Input, Button, Checkbox, List } from "antd";
import {EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons";

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
  const [isEdit, setIsEdit] = useState<boolean>(false);
  
  // валидация
  const [form] = Form.useForm();
  
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
    values: { taskTitle: string }
  ): Promise<Todo | undefined> {
    try {
      await updateTask(id, {
        title: values.taskTitle,
      });
      await loadTasks(taskFilter); // Обновление списка задач после редактирования
      setIsEdit(false);
    } catch (error) {
      alert(error);
      return undefined;
    }
  }

  // Функция отмены редактирования
  function handleBack() {
    setIsEdit(false);
    form.resetFields();
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

  function handleRenameClick() {
    setIsEdit(true);
  }

  return (
    <>
      <List.Item className={styles.task} key={task.id}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Form
            form={form}
            className={styles.task__form}
            onFinish={(e) => handleEditSubmit(task.id, e)}
            noValidate
            initialValues={{ taskTitle: task.title }}
          >
            <Form.Item>
              <Checkbox
                type="checkbox"
                name="complitionTask"
                onChange={(e) =>
                  handleCheckboxChange(task.id, e.target.checked)
                }
                checked={task.isDone}
              />
            </Form.Item>
            <Form.Item
              name="taskTitle"
              rules={[
                {
                  required: true,
                  message: "Название задачи не может быть пустым",
                },
                { min: 2, message: "Минимум 2 символов!" },
                { max: 64, message: "Максимум 64 символов!" },
              ]}
            >
              <Input
                name="taskTitle"
                className={styles.task__title}
                disabled={!isEdit}
              />
            </Form.Item>
            <div className={styles.possition}>
              {isEdit ? (
                <>
                  <Button className={styles.Button__save} htmlType="submit">
                    <CheckOutlined />
                    Save
                  </Button>
                  <Button
                    className={styles.Button__back}
                    onClick={handleBack}
                    htmlType="button"
                  >
                    <CloseOutlined />
                    Back
                  </Button>
                </>
              ) : (
                <Button
                  className={styles.Button__rename}
                  onClick={handleRenameClick}
                >
                  <EditOutlined />
                  Rename
                </Button>
              )}
              <Button
                className={styles.Button__delete}
                htmlType="button"
                onClick={() => handleDelete(task.id)}
              >
                <DeleteOutlined />
                Delete
              </Button>
            </div>
          </Form>
        </div>
      </List.Item>
    </>
  );
}
