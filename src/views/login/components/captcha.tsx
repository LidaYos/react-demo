import {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  type ForwardRefRenderFunction,
} from "react";

// 对外暴露的类型
export type CaptchaRef = {
  get: () => string;
  refresh: () => void;
};

/**
 * ForwardRefRenderFunction 类型
 *
 *    标记的函数给到 forwardRef 使用
 *
 *    ForwardRefRenderFunction<T, P>
 *      T - ref 数据的类型
 *      P - props 数据的类型
 */
const Captcha: ForwardRefRenderFunction<CaptchaRef> = (_, ref) => {
  const [state, setState] = useState({
    captchaId: "",
    svg: "",
  });

  function get() {
    return state.captchaId;
  }

  /**
   * 刷新验证码
   */
  function refresh() {
    fetch("/api/admin/base/open/captcha")
      .then((response) => response.json())
      .then((result) => {
        // 做业务状态码的判断
        if (result.code !== 1000) {
          // TODO. 有错误，做个弹窗

          return;
        }

        const { captchaId, data } = result.data;
        setState({
          captchaId,
          svg: data,
        });
      });
  }

  // 挂载完成，默认调用一次接口
  useEffect(() => {
    refresh();
  }, []);

  // 对外暴露
  useImperativeHandle(ref, () => ({
    get,
    refresh,
  }));

  return (
    <div
      className="captcha"
      dangerouslySetInnerHTML={{ __html: state.svg }}
      onClick={() => refresh()}
    ></div>
  );
};

export default forwardRef(Captcha);
