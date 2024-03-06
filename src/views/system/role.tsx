import { Button, Popconfirm, Space, Table, message } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  type SystemRole,
  getSystemRole,
  delSystemRole,
} from "../../api/system";
import RoleDrawer, { type RoleDrawerRef } from "./components/role-drawer";
import AuthButton from "../../components/auth-button";

export default function Role() {
  const columns: ColumnsType<SystemRole> = [
    { title: "名称", dataIndex: "name", width: "20%" },
    { title: "标识", dataIndex: "label", width: "20%" },
    { title: "备注", dataIndex: "remark", width: "20%" },
    {
      title: "创建时间",
      dataIndex: "createTime",
      width: "20%",
      sorter: true,
      defaultSortOrder: "descend",
    },
    { title: "更新时间", dataIndex: "updateTime", width: "20%", sorter: true },
    {
      title: "操作",
      dataIndex: "opt",
      render: (_, row) => (
        <Space>
          <Button onClick={() => drawerRef.current?.open(row)}>编辑</Button>
          <Popconfirm
            title="提示"
            description="你确认要删除嘛"
            onConfirm={() => handleDelete(row.id)}
          >
            <Button>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 接口请求中
  const [loading, setLoading] = useState(false);
  // 接口请求参数
  const [params, setParams] = useState({
    page: 1, // 页码
    size: 4, // 每页显示条数
    order: "createTime", // 排序字段
    sort: "desc", // 排序方式
  });
  // 表格的 dataSource
  const [data, setData] = useState<SystemRole[]>([]);
  // 接口返回的数据总条数
  const [total, setTotal] = useState(1);

  // 勾选的数据
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  // drawerRef
  const drawerRef = useRef<RoleDrawerRef>(null);

  const handleChange: TableProps<SystemRole>["onChange"] = (
    pagination,
    filters,
    sorter: any
  ) => {
    console.log("handleChange", sorter);

    // 修改 params
    setParams({
      ...params,
      page: pagination.current!,
      order: sorter.field,
      sort: sorter.order ? sorter.order.replace(/end$/, "") : "",
    });
  };

  // 选中项发生变化时的回调
  const handleSelect = (keys: any[]) => {
    console.log("handleSelect", keys);
    setSelectedRowKeys(keys);
  };

  // 处理删除
  const handleDelete = (id?: number) => {
    delSystemRole(id ? [id] : selectedRowKeys).then((resp) => {
      console.log("resp", resp);
      // 删除成功
      message.success("删除成功");
      // 更新表格数据
      //    1. 重新获取下数据
      fetchData();
      //    2. 直接操作本地的数据
      // setData((data) =>
      //   data.filter((item) => !selectedRowKeys.includes(item.id))
      // );
    });
  };

  // 获取数据
  const fetchData = useCallback(() => {
    setLoading(true);
    getSystemRole(params)
      .then((resp) => {
        console.log("resp", resp);

        setData(resp.list);
        setTotal(resp.pagination.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <Space>
        <Button type="primary" onClick={() => fetchData()}>
          刷新
        </Button>
        <AuthButton auth="base:sys:role:add">
          <Button type="primary" onClick={() => drawerRef.current?.open()}>
            新增
          </Button>
        </AuthButton>
        <Button
          type="default"
          danger
          disabled={selectedRowKeys.length <= 0}
          onClick={() => handleDelete()}
        >
          删除
        </Button>
      </Space>

      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{ defaultPageSize: params.size, total: total }}
        rowSelection={{
          onChange: handleSelect,
        }}
        onChange={handleChange}
      />

      <RoleDrawer ref={drawerRef} onSuccess={() => fetchData()} />
    </div>
  );
}
