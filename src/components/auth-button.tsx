/**
 * <Button>删除</Button>
 *
 * =>
 *
 * <AuthButton auth="base:sys:menu:add">
 *    <Button>删除</Button>
 * </AuthButton>
 */

import { FC, cloneElement, useMemo } from "react";
import { useAppSelector } from "../hooks";

export type AuthButtonProps = {
  children: React.ReactElement;
  auth: string;
};

const AuthButton: FC<AuthButtonProps> = ({ children, auth }) => {
  // 获取到当前用户的所有权限集合 ['base:sys:menu:add', 'base:sys:menu:update', 'base:sys:menu:delete']
  const menus = useAppSelector((state) => state.user.menus);
  const permissions = useMemo(() => {
    return menus
      .filter((item) => item.type === 2)
      .reduce((result, item) => {
        const arr = item.perms!.split(",");
        result.push(...arr);
        return result;
      }, [] as string[]);
  }, [menus]);

  if (permissions.includes(auth)) {
    // 有权限
    return children;
  } else {
    // 没有权限
    //    1. 直接啥也不渲染
    // return null;

    //    2. 将 children 增加上 disabled 之后再返回
    // 不能直接对现有的 React 元素做修改, 但是可以通过 cloneElement 来实现修改
    // children.props.disabled = true;
    return cloneElement(children, { disabled: true });
  }
};

export default AuthButton;
