import { useState } from "react";
import MovieForm from "../../components/Movies/MovieForm";
import type {
  CreateMovieResponse,
  EditMovieInput,
  MovieInput,
} from "../../constants/types";
import { useMutation } from "@apollo/client/react";
import { createMovie } from "../../backend/MutateMovie";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";

const AddMovies = () => {
  const initialFormData: MovieInput = {
    adult: false,
    budget: 0,
    originalLanguage: "",
    originalTitle: "",
    title: "",
    overview: "",
    releaseDate: "",
    revenue: 0,
    runtime: 0,
    status: "",
    tagline: "",
  };

  const [formData, setFormData] = useState<MovieInput | EditMovieInput>(
    initialFormData
  );
  const navigate = useNavigate();

  const [create, { loading, error }] = useMutation<CreateMovieResponse>(
    createMovie,
    {
      onCompleted: (data) => {
        console.log("Movie created:", data);
        navigate("/");
        alert("Movie created successfully 🎉");
      },
      refetchQueries: ["Movies"],
    }
  );

  const handleSubmit = (values: MovieInput) => {
    create({
      variables: {
        data: {
          ...values,
          adult: Boolean(values.adult),
          budget: Number(values.budget),
          revenue: Number(values.revenue),
          runtime: Number(values.runtime),
        },
      },
    });
  };

  return (
    <div className="bg-linear-to-br from-slate-100 to-slate-200">
      {error && <p>{error.message}</p>}
      <div className="p-2 mx-2">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            { title: "Add Movie", path: `/movies-card/create` },
          ]}
        />
      </div>

      <MovieForm
        title={"Add Movie"}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default AddMovies;

// import { useContext, useState } from "react";
// import MovieForm from "../components/MovieForm";
// import type { CreateMovieResponse, MovieInput } from "../constants/types";
// import { useMutation } from "@apollo/client/react";
// import { createMovie } from "../backend/MutateData";
// import { UserContext } from "../context/context";

// const AddMovies = () => {
//   const {token} =useContext(UserContext)
//   const [formData, setFormData] = useState<MovieInput>({
//     adult: false,
//     budget: 0,
//     originalLanguage: "",
//     originalTitle: "",
//     title: "",
//     overview: "",
//     releaseDate: "",
//     revenue: 0,
//     runtime: 0,
//     status: "",
//     tagline: "",
//   });

//   const [create, { loading, error }] =
//     useMutation<CreateMovieResponse>(createMovie,{
//     onCompleted: (data) => {
//       console.log("Movie created:", data);
//       alert("Movie created successfully 🎉");
//     }});

//   const handleSubmit = () => {
//     try {
//       create({
//         variables: {
//           date: {
//             adult: formData.adult,
//             budget: formData.budget,
//             originalLanguage: formData.originalLanguage,
//             originalTitle: formData.originalTitle,
//             title: formData.title,
//             overview: formData.overview,
//             releaseDate: formData.releaseDate,
//             revenue: formData.revenue,
//             runtime: formData.runtime,
//             status: formData.status,
//             tagline: formData.tagline,
//           },
//         },
//       });
//     } catch (error) {}
//   };

//   return (
//     <div>
//       {token}
//       {error && <p>{error.message}</p>}

//       <MovieForm
//         title={"Add Movie"}
//         formData={formData}
//         setFormData={setFormData}
//         handleSubmit={handleSubmit}
//       />
//       {loading && <p>Loading...</p>}
//     </div>
//   );
// };

// export default AddMovies;
