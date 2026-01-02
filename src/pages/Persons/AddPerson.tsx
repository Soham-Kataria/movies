import { useMutation } from "@apollo/client/react";
import { CreatePerson } from "../../backend/MutatePerson";
import {
  GenderType,
  type CreatePersonInput,
  type CreatePersonResponse,
  type EditPersonInput,
} from "../../constants/types";
import PersonForm from "../../components/Persons/PersonForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";

const AddPerson = () => {
  // const MALE = "MALE"
  const [formData, setFormData] = useState<CreatePersonInput | EditPersonInput>(
    {
      tmdbId: "",
      birthday: "",
      knownForDepartment: "",
      deathday: "",
      name: "",
      alsoKnownAs: [""],
      gender: GenderType.MALE,
      biography: "",
      popularity: 0,
      placeOfBirth: "",
      profilePath: "",
      homePage: "",
      adult: false,
    }
  );

  const navigate = useNavigate();
  const [Person, { error, loading }] = useMutation<CreatePersonResponse>(
    CreatePerson,
    {
      onCompleted: () => {
        navigate("/person-list");
      },
      refetchQueries: ["Persons"],
    }
  );

  const handleSubmit = async () => {
    await Person({
      variables: {
        data: {
          ...formData,
          alsoKnownAs: formData.alsoKnownAs,
        },
      },
    });
  };

  return (
    <div className="bg-linear-to-br from-slate-100 to-slate-200">
      {error && <p>{error.message}</p>}
      <div className="p-2 px-4">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            {
              title: `Add Person`,
              path: `/person`,
            },
          ]}
        />

      </div>
      <PersonForm
        title="Add a Person"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default AddPerson;
