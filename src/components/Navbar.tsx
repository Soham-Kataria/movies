import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Button } from "antd";
import { UserContext } from "../context/context";
import Breadcrumbs, { type BreadcrumbsItem } from "./BreadCrumbs";

const { Header } = Layout;

const Navbar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Header className="fixed top-0 left-0 w-full z-100 shadow-md">
      <div className="bg-gray-800 text-white flex justify-between p-4 items-center">
        <div className="font-bold flex items-center gap-4">
          <Link to="/">TMBD</Link>
          <Breadcrumbs
            items={menuItems}
            style={{ color: "white" }}
            separator
          />
        </div>

        <Button danger type="primary" onClick={handleLogout}>
          Logout
        </Button>
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

// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../context/context";
// import { Layout, Button, Breadcrumb } from "antd";
// import { type BreadcrumbsItem } from "./BreadCrumbs";
// const { Header } = Layout;

// const Navbar = () => {
//   const { logout } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <Header className="fixed top-0 left-0 w-full z-50 shadow-md">
//       <div className="bg-gray-800 text-white flex justify-between p-4 items-center">
//         <div className="font-bold flex items-center gap-4">
//           <Link to="/">TMBD</Link>
//           <Breadcrumb
//             items={menuItems.map((item) => ({
//               title: (
//                 <Link to={item.path} style={{ color: "white" }}>
//                   {item.title}
//                 </Link>
//               ),
//             }))}
//             separator
//           />
//         </div>

//         <div>
//           <Button type="primary" danger onClick={handleLogout}>
//             Logout
//           </Button>
//         </div>
//       </div>
//     </Header>
//   );
// };

// export default Navbar;
// export const menuItems: BreadcrumbsItem[] = [
//   { title: "Home", path: "/" },
//   { title: "MovieList", path: "/movie-list" },
//   { title: "PersonList", path: "/person-list" },
// ];
