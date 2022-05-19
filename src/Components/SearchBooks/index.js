
import React from 'react';
import './index.less';
import { Form, Input, Button,Space } from 'antd';



const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 3,
  },
};

const SearchBooks = (props) => {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    // 把收集的book参数作为props传给表格组件，进行异步操作生成表格和页码
    
    props.getNewBookData(values)
    console.log('book参数已经传递',values)

  };

 



  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} layout="inline">
      <Form.Item
        name="name"
        label="书名"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="type"
        label="类型"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="描述"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space size="middle">
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button htmlType="button" onClick={onReset}>
          清空
        </Button>

        </Space>
       
        

      </Form.Item>
    </Form>
  );
};

export default SearchBooks;