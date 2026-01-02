import { Form, Button, Input, Select } from "antd";
import { useEffect } from "react";
import type { FormPropsType } from "../../constants/types";

const MovieForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
}: FormPropsType) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const formattedData = {
      ...formData,
      adult: formData.adult?.toString() === "true" || formData.adult === true,
      budget: Number(formData.budget) || undefined,
      revenue: Number(formData.revenue) || undefined,
      runtime: Number(formData.runtime) || undefined,
    };
    form.setFieldsValue(formattedData);
  }, [formData, form]);

  const onValuesChange = (_: any, allValues: any) => {
    setFormData({
      ...allValues,
      adult: Boolean(allValues.adult),
      budget: allValues.budget ? Number(allValues.budget) : undefined,
      revenue: allValues.revenue ? Number(allValues.revenue) : undefined,
      runtime: allValues.runtime ? Number(allValues.runtime) : undefined,
    });
  };

  const onFinish = (values: any) => {
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
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Fill in the movie details below
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Adult"
              name="adult"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select
                placeholder="Select"
                options={[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Budget"
              name="budget"
              rules={[{ required: true, message: "Please enter budget" }]}
            >
              <Input placeholder="e.g. 150000000" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Original Language"
              name="originalLanguage"
              rules={[{ required: true, message: "Please enter language" }]}
            >
              <Input placeholder="e.g. en" />
            </Form.Item>

            <Form.Item
              label="Original Title"
              name="originalTitle"
              rules={[
                { required: true, message: "Please enter original title" },
              ]}
            >
              <Input placeholder="Enter original title" />
            </Form.Item>
          </div>

          <Form.Item
            label="Movie Title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter movie title" />
          </Form.Item>

          <Form.Item
            label="Overview"
            name="overview"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Brief description of the movie"
            />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              label="Release Date"
              name="releaseDate"
              rules={[{ required: true }]}
            >
              <Input placeholder="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
              label="Revenue"
              name="revenue"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. 450000000" />
            </Form.Item>

            <Form.Item
              label="Runtime (min)"
              name="runtime"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. 130" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select"
                options={[
                  { value: "upcoming", label: "Upcoming" },
                  { value: "released", label: "Released" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Tagline"
              name="tagline"
              rules={[{ required: true }]}
            >
              <Input placeholder="Movie tagline" />
            </Form.Item>
          </div>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-lg text-lg"
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
