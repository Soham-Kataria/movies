import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/context";
import { Layout, Button, Breadcrumb } from "antd";
import { type BreadcrumbsItem } from "./BreadCrumbs";

const { Header } = Layout;

const Navbar = () => {
  const { setUser, setIsLoggedIn, setToken } = useContext(UserContext);
  const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedInLocal(true);
      setToken(token);
      setIsLoggedIn(true);
    } else {
      setIsLoggedInLocal(false);
      setToken("");
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [setIsLoggedIn, setToken, setUser]);

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    setUser(null);
    setIsLoggedIn(false);
    setIsLoggedInLocal(false);
    navigate("/");
  };

  return (
    <Header className="bg-white px-4 flex justify-between items-center absolute w-full">
      <div className="font-bold text-gray-800 flex items-center gap-4 m-3 w-full">
        <Link to="/">TMBD</Link>
        <Breadcrumb
          items={menuItems.map((item) => ({
            title: <Link to={item.path}>{item.title}</Link>,
          }))}
          separator
        />
      </div>

      <div>
        {!isLoggedInLocal ? (
          <Button type="primary">
            <Link to="/login">Login</Link>
          </Button>
        ) : (
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
export const menuItems: BreadcrumbsItem[] = [
  { title: "Home", path: "/" },
  { title: "MovieList", path: "/movie-list" },
  { title: "PersonList", path: "/person-list" },
];
