import ReactDOM from "react-dom/client";

// 引入 路由器组件
import { HashRouter as Router } from "react-router-dom";
// 引入 ReactRedux 连接库的 提供商组件
import { Provider } from "react-redux";
// dayjs 的中文语言包
import "dayjs/locale/zh-cn";
// i18n 国际化
import "./i18next";
// 仓库实例
import store from "./store";
// 根组件
import App from "./App.tsx";
// 全局样式文件
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  // </React.StrictMode>
);
