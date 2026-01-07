import { Button, Select, Form } from "antd";
import type { FilterInput, FilterProps } from "../../constants/types";
import { useEffect } from "react";

const Filter = ({ input, setInput, handleFilter }: FilterProps) => {
  const [form] = Form.useForm<FilterInput>();
  

  useEffect(() => {
    form.setFieldsValue(input);
    console.log(input);
  }, [input, form]);

  const onFinish = (values: FilterInput) => {
    setInput(values);
    handleFilter(values);
  };
  

  return (
    <div className="w-105 rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-slate-200 p-5 shadow-lg">
      <Form
        form={form}
        layout="vertical"
        size="middle"
        onFinish={onFinish}
      >
        {/* Sort By */}
        <Form.Item
          label="Sort By"
          name="field"
          className="mb-4"
        >
          <Select
            placeholder="Select field"
            options={[
              { value: "releaseDate", label: "Release Date" },
              { value: "createdAt", label: "Created At" },
              { value: "updatedAt", label: "Updated At" },
              { value: "popularity", label: "Popularity" },
              { value: "voteAverage", label: "Vote Average" },
            ]}
          />
        </Form.Item>

        {/* Order */}
        <Form.Item
          label="Order"
          name="order"
          className="mb-6"
        >
          <Select
            placeholder="Select order"
            options={[
              { value: "ASC", label: "Ascending" },
              { value: "DESC", label: "Descending" },
            ]}
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" className="px-6">
            Apply Filters
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Filter;
