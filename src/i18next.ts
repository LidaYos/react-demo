import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/**
 * 定义翻译资源
 */
const resources = {
  enUS: {
    translation: {
      btn1: "English",
      btn2: "Chinese",
    },
  },

  zhCN: {
    translation: {
      btn1: "英文",
      btn2: "中文",
    },
  },
};

i18n
  .use(initReactI18next) // 将 i18n 实例传递给 react-i18next，使 react-i18next 可以跟 i18n 关联起来
  .init({
    // 翻译资源
    resources,
    // 要使用的语言
    lng: "zhCN",
    interpolation: {
      /**
       * 是否开启转义传入的值以避免 xss 注入，默认为 true
       * 由于 React 默认已经处理了 xss 注入，所以可以配置为 false
       *
       */
      escapeValue: false,
    },
  });

export default i18n;
