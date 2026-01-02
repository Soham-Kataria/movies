import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../../components/Movies/MovieForm";
import { useState } from "react";
import type {
  MovieQueryResponse,
  EditMovieInput,
  MovieSuccessResponse,
} from "../../constants/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { editMovie } from "../../backend/MutateMovie";
import { QueryMovie } from "../../backend/QueryMovie";
import Breadcrumbs from "../../components/BreadCrumbs";

const EditMovie = () => {
  const params = useParams();
  const { id } = params;

  const { data: search } = useQuery<MovieQueryResponse>(QueryMovie, {
    variables: { id },
  });

  const movie = search?.movie.data;

  const [formData, setFormData] = useState<EditMovieInput>({
    adult: movie?.adult,
    budget: movie?.budget,
    originalLanguage: movie?.originalLanguage,
    originalTitle: movie?.originalTitle,
    title: movie?.title,
    overview: movie?.overview,
    releaseDate: movie?.releaseDate,
    revenue: movie?.revenue,
    runtime: movie?.runtime,
    status: movie?.status,
    tagline: movie?.tagline,
  });
  const navigate = useNavigate();

  const [EditMovie, { data, loading, error }] =
    useMutation<MovieSuccessResponse>(editMovie, {
      onCompleted: () => {
        navigate("/");
      },
      refetchQueries: ["Movies"],
    });

  const handleSubmit = () => {
    EditMovie({
      variables: {
        id,
        data: {
          adult: formData.adult,
          budget: formData.budget,
          originalLanguage: formData.originalLanguage,
          originalTitle: formData.originalTitle,
          title: formData.title,
          overview: formData.overview,
          releaseDate: formData.releaseDate?.toString(),
          revenue: formData.revenue,
          runtime: formData.runtime,
          status: formData.status,
          tagline: formData.tagline,
        },
      },
    });
    console.log(formData, data?.updateMovie.data.id);
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

      {loading && <p>Loading...</p>}
      <MovieForm
        title={"Edit Movie"}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      {error && (
        <p>
          {error.name} - {error.message}
        </p>
      )}
    </div>
  );
};

export default EditMovie;
