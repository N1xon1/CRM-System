import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";

export default function LayoutPage() {
  const { Sider, Content } = Layout;
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(["todo"]);

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/app":
        setSelectedKeys(["todo"]);
        break;
      case "/app/profile":
        setSelectedKeys(["profile"]);
        break;
      case "/app/users":
        setSelectedKeys(["users"]);
        break;
    }
  }, [location]);
  return (
    <Layout style={{ minHeight: "50vh" }}>
      <Sider width={180} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          selectedKeys={selectedKeys}
          items={[
            {
              key: "todo",
              label: <Link to="/app">Список задач</Link>,
            },
            {
              key: "profile",
              label: <Link to="profile">Личный кабинет</Link>,
            },
            {
              key: "users",
              label: <Link to="users">Пользователи</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content style={{ background: "#f5f5f5", width: 890 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
