import { useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Form, Input, Space } from "antd";
import Captcha, { type CaptchaRef } from "./components/captcha";
import { loginApi } from "../../api/login";
import { useAppDispatch } from "../../hooks";
import { setLogin } from "../../store/modules/user";

import "./index.scss";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { search } = useLocation();

  // 给到 Captcha 组件使用的 ref 数据
  const captchaRef = useRef<CaptchaRef>(null);

  // 给到 Form 组件使用的 form 属性的数据
  const [form] = Form.useForm();

  function onFinish(data: any) {
    // 1. 组装接口需要的参数
    const params = {
      ...data,
      captchaId: captchaRef.current?.get(),
    };

    // 2. 调用接口
    loginApi(params)
      .then((result) => {
        console.log("result", result);
        // 派发 setLogin 的动作
        dispatch(setLogin(result));

        // 跳转路由
        const redirect = new URLSearchParams(search).get("redirect") || "/";
        history.replace(redirect);
      })
      .catch(() => {
        // 登录失败
        //    1. 将表单数据重置
        form.resetFields();
        //    2. 让验证码刷新
        captchaRef.current?.refresh();
      });
  }

  function onFinishFailed() {
    console.log("onFinishFailed");
    form.setFieldValue("verifyCode", "4567");
  }

  return (
    <div className="login">
      <Form
        form={form}
        className="form"
        labelCol={{ span: 4 }}
        initialValues={{ username: "admin", password: "123456" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="用户名" name="username" rules={[{ required: true }]}>
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item label="验证码" required>
          <Space>
            <Form.Item noStyle name="verifyCode" rules={[{ required: true }]}>
              <Input placeholder="请输入验证码" maxLength={4} />
            </Form.Item>

            <Captcha ref={captchaRef} />
          </Space>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
