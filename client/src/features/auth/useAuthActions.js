import { useDispatch, useSelector } from "react-redux";
import { setToken, removeToken } from "./authSlice";

export function useAuthActions() {
  const dispatch = useDispatch();

  return {
    setAccessToken: (token) => dispatch(setToken(token)),
    logout: () => dispatch(removeToken()),
  };
}

export function useAuthToken() {
  return useSelector((state) => state.auth.accessToken);
}
