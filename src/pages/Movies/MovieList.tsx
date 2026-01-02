import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { Button, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { QueryMovies } from "../../backend/QueryMovie";
import MovieCard from "../../components/Movies/MovieCard";
import Filter from "../../components/Movies/Filter";

import type {
  Movie,
  MoviesQueryResult,
  FilterInput,
} from "../../constants/types";
import Breadcrumbs from "../../components/BreadCrumbs";
import Search from "../../components/Search";

const PAGE_SIZE = 10;

const MovieList = () => {
  const [input, setInput] = useState<FilterInput>({
    field: "createdAt",
    order: "DESC",
  });

  const [isFilterDiv, setIsFilterDiv] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error, fetchMore } = useQuery<MoviesQueryResult>(
    QueryMovies,
    {
      variables: {
        filter: {
          skip: 0,
          limit: PAGE_SIZE,
        },
        sort: {
          field: input.field,
          order: input.order,
        },
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadMore = async () => {
    const currentLength = data?.movies.data.length;

    if (currentLength && currentLength >= data.movies.count) {
      setHasMore(false);
      return;
    }

    const res = await fetchMore({
      variables: {
        filter: {
          skip: currentLength,
          limit: PAGE_SIZE,
        },
        sort: {
          field: input.field,
          order: input.order,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          movies: {
            ...fetchMoreResult.movies,
            data: [...prev.movies.data, ...fetchMoreResult.movies.data],
          },
        };
      },
    });

    if (res.data && res.data.movies.data.length < PAGE_SIZE) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500); // debounce delay (ms)

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  /* ---------------- FILTER APPLY ---------------- */
  const handleFilter = async () => {
    setHasMore(true);

    await fetchMore({
      variables: {
        filter: {
          skip: 0,
          limit: PAGE_SIZE,
        },
        sort: {
          field: input.field,
          order: input.order,
        },
      },
      updateQuery: (_, { fetchMoreResult }) => {
        if (!fetchMoreResult) return _;
        return {
          movies: {
            ...fetchMoreResult.movies,
            data: fetchMoreResult.movies.data,
          },
        };
      },
    });

    setIsFilterDiv(false);
  };

  const filteredMovies = searchQuery
    ? data?.movies.data.filter((m) =>
        m.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data?.movies.data;
  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  return (
    <div>
      <div className="p-2 mx-2">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            { title: "Movie List", path: "/movie-list" },
          ]}
        />
      </div>
      <div className="mx-auto max-w-7xl flex flex-col gap-6 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Infinite Scrolling Movies</h1>
          <div className="flex items-center gap-4">
            <Search
              className="w-64"
              placeholder="Search movie by title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              label={"Movie"}
            />

            <div className="relative">
              <Button
                color="cyan"
                variant="solid"
                onClick={() => setIsFilterDiv((prev) => !prev)}
              >
                Filters
              </Button>

              {isFilterDiv && (
                <div className="absolute top-full right-0 mt-2 z-50">
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
        <div className="overflow-y:auto">
          <InfiniteScroll
            dataLength={filteredMovies?.length ?? 0}
            next={loadMore}
            hasMore={hasMore}
            loader={
              loading && (
                <div className="flex justify-center p-4">
                  <Spin />
                </div>
              )
            }
            endMessage={
              <p className="text-center text-gray-500 mt-4">
                🎉 All movies loaded
              </p>
            }
          >
            <ul className="mt-4 grid grid-cols-5 gap-4">
              {filteredMovies?.map((movie: Movie) => (
                <li key={movie.id}>
                  <MovieCard id={movie.id} />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
