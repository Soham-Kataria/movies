import { useQuery } from "@apollo/client/react";
import { useNavigate, useParams } from "react-router-dom";
import { Descriptions, Spin, Alert, Typography, Button } from "antd";
import { QueryPerson } from "../../backend/QueryPerson";
import type { Person } from "../../constants/types";
import DeletePerson from "../../components/Persons/DeletePerson";
import Breadcrumbs from "../../components/BreadCrumbs";

const { Title } = Typography;

type PersonQueryResponse = {
  person: {
    message: string;
    data: Person;
  };
};

const PersonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<PersonQueryResponse>(QueryPerson, {
    variables: { id: id },
    skip: !id,
  });

  if (loading) return <Spin size="large" />;
  if (error) return <Alert type="error" message={error.message} />;

  const person = data?.person.data;
  if (!person) return null;

  return (
    <>
      <div className="p-2 mx-2">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            { title: "Person", path: "/person-list" },
            {
              title: `${person.name || "Person"} Details`,

              path: `/person/${id}`,
            },
          ]}
        />
      </div>

      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <Title level={3}>Person Details</Title>
          <section>
            <Button
              variant="solid"
              type="primary"
              onClick={() => navigate(`/person/${id}/edit`)}
            >
              Edit Person Detail
            </Button>
            <DeletePerson id={id} />
          </section>
        </div>
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="ID">{person.id}</Descriptions.Item>
          <Descriptions.Item label="TMDB ID">{person.tmdbId}</Descriptions.Item>
          <Descriptions.Item label="Name">{person.name}</Descriptions.Item>
          <Descriptions.Item label="Gender">{person.gender}</Descriptions.Item>
          <Descriptions.Item label="Birthday">
            {person.birthday || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Deathday">
            {person.deathday || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Known For Department">
            {person.knownForDepartment}
          </Descriptions.Item>
          <Descriptions.Item label="Also Known As">
            {person.alsoKnownAs?.join(", ") || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Biography">
            {person.biography || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Popularity">
            {person.popularity}
          </Descriptions.Item>
          <Descriptions.Item label="Place of Birth">
            {person.placeOfBirth || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Homepage">
            {person.homePage ? (
              <a href={person.homePage} target="_blank" rel="noreferrer">
                {person.homePage}
              </a>
            ) : (
              "-"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Profile Path">
            {person.profilePath || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Adult">
            {person.adult ? "Yes" : "No"}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default PersonDetails;
