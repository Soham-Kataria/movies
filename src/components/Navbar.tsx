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
    <Header className="bg-white px-4 flex justify-between items-center m-3 sticky">
      <div className="font-bold text-gray-800 flex items-center gap-4">
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
  { title: "MovieCard", path: "/movie-card" },
  { title: "MovieList", path: "/movie-list" },
  { title: "PersonList", path: "/person-list" },
];

// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../context/context";
// import { Layout, Menu, Button } from "antd";

// const { Header } = Layout;

// const Navbar = () => {
//   const { isLoggedIn, setUser, setIsLoggedIn,setToken } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear
//     setToken("")
//     setUser(null);
//     setIsLoggedIn(false);
//     navigate("/");
//   };
//   const menuItems = [
//     { key: "home", label: <Link to="/">Home</Link> },
//     { key: "movie-card", label: <Link to="/movie-card">Movie Card</Link> },
//     { key: "movie-list", label: <Link to="/movie-list">Movie List</Link> },
//   ];

//   return (
//     <Header className="bg-white px-4 flex justify-between items-center mx-2 sticky">
//       <div className="font-bold text-gray-800">
//         <Link to="/">MovieApp</Link>
//       </div>

//       <Menu
//         mode="horizontal"
//         selectable={false}
//         className="flex-1 justify-start ml-8 h-16 items-center"
//         items={menuItems}
//       />

//       <div>
//         {!isLoggedIn ? (
//           <Button type="primary">
//             <Link to="/login">Login</Link>
//           </Button>
//         ) : (
//           <Button type="primary" danger onClick={handleLogout}>
//             Logout
//           </Button>
//         )}
//       </div>
//     </Header>
//   );
// };

// export default Navbar;
