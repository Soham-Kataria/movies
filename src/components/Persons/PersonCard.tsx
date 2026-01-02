import { useQuery } from "@apollo/client/react";
import { Typography, Space, Skeleton, Button } from "antd";
import { QueryPerson } from "../../backend/QueryPerson";
import type { PersonDetails } from "../../constants/types";
import { useNavigate } from "react-router-dom";
import DeletePerson from "./DeletePerson";

const { Text } = Typography;

type PersonCardProps = {
  id: string | undefined;
};

const PersonCard = ({ id }: PersonCardProps) => {
  const { data, error, loading } = useQuery<PersonDetails>(QueryPerson, {
    variables: { id },
  });

  const navigate = useNavigate();
  if (loading) {
    return <Skeleton active avatar paragraph={{ rows: 3 }} />;
  }

  if (error || !data?.person?.data) {
    return <Text type="danger">Failed to load person</Text>;
  }

  const person = data.person.data;

  return (
    <Space
      size={4}
      style={{
        width: "100%",
        display: "flex",
        gap: "20px",
        justifyContent: "space-between",
      }}
    >
      <section className="flex gap-4">
        <Text type="secondary">Deparment - {person.knownForDepartment}</Text>

        <Text>
          Popularity: <strong>{person.popularity}</strong>
        </Text>

        <Text type="secondary">Also known as: {person.alsoKnownAs}</Text>
      </section>
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="solid"
          type="primary"
          onClick={() => navigate(`/person/${id}`)}
        >
          View Details
        </Button>
        <Button
          variant="solid"
          type="primary"
          onClick={() => navigate(`/person/${id}/edit`)}
        >
          Edit Person Detail
        </Button>
        <DeletePerson id={id} />
      </div>
    </Space>
  );
};

export default PersonCard;
