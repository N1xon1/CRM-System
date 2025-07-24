import { getUsers } from "@/api/api";
import { Roles, User } from "@/models/admin";
import { setUser } from "@/store/slices/userSlice";
import { store } from "@/store/store";
import { Table, Tag, Button } from "antd";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);

  async function handleClick(userData: User) {
    window.location.href = "/management";
    localStorage.setItem('userId', String(userData.id))
  }

  const columns = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Статус блокировки",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (isBlocked: boolean) => (
        <Tag color={isBlocked ? "red" : "green"}>{isBlocked ? "-" : "+"}</Tag>
      ),
    },
    {
      title: "Роли",
      dataIndex: "roles",
      key: "roles",
      render: (roles: Roles[]) => (
        <span>
          {roles.map((role) => (
            <Tag key={role} color="blue" style={{ margin: 2 }}>
              {role}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      title: "Номер телефона",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: User) => (
        <Button
          style={{ whiteSpace: "normal", height: "auto" }}
          type="primary"
          onClick={() => handleClick(record)}
        >
          Перейти к профилю
        </Button>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers();
        const formattedData = res.data.map((element) => ({
          id: element.id,
          username: element.username,
          email: element.email,
          date: new Date(element.date).toLocaleDateString(),
          isBlocked: element.isBlocked,
          roles: element.roles,
          phoneNumber: element.phoneNumber || "-",
        }));
        setData(formattedData);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        style={{ padding: 10 }}
        size="small"
      />
    </>
  );
}
