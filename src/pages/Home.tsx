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
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl mb-4">Home Page</h1>
          <div className="grid grid-cols-5">
            {data?.movies.data.map((movie) => (
              <MovieCard key={movie.id} id={movie.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;