import { ProTable, ProColumns } from "@ant-design/pro-components";
import axios from "axios";
import React from "react";

export type IActor = {
  name: string;
  role: string;
  avatarAddress: string;
};

export type IFilm = {
  id: number;
  name: string;
  poster: string;
  actors: IActor[];
  director: string;
  category: string;
  synopsis: string;
  filmType: {
    name: string;
    value: number;
  };
  nation: string;
  language: string;
  videoId: string;
  premiereAt: number;
  timeType: number;
  runtime: number;
  grade: string;
  item: {
    name: string;
    type: number;
  };
  isPresale: boolean;
  isSale: boolean;
};

export default function Menu() {
  const columns: ProColumns<IFilm>[] = [
    { title: "电影名称", dataIndex: "name" },
    { title: "电影分类", dataIndex: "category" },
  ];

  return (
    <ProTable
      pagination={{ defaultPageSize: 5 }}
      columns={columns}
      request={async (params) => {
        console.log("request", params);

        const requestParams = Object.keys(params)
          .filter((item) => !["current", "pageSize"].includes(item))
          .reduce((result, item) => {
            result[`${item}_like`] = params[item];
            return result;
          }, {} as any);

        console.log("request", requestParams);

        // 1. 调用接口
        const response = await axios.get("http://localhost:3000/films", {
          params: {
            ...requestParams,
            _page: params.current, // 当前页
            _limit: params.pageSize, // 每页显示条数
          },
        });

        console.log("request", response);

        // 2. 返回
        return {
          data: response.data,
          success: true,
          total: +response.headers["x-total-count"],
        };
      }}
    />
  );
}
