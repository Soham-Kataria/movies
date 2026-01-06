import { Card, Typography, Alert, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { QueryMovie } from "../../backend/QueryMovie";
import type { MovieQueryResponse } from "../../constants/types";

const { Title, Text } = Typography;

type MovieCardProps = {
  id: string;
};

const MovieCard = ({ id }: MovieCardProps) => {
  const navigate = useNavigate();

  const { data, error } = useQuery<MovieQueryResponse>(QueryMovie, {
    variables: { id },
  });

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
  
  return (
    <Card
      hoverable
      className="flex flex-col justify-between items-center  max-w-60 h-85 shadow-md rounded-lg"
      onClick={redirect}
    >
      <div className="flex justify-center mb-1">
        <Image
          className="border w-full max-h-45 mx-auto overflow-hidden"
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
      </div>
    </Card>
  );
};

export default MovieCard;
