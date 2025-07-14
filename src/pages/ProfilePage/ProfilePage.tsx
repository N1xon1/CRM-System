import { getUserProfile } from "@/api/api";
import { Profile } from "@/models/todo";
import { Form, Input} from "antd";

export default function ProfilePage() {
  const [form] = Form.useForm();
  async function getUserData() {
    try {
      const userData: Profile = await getUserProfile();
      form.setFieldsValue({
        userName: userData.username,
        email: userData.email,
        phoneNumber: userData.phonenumber,
      });
    } catch (error) {
      alert(error);
    }
  }
  getUserData();
  return (
    <Form form={form} style={{ width: "90%", margin: "auto" }}>
      <Form.Item
        label="User Name"
        name="userName"
        rules={[
          {
            // required: true,
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
        <Input name="userName" readOnly />
      </Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            // required: true,
            message: "В этом поле должна быть ваша почта",
            type: "email",
          },
        ]}
      >
        <Input name="email" readOnly />
      </Form.Item>
      <Form.Item
        label="phone number"
        name="phoneNumber"
        rules={[
          {
            required: false,
            pattern: /^\d{11}$/,
            message:
              "Пожалуйста, введите номер верно. Пример (8-999-999-99-99)",
          },
        ]}
      >
        <Input name="phoneNumber" readOnly />
      </Form.Item>
    </Form>
  );
}
