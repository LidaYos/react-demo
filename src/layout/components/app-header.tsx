import { useMemo, type FC } from "react";
import { Layout, Button, Avatar, Dropdown, Space, Breadcrumb } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setCollapsed } from "../../store/modules/app";
import { getBreadcrumbItems } from "../../utils";
import { useLocation } from "react-router-dom";

interface IProps {
  collapsed: boolean;
}

const AppHeader: FC<IProps> = ({ collapsed }) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.info);
  const userMenus = useAppSelector((state) => state.user.menus);

  const { pathname } = useLocation();

  const breadcrumbItems = useMemo(() => {
    return getBreadcrumbItems(pathname, userMenus);
  }, [pathname, userMenus]);

  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 0,
        background: "green",
      }}
    >
      <Space>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(setCollapsed(!collapsed))}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Breadcrumb items={breadcrumbItems} />
      </Space>
      <div>
        <Dropdown
          menu={{
            items: [
              { key: "1", label: "个人信息" },
              { key: "2", label: "退出登录" },
            ],
            onClick: ({ key }) => {
              console.log("菜单点击", key);
            },
          }}
          trigger={["click"]}
        >
          <Space>
            <div>{userInfo?.name}</div>
            <Avatar size={32} src={userInfo?.headImg}></Avatar>
          </Space>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default AppHeader;
