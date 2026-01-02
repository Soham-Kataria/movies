import { useLazyQuery } from "@apollo/client/react";
import { QueryMovies } from "../../backend/QueryMovie";
import MovieCard from "../../components/Movies/MovieCard";
import Filter from "../../components/Movies/Filter";
import type { Movie, MoviesQueryResult } from "../../constants/types";
import { Button, Spin } from "antd";
import { useEffect, useState } from "react";
import type { FilterInput } from "../../constants/types";
import Search from "../../components/Search";
import Breadcrumbs from "../../components/BreadCrumbs";

const MovieCardPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [input, setInput] = useState<FilterInput>({
    limit: 10,
    field: "releaseDate",
    order: "DESC",
  });

  const [isFilterDiv, setIsFilterDiv] = useState(false);

  const [fetchMovies, { data, loading, error }] =
    useLazyQuery<MoviesQueryResult>(QueryMovies);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500); // debounce delay (ms)

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    fetchMovies({
      variables: {
        filter: { limit: input.limit },
        sort: {
          field: input.field,
          order: input.order,
        },
      },
    });
  }, []);

  const filteredMovies = searchQuery
    ? data?.movies.data.filter((m) =>
        m.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data?.movies.data;

  const handleFilter = async () => {
    await fetchMovies({
      variables: {
        filter: { limit: input.limit },
        sort: {
          field: input.field,
          order: input.order,
        },
      },
    });
    setIsFilterDiv(false); // optional UX improvement
  };

  return (
    <>
      <div className="px-2 pt-2 mx-2">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            { title: "Movie Card", path: `/movies-card` },
          ]}
        />
      </div>
      <section className="w-full px-4">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 mb-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">10 Movies (Newest First)</h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-end gap-4 py-2">
                <Search
                  className="max-w-sm"
                  placeholder="Search Movie by Name"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  // onSearch={() => handleSearch(searchInput)}
                  path={"movies-card"}
                  label={"movie"}
                />
              </div>

              <div className="relative">
                <Button
                  color="cyan"
                  variant="solid"
                  onClick={() => setIsFilterDiv((prev) => !prev)}
                >
                  Filters
                </Button>

                {isFilterDiv && (
                  <div className="absolute right-0 mt-2 z-50">
                    <Filter
                      handleFilter={handleFilter}
                      input={input}
                      setInput={setInput}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          {error && <p className="text-red-500">{error.message}</p>}
          {loading && <Spin size="large" className="mt-10" />}

          {/* Movie List */}
          <ul className="flex flex-col gap-4">
            {filteredMovies?.map((movie: Movie) => (
              <li key={movie.id}>
                <MovieCard id={movie.id} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MovieCardPage;
