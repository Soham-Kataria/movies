import { useQuery } from "@apollo/client/react";
import type { MoviesQueryResult } from "../constants/types";
import { QueryMovies } from "../backend/QueryMovie";
import { Spin, Alert } from "antd";
import Breadcrumbs from "../components/BreadCrumbs";
import Cards from "../components/Movies/Cards";

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
  const movies = data?.movies.data;
  // const movies = undefined;
  if (loading)
    return (
      <div className="flex justify-center items-center w-full mt-10">
        <Spin size="large" />
      </div>
    );

  return (
    <>
      <div className="p-2 mx-2">
        <Breadcrumbs items={[{ title: "Home", path: "/" }]} />
      </div>
      {error && <Alert type="error" title={error.message} />}
      <section className="w-full px-4 mb-4 mx-auto max-w-7xl">
        <h1 className="text-3xl mb-4">Home Page</h1>
        <Cards movies={movies} />
      </section>
    </>
  );
};

export default Home;
