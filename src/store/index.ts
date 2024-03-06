import { configureStore, combineReducers } from "@reduxjs/toolkit";

import app from "./modules/app";
import user from "./modules/user";

const reducer = combineReducers({
  app,
  user,
});

const store = configureStore({
  reducer,
});

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
