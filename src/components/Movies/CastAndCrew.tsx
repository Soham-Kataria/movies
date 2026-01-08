import { Form, Input, Select, Button } from "antd";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import type { PersonList } from "../../constants/types";
import { QueryPersons } from "../../backend/QueryPerson";
import useDebounce from "../../utils/Debounce";

type Props = {
  name: number;
  remove: () => void;
};

const CastAndCrew = ({ name, remove }: Props) => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const form = Form.useFormInstance();
  const creditType = Form.useWatch(["credits", name, "creditType"], form);

  const { data, loading } = useQuery<PersonList>(QueryPersons, {
    variables: {
      filter: { limit: 1000 },
      sort: { field: "createdAt", order: "DESC" },
    },
  });

  const persons = data?.listPersons.data ?? [];

  
  const filteredPersons = debouncedSearch
  ? persons.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
)
: persons;

  return (
    <div className="border rounded-xl bg-gray-50 p-4 mb-4">
      {/* Top row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Credit Type"
          name={[name, "creditType"]}
          rules={[{ required: true }]}
        >
          <Select disabled />
        </Form.Item>

        <Form.Item
          label="Person"
          name={[name, "person"]}
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Select person"
            loading={loading}
            onSearch={setSearchText}
            filterOption={false}
            value={filteredPersons}
            options={filteredPersons.map((p) => ({
              value: p.id,
              label: p.name,
            }))}
          />
        </Form.Item>
      </div>

      {/* CAST fields */}
      {creditType === "CAST" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Form.Item label="Character" name={[name, "character"]}>
            <Input placeholder="Character name" />
          </Form.Item>

          <Form.Item label="Character Adult" name={[name, "characterAdult"]}>
            <Select
              allowClear
              options={[
                { value: true, label: "Yes" },
                { value: false, label: "No" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Character's Gender" name={[name, "characterGender"]}>
            <Select
              allowClear
              options={[
                { value: "MALE", label: "Male" },
                { value: "FEMALE", label: "Female" },
                { value: "OTHER", label: "Other" },
              ]}
            />
          </Form.Item>
        </div>
      )}

      {/* CREW fields */}
      {creditType === "CREW" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item label="Department" name={[name, "department"]}>
            <Input placeholder="Department" />
          </Form.Item>

          <Form.Item label="Job" name={[name, "job"]}>
            <Input placeholder="Job title" />
          </Form.Item>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <Button danger onClick={remove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CastAndCrew;
