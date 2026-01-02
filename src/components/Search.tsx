import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

type SearchPropsType = {
  className?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  path?: string;
  label: string;
};

const Search = ({
  className,
  value,
  placeholder,
  onChange,
  path,
  label,
}: SearchPropsType) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-4">
      <Input.Search
        id="search-input"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        allowClear
      />

      <Button
        type="default"
        variant="solid"
        color="magenta"
        className="m-2"
        onClick={() => navigate(`/${path}/create`)}
      >
        Add {label}
      </Button>
    </div>
  );
};

export default Search;

// import { Button, Input } from "antd";
// import { useLazyQuery } from "@apollo/client/react";
// import { QueryMovies } from "../../backend/QueryMovie";
// import type { MoviesQueryResult } from "../../constants/types";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// type SearchPropsType = {
//   className: string;
//   placeholder?: string;
// };

// const SearchMovie = ({ className, placeholder }: SearchPropsType) => {
//   const [searchInput, setSearchInput] = useState("");
//   const navigate = useNavigate();
//   const [searchMovie, { data: movies, loading, error }] =
//     useLazyQuery<MoviesQueryResult>(QueryMovies);

//   console.log(searchInput);
//   const onSearch = async (searchInput: string) => {
//     await searchMovie({
//       variables: {
//         filter: {
//           limit: 100,
//           skip: 0,
//         },
//         sort: {
//           field: "popularity",
//           order: "ASC",
//         },
//       },
//     });
//     const searched = movies?.movies?.data.filter((m) =>
//       m.title?.toLowerCase().includes(searchInput.toLowerCase())
//     );
//     console.log(movies, loading, error);
//     console.log(searched);
//   };
//   return (
//     <div className="flex items-center justify-end gap-4">
//       <Input.Search
//         className={className}
//         placeholder={placeholder}
//         value={searchInput}
//         onChange={(e) => setSearchInput(e.target.value)}
//         onSearch={onSearch}
//       />
//       <Button
//         type="default"
//         variant="solid"
//         color="magenta"
//         className="m-2"
//         onClick={() => navigate("/movies-card/create")}
//       >
//         Add Movie
//       </Button>
//     </div>
//   );
// };

// export default SearchMovie;
