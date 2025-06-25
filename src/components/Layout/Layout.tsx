import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
export default function LayoutPage() {
  const { Sider, Content } = Layout;
  return (
    <>
      <Layout style={{ minHeight: "50vh" }}>
        <Sider width={180} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={["todo"]}
            items={[
              {
                key: "todo",
                label: <Link to="/">Список задач</Link>,
              },
              {
                key: "profile",
                label: (
                  <Link to="/profile">Профиль</Link>
                ),
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
    </>
  );
}
