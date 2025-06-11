import { postTask } from "@/api/api.js";
import styles from "./AddTask.module.scss";
import { useState } from "react";
import { TaskStatus, LoadTask, Todo } from "@/models/todo";
import { Form, Input, Button, Flex } from "antd";
import { PageHeader } from "@ant-design/pro-components";

type AddTaskProps = {
  loadTasks: LoadTask;
  taskFilter: TaskStatus;
};

export default function AddTask({ loadTasks, taskFilter }: AddTaskProps) {
  const [form] = Form.useForm();

  // Отправка новой задачи на сервер
  async function handleSubmit(values: {
    taskTitle: string;
  }): Promise<Todo | undefined> {
    try {
      await postTask({ title: values.taskTitle });
      loadTasks(taskFilter); // Обновление списка задач
      form.resetFields();
    } catch (error) {
      alert(error);
      return undefined;
    }
  }

  return (
    <PageHeader>
      {/* Форма добавления задачи */}
      <Form form={form} onFinish={handleSubmit} noValidate>
        <Flex justify="space-between" align="center">
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
              className={styles.task_name}
              id="name"
              placeholder="Task To Be Done..."
              required
            />
          </Form.Item>
          <Button className={styles.Button_add} htmlType="submit">
            Add
          </Button>
        </Flex>
      </Form>
    </PageHeader>
  );
}
