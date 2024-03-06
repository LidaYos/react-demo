import { useEffect } from "react";
import { Layout } from "antd";
import AppSider from "./components/app-sider";
import AppHeader from "./components/app-header";
import AppContent from "./components/app-content";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getInfo } from "../store/modules/user";

const AppLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((state) => state.app.collapsed);
  const info = useAppSelector((state) => state.user.info);

  // 挂载完成获取用户信息
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  if (info) {
    return (
      <Layout className="app-layout">
        <AppSider collapsed={collapsed} />

        <Layout>
          <AppHeader collapsed={collapsed} />

          <AppContent />
        </Layout>
      </Layout>
    );
  } else {
    return <div>加载中...</div>;
  }
};

export default AppLayout;
