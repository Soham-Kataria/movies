import { useContext, useState } from "react";
import LoginComp from "../components/Login";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { LoginMutation } from "../backend/MutateMovie";
import type { LoginFormData, LoginResponse } from "../constants/types";

const Login = () => {
  const userContext = useContext(UserContext);
  const { setUser, setIsLoggedIn, setToken } = userContext;

  const [Login, { data, loading, error }] =
    useMutation<LoginResponse>(LoginMutation);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;

    try {
      const response = await Login({
        variables: {
          data: {
            email: formData.email,
            password: formData.password,
          },
        },
      });

      const loginData = response.data?.emailPasswordLogIn;

      if (!loginData?.data?.token) {
        throw new Error("Authentication failed");
      }
      if (loginData.data.token) {
        localStorage.setItem("token", loginData.data.token);
      }
      setToken(localStorage.getItem("token") ?? "");
      setIsLoggedIn(true);

      setUser(loginData.user);

      if (!response.error) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  console.log(data);
  return (
    <div>
      <LoginComp
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default Login;
