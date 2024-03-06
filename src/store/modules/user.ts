import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getInfoApi, ILoginResp, IMenu, type UserInfo } from "../../api/login";
import storage from "../../utils/storage";

/**
 *
 * createAsyncThunk<T>
 *    T - 用于描述 payloadCreator 函数的返回值类型的
 */
export const getInfo = createAsyncThunk("user", async () => {
  const result = await getInfoApi();
  return result;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: storage.get("token") || "", // 用户Token
    info: null as UserInfo | null, // 用户信息
    menus: [] as IMenu[], // 用户的菜单信息
  },
  reducers: {
    setLogin(state, { payload }: PayloadAction<ILoginResp>) {
      state.token = payload.token;
      // storage.set("token", payload.token, payload.expire);
      storage.set("token", payload.token, 10); // 演示token刷新
      storage.set("refreshToken", payload.refreshToken, payload.refreshExpire);
    },

    setInfo(state, { payload }: PayloadAction<UserInfo>) {
      state.info = payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(getInfo.fulfilled, (state, { payload }) => {
      state.info = payload.info;
      state.menus = payload.menus;
    }),
});

export const { setInfo, setLogin } = userSlice.actions;

export default userSlice.reducer;
