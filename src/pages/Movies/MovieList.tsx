import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import type { FilterInput, MoviesQueryResult } from "../../constants/types";
import { QueryMovies } from "../../backend/QueryMovie";
import Cards from "../../components/Movies/Cards";
import Breadcrumbs from "../../components/BreadCrumbs";
import Search from "../../components/Search";
import { Button, Spin } from "antd";
import Filter from "../../components/Movies/Filter";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDiv, setIsFilterDiv] = useState(false);

  const [input, setInput] = useState<FilterInput>({
    field: "createdAt",
    order: "DESC",
  });

  let PAGE_SIZE = 10;
  const { data, loading, error, fetchMore } = useQuery<MoviesQueryResult>(
    QueryMovies,
    {
      variables: {
        filter: {
          skip: 0,
          limit: PAGE_SIZE,
          searchTerm: searchQuery || null,
        },
        sort: {
          field: input.field,
          order: input.order,
        },
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const currentLength = data?.movies.data.length;

  useEffect(() => {
    if (!data) return;
    const total = data.movies.count;
    const loaded = data.movies.data.length;
    setHasMore(loaded < total);
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500); // debounce delay (ms)

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  const loadMore = async () => {
    if (!currentLength || currentLength >= data.movies.count) {
      setHasMore(false);
      return;
    }

    await fetchMore({
      variables: {
        filter: {
          skip: currentLength,
          limit: PAGE_SIZE,
          searchTerm: searchQuery || null,
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
  };

  const movies = data?.movies.data;
  // console.log(data?.movies.count);
  

  const handleFilter = async () => {
    setHasMore(true);

    await fetchMore({
      variables: {
        filter: {
          skip: 0,
          limit: PAGE_SIZE,
          searchTerm: searchQuery || null,
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

  return (
    <div>
      {error && <p>{error.message}</p>}
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

            <Button
              type="default"
              variant="solid"
              color="magenta"
              className="m-2"
              onClick={() => navigate(`/movie/create`)}
            >
              Add Movie
            </Button>

            {/* Filter Button + Dropdown */}
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
        <InfiniteScroll
          dataLength={movies?.length ?? 0}
          next={loadMore}
          hasMore={hasMore}
          scrollThreshold={1}
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
          <Cards movies={movies} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MovieList;
