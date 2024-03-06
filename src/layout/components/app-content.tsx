import { Layout, theme } from "antd";
import { Switch, Route } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import { useMemo } from "react";

// 一次导入多个模块
const modules = import.meta.glob(["../../views/**/*.tsx"], {
  eager: true,
  import: "default",
});
/**
 * 处理 modules 变成如下格式
 * {
 *    '/dashboard/conosle': 组件
 * }
 */
const components = Object.keys(modules).reduce((result, key) => {
  const newKey = key.replace("../../views", "").replace(".tsx", "");
  result[newKey] = modules[key];
  return result;
}, {} as any);

export default function AppContent() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userMenus = useAppSelector((state) => state.user.menus);
  const routes = useMemo(() => {
    return userMenus.filter((item) => item.type === 1);
  }, [userMenus]);

  return (
    <Layout.Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Switch>
        {routes.map((item) => (
          <Route
            key={item.router}
            path={item.router!}
            component={components[item.router!]}
          />
        ))}
      </Switch>
    </Layout.Content>
  );
}
