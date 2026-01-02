import {
  Card,
  Typography,
  Divider,
  Button,
  Rate,
  Tag,
  Image,
  Descriptions,
  Spin,
  Alert,
  Carousel,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { QueryMovie } from "../../backend/QueryMovie";
import type { MovieQueryResponse } from "../../constants/types";
import DeleteMovie from "../../components/Movies/DeleteMovie";
import Breadcrumbs from "../../components/BreadCrumbs";

const { Title, Text, Paragraph, Link } = Typography;

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<MovieQueryResponse>(QueryMovie, {
    variables: { id },
    skip: !id,
  });

  const location = useLocation();

  const from = location.state?.from;

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto p-6">
        <Card>
          <Spin />
        </Card>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-5xl mx-auto p-6">
        <Alert type="error" title={error.message} />
      </section>
    );
  }

  const movie = data?.movie?.data;
  if (!movie) return null;
  console.log(from);

  return (
    <>
      <div className="p-2 mx-2">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            { title: "Movies", path: "/movie-list" },
            { title: `${movie.title||"Movie"} Details`, path: `/movies/${id}` },
          ]}
        />
      </div>
      <section className="max-w-5xl mx-auto p-6">
        <Card styles={{ body: { backgroundColor: "#f8fafc" } }}>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <Title level={2}>{movie.title}</Title>
              {movie.tagline && <Text type="secondary">{movie.tagline}</Text>}
            </div>
            <div className="flex items-center gap-2">
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
              <Button
                icon={<ArrowLeftOutlined />}
                variant="solid"
                color="blue"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </div>
          </div>

          <Divider />

          {/* Poster + Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <Image
            src={movie.imageUrl}
            alt={movie.title}
            fallback="/no-poster.png"
            className="rounded"
            preview
          /> */}

            <div className="w-full max-w-68 mx-auto">
              <Carousel arrows infinite={false}>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Image
                    key={i}
                    src={
                      movie.imageUrl ||
                      "https://cdn-app.sealsubscriptions.com/shopify/public/img/promo/no-image-placeholder.png"
                    }
                    alt={movie.title}
                    fallback="/no-poster.png"
                    className="rounded"
                    preview
                  />
                ))}
              </Carousel>
            </div>

            <div className="md:col-span-2">
              <Descriptions
                bordered
                size="small"
                column={1}
                styles={{ label: { fontWeight: 600 } }}
              >
                <Descriptions.Item label="Original Title">
                  {movie.originalTitle || "N/A"}
                </Descriptions.Item>

                <Descriptions.Item label="Original Language">
                  {movie.originalLanguage || "N/A"}
                </Descriptions.Item>

                <Descriptions.Item label="Status">
                  {movie.status || "N/A"}
                </Descriptions.Item>

                <Descriptions.Item label="Adult Content">
                  {movie.adult ? "Yes" : "No"}
                </Descriptions.Item>

                <Descriptions.Item label="Video">
                  {movie.video ? "Yes" : "No"}
                </Descriptions.Item>

                <Descriptions.Item label="Release Date">
                  {movie.releaseDate
                    ? new Date(movie.releaseDate).toDateString()
                    : "N/A"}
                </Descriptions.Item>

                <Descriptions.Item label="Runtime">
                  {movie.runtime ? `${movie.runtime} min` : "N/A"}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>

          {/* Ratings */}
          <Divider />
          <div className="flex items-center gap-4">
            <Rate allowHalf disabled value={(movie.voteAverage ?? 0) / 2} />
            <Text strong>{movie.voteAverage ?? 0}/10</Text>
            <Text type="secondary">({movie.voteCount ?? 0} votes)</Text>
          </div>

          {/* Popularity */}
          <Text type="secondary">
            Popularity Score: {movie.popularity?.toFixed(2) ?? "N/A"}
          </Text>

          {/* Overview */}
          {movie.overview && (
            <>
              <Divider />
              <Title level={4}>Overview</Title>
              <Paragraph>{movie.overview}</Paragraph>
            </>
          )}

          {/* Genres */}
          {movie?.genres?.length && movie.genres.length > 0 && (
            <>
              <Divider />
              <Title level={4}>Genres</Title>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Tag key={genre.id}>{genre.name}</Tag>
                ))}
              </div>
            </>
          )}

          {/* Financials */}
          <Divider />
          <Title level={4}>Financials</Title>
          <Descriptions bordered size="small" column={2}>
            <Descriptions.Item label="Budget">
              {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
            </Descriptions.Item>

            <Descriptions.Item label="Revenue">
              {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
            </Descriptions.Item>
          </Descriptions>

          {/* Streaming & Links */}
          {(movie.homePage || movie.streamingOn) && (
            <>
              <Divider />
              <Title level={4}>Links</Title>
              {movie.homePage && (
                <Paragraph>
                  Homepage:{" "}
                  <Link href={movie.homePage} target="_blank">
                    {movie.homePage}
                  </Link>
                </Paragraph>
              )}

              {movie.streamingOn && (
                <Paragraph>
                  Streaming On: <Text strong>{movie.streamingOn}</Text>
                </Paragraph>
              )}
            </>
          )}

          {/* System Metadata */}
          <Divider />
          <Text type="secondary">
            Created At:{" "}
            {movie.createdAt
              ? new Date(movie.createdAt).toLocaleString()
              : "N/A"}
          </Text>
        </Card>
      </section>
    </>
  );
};

export default MovieDetails;

// import {
//   Card,
//   Rate,
//   Typography,
//   Divider,
//   Button,
//   Spin,
//   Alert,
//   Tag,
//   Image,
// } from "antd";
// import { ArrowLeftOutlined } from "@ant-design/icons";
// import { useNavigate, useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client/react";
// import { QueryMovie } from "../backend/QueryData";
// import type { MovieQueryResponse } from "../constants/types";

// const { Title, Text, Paragraph } = Typography;

// const MovieDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const { data, loading, error } = useQuery<MovieQueryResponse>(QueryMovie, {
//     variables: { id },
//     skip: !id,
//   });

//   console.log(data);

//   if (loading) {
//     return (
//       <section className="max-w-4xl mx-auto p-6">
//         <Card>
//           <Spin />
//         </Card>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="max-w-4xl mx-auto p-6">
//         <Alert type="error" title={error.message} />
//       </section>
//     );
//   }

//   if (!data?.movie?.data) return null;

//   const movie = data.movie.data;

//   return (
//     <section className="max-w-4xl mx-auto p-6">
//       <Image src={movie.imageUrl} alt={movie.title} width={200} preview />

//       <Card styles={{ body: { padding: 24 } }}>
//         {/* Header */}
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <Title level={3}>{movie.title}</Title>
//             {movie.tagline && <Text type="secondary">{movie.tagline}</Text>}
//           </div>

//           <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
//             Back
//           </Button>
//         </div>

//         {/* Rating */}
//         {movie.voteAverage !== undefined && (
//           <div className="flex items-center gap-4 mb-4">
//             <Rate allowHalf disabled value={movie.voteAverage / 2} />
//             <Text strong>{movie.voteAverage}/10</Text>
//             <Text type="secondary">({movie.voteCount ?? 0} votes)</Text>
//           </div>
//         )}

//         {/* Meta */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <Text>
//             <strong>Release:</strong>{" "}
//             {movie.releaseDate
//               ? new Date(movie.releaseDate).toDateString()
//               : "N/A"}
//           </Text>
//           <Text>
//             <strong>Runtime:</strong>{" "}
//             {movie.runtime ? `${movie.runtime} min` : "N/A"}
//           </Text>
//           <Text>
//             <strong>Status:</strong> {movie.status ?? "N/A"}
//           </Text>
//           <Text>
//             <strong>Popularity:</strong> {movie.popularity?.toFixed(1) ?? "N/A"}
//           </Text>
//         </div>

//         {/* Overview */}
//         {movie.overview && (
//           <>
//             <Divider />
//             <Paragraph>{movie.overview}</Paragraph>
//           </>
//         )}

//         {/* Genres */}
//         {movie.genres?.length ? (
//           <>
//             <Divider />
//             <div className="mb-4">
//               <Text strong>Genres:</Text>
//               <div className="mt-2 flex flex-wrap gap-2">
//                 {movie.genres.map((g) => (
//                   <Tag key={g.id}>{g.name}</Tag>
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : null}

//         {/* Languages & Countries */}
//         <Divider />
//         <Text>
//           <strong>Languages:</strong>{" "}
//           {movie.languages?.map((l) => l.englishName).join(", ") || "N/A"}
//         </Text>
//         <br />
//         <Text>
//           <strong>Countries:</strong>{" "}
//           {movie.countries?.map((c) => c.englishName).join(", ") || "N/A"}
//         </Text>

//         {/* Financials */}
//         <Divider />
//         <Text>
//           <strong>Budget:</strong>{" "}
//           {movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}
//         </Text>
//         <br />
//         <Text>
//           <strong>Revenue:</strong>{" "}
//           {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
//         </Text>

//         {/* Cast Preview */}
//         {movie.castAndCrew?.length ? (
//           <>
//             <Divider />
//             <Title level={5}>Top Cast</Title>
//             {movie.castAndCrew.slice(0, 5).map((person) => (
//               <Text key={person.id} className="block">
//                 {person.name} — {person.character}
//               </Text>
//             ))}
//           </>
//         ) : null}
//       </Card>
//     </section>
//   );
// };

// export default MovieDetails;
