import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="relative">
      <Navbar />
      <hr />
      <div className="mt-11">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
