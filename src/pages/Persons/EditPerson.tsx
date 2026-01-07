import { useMutation, useQuery } from "@apollo/client/react";
import { editPerson } from "../../backend/MutatePerson";
import {
  type EditPersonInput,
  type CreatePersonResponse,
  type PersonDetails,
} from "../../constants/types";
import PersonForm from "../../components/Persons/PersonForm";
import { useEffect, useState } from "react";
import { QueryPerson, QueryPersons } from "../../backend/QueryPerson";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import dayjs from "dayjs";
import { message } from "antd";

const EditPerson = () => {
  const params = useParams();
  const { id } = params;
  const { data } = useQuery<PersonDetails>(
    QueryPerson,
    {
      variables: {
        id,
      },
    }
  );

  const person = data?.person.data;

  const [formData, setFormData] = useState<EditPersonInput>({});

  // ✅ Populate formData AFTER person is fetched
  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name,
        knownForDepartment: person.knownForDepartment,
        gender: person.gender,
        biography: person.biography,
        popularity: person.popularity,
        placeOfBirth: person.placeOfBirth,
        profilePath: person.profilePath,
        homePage: person.homePage,
        adult: person.adult,
        alsoKnownAs: person.alsoKnownAs?.join(", "),
        birthday: person.birthday ? dayjs(person.birthday) : undefined,
        deathday: person.deathday ? dayjs(person.deathday) : undefined,
      });
    }
  }, [person]);
  const navigate = useNavigate();
  const pageSize = 10;

  const [EditPerson, { error, loading }] = useMutation<CreatePersonResponse>(
    editPerson,
    {
      onCompleted: () => {
        navigate("/person-list");
        message.success(`${person?.name}'s details edited successfully`);
      },
      onError: () => {
        message.error(error?.message);
      },
      refetchQueries: [
        {
          query: QueryPersons,
          variables: {
            filter: { limit: pageSize },
            sort: {
              field: "createdAt",
              order: "DESC",
            },
          },
        },
      ],
    }
  );
  const handleSubmit = async () => {
    await EditPerson({
      variables: {
        id,
        data: {
          ...formData,
          alsoKnownAs: formData.alsoKnownAs,
          birthday: formData.birthday?.format("YYYY-MM-DD"),
          deathday: formData.deathday?.format("YYYY-MM-DD"),
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
      <PersonForm
        title="Edit Person Detial"
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default EditPerson;
