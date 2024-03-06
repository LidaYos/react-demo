import * as icons from "@ant-design/icons";
import { FC, createElement } from "react";

// console.log("icons", icons);

/**
 * 渲染一个图标出来
 * @param iconName 图标的名字
 */
function renderIcon(iconName: string) {
  // @ts-ignore
  return createElement(icons[iconName]);
}

const Component: FC<{ is: string }> = ({ is }) => {
  // @ts-ignore
  return createElement(icons[is]);
};

export default function IconSelect() {
  return (
    <ul>
      {Object.keys(icons)
        .splice(0, 10)
        .map((name) => {
          // return <li key={name}>{renderIcon(name)}</li>;

          return (
            <li key={name}>
              <Component is={name} />
            </li>
          );
        })}
    </ul>
  );
}
