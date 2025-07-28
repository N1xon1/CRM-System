import {
  blockUser,
  deleteUser,
  getUsers,
  unblockUser,
  updateRolesUser,
} from "@/api/api";
import { Roles, User, UserFilters } from "@/models/admin";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  Table,
  Tag,
  Button,
  Input,
  Flex,
  Modal,
  Form,
  Checkbox,
  Radio,
  Pagination,
} from "antd";
import { RadioChangeEvent } from "antd/lib";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [userFilters, setUserFilters] = useState<UserFilters>({ limit: 20 });
  const [isModalOpenRoles, setIsModalOpenRoles] = useState<boolean>(false);
  const [isModalOpenFilter, setIsModalOpenFilter] = useState<boolean>(false);
  const [userRoles, setUserRoles] = useState<Roles[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [blockFilter, setBlockFilter] = useState<boolean | undefined>(
    undefined
  );
  const [countUsers, setCountUsers] = useState<number>(0);
  const [pagination, setPagination] = useState<{
    limit: number;
    offset: number;
  }>({
    limit: 20,
    offset: 0,
  });

  const { Search } = Input;

  const fetchData = async (userFilters: UserFilters) => {
    try {
      const res = await getUsers(userFilters);
      setData(res.data ? formatUserData(res.data) : []);
      setCountUsers(res.meta.totalAmount);
    } catch (error) {
      alert(error);
    }
  };

  const formatUserData = (users: User[]) =>
    users.map((user) => ({
      ...user,
      key: user.id,
      date: new Date(user.date).toLocaleDateString(),
      phoneNumber: user.phoneNumber || "-",
    }));

  useEffect(() => {
    fetchData(userFilters);
  }, [userFilters]);

  const handleEditProfile = (userData: User) => {
    localStorage.setItem("userId", String(userData.id));
    window.location.href = "/management";
  };

  const handleDelete = async (id: number) => {
    try {
      if (confirm("Вы уверены, что хотите выполнить это действие?")) {
        await deleteUser(id);
        fetchData(userFilters);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSearch = (search: string) => {
    const newSearch = { ...userFilters, search };
    setUserFilters(newSearch);
    fetchData(newSearch);
  };

  const handleSortChange = (sortBy: string) => {
    const isActiveAndAsc =
      userFilters.sortBy === sortBy && userFilters.sortOrder === "asc";
    const newSort: UserFilters = {
      ...userFilters,
      sortBy,
      sortOrder: isActiveAndAsc ? "desc" : "asc",
    };
    setUserFilters(newSort);
    fetchData(newSort);
  };

  const handleSetLockStatus = async (isBlocked: boolean, id: number) => {
    try {
      if (confirm("Вы уверены, что хотите выполнить это действие?")) {
        isBlocked ? await unblockUser(id) : await blockUser(id);
        fetchData(userFilters);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleClickUserRoles = (roles: Roles[], id: number) => {
    setUserRoles(roles);
    setUserId(id);
    setIsModalOpenRoles(true);
  };

  const handleChangeRoles = (role: Roles) => {
    setUserRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSaveRoles = async (id: number | null, roles: Roles[]) => {
    if (!id) {
      console.log("Пустой id");
      return;
    }

    try {
      await updateRolesUser(id, { roles });
      setIsModalOpenRoles(false);
      fetchData(userFilters);
    } catch (error) {
      alert(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpenRoles(false);
    setIsModalOpenFilter(false);
    setUserId(null);
  };

  const columns = [
    createSortableColumn("Имя", "username"),
    createSortableColumn("Почта", "email"),
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
        <Tag color={isBlocked ? "red" : "green"}>{isBlocked ? "+" : "-"}</Tag>
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
    {
      title: "Администрирование",
      key: "actions",
      render: (_: any, record: User) => (
        <Button
          style={{
            whiteSpace: "normal",
            height: "30px",
            backgroundColor: record.isBlocked ? "green" : "red",
          }}
          onClick={() => handleSetLockStatus(record.isBlocked, record.id)}
        >
          {record.isBlocked ? "Разблокировать" : "Заблокировать"}
        </Button>
      ),
    },
    {
      title: "Дополнительно",
      key: "actions",
      render: (_: any, record: User) => (
        <Flex justify="center">
          <Button
            style={{ whiteSpace: "normal", height: "30px" }}
            onClick={() => handleClickUserRoles(record.roles, record.id)}
          >
            <EllipsisOutlined />
          </Button>
        </Flex>
      ),
    },
  ];

  function createSortableColumn(title: string, sortKey: string) {
    return {
      title: (
        <Flex align="center" gap="small">
          <span>{title}</span>
          <Button size="small" onClick={() => handleSortChange(sortKey)}>
            {userFilters.sortOrder === "asc" ? (
              <CaretUpOutlined />
            ) : (
              <CaretDownOutlined />
            )}
          </Button>
        </Flex>
      ),
      dataIndex: sortKey,
      key: sortKey,
    };
  }

  function handleChangeBlockFilter(isBlocked: boolean | undefined) {
    const newBlockFilter: UserFilters = { ...userFilters, isBlocked };
    setUserFilters(newBlockFilter);
    setIsModalOpenFilter(false);
    fetchData(newBlockFilter);
  }

  function handleChangePagination(current: number) {
    const newPaginationFilter: UserFilters = {
      ...userFilters,
      offset: current - 1,
    };
    setPagination({ ...pagination, offset: current - 1 });
    setUserFilters(newPaginationFilter);
  }

  return (
    <>
      <Search
        placeholder="Введите запрос"
        onSearch={handleSearch}
        enterButton
        style={{ marginTop: 20 }}
      />
      <Button onClick={() => setIsModalOpenFilter(true)} style={{ margin: 10 }}>
        Фильтр
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        style={{ padding: 10 }}
        size="small"
        pagination={false}
      />
      <Pagination
        current={pagination.offset + 1}
        pageSize={pagination.limit}
        total={countUsers}
        showSizeChanger={false}
        onChange={(current: number) => handleChangePagination(current)}
        style={{ marginTop: 16, textAlign: "center", marginBottom: 15 }}
      ></Pagination>
      <Modal
        title="Фильтровать пользователей по статусу блокировки"
        open={isModalOpenFilter}
        onOk={() => handleChangeBlockFilter(blockFilter)}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item>
            <>
              <Radio.Group
                value={blockFilter}
                onChange={(e: RadioChangeEvent) =>
                  setBlockFilter(e.target.value)
                }
              >
                <Radio value={undefined} key={"option1"}>
                  Все пользователи
                </Radio>
                <Radio value={true} key={"option2"}>
                  Заблокированные
                </Radio>
                <Radio value={false} key={"option3"}>
                  Не заблокированные
                </Radio>
              </Radio.Group>
            </>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Выберите роли"
        open={isModalOpenRoles}
        onOk={() => handleSaveRoles(userId, userRoles)}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item>
            <Checkbox
              type="checkbox"
              name="complitionTask"
              onChange={() => handleChangeRoles(Roles.ADMIN)}
              checked={userRoles.includes(Roles.ADMIN)}
            >
              ADMIN
            </Checkbox>
            <Checkbox
              type="checkbox"
              name="complitionTask"
              onChange={() => handleChangeRoles(Roles.MODERATOR)}
              checked={userRoles.includes(Roles.MODERATOR)}
            >
              MODERATOR
            </Checkbox>
            <Checkbox
              type="checkbox"
              name="complitionTask"
              onChange={() => handleChangeRoles(Roles.USER)}
              checked={userRoles.includes(Roles.USER)}
            >
              USER
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
