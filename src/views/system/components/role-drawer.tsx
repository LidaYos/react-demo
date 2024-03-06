import { Button, Col, Drawer, Form, Input, Row, Space, message } from "antd";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { addSystemRole, editSystemRole } from "../../../api/system";

export type RoleDrawerRef = {
  open: (data?: any) => void;
  close: () => void;
};

export type RoleDrawerProps = {
  onSuccess?: () => void;
};

const RoleDrawer: ForwardRefRenderFunction<RoleDrawerRef, RoleDrawerProps> = (
  { onSuccess },
  ref
) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  // 打开
  const open = (data: any) => {
    setVisible(true);

    if (data) {
      // 编辑
      console.log("data", data, form);
      //    数据回填
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        label: data.label,
        remark: data.remark,
      });
    } else {
      // 新增
      //    数据重置
      form.resetFields();
    }
  };

  // 关闭
  const close = () => {
    setVisible(false);
  };

  // 确认
  const onFinish = async (data: any) => {
    console.log("onFinish", data);
    if (data.id) {
      // 存在Id，走编辑
      await editSystemRole({ ...data, menuIdList: [] });
    } else {
      // 不存在Id, 走新增
      await addSystemRole({ ...data, menuIdList: [] });
    }

    // 提示
    message.success("确认成功");
    // 关闭
    close();
    // 通知父组件
    onSuccess?.();
  };

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      width={640}
      onClose={close}
      open={visible}
    >
      <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
        {/* 隐藏表单域 */}
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="名称" name="name" rules={[{ required: true }]}>
              <Input placeholder="请输入名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="标识" name="label" rules={[{ required: true }]}>
              <Input placeholder="请输入标识" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="备注" name="remark" labelCol={{ span: 2 }}>
              <Input.TextArea placeholder="请输入备注" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Space>
            <Button type="default">取消</Button>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default forwardRef(RoleDrawer);
