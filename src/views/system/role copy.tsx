import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    width: "20%",
    sorter: true, // 排序
    render: (name) => {
      return name.first + "-" + name.last;
    },
  },
  {
    title: "Gender",
    dataIndex: "gender",
    width: "20%",
    filters: [
      { text: "Male", value: "男" },
      { text: "Female", value: "女" },
    ],
  },
  { title: "Email", dataIndex: "email" },
];

export default function Role() {
  const [loading, setLoading] = useState(false);
  // 表格的 dataSource
  const [data, setData] = useState<DataType[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 200,
  });

  /**
   * 分页、排序、筛选变化时触发
   */
  const handleChange = (pagination, filters, sorter) => {
    console.log("handleChange pagination", pagination);
    console.log("handleChange filters", filters);
    console.log("handleChange sorter", sorter);

    setPagination(pagination);
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const url = `https://randomuser.me/api?page=${pagination.current}&results=${pagination.pageSize}`;
      fetch(url)
        .then((response) => response.json())
        .then((resp) => {
          console.log("resp", resp);

          setData(resp.results);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [pagination]);

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        onChange={handleChange}
      />
    </div>
  );
}
