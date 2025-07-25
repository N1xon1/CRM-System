import { deleteUser, getUsers } from "@/api/api";
import { Roles, User, UserFilters } from "@/models/admin";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Table, Tag, Button, Input, Flex } from "antd";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [userFilters, setUserFilters] = useState<UserFilters>({});
  const { Search } = Input;
  function handleEditProfile(userData: User) {
    window.location.href = "/management";
    localStorage.setItem("userId", String(userData.id));
  }

  async function handleDelete(id: number) {
    try {
      const isConfirmed = confirm(
        "Вы уверены, что хотите выполнить это действие?"
      );
      if (isConfirmed) {
        await deleteUser(id);
        fetchData(userFilters);
      } else {
        fetchData(userFilters);
      }
    } catch (error) {
      alert(error);
    }
  }

  function handleSearch(search: string) {
    const newSearch = { ...userFilters, search };
    setUserFilters({ ...userFilters, search: search });
    fetchData(newSearch);
  }

  function handleSortChange(sortBy: string) {
    const isActiveAndAsc =
      userFilters.sortBy === sortBy && userFilters.sortOrder === "asc";
    const newSort: UserFilters = {
      ...userFilters,
      sortBy,
      sortOrder: isActiveAndAsc ? "desc" : "asc",
    };

    setUserFilters(newSort);
    fetchData(newSort);
  }

  const columns = [
    {
      title: (
        <Flex align="center" gap="small">
          <span>Имя</span>
          <Button
            size="small"
            onClick={() => {
              handleSortChange("username");
            }}
          >
            {userFilters.sortOrder === "asc" ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )}
          </Button>
        </Flex>
      ),
      dataIndex: "username",
      key: "username",
    },
    {
      title: (
        <Flex align="center" gap="small">
          <span>Почта</span>
          <Button
            size="small"
            onClick={() => {
              handleSortChange("email");
            }}
          >
            {userFilters.sortOrder === "asc" ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )}
          </Button>
        </Flex>
      ),
      dataIndex: "email",
      key: "email",
      onHeaderCell: () => ({
        onClick: () => {},
      }),
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
      title: "Редактировать профиль",
      key: "actions",
      render: (_: any, record: User) => (
        <Button
          style={{ whiteSpace: "normal", height: "auto" }}
          type="primary"
          onClick={() => handleEditProfile(record)}
        >
          Перейти к профилю
        </Button>
      ),
    },
    {
      title: "Удалить пользователя",
      key: "actions",
      render: (_: any, record: User) => (
        <Button
          style={{
            whiteSpace: "normal",
            height: "30px",
            backgroundColor: "red",
          }}
          onClick={() => handleDelete(record.id)}
        >
          Удалить
        </Button>
      ),
    },
  ];

  const fetchData = async (userFilters: UserFilters) => {
    try {
      const res = await getUsers(userFilters);
      if (!res.data) {
        setData([]);
      } else {
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
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData(userFilters);
  }, [userFilters]);

  return (
    <>
      <Search
        placeholder="Введите запрос"
        onSearch={(search: string) => handleSearch(search)}
        enterButton
        style={{ marginTop: 20 }}
      />
      <Table
        columns={columns}
        dataSource={data.map((item) => ({ ...item, key: item.id }))}
        style={{ padding: 10 }}
        size="small"
      />
    </>
  );
}
