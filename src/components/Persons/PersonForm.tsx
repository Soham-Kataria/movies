import { Form, Button, Input, Select } from "antd";
import { useEffect } from "react";
import { GenderType, type CreatePersonInput, type EditPersonInput } from "../../constants/types";

type PersonFormProps = {
  title: string;
  formData: CreatePersonInput | EditPersonInput;
  setFormData: React.Dispatch<React.SetStateAction<CreatePersonInput|EditPersonInput>>;
  handleSubmit: (data: CreatePersonInput) => void;
};

const PersonForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
}: PersonFormProps) => {
  const [form] = Form.useForm();

  /* Sync external state → AntD form */
  useEffect(() => {
    form.setFieldsValue({
      ...formData,
      popularity: Number(formData.popularity) || 0,
    });
  }, [formData, form]);

  /* Sync AntD form → external state */
  const onValuesChange = (_: any, allValues: CreatePersonInput) => {
    setFormData({
      ...allValues,
      popularity: Number(allValues.popularity) || 0,
      adult: Boolean(allValues.adult),
    });
  };

  const onFinish = (values: CreatePersonInput) => {
    handleSubmit({
      ...values,
      popularity: Number(values.popularity),
      adult: Boolean(values.adult),
    });
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
              Fill in the person details below
            </p>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Full name" />
            </Form.Item>

            <Form.Item
              label="Known For Department"
              name="knownForDepartment"
              rules={[{ required: true }]}
            >
              <Input placeholder="Acting, Directing, etc." />
            </Form.Item>
          </div>

          {/* Gender & Popularity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select gender"
                options={[
                  { value: GenderType.MALE, label: "Male" },
                  { value: GenderType.FEMALE, label: "Female" },
                  { value: GenderType.OTHER, label: "Other" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Popularity"
              name="popularity"
              rules={[{ required: true }]}
            >
              <Input placeholder="e.g. 45.6" />
            </Form.Item>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Birthday" name="birthday">
              <Input placeholder="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item label="Deathday" name="deathday">
              <Input placeholder="YYYY-MM-DD" />
            </Form.Item>
          </div>

          {/* Biography */}
          <Form.Item label="Biography" name="biography">
            <Input.TextArea rows={4} placeholder="Short biography" />
          </Form.Item>

          {/* Location & Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Place of Birth" name="placeOfBirth">
              <Input placeholder="City, Country" />
            </Form.Item>

            <Form.Item label="Homepage" name="homePage">
              <Input placeholder="https://example.com" />
            </Form.Item>
          </div>

          {/* Flags */}
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

          {/* Submit */}
          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-lg text-lg"
            >
              Save Person
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default PersonForm;

// import React from 'react'
// import type { CreatePersonInput } from '../../constants/types'
// import { Button, Form } from 'antd';

// type PersonFormProps = {
//     formData: CreatePersonInput;
//     setFormData: React.Dispatch<React.SetStateAction<CreatePersonInput>>
//     handleSubmit: () =>Promise<void>
// }

// const PersonForm = ({formData,setFormData,handleSubmit}:PersonFormProps) => {
//   return (
//     <Form>
//         <Button onClick={handleSubmit}>Submit</Button>
//     </Form>
//   )
// }

// export default PersonForm
