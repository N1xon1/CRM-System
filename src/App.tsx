import "./App.css";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserManagement from "./pages/UserManagementPage/UserManagementPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/management" element={<UserManagement/>}></Route>
      <Route path="/app" element={<LayoutPage />}>
        <Route index element={<TodoListPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="users" element={<UsersPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
