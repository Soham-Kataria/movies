import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
// import { Outlet, useLocation, useParams } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Search from "../components/Search";

// const Layout = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [input, setInput] = useState("");
//   const [isFilterDiv, setIsFilterDiv] = useState(false);

//   const handleSearch = (value: string) => {
//     setSearchQuery(value);
//   };

//   const location = useLocation();
//   const { id } = useParams();

//   const showSearch =
//     location.pathname.includes("/create") ||
//     location.pathname.includes(`${id}`) ||
//     location.pathname.includes("/edit");
//   const isMoviePath = location.pathname.startsWith("/movies-card");

//   return (
//     <div>
//       <Navbar />
//       <hr />

//       {!showSearch && (
//         <div className="flex items-center justify-end gap-4">
//           <Search
//             className="max-w-sm"
//             placeholder="Search Movie by Name"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onSearch={() => handleSearch(input)}
//             path={isMoviePath ? "movies-card" : "person"}
//             label={isMoviePath ? "movie" : "person"}
//           />
//         </div>
//       )}

//       <Outlet context={{ searchQuery, isFilterDiv, setIsFilterDiv }} />
//     </div>
//   );
// };

// export default Layout;
