import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function useAuth() {
  const { email, userName, login, password, phoneNumber } = useSelector(
    (state: RootState) => state.user
  );

  return {
    isAuth: !!email,
    userName,
    login,
    password,
    phoneNumber,
    email,
  };
}
