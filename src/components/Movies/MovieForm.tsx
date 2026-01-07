import { Form, Button, Input, Select, DatePicker } from "antd";
import { useEffect } from "react";
import type { FormPropsType, MovieInput } from "../../constants/types";
// import { useQuery } from "@apollo/client/react";
// import { QueryPersons } from "../../backend/QueryPerson";
// import useDebounce from "../../utils/Debounce";

const MovieForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
  loading,
}: FormPropsType) => {
  const [form] = Form.useForm();
  // const [personList, setPersonList] = useState<Person[]>();
  // const [searchText] = useState("");
  // const debouncedSearch = useDebounce(searchText, 500);

  // const { data: personData} = useQuery<PersonList>(
  //   QueryPersons,
  //   {
  //     variables: {
  //       filter: { limit: 1000 },
  //       sort: {
  //         field: "createdAt",
  //         order: "DESC",
  //       },
  //     },
  //   }
  // );

  // const data = debouncedSearch
  //   ? personData?.listPersons.data
  //       .filter((p) => p.name.toLowerCase().includes(searchText.toLowerCase()))
  //       .map((p) => p)
  //   : personData?.listPersons.data.map((p) => p);

  // useEffect(() => {
  //   setPersonList(data);
  // }, [personData, debouncedSearch]);

  useEffect(() => {
    const formattedData = {
      ...formData,
      adult: formData.adult ?? undefined,
      budget: (formData.budget) ?? undefined,
      revenue: (formData.revenue) ?? undefined,
      runtime: (formData.runtime) ?? undefined,
    };
    form.setFieldsValue(formattedData);
  }, [formData, form]);

  const onValuesChange = (_: any, allValues: any) => {
    setFormData(allValues);
  };

  const onFinish = (values: MovieInput) => {
    const payload = {
      ...values,
      adult: Boolean(values.adult),
      budget: Number(values.budget),
      revenue: Number(values.revenue),
      runtime: Number(values.runtime),
    };
    handleSubmit(payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 p-2">
      <Form
        form={form}
        layout="vertical"
        className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-xl"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <div className="m-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the movie details below
            </p>
          </div>

          <Form.Item
            label="Movie Title"
            name="title"
            rules={[{ required: true, message: "Movie title is required" }]}
          >
            <Input placeholder="Enter movie title" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Original Title"
              name="originalTitle"
              rules={[
                { required: true, message: "Original title is required" },
              ]}
            >
              <Input placeholder="Enter original title" />
            </Form.Item>

            <Form.Item
              label="Tagline"
              name="tagline"
              rules={[{ required: true, message: "Tagline is required" }]}
            >
              <Input placeholder="Movie tagline" />
            </Form.Item>
          </div>

          <Form.Item
            label="Overview"
            name="overview"
            rules={[{ required: true, message: "Overview is required" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Brief description of the movie"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Release Date"
              name="releaseDate"
              rules={[{ required: true, message: "Release date is required" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Status is required" }]}
            >
              <Select
                placeholder="Select"
                options={[
                  { value: "upcoming", label: "Upcoming" },
                  { value: "released", label: "Released" },
                ]}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Adult"
              name="adult"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select
                placeholder="Select"
                allowClear
                options={[
                  { value: undefined, label: "Adult ot not", disabled: true },
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Original Language"
              name="originalLanguage"
              rules={[{ required: true, message: "Language is required" }]}
            >
              <Input placeholder="e.g. en" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              label="Runtime (min)"
              name="runtime"
              rules={[
                { required: true, message: "Runtime is required" },
                {
                  validator: (_, value) =>
                    isNaN(Number(value))
                      ? Promise.reject("Must be a number")
                      : Promise.resolve(),
                },
              ]}
            >
              <Input placeholder="e.g. 130" />
            </Form.Item>

            <Form.Item
              label="Budget"
              name="budget"
              rules={[
                { required: true, message: "Budget is required" },
                {
                  validator: (_, value) =>
                    isNaN(Number(value))
                      ? Promise.reject("Must be a number")
                      : Promise.resolve(),
                },
              ]}
            >
              <Input placeholder="e.g. 150000000" />
            </Form.Item>

            <Form.Item
              label="Revenue"
              name="revenue"
              rules={[
                { required: true, message: "Revenue is required" },
                {
                  validator: (_, value) =>
                    isNaN(Number(value))
                      ? Promise.reject("Must be a number")
                      : Promise.resolve(),
                },
              ]}
            >
              <Input placeholder="e.g. 450000000" />
            </Form.Item>
            {/* <Form.Item label="credits" name="creditsIds">
              <Select
                mode="multiple"
                showSearch
                allowClear
                placeholder="Select"
                loading={personLoading}
                onSearch={setSearchText}
                filterOption={false}
                options={
                  personList
                    ? personList?.map((person) => ({
                        value: person.id,
                        label: person.name,
                      }))
                    : []
                }
              />
            </Form.Item> */}
          </div>
          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-lg text-lg"
              loading={loading}
            >
              Save Movie
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default MovieForm;
