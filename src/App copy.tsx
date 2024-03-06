import { Button, Calendar, ConfigProvider, Input, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
// 引入 dayjs 的中文引言包
import "dayjs/locale/zh-cn";

// 设置 dayjs 的语言
dayjs.locale("zh-cn");

export default function App() {
  return (
    <ConfigProvider
      theme={{
        // 预设主题
        // algorithm: theme.compactAlgorithm,
        token: {
          colorPrimary: "red",
        },
        // 组件变量
        components: {
          Button: {
            colorPrimary: "yellow",
          },

          Input: {
            colorPrimary: "green",
          },
        },
      }}
      locale={zhCN}
    >
      <div>
        <h1>App</h1>

        <Calendar />

        <hr />

        <Button type="primary">按钮</Button>

        <ConfigProvider>
          <Input />
        </ConfigProvider>
      </div>
    </ConfigProvider>
  );
}
