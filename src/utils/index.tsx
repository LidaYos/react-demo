import { IMenu } from "../api/login";

/**
 * 获取 Menu 组件的 defaultOpenKeys 的值
 *
 * examples:
 *    /dashboard/workplace/one    =>  ['/dashboard', '/dashboard/workplace', '/dashboard/workplace/one']
 *    /a/b/c                      =>  ['/a', '/a/b', '/a/b/c']
 */
export function getOpenKeys(pathname: string) {
  // 1. 对 pathname 按照 / 分割
  //    将 空字符串 给删除
  const paths = pathname.split("/").filter((item) => item);

  // 2. 使用 reduce 方法处理
  const result = paths.reduce((result, item) => {
    const prevItem = result[result.length - 1];
    result.push(prevItem ? prevItem + "/" + item : "/" + item);
    return result;
  }, [] as string[]);

  return result;
}

/**
 * 根据一个菜单id找到所有的父亲
 */
export function getParentsByMenu(
  list: IMenu[],
  id: number,
  result: IMenu[] = []
) {
  const data = list.find((item) => item.id === id);
  if (data) {
    // 找到了，增加到 result 中
    result.unshift(data);

    // 判断是否有父级Id
    if (data.parentId) {
      // 递归调用
      return getParentsByMenu(list, +data.parentId, result);
    } else {
      // 没有父级，也要返回 result
      return result;
    }
  } else {
    // 没找到，返回 result
    return result;
  }
}

/**
 * 获取面包屑数据
 *
 * examples:
 *    /dashboard/workplace        => [{title: <Link to="/">Home</Link>}, {title: <Link to="/dashboard">Dashboard</Link>}, {title: <Link to="/dashboard/workplace">工作台</Link>}]
 */
export function getBreadcrumbItems(pathname: string, menus: IMenu[]) {
  // 1. 使用 pathName 与 menus 中每一项的 router 做查找
  const item = menus.find((item) => item.router === pathname);

  // 2. 定义一个结果集合
  const result = [
    {
      title: "Home",
    },
  ];

  // 3. 如果有 Id
  if (item?.id) {
    result.push(
      ...getParentsByMenu(menus, item?.id, []).map((item) => ({
        // title: <Link to={`${item.router}`}>{item.name}</Link>,
        title: item.name,
      }))
    );
  }

  return result;
}

/**
 * 列表数据转换成树形数据
 */
export function listToTree(list: any[]) {
  const map: Record<string, IMenu> = {};
  const result: IMenu[] = []; // 结果集合

  // 1. 将 list 中的每一项写入到 map 中
  list.forEach((item) => {
    map[item.id] = { ...item };
  });

  // 2. 将 list 中的每一项再次循环
  list.forEach((item) => {
    const parentId = item.parentId;

    if (!parentId) {
      result.push(map[item.id]);
    } else {
      if (map[parentId].children) {
        map[parentId].children?.push(map[item.id]);
      } else {
        map[parentId].children = [map[item.id]];
      }
    }
  });

  return result;
}
