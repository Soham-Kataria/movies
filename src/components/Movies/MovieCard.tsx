import { Card, Rate, Typography, Button, Spin, Alert, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { QueryMovie } from "../../backend/QueryMovie";
import type { MovieQueryResponse } from "../../constants/types";
import DeleteMovie from "./DeleteMovie";

const { Title, Text } = Typography;

type MovieCardProps = {
  id: string;
};

const MovieCard = ({ id }: MovieCardProps) => {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<MovieQueryResponse>(QueryMovie, {
    variables: { id },
  });

  if (loading) {
    return (
      <Card className="mb-4">
        <Spin />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mb-4">
        <Alert type="error" title={error.message} />
      </Card>
    );
  }

  if (!data?.movie?.data) return null;

  const movie = data.movie.data;

  const redirect = () => {
    navigate(`/movie-cards/${id}`);
  };
  // console.log(movie.imageUrl);

  return (
    <Card hoverable className="mb-4 shadow-md rounded-lg" onClick={redirect}>
      <div className="flex justify-between gap-4">
        <div className="w-full h-full max-w-43.75 mx-auto">
          <Image
            className="border"
            loading="eager"
            src={movie.imageUrl}
            fallback="https://cdn-app.sealsubscriptions.com/shopify/public/img/promo/no-image-placeholder.png"
          />
        </div>
        <div className="flex-1">
          <Title level={4}>{movie.title}</Title>

          <Text type="secondary">
            Language: {movie.originalLanguage?.toUpperCase()}
          </Text>

          <div className="mt-2 flex gap-6">
            <Text>
              Release:{" "}
              {movie.releaseDate
                ? new Date(movie.releaseDate).getFullYear()
                : "N/A"}
            </Text>
            <Text>{movie.runtime} mins</Text>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Rate
              disabled
              allowHalf
              value={
                typeof movie.voteAverage === "number"
                  ? movie.voteAverage / 2
                  : 0
              }
            />
            <Text strong>{movie.voteAverage ?? "N/A"}/10</Text>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Button
              className="z-50"
              type="primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movies-card/${id}/edit`);
              }}
            >
              Edit Movie
            </Button>

            <DeleteMovie id={id} />
          </div>
        </div>

        <Button
          className=""
          color="blue"
          type="default"
          variant="solid"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/movie-cards/${id}`);
          }}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default MovieCard;

// // import { Card, Rate, Typography, Button, Spin, Alert } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@apollo/client/react";
// import { QueryMovie } from "../backend/QueryData";
// import type { MovieListItem } from "../constants/types";

// type MovieCardProps = {
//   id: string;
// };

// const MovieCard = ({ id }: MovieCardProps) => {
//   const navigate = useNavigate();

//   const { data, loading, error } = useQuery<MovieListItem>(QueryMovie, {
//     variables: { id: id },
//   });

//   console.log(data?.movie);

//   const handleClick = () => {
//     navigate(`/movie-details/${id}`);
//   };

//   return <></>;
// };

// export default MovieCard;
