import { Card, Image, Typography } from "antd";
import type { Movie } from "../../constants/types";
import { useNavigate } from "react-router-dom";
import DeleteMovie from "./DeleteMovie";

type CardProps = {
  movies: Movie[] | undefined;
};
const Cards = ({ movies }: CardProps) => {
  const { Title, Text } = Typography;

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 gap-5">
      {movies?.map((movie) => (
        <Card
          hoverable
          className="max-w-60 shadow-md rounded-lg"
          onClick={(e) => {
            e.stopPropagation;
            navigate(`/movie-cards/${movie.id}`);
          }}
          key={movie.id}
        >
          <section className="flex justify-center mb-1">
            <Image
              className="border w-full max-h-45 mx-auto overflow-hidden"
              loading="eager"
              src={movie.imageUrl}
              fallback="https://cdn-app.sealsubscriptions.com/shopify/public/img/promo/no-image-placeholder.png"
            />
          </section>
          <section className="flex-1">
            <Title level={4}>{movie.title}</Title>

            <Text type="secondary">
              Language: {movie.originalLanguage?.toUpperCase()}
            </Text>

            <section className="mt-2 flex gap-6">
              <Text>
                Release:{" "}
                {movie.releaseDate
                  ? new Date(movie.releaseDate).getFullYear()
                  : "N/A"}
              </Text>
              <Text>{movie.runtime} mins</Text>
            </section>
          </section>
          {/* <DeleteMovie id={movie.id}/> */}
        </Card>
      ))}
    </div>
  );
};

export default Cards;
