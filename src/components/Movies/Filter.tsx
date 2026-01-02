import { Button, Select, Space, InputNumber } from "antd";
import type { FilterProps } from "../../constants/types";

const Filter = ({ input, setInput, handleFilter }: FilterProps) => {
  return (
    <div className="w-105 rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 to-slate-200 p-5 shadow-lg">
      <Space orientation="vertical" size="middle" className="w-full">
        {/* Limit */}
        <div className="flex items-center justify-between gap-4">
          <label className="w-24 text-sm font-medium text-slate-700">
            Limit
          </label>
          <InputNumber
            min={1}
            className="flex-1"
            placeholder="Items"
            value={input?.limit}
            onChange={(value) =>
              setInput?.((prev) => ({ ...prev, limit: value ?? 10 }))
            }
          />
        </div>
        {/* Sort By */}
        <div className="flex items-center justify-between gap-4">
          <label className="w-24 text-sm font-medium text-slate-700">
            Sort By
          </label>
          <Select
            className="flex-1"
            placeholder="Select field"
            value={input?.field}
            onChange={(value) =>
              setInput?.((prev) => ({ ...prev, field: value }))
            }
            options={[
              { value: "releaseDate", label: "Release Date" },
              { value: "createdAt", label: "Created At" },
              { value: "updatedAt", label: "Updated At" },
              { value: "popularity", label: "Popularity" },
              { value: "voteAverage", label: "Vote Average" },
            ]}
          />
        </div>
        {/* Order */}
        <div className="flex items-center justify-between gap-4">
          <label className="w-24 text-sm font-medium text-slate-700">
            Order
          </label>
          <Select
            className="flex-1"
            placeholder="Select order"
            value={input?.order}
            onChange={(value) =>
              setInput?.((prev) => ({ ...prev, order: value }))
            }
            options={[
              { value: "ASC", label: "Ascending" },
              { value: "DESC", label: "Descending" },
            ]}
          />
        </div>
        <div className="flex justify-end">
          <Button type="primary" className="px-6" onClick={handleFilter}>
            Apply Filters
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default Filter;
// import { Button, Select, Space, InputNumber } from "antd";
// import type { FilterProps } from "../../constants/types";

// const Filter = ({ input, setInput, handleFilter }: FilterProps) => {
//   return (
//     <div>
//       <div className="border rounded p-4 mb-4 z-50 bg-linear-to-br from-slate-100 to-slate-200">
//         <Space wrap>
//           <label>Limit: </label>
//           <InputNumber
//             min={1}
//             placeholder="Limit"
//             value={input?.limit}
//             onChange={(value) =>
//               setInput && setInput((prev) => ({ ...prev, limit: value ?? 10 }))
//             }
//           />

//           <label>Sort By: </label>
//           <Select
//             placeholder="Sort by"
//             style={{ width: 160 }}
//             value={input?.field}
//             onChange={(value) =>
//               setInput && setInput((prev) => ({ ...prev, field: value }))
//             }
//             options={[
//               { value: "releaseDate", label: "Release Date" },
//               { value: "createdAt", label: "createdAt" },
//               { value: "updatedAt", label: "updatedAt" },
//               { value: "popularity", label: "popularity" },
//               { value: "voteAverage", label: "voteAverage" },
//             ]}
//           />

//           <label>Order: </label>
//           <Select
//             placeholder="Order"
//             style={{ width: 140 }}
//             value={input?.order}
//             onChange={(value) =>
//               setInput && setInput((prev) => ({ ...prev, order: value }))
//             }
//             options={[
//               { value: "ASC", label: "Ascending" },
//               { value: "DESC", label: "Descending" },
//             ]}
//           />

//           <Button type="primary" onClick={handleFilter}>
//             Apply
//           </Button>
//         </Space>
//       </div>
//     </div>
//   );
// };

// export default Filter;
