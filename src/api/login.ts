import http from "../utils/request";

export type UserInfo = {
  id: number;
  createTime: string;
  updateTime: string;
  name: string;
  username: string;
  passwordV: number;
  nickName: string;
  headImg: string;
  email: string;
  remark: string;
  status: number;
  socketId: null;
};

export type IMenu = {
  id: number;
  createTime: string;
  updateTime: string;
  parentId: string | null;
  name: string;
  router: string | null;
  perms: string | null;
  type: number;
  icon: string;
  orderNum: number;
  viewPath: string | null;
  keepAlive: number;
  isShow: number;
  children?: IMenu[];
};

export type ILoginResp = {
  token: string;
  expire: number;
  refreshToken: string;
  refreshExpire: number;
};

export function loginApi(params: any) {
  return http.post<ILoginResp>("/admin/base/open/login", params);
}

export function getCaptchaApi() {
  return http.get("/admin/base/open/captcha");
}

export function getAnalysisApi() {
  return http.get("/admin/base/open/analysis");
}

export function getInfoApi() {
  return http.get<{ info: UserInfo; menus: IMenu[] }>(
    "/admin/base/comm/person"
  );
}

export function refreshTokenApi(refreshToken: string) {
  return http.get<ILoginResp>("/admin/base/open/refreshToken", {
    refreshToken,
  });
}
