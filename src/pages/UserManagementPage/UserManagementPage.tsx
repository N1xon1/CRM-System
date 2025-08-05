import { getAdminUserProfile, updateProfileUser } from "@/api/api";
import { User, UserRequest } from "@/models/admin";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, Flex } from "antd";
import { useEffect, useState } from "react";

export default function UserManagement() {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserRequest>({});

  const userId = Number(localStorage.getItem("userId"));
  useEffect(() => {
    getUserData(userId);
  }, [userId]);
  async function getUserData(id: number | null) {
    if (id === null) {
      form.resetFields();
      return;
    }
    try {
      const data: User = await getAdminUserProfile(id);
      setUserData({
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });

      form.setFieldsValue({
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      alert(error);
    }
  }

  function handleEdit() {
    setIsEdit(true);
  }
  async function handleSave(id: number, userRequest: UserRequest) {
    try {
      setUserData({
        email: userRequest.email ?? userData.email,
        phoneNumber: userRequest.phoneNumber ?? userData.phoneNumber,
        username: userRequest.username ?? userData.username,
      });
      console.log(userData);
      console.log(userRequest);
      await updateProfileUser(id, userRequest);
      setIsEdit(false);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <Form
      form={form}
      onFinish={(userRequest: UserRequest) =>
        handleSave(userId, {
          email:
            userRequest.email === userData.email
              ? undefined
              : userRequest.email,
          phoneNumber:
            userRequest.phoneNumber === userData.phoneNumber
              ? undefined
              : userRequest.phoneNumber,
          username:
            userRequest.username === userData.username
              ? undefined
              : userRequest.username,
        })
      }
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
        name="username"
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
          name="username"
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
          disabled={!isEdit}
        >
          Сохранить
        </Button>
      </Flex>
    </Form>
  );
}
