import { loginUser } from "@/api/api";
import { AuthData, Token, ValidationConstraints } from "@/models/auth";
import { Form, Button, Input, Flex } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/store/store";
import { tokenService } from "@/services/authToken";
import { isAuthUser } from "@/store/slices/userSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const handleRegister = () => {
    navigate("/register");
  };

  async function handleLogin(values: AuthData) {
    try {
      setLoading(true);
      const userData: Token = await loginUser(values);
      tokenService.set(userData.accessToken);
      localStorage.setItem("refToken", userData.refreshToken);
      navigate("/app");
      store.dispatch(isAuthUser(true));
    } catch (error) {
      setLoading(false);
      store.dispatch(isAuthUser(false));
      alert(error);
    }
  }
  return (
    <Form<AuthData>
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 600,
        maxHeight: 300,
        margin: "auto",
        backgroundColor: "white",
      }}
      onFinish={handleLogin}
    >
      <Form.Item
        label="Login"
        name="login"
        rules={[
          {
            required: true,
            message: "Имя пользователя не может быть пустым",
          },
          {
            min: ValidationConstraints.LoginMinLength,
            message: `Минимум ${ValidationConstraints.LoginMinLength} символов!`,
          },
          {
            max: ValidationConstraints.MaxLenght,
            message: `Максимум ${ValidationConstraints.MaxLenght} символов!`,
          },
        ]}
        style={{ marginTop: 50 }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        style={{ marginBottom: "0" }}
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
        <Input.Password />
      </Form.Item>

      <Flex justify="end">
        <Button
          type="link"
          htmlType="button"
          style={{ marginBottom: 20, marginRight: 20 }}
          onClick={handleRegister}
        >
          Забыли пароль?
        </Button>
      </Flex>

      <Button
        style={{ margin: "auto", width: "90%", height: 40 }}
        htmlType="submit"
        loading={loading}
        type="primary"
      >
        Войти
      </Button>
      <Button
        type="link"
        htmlType="button"
        style={{ marginTop: 15, marginBottom: 10 }}
        onClick={handleRegister}
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
}

// export {getToken};
