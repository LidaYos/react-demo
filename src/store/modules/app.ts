import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../i18next";

// 导入两个语言包
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import storage from "../../utils/storage";

// collapsed 默认值
const defaultCollapsed = storage.get("collapsed") || false;

export const appSlice = createSlice({
  name: "app",

  initialState: {
    locale: zhCN, // 默认语言
    collapsed: defaultCollapsed, // 左侧菜单是否收起
  },

  reducers: {
    toggleLocale(state) {
      i18n.changeLanguage(state.locale.locale === "zh-cn" ? "enUS" : "zhCN");
      state.locale = state.locale.locale === "zh-cn" ? enUS : zhCN;
    },
    setCollapsed(state, { payload }: PayloadAction<boolean>) {
      storage.set("collapsed", payload);
      state.collapsed = payload;
    },
  },
});

export const { toggleLocale, setCollapsed } = appSlice.actions;

export default appSlice.reducer;
