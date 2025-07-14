import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";

export default function LayoutPage() {
  const { Sider, Content } = Layout;
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState(["todo"]);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/app") {
      setSelectedKeys(["todo"]);
    } else if (path === "/app/profile") {
      setSelectedKeys(["profile"]);
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
          ]}
        />
      </Sider>
      <Layout>
        <Content style={{ background: "#f5f5f5", width: 550 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
