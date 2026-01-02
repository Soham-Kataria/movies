// import { Button, Input } from "antd";
// import { useNavigate } from "react-router-dom";

// type SearchInput = {
//   searchInput: string;
//   setSearchInput: React.Dispatch<React.SetStateAction<string>>;
// };

// const SearchPerson = ({ searchInput, setSearchInput }: SearchInput) => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex items-center justify-end gap-4">
//       <Input.Search
//         className="max-w-sm"
//         placeholder="Search Movie by Name"
//         value={searchInput}
//         onChange={(e) => setSearchInput(e.target.value)}
//       />

//       <Button
//         type="default"
//         variant="solid"
//         color="magenta"
//         className="m-2"
//         onClick={() => navigate("/person/create")}
//       >
//         Add Person
//       </Button>
//     </div>
//   );
// };

// export default SearchPerson;
