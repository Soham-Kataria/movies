import { Button, Form, Input } from "antd";
import type { LoginProps } from "../constants/types";

const LoginComp = ({
  loading,
  error,
  formData,
  setFormData,
  handleSubmit,
}: LoginProps) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Form
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <div className="m-6">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="py-2 px-3"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            validateStatus={error ? "error" : ""}
            help={error ? "Incorrect password" : ""}
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="py-2 px-3"
            />
          </Form.Item>

          <Form.Item className="mt-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2"
              size="large"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default LoginComp;