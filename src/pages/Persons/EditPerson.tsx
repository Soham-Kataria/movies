import { useMutation, useQuery } from "@apollo/client/react";
import { editPerson } from "../../backend/MutatePerson";
import {
  type EditPersonInput,
  type CreatePersonResponse,
  type PersonDetails,
} from "../../constants/types";
import PersonForm from "../../components/Persons/PersonForm";
import { useState } from "react";
import { QueryPerson } from "../../backend/QueryPerson";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";

const EditPerson = () => {
  const params = useParams();
  const { id } = params;
  const { data } = useQuery<PersonDetails>(QueryPerson, {
    variables: {
      id,
    },
  });

  const person = data?.person.data;
  console.log(person?.homePage);

  const [formData, setFormData] = useState<EditPersonInput>({
    tmdbId: person?.tmdbId,
    birthday: person?.birthday,
    knownForDepartment: person?.knownForDepartment,
    deathday: person?.deathday,
    name: person?.name,
    alsoKnownAs: person?.alsoKnownAs,
    gender: person?.gender,
    biography: person?.biography,
    popularity: person?.popularity,
    placeOfBirth: person?.placeOfBirth,
    profilePath: person?.profilePath,
    homePage: person?.homePage,
    adult: person?.adult,
  });

  const navigate = useNavigate();
  const [EditPerson, { error, loading }] = useMutation<CreatePersonResponse>(
    editPerson,
    {
      onCompleted: () => {
        navigate("/person-list");
      },
      refetchQueries: ["Persons"],
    }
  );
  const handleSubmit = async () => {
    await EditPerson({
      variables: {
        id,
        data: {
          ...formData,
          alsoKnownAs: formData.alsoKnownAs,
        },
      },
    });
  };

  return (
    <div className="bg-linear-to-br from-slate-100 to-slate-200">
      <div className="p-2 px-4">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            {
              title: `${person?.name || "Movie"} Details`,

              path: `/person/${id}`,
            },
          ]}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <PersonForm
        title="Edit Person Detial"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditPerson;
