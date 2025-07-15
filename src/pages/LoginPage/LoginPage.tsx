import { loginUser } from "@/api/api";
import { AuthData, Token } from "@/models/todo";
import { Form, Button, Input, Flex } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { tokenService } from "@/services/authToken";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const handleRegister = () => {
    navigate("/register");
  };

  const dispatch = useDispatch<AppDispatch>();

  async function handleLogin(values: AuthData) {
    try {
      setLoading(true);
      const { login, password } = values;
      const userData: Token = await loginUser({ login, password });
      tokenService.set(userData.accessToken)
      localStorage.setItem("refToken", userData.refreshToken);
      navigate("/app");
    } catch (error) {
      setLoading(false);
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
          { min: 1, message: "Минимум 1 символов!" },
          { max: 60, message: "Максимум 60 символов!" },
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
          { min: 6, message: "Минимум 6 символов!" },
          { max: 60, message: "Максимум 60 символов!" },
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