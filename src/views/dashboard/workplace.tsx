import { createElement } from "react";
import { getAnalysisApi, getCaptchaApi } from "../../api/login";
import { Button } from "antd";

import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";

function Hello() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

function World() {
  return (
    <div>
      <h1>World</h1>
    </div>
  );
}

/**
 * <Component is="Hello" />   => Hello 组件
 * <Component is="World" />   => World 组件
 */
function Component({ is }) {
  const components = {
    Hello: Hello,
    World: World,
    StepBackwardOutlined,
    StepForwardOutlined,
  };
  const curCom = components[[is]];

  return createElement(curCom);
}

function component(name) {
  const components = {
    Hello: Hello,
    World: World,
    StepBackwardOutlined,
    StepForwardOutlined,
  };
  const curCom = components[[name]];

  return createElement(curCom);
}

export default function Workplace() {
  const icons = ["StepBackwardOutlined", "StepForwardOutlined"];

  return (
    <div>
      <h1>Workplace</h1>

      <hr />

      {component("StepForwardOutlined")}
    </div>
  );
}
