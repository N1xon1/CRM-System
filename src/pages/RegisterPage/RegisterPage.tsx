import { registerUser } from "@/api/api";
import { UserRegistration, ValidationConstraints } from "@/models/auth";
import { Form, Button, Input, Flex, Typography } from "antd";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppDispatch } from "@/store/store";
import { LeftCircleOutlined } from "@ant-design/icons";

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { Title } = Typography;
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  async function handleRegister(values: UserRegistration) {
    try {
      const { email, userName, login, password, phoneNumber } = values;
      const userData = await registerUser({
        email,
        userName,
        login,
        password,
        phoneNumber,
      });
      dispatch(setUser(userData)); // Диспатчим данные пользователя
      setIsRegistered(true);
    } catch (error) {
      alert(error);
      setIsRegistered(false);
    }
  }

  const handleAuth = () => {
    navigate("/");
    setIsRegistered(false);
  };
  return isRegistered ? (
    <Flex
      align="center"
      justify="center"
      vertical={true}
      style={{
        marginRight: 30,
        marginLeft: 30,
        fontSize: 18,
        backgroundColor: "silver",
      }}
    >
      <Title level={1}>Регистрация прошла успешно!</Title>
      <Button
        type="link"
        htmlType="button"
        style={{ marginTop: 10, fontSize: 18 }}
        onClick={handleAuth}
      >
        Перейти на страницу авторизации для входа в систему
      </Button>
    </Flex>
  ) : (
    <>
      <Form<UserRegistration>
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 600,
          backgroundColor: "silver",
          margin: "auto",
          marginTop: 100,
        }}
        onFinish={handleRegister}
      >
        <Button
          htmlType="button"
          style={{
            width: "8%",
            background: "transparent",
            border: "none",
            boxShadow: "none",
            margin: 10,
          }}
          onClick={() => (window.location.href = "/auth")}
        >
          <LeftCircleOutlined style={{ fontSize: 32 }} />
        </Button>
        <Form.Item
          label="userName"
          name="userName"
          rules={[
            {
              required: true,
              message: "Имя пользователя не может быть пустым",
            },
            {
              min: ValidationConstraints.UserNameMinLength,
              message: `Минимум ${ValidationConstraints.UserNameMinLength} символов!`,
            },
            {
              max: ValidationConstraints.MaxLenght,
              message: `Максимум ${ValidationConstraints.MaxLenght} символов!`,
            },
            {
              pattern: /^[a-zA-Zа-яА-ЯёЁ]+$/,
              message: "Только буквы (русские или латинские)",
            },
          ]}
          style={{ marginTop: 30 }}
        >
          <Input name="userName" />
        </Form.Item>
        <Form.Item
          label="login"
          name="login"
          rules={[
            {
              required: true,
              message: "Логин не может быть пустым",
            },
            {
              min: ValidationConstraints.LoginMinLength,
              message: `Минимум ${ValidationConstraints.LoginMinLength} символов!`,
            },
            {
              max: ValidationConstraints.MaxLenght,
              message: `Максимум ${ValidationConstraints.MaxLenght} символов!`,
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: "Только латинские буквы (A-Z, a-z)",
            },
          ]}
        >
          <Input name="login" />
        </Form.Item>
        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Пароль не может быть пустым",
            },
            {
              min: ValidationConstraints.PasswordMinLength,
              message: `Минимум ${ValidationConstraints.PasswordMinLength} символов!`,
            },
            {
              max: ValidationConstraints.MaxLenght,
              message: `Максимум ${ValidationConstraints.MaxLenght} символов!`,
            },
          ]}
        >
          <Input.Password name="password" />
        </Form.Item>
        <Form.Item
          label="repeat password"
          name="repeatPassword"
          rules={[
            {
              required: true,
              message: "Повторите свой пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
            {
              min: ValidationConstraints.PasswordMinLength,
              message: `Минимум ${ValidationConstraints.PasswordMinLength} символов!`,
            },
            {
              max: ValidationConstraints.MaxLenght,
              message: `Максимум ${ValidationConstraints.MaxLenght} символов!`,
            },
          ]}
        >
          <Input.Password name="repeatPassword" />
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
          <Input name="email" />
        </Form.Item>

        <Form.Item
          label="phone number"
          name="phoneNumber"
          rules={[
            {
              required: false,
              pattern: /^\+?\d{11}$/,
              message:
                "Пожалуйста, введите номер верно. Пример (8-999-999-99-99)",
            },
          ]}
        >
          <Input name="phoneNumber" />
        </Form.Item>

        <Button
          style={{ margin: "auto", width: 150, height: 40, marginBottom: 20 }}
          htmlType="submit"
          type="primary"
        >
          Зарегистрироваться
        </Button>
      </Form>
    </>
  );
}
