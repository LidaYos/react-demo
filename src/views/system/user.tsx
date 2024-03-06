import { ProTable, type ProColumns } from "@ant-design/pro-components";
import { SystemUser, getSystemUser } from "../../api/system";

export default function User() {
  const columns: ProColumns<SystemUser>[] = [
    { title: "用户名", dataIndex: "username" },
    { title: "姓名", dataIndex: "name", search: false },
    { title: "昵称", dataIndex: "nickName", search: false },
    { title: "角色", dataIndex: "roleName", search: false },
  ];

  return (
    <ProTable
      pagination={{ defaultPageSize: 2 }}
      columns={columns}
      request={async (params) => {
        console.log("request params", params);
        // 调用接口
        const resp = await getSystemUser({
          page: params.current,
          size: params.pageSize,
          keyWord: params.username,
        });

        // 最后，必须返回一个包含有 data 、success、total 字段的对象
        return {
          data: resp.list, // 表格数据
          success: true, // 是否成功
          total: resp.pagination.total, // 数据总条数
        };
      }}
    />
  );
}
