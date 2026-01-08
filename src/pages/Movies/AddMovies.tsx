import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import MovieForm from "../../components/Movies/MovieForm";
import Breadcrumbs from "../../components/BreadCrumbs";

import { createMovie } from "../../backend/MutateMovie";
import { QueryMovies } from "../../backend/QueryMovie";

import type {
  CreateMovieResponse,
  EditMovieInput,
  MovieInput,
} from "../../constants/types";

const AddMovies = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<MovieInput | EditMovieInput>({
    adult: undefined,
    budget: undefined,
    originalLanguage: "",
    originalTitle: "",
    title: "",
    overview: "",
    releaseDate: undefined,
    revenue: undefined,
    runtime: undefined,
    status: "",
    tagline: "",
    credits: [],
  });

  const [createMovieMutation, { loading, error }] =
    useMutation<CreateMovieResponse>(createMovie, {
      refetchQueries: [
        {
          query: QueryMovies,
          variables: {
            filter: { skip: 0, limit: 10 },
            sort: { field: "createdAt", order: "DESC" },
          },
        },
      ],
      awaitRefetchQueries: true,
      onCompleted: () => {
        message.success("Movie created successfully 🎉");
        navigate("/movie-list");
      },
      onError: (err) => {
        message.error(err.message || "Something went wrong");
      },
    });

  const handleSubmit = (values: MovieInput) => {
    console.log(values.credits);

    const payload: MovieInput = {
      ...values,
      budget: Number(values.budget),
      revenue: Number(values.revenue),
      runtime: Number(values.runtime),
      releaseDate: values.releaseDate,
      credits: values.credits,
    };

    createMovieMutation({
      variables: {
        data: payload,
      },
    });
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { title: "Home", path: "/" },
          { title: "Add Movie", path: "/movie/create" },
        ]}
      />

      <MovieForm
        title="Add Movie"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AddMovies;
// import { useState } from "react";
// import MovieForm from "../../components/Movies/MovieForm";
// import type {
//   CreateMovieResponse,
//   EditMovieInput,
//   MovieFormInput,
//   MovieInput,
// } from "../../constants/types";
// import { useMutation } from "@apollo/client/react";
// import { createMovie } from "../../backend/MutateMovie";
// import { useNavigate } from "react-router-dom";
// import Breadcrumbs from "../../components/BreadCrumbs";
// import { message } from "antd";
// import { QueryMovies } from "../../backend/QueryMovie";
// import { v4 as uuidv4 } from "uuid";
// const AddMovies = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<MovieInput | EditMovieInput>({
//     adult: undefined,
//     budget: undefined,
//     originalLanguage: "",
//     originalTitle: "",
//     title: "",
//     overview: "",
//     releaseDate: undefined,
//     revenue: undefined,
//     runtime: undefined,
//     status: "",
//     tagline: "",
//     credits: [],
//   });

//   const [create, { error, loading }] = useMutation<CreateMovieResponse>(
//     createMovie,
//     {
//       refetchQueries: [
//         {
//           query: QueryMovies,
//           variables: {
//             filter: {
//               skip: 0,
//               limit: 10,
//             },
//             sort: {
//               field: "createdAt",
//               order: "DESC",
//             },
//           },
//         },
//       ],
//       awaitRefetchQueries: true,
//       onCompleted: (data) => {
//         console.log("Movie created:", data);
//         navigate("/movie-list");
//         message.success("Movie created successfully 🎉");
//       },
//       onError: () => message.error(error?.message || "Something went wrong"),
//     }
//   );

//   // const handleSubmit = () => {
//   const handleSubmit = (values: MovieFormInput) => {
//     console.log(values);
//     console.log(values.creditsIds?.map((id) => ({ person: { id } })));
//     const { creditsIds, ...rest } = values;
//     create({
//       variables: {
//         data: {
//           ...rest,
//           budget: Number(values.budget),
//           revenue: Number(values.revenue),
//           runtime: Number(values.runtime),
//           credits: values.creditsIds?.map((personId) => ({
//             id:uuidv4(),
//             person: { id: personId },
//           })),
//         },
//       },
//     });
//   };

//   return (
//     <div>
//       <Breadcrumbs
//         items={[
//           { title: "Home", path: "/" },
//           { title: "Add Movie", path: "/movie/create" },
//         ]}
//       />
//       {/* <button onClick={handleSubmit}>submit</button> */}
//       <MovieForm
//         title="Add Movie"
//         formData={formData}
//         setFormData={setFormData}
//         handleSubmit={handleSubmit}
//         loading={loading}
//         error={error}
//       />
//     </div>
//   );
// };

// export default AddMovies;
