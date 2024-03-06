import { useMemo, type FC } from "react";
import { Layout, Menu, type MenuProps } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { getOpenKeys, listToTree } from "../../utils";
import { useAppSelector } from "../../hooks";

interface IProps {
  collapsed: boolean;
}

const AppSider: FC<IProps> = ({ collapsed }) => {
  const history = useHistory();
  const location = useLocation();
  // 用户的菜单完整数据
  const userMenus = useAppSelector((state) => state.user.menus);
  // 将 userMenus 转换成 tree 型数据
  const menus = useMemo<any[]>(() => {
    // 1. 将 userMenus 里面的对象，增加一些属性
    const tmp = userMenus.map((item) => ({
      // ...item,
      id: item.id,
      parentId: item.parentId,
      type: item.type,
      key: item.router || "" + item.id,
      label: item.name,
    }));

    // 2. 将 tmp 中 type 为 2 剔除掉
    const arr = tmp.filter((item) => item.type !== 2);

    return listToTree(arr);
  }, [userMenus]);

  const defaultOpenKeys = getOpenKeys(location.pathname);
  const defaultSelectedKeys = [location.pathname];

  const onSelect: MenuProps["onSelect"] = ({ key }) => {
    console.log("onSelect", key);
    history.push(key);
  };

  return (
    <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        items={menus}
        onSelect={onSelect}
      />
    </Layout.Sider>
  );
};

export default AppSider;
