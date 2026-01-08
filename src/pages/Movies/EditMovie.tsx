import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../../components/Movies/MovieForm";
import { useState } from "react";
import type {
  MovieQueryResponse,
  EditMovieInput,
  MovieSuccessResponse,
  MovieInput,
} from "../../constants/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { editMovie } from "../../backend/MutateMovie";
import { QueryMovie, QueryMovies } from "../../backend/QueryMovie";
import Breadcrumbs from "../../components/BreadCrumbs";
import dayjs from "dayjs";
import { message } from "antd";

const EditMovie = () => {
  const params = useParams();
  const { id } = params;

  const { data: search } = useQuery<MovieQueryResponse>(QueryMovie, {
    variables: { id },
  });

  const movie = search?.movie.data;

  const [formData, setFormData] = useState<MovieInput | EditMovieInput>({
    adult: movie?.adult,
    budget: movie?.budget,
    originalLanguage: movie?.originalLanguage,
    originalTitle: movie?.originalTitle,
    title: movie?.title,
    overview: movie?.overview,
    releaseDate: movie?.releaseDate ? dayjs(movie.releaseDate) : undefined,
    revenue: movie?.revenue,
    runtime: movie?.runtime,
    status: movie?.status,
    tagline: movie?.tagline,
    credits: movie?.castAndCrew,
  });
  const navigate = useNavigate();

  const [EditMovie, { data, loading, error }] =
    useMutation<MovieSuccessResponse>(editMovie, {
      onCompleted: () => {
        message.success(`${movie?.title} Details Updated`);
        navigate("/movie-list");
      },
      onError: () => {
        message.error(error?.message || `Something Went Worng`);
      },
      refetchQueries: [
        {
          query: QueryMovies,
          variables: {
            filter: {
              skip: 0,
              limit: 10,
            },
            sort: {
              field: "createdAt",
              order: "DESC",
            },
          },
        },
      ],
      awaitRefetchQueries: true,
    });

  const handleSubmit = (values: MovieInput) => {
    console.log(values);

    EditMovie({
      variables: {
        id,
        data: {
          adult: values.adult,
          budget: values.budget,
          originalLanguage: values.originalLanguage,
          originalTitle: values.originalTitle,
          title: values.title,
          overview: values.overview,
          releaseDate: values.releaseDate,
          revenue: values.revenue,
          runtime: values.runtime,
          status: values.status,
          tagline: values.tagline,
          credits: values.credits.map((c: any) => ({
            ...c,
            person: {
              name: c.person.label,
              id: c.person.value,
            },
          })),
        },
      },
    });
    // console.log(values, data?.updateMovie.data.id);
  };

  return (
    <div className="bg-linear-to-br from-slate-100 to-slate-200">
      <div className="p-2 mx-2">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            {
              title: `Edit ${movie?.title || "Movie"}`,

              path: `/movies-card/${id}/edit`,
            },
          ]}
        />
      </div>

      <MovieForm
        title={"Edit Movie"}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default EditMovie;
