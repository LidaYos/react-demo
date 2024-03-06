import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { message } from "antd";
import storage from "./storage";
import { refreshTokenApi } from "../api/login";

const config: AxiosRequestConfig = {
  baseURL: "/api",
  timeout: 1000 * 10,
};

/**
 * [
 *  () => void,
 *  () => void
 * ]
 */
let qeqeq: any[] = [];
let isRefreshing = false;

class RequestHttp {
  server: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // 创建一个 axios 实例
    this.server = axios.create(config);

    // 请求拦截器
    this.server.interceptors.request.use(
      (config) => {
        // 1. 获取 token, refreshToken
        const token = storage.get("token");
        const refreshToken = storage.get("refreshToken");
        // 2. 如果有token 且当前不是刷新 token 的接口
        if (token && !config.url?.includes("refreshToken")) {
          // 1. token 过期
          if (storage.isExpired("token")) {
            if (storage.isExpired("refreshToken")) {
              // 两个 token 都过期，没有刷新的必要了，直接让接口发出即可。
              return config;
            }

            if (!isRefreshing) {
              isRefreshing = true;
              // 刷新 token
              refreshTokenApi(refreshToken).then((result) => {
                // 刷新 token 完成
                //    1. 将之前存起来的请求发出
                console.log("刷新 token 完成");
                qeqeq.forEach((cb) => {
                  cb(result.token);
                });
                //    2. 清空队列, 重置状态
                qeqeq = [];
                isRefreshing = false;
                //    3. 将新的 token 给重新设置到本地存储中
                storage.set("token", result.token, result.expire);
              });
            }

            // 返回一个 Promise 让当前请求暂停发出
            return new Promise((resolve) => {
              // 1. 将当前请求写入到 qeqeq 中
              qeqeq.push((newToken: string) => {
                // 修改 当前请求的请求头
                config.headers.Authorization = newToken;

                // 完成该 Promise，让 当前请求再次发出
                resolve(config);
              });
            });
          }

          // 2. token 没有过期，则将 token 携带到请求头中
          config.headers.Authorization = token;
        }
        // 3. 如果没有token，直接返回请求
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.server.interceptors.response.use(
      (response) => {
        // 1. 获取接口响应数据
        const result = response.data;
        // 2. 业务状态码的校验
        if (result.code !== 1000) {
          message.error(result.message);
          return Promise.reject(result);
        }

        return result.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get<T = unknown>(url: string, params?: object): Promise<T> {
    return this.server.get(url, {
      params
    });
  }

  post<T = unknown>(url: string, params?: object): Promise<T> {
    return this.server.post(url, params);
  }
}

export default new RequestHttp(config);
