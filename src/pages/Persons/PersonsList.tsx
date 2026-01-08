import { useQuery } from "@apollo/client/react";
import { QueryPersons } from "../../backend/QueryPerson";
import type { Person, PersonList } from "../../constants/types";
import { Avatar, Button, message, Pagination, Spin, Table } from "antd";
import type { PaginationProps } from "antd";
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs";
import useDebounce from "../../utils/Debounce";
import DeletePerson from "../../components/Persons/DeletePerson";
import { UserOutlined } from "@ant-design/icons";

const PersonsList = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const pageNo = Number(searchParams.get("page")) || 1;

  const [searchInput, setSearchInput] = useState("");

  const pageSize = 10;
  const debouncedValue = useDebounce(searchInput, 500);

  const { data, error, loading } = useQuery<PersonList>(QueryPersons, {
    variables: {
      filter: {
        limit: pageSize,
        skip: (pageNo - 1) * pageSize,
        searchTerm: debouncedValue,
      },
      sort: {
        field: "createdAt",
        order: "DESC",
      },
    },
  });

  useEffect(() => {
    if (debouncedValue) {
      console.log("Performing API call with:", debouncedValue);
    }
  }, [debouncedValue]);

  const person = data?.listPersons.data;

  const columns = [
    {
      title: "Profile",
      dataIndex: "profilePath",
      key: "profilePath",
      render: (_: unknown, record: Person) => (
        <Avatar src={record.profilePath} icon={<UserOutlined />} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Popularity",
      dataIndex: "popularity",
      key: "popularity",
    },
    {
      title: "knownForDepartment",
      dataIndex: "knownForDepartment",
      key: "knownForDepartment",
    },
    {
      title: "Also Known As",
      dataIndex: "alsoKnownAs",
      key: "alsoKnownAs",
    },
    {
      title: "DOB",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Actions",
      key: "Actions",
      render: (_: unknown, record: Person) => (
        <div className="flex items-center w-fit gap-4">
          <Button
            variant="solid"
            type="primary"
            onClick={() => navigate(`/person/${record.id}`)}
          >
            Person Detail
          </Button>
          <Button
            variant="solid"
            type="primary"
            onClick={() => navigate(`/person/${record.id}/edit`)}
          >
            Edit Person Detail
          </Button>
          <DeletePerson id={record.id} />
        </div>
      ),
    },
  ];
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };
  if (error) message.error(error.message);
  return (
    <>
      <div className="p-2 mx-2">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            {
              title: `Person List`,
              path: `/person-list`,
            },
          ]}
        />
      </div>
      <div className="mx-auto max-w-7xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Person List</h1>

          <div className="flex items-center justify-end gap-4 px-4 py-2">
            <div className="flex items-center gap-2">
              <Search
                className="max-w-sm"
                placeholder="Search Person by Name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                label={"Person"}
              />
              <Button
                type="default"
                variant="solid"
                color="magenta"
                className="m-2"
                onClick={() => navigate(`/person/create`)}
              >
                Add Person
              </Button>
            </div>
          </div>
        </div>

        <div>
          {loading ? (
            <Spin fullscreen />
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={person}
                rowKey="id"
                pagination={false}
                bordered
              />

              <div className="flex justify-center my-6">
                <Pagination
                  current={pageNo}
                  pageSize={pageSize}
                  total={data?.listPersons.count}
                  onShowSizeChange={onShowSizeChange}
                  onChange={(newPage) => {
                    setSearchParams({ page: String(newPage) });
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PersonsList;

// import { useQuery } from "@apollo/client/react";
// import { QueryPersons } from "../../backend/QueryPerson";
// import type {
//   PersonFilterInput,
//   Person,
//   PersonList,
// } from "../../constants/types";
// import { Button, message, Pagination, Select, Space, Spin, Table } from "antd";
// import type { PaginationProps, TableColumnsType, TableProps } from "antd";
// import { useEffect, useState } from "react";
// import Search from "../../components/Search";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Breadcrumbs from "../../components/BreadCrumbs";
// import useDebounce from "../../utils/Debounce";
// import DeletePerson from "../../components/Persons/DeletePerson";

// const PersonsList = () => {
//   const navigate = useNavigate();

//   const [searchParams, setSearchParams] = useSearchParams();

//   const pageNo = Number(searchParams.get("page")) || 1;

//   const [searchInput, setSearchInput] = useState("");

//   const [filter, setFilter] = useState<PersonFilterInput>({
//     fieldName: "name",
//     field: "createdAt",
//     order: "DESC",
//   });

//   const pageSize = 10;
//   const debouncedValue = useDebounce(searchInput, 500);

//   const { data, error, loading, refetch } = useQuery<PersonList>(QueryPersons, {
//     variables: {
//       filter: {
//         limit: 10,
//         skip: (pageNo - 1) * pageSize,
//         searchTerm: debouncedValue,
//       },
//       sort: {
//         field: filter.field,
//         order: filter.order,
//       },
//     },
//   });

//   const [persons, setPersons] = useState<Person[]>([]);
//   useEffect(() => {
//     if (data?.listPersons.data) {
//       setPersons(data.listPersons.data);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (debouncedValue) {
//       console.log("Performing API call with:", debouncedValue);
//     }
//   }, [debouncedValue]);

//   const columns: TableColumnsType<Person> = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       filters: [
//         {
//           text: "Order",
//           value: "order",
//           children: [
//             { text: "ASC", value: "ASC" },
//             { text: "DESC", value: "DESC" },
//           ],
//         },
//         {
//           text: "Field",
//           value: "field",
//           children: [
//             { text: "createdAt", value: "createdAt" },
//             { text: "updatedAt", value: "updatedAt" },
//             { text: "name", value: "name" },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Popularity",
//       dataIndex: "popularity",
//       key: "popularity",
//       // sorter: true,
//     },
//     {
//       title: "knownForDepartment",
//       dataIndex: "knownForDepartment",
//       key: "knownForDepartment",
//     },
//     {
//       title: "Also Known As",
//       dataIndex: "alsoKnownAs",
//       key: "alsoKnownAs",
//     },
//     {
//       title: "DOB",
//       dataIndex: "birthday",
//       key: "birthday",
//     },
//     {
//       title: "Actions",
//       key: "Actions",
//       render: (_: unknown, record: Person) => (
//         <div className="flex items-center w-fit gap-4">
//           <Button
//             variant="solid"
//             type="primary"
//             onClick={() => navigate(`/person/${record.id}`)}
//           >
//             Person Detail
//           </Button>
//           <Button
//             variant="solid"
//             type="primary"
//             onClick={() => navigate(`/person/${record.id}/edit`)}
//           >
//             Edit Person Detail
//           </Button>
//           <DeletePerson id={record.id} />
//         </div>
//       ),
//     },
//   ];

//   const onChange: TableProps<Person>["onChange"] = (
//     _pagination,
//     filters,
//     sorter
//   ) => {
//     if (!sorter || Array.isArray(sorter)) return;
//     console.log(sorter.field);

//     console.log(String(filters.name));
//     setFilter((prev) => ({
//       field: filters.name ? String(filters.name).split(",")[1] : prev.field,
//       order: filters.name ? String(filters.name).split(",")[0] : prev.order,
//     }));

//     refetch({
//       filter: {
//         limit: 10,
//         skip: (pageNo - 1) * pageSize,
//         searchTerm: debouncedValue,
//       },
//       sort: {
//         field: filter.field,
//         order: filter.order,
//       },
//     });
//   };

//   const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
//     current,
//     pageSize
//   ) => {
//     console.log(current, pageSize);
//   };
//   if (error) message.error(error.message);
//   return (
//     <>
//       <div className="p-2 mx-2">
//         <Breadcrumbs
//           items={[
//             { title: "Home", path: "/" },
//             {
//               title: `Person List`,
//               path: `/person-list`,
//             },
//           ]}
//         />
//       </div>
//       <div className="mx-auto max-w-7xl flex flex-col gap-6">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-semibold">Person List</h1>

//           <div className="flex items-center justify-end gap-4 px-4 py-2">
//             <div className="flex items-center gap-2">
//               <Search
//                 className="max-w-sm"
//                 placeholder="Search Person by Name"
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 label={"Person"}
//               />
//               <Button
//                 type="default"
//                 variant="solid"
//                 color="magenta"
//                 className="m-2"
//                 onClick={() => navigate(`/person/create`)}
//               >
//                 Add Person
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div>
//           {loading ? (
//             <Spin fullscreen />
//           ) : (
//             <>
//               <Table
//                 columns={columns}
//                 dataSource={persons}
//                 rowKey="id"
//                 pagination={false}
//                 onChange={onChange}
//                 bordered
//               />

//               <div className="flex justify-center my-6">
//                 <Pagination
//                   current={pageNo}
//                   pageSize={pageSize}
//                   total={data?.listPersons.count}
//                   onShowSizeChange={onShowSizeChange}
//                   onChange={(newPage) => {
//                     setSearchParams({ page: String(newPage) });
//                   }}
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PersonsList;

// // title: () => (
// //   <Space>
// //     Name
// //     <Select
// //       size="small"
// //       value={filter.order}
// //       onChange={(order) => setFilter({ ...filter, order })}
// //       options={[
// //         { title: "Asc", value: "ASC" },
// //         { title: "Desc", value: "DESC" },
// //       ]}
// //     />
// //     <Select
// //       size="small"
// //       value={filter.field}
// //       onChange={(field) => setFilter({ ...filter, field })}
// //       options={[
// //         { title: "Name", value: "name" },
// //         { title: "Created At", value: "createdAt" },
// //         { title: "Updated At", value: "updatedAt" },
// //       ]}
// //     />
// //   </Space>
// // ),
