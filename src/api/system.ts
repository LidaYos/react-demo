import http from "../utils/request";

export type SystemRole = {
  id: number;
  createTime: string;
  updateTime: string;
  userId: string;
  name: string;
  label: string;
  remark: string;
  menuIdList: any[];
};

export type SystemUser = {
  id: number;
  name: string;
  nickName: string;
  headImg: string;
  email: string;
  remark: string;
  status: number;
  createTime: string;
  updateTime: string;
  username: string;
  phone: string;
  roleName: string | null;
};

/**
 * 获取系统角色列表
 */
export function getSystemRole(params: any) {
  return http.post<{ list: SystemRole[]; pagination: Pagination }>(
    "/admin/base/sys/role/page",
    params
  );
}

/**
 * 删除系统角色列表
 */
export function delSystemRole(ids: number[]) {
  return http.post("/admin/base/sys/role/delete", { ids });
}

/**
 * 添加系统角色
 */
export function addSystemRole(params: object) {
  return http.post("/admin/base/sys/role/add", params);
}

/**
 * 编辑系统角色
 */
export function editSystemRole(params: object) {
  return http.post("/admin/base/sys/role/update", params);
}

/**
 * 获取系统用户列表
 */
export function getSystemUser(params: object) {
  return http.post<{ list: SystemUser[]; pagination: Pagination }>(
    "/admin/base/sys/user/page",
    params
  );
}
