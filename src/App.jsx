import "./App.css";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Route, Routes, Link } from "react-router-dom";
import LayoutPage from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<TodoListPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
