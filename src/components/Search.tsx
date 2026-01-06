import { Input } from "antd";

type SearchPropsType = {
  className?: string;
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

const Search = ({
  className,
  value,
  placeholder,
  onChange,
}: SearchPropsType) => {


  return (
    <div className="flex items-center justify-end gap-4">
      <Input.Search
        id="search-input"
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        allowClear
      />
    </div>
  );
};

export default Search;
