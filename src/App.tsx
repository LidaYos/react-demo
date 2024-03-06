import { Redirect, Route, Switch } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useAppSelector } from "./hooks";

import AppLayout from "./layout";
import Login from "./views/login";
import storage from "./utils/storage";

export default function App() {
  const locale = useAppSelector((state) => state.app.locale);

  return (
    <ConfigProvider locale={locale}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/"
          render={({ location }) => {
            // 0. 获取当前要去的 url 地址
            const path = location.pathname + location.search;
            // 1. 获取 Token
            const token = storage.get("token");
            // 2. 判断
            if (token) {
              return <AppLayout />;
            } else {
              return <Redirect to={`/login?redirect=${path}`} />;
            }
          }}
        />
      </Switch>
    </ConfigProvider>
  );
}
