import { getAdminUserProfile, updateProfileUser } from "@/api/api";
import { UserRequest } from "@/models/admin";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Flex } from "antd";
import { useState } from "react";

export default function UserManagement() {
  const [form] = Form.useForm();
  const [isActivBtn, setIsActivBtn] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const userId = Number(localStorage.getItem("userId"));
  async function getUserData(id: number | null) {
    if (id === null) {
      form.resetFields();
      return;
    }
    try {
      const userData = await getAdminUserProfile(id);
      form.setFieldsValue({
        userName: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });
    } catch (error) {
      alert(error);
    }
  }
  getUserData(userId);

  function handleEdit() {
    setIsActivBtn(true);
    setIsEdit(true);
  }
  async function handleSave(id: number, userData: UserRequest) {
    try {
      const data = await updateProfileUser(id, userData);
      setIsActivBtn(false);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <Form
      form={form}
      onFinish={(userData) => handleSave(userId, userData)}
      style={{
        width: "60%",
        margin: "auto",
        backgroundColor: "white",
        padding: 40,
      }}
    >
      <Button
        htmlType="button"
        style={{
          width: "8%",
          background: "transparent",
          border: "none",
          boxShadow: "none",
        }}
        onClick={() => (window.location.href = "/app/users")}
      >
        <LeftCircleOutlined style={{ fontSize: 32 }} />
      </Button>
      <Form.Item
        label="User Name"
        name="userName"
        rules={[
          {
            required: true,
            message: "Имя пользователя не может быть пустым",
          },
          { min: 1, message: "Минимум 1 символов!" },
          { max: 60, message: "Максимум 60 символов!" },
          {
            pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/,
            message: "Только буквы (русские или латинские)",
          },
        ]}
        style={{ marginTop: 30 }}
      >
        <Input
          name="userName"
          disabled={!isEdit}
          style={{ color: "inherit", background: "inherit", opacity: 1 }}
        />
      </Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: "В этом поле должна быть ваша почта",
            type: "email",
          },
        ]}
      >
        <Input
          name="email"
          disabled={!isEdit}
          style={{ color: "inherit", background: "inherit", opacity: 1 }}
        />
      </Form.Item>
      <Form.Item
        label="phone number"
        name="phoneNumber"
        rules={[
          {
            required: false,
            pattern: /^\+?\d{11}$/,
            message:
              "Пожалуйста, введите номер верно. Пример (+8-999-999-99-99)",
          },
        ]}
      >
        <Input
          name="phoneNumber"
          disabled={!isEdit}
          style={{ color: "inherit", background: "inherit", opacity: 1 }}
        />
      </Form.Item>
      <Flex justify="end">
        <Button
          htmlType="button"
          style={{ backgroundColor: "#f44a4aff", marginRight: 20 }}
          onClick={handleEdit}
        >
          Редактировать
        </Button>
        <Button
          htmlType="submit"
          style={{ backgroundColor: "#00ff6eff" }}
          disabled={!isActivBtn}
        >
          Сохранить
        </Button>
      </Flex>
    </Form>
  );
}
