import { apiRequest } from "@/libs/axios/apiRequest";
import { setToken } from "@/libs/redux/features/auth/authSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import { useRef } from "react";

const useLogin = () => {
  const dispatch = useAppDispatch();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    try {
      const response = await apiRequest.post('/auth/login', {
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
      })
  
      if (response.status === 200 || response.status === 201) {
        dispatch(setToken(response.data.data))
        window.location.href = '/';
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    usernameRef,
    passwordRef,
    handleSubmit,
  }
}

export default useLogin;