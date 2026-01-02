import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

export type BreadcrumbsItem = {
  title: string;
  path: string;
};

type BreadcrumbProps = {
  separator?: React.ReactNode;
  items: BreadcrumbsItem[];
};

const Breadcrumbs = ({ items, separator }: BreadcrumbProps) => {
  return (
    <Breadcrumb
      items={items.map((item) => ({
        title: <Link to={item.path}>{item.title}</Link>,
      }))}
      separator={separator}
    />
  );
};

export default Breadcrumbs;
