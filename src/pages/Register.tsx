import { useContext, useState } from "react";
import RegisterComp from "../components/Register";
import type { User } from "../constants/types";
import { UserContext } from "../context/context";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const userContext = useContext(UserContext);
  const { setUser, setIsLoggedIn } = userContext;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  } as User);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(formData);
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div>
      <RegisterComp
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Register;

// import LoginComp from "../components/Login";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/context";
// import { useContext } from "react";
// import type { LoginProps, User } from "../constants/types";

// const Login = ({formData}:LoginProps) => {
//   const navigate = useNavigate();
//   const userContext = useContext(UserContext);
//   const { isLoggedIn } = userContext;

//   if(isLoggedIn){
//     navigate("/")
//   }

//   return (
//     <div>
//       <LoginComp />
//     </div>
//   );
// };

// export default Login;
