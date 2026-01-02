import { useLazyQuery } from "@apollo/client/react";
import { QueryPersons } from "../../backend/QueryPerson";
import type { FilterInput, Person, PersonList } from "../../constants/types";
import { Button, Pagination, Table } from "antd";
import type { PaginationProps } from "antd";
import { useEffect, useState } from "react";
import Search from "../../components/Search";
import PersonCard from "../../components/Persons/PersonCard";
import { useSearchParams } from "react-router-dom";
import Filter from "../../components/Movies/Filter";
import Breadcrumbs from "../../components/BreadCrumbs";

const PersonsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNo = Number(searchParams.get("page")) || 1;

  const [searchInput, setSearchInput] = useState("");
  const [filterInput, setFilterInput] = useState<FilterInput>({});
  const [searchQuery] = useState("");

  const pageSize = 10;

  const [listPersons, { data, error, loading, refetch }] =
    useLazyQuery<PersonList>(QueryPersons);

  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    if (data?.listPersons.data) {
      setPersons(data.listPersons.data);
    }
  }, [data]);

  useEffect(() => {
    listPersons({
      variables: {
        filter: { limit: pageSize, skip: (pageNo - 1) * pageSize },
        sort: {
          field: "createdAt",
          order: "DESC",
        },
      },
    });
  });

  const filteredPersons = searchQuery
    ? persons.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : persons;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "HomePage",
      dataIndex: "homePage",
      key: "homePage",
      render: (value: string) =>
        value ? (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          "-"
        ),
    },
    {
      title: "Detials",
      key: "Detials",
      render: (_: unknown, record: Person) => <PersonCard id={record.id} />,
    },
  ];
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };
  const [isFilterDiv, setIsFilterDiv] = useState(false);

  const handleFilter = async () => {
    await refetch({
      variables: {
        filter: { limit: filterInput.limit, skip: filterInput.skip },
        sort: {
          field: filterInput.field,
          order: filterInput.order,
        },
      },
    });
    setIsFilterDiv(false);
  };

  return (
    <>
      <div className="p-2 mx-2">
        <Breadcrumbs
          items={[
            { title: "Home", path: "/" },
            {
              title: `Person List`,
              path: `/person-list`,
            }]
          }
        />
      </div>
      <div className="mx-auto max-w-7xl flex flex-col gap-6">
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Person List</h1>

          <div className="flex items-center justify-end gap-4 px-4 py-2">
            <div className="flex items-center gap-2">
              <Search
                className="max-w-sm"
                placeholder="Search Person by Name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                // onSearch={() => handleSearch(searchInput)}
                path={"person"}
                label={"Person"}
              />
            </div>

            {isFilterDiv && (
              <Filter
                handleFilter={handleFilter}
                input={filterInput}
                setInput={setFilterInput}
              />
            )}

            <Button
              color="cyan"
              variant="solid"
              onClick={() => setIsFilterDiv((prev) => !prev)}
            >
              Filters
            </Button>
          </div>
        </div>

        <div>
          <Table
            columns={columns}
            dataSource={filteredPersons}
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
        </div>
      </div>
    </>
  );
};

export default PersonsList;
