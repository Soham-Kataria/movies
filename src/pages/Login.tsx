import { useContext, useState } from "react";
import LoginComp from "../components/Login";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { LoginMutation } from "../backend/MutateMovie";
import type { LoginFormData, LoginResponse } from "../constants/types";
import { message } from "antd";

const Login = () => {
  const userContext = useContext(UserContext);
  const { login } = userContext;

  const [Login, { data, loading, error }] =
    useMutation<LoginResponse>(LoginMutation,{onError:(error)=>{
      message.error(`Login Failed: ${error.message}`)
    }});

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;

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
    login(loginData.data.token, formData);

    if (!response.error) navigate("/");
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
