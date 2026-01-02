import { useQuery } from "@apollo/client/react";
import type { MoviesQueryResult } from "../constants/types";
import { QueryMovies } from "../backend/QueryMovie";
import MovieCard from "../components/Movies/MovieCard";
import { Spin, Alert } from "antd";
import Breadcrumbs from "../components/BreadCrumbs";

export type OutletContextType = {
  searchQuery: string;
  isFilterDiv: boolean;
  setIsFilterDiv: React.Dispatch<React.SetStateAction<boolean>>;
};
const Home = () => {
  const { data, loading, error } = useQuery<MoviesQueryResult>(QueryMovies, {
    variables: {
      filter: { limit: 5 },
      sort: { field: "popularity", order: "DESC" },
    },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center w-full mt-10">
        <Spin size="large" />
      </div>
    );
  if (error) return <Alert type="error" title={error.message} />;

  return (
    <>
      <div className="p-2 mx-2">
        <Breadcrumbs items={[{ title: "Home", path: "/" }]} />
      </div>
      <section className="w-full px-4 mb-4">
        <div className="mx-auto max-w-7xl flex flex-col gap-4">
          <h1 className="text-3xl">Home Page</h1>
          {data?.movies.data.map((movie) => (
            <MovieCard key={movie.id} id={movie.id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;

// import { useLazyQuery, useQuery } from "@apollo/client/react";
// import type { Movie, MoviesQueryResult } from "../constants/types";
// import { QueryMovies } from "../backend/QueryData";
// import MovieCard from "../components/MovieCard";
// import { Button, Input } from "antd";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { UserContext } from "../context/context";

// const Home = () => {
//   const { data, loading, error } = useQuery<MoviesQueryResult>(QueryMovies, {
//     variables: {
//       filter: { limit: 5 },
//       sort: { field: "popularity", order: "DESC" },
//     },
//   });

//   // const { isLoggedIn } = useContext(UserContext);

//   const [search, { data: searchResult }] =
//     useLazyQuery<MoviesQueryResult>(QueryMovies);

//   const [searchInput, setSearchInput] = useState("");
//   const onSearch = (e: string) => {
//     setSearchInput(e);
//     search({
//       variables: {
//         filter: { limit: 100 },
//         sort: { field: "popularity", order: "DESC" },
//       },
//     });
//   };
//   const movies =
//     searchInput && searchResult
//       ? searchResult.movies.data.filter(
//           (m) => m.title?.toLowerCase() === searchInput.toLowerCase()
//         )
//       : data?.movies.data;
//   const navigate = useNavigate();
//   return (
//     <section className="w-full px-4 py-6">
//       <div className="mx-auto max-w-7xl flex flex-col gap-4">
//         {error && <p>{error.message}</p>}

//         <div className="flex flex-col items-end gap-5">
//           <Input.Search
//             className="max-w-sm"
//             placeholder="Search Movie by Name"
//             onSearch={onSearch}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               onSearch(e.target.value)
//             }
//           />
//           {/* {isLoggedIn && ( */}
//             <Button
//               variant="solid"
//               color="magenta"
//               className="max-w-sm"
//               onClick={() => navigate("/movies-card/create")}
//             >
//               Add Movie
//             </Button>
//           {/* )} */}
//         </div>

//         {loading && <p>Loading...</p>}
//         {movies?.map((movie: Movie) => (
//           <li key={movie.id}>
//             <MovieCard id={movie.id} />
//           </li>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Home;
