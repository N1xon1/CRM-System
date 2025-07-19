import "./App.css";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Route, Routes } from "react-router-dom";
import LayoutPage from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import { isAuthUser } from "./store/slices/userSlice";
import { RootState } from "./store/store";
import { tokenService } from "./services/authToken";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/app" element={<LayoutPage />}>
        <Route index element={<TodoListPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
