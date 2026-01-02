import { Button, Input } from "antd";

import type { LoginProps } from "../constants/types";

const RegisterComp = ({ formData, setFormData, handleSubmit }: LoginProps) => {
  return (
    <div>
      <form
        action="submit"
        className="w-120 border-2 flex flex-col p-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" >Email: </label>
        <Input
          id="email"
          value={formData.email}
          type="text"
          className="border m-2"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <label htmlFor="password">Password: </label>
        <Input
          id="password"
          value={formData.password}
          type="text"
          className="border m-2"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <Button className="border">Submit</Button>
      </form>
    </div>
  );
};

export default RegisterComp;
