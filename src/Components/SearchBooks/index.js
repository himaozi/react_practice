
import React from 'react';
import './index.less';
import { Form, Input, Button, } from 'antd';
import { getPagedBooksList } from '../../api';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SearchBooks = (props) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const book  = values
    // 需要获取到getPageBooksList的state,并设置pageSize和current两个参数
    // 拿到数据后再次进行异步操作并渲染表格

    getPagedBooksList(1,10,book).then(res=>{

    })
    
   
  };

  const onReset = () => {
    form.resetFields();
  };

  

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
       
      </Form.Item>
    </Form>
  );
};

export default SearchBooks;