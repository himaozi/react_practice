
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
    const book = values
    // 需要获取到getPageBooksList的state,并设置pageSize和current两个参数
    // 拿到数据后再次进行异步操作并渲染表格

    /**
     * 2种方式
     *  1.这里请求接口把数据传到table
     *  2.这里只需要把参数传到table 让table组件自己调接口
     *  3.既然你已经这么写了我们就用第一种.
     * 看了你的代码我 发现你这2种方式杂糅了 我看你试图把搜索参数传入table 然后你又在这里试图请求数据 
     * 
     * 那么:
     * 问题1 我们需要拿到table当前的页码和pagesize 才能给getPagedBooksList 传入正确的参数
     * 问题2 我们请求到数据之后怎么把值传到table组件
     */
    const { pageSize, current } = props.pageInfo;
    getPagedBooksList(current, pageSize, book).then(res => {
      console.log(current, pageSize)// 可以看到此时点击表单提交已经能拿到正确的table的页码 size信息
      // 接下来想办法把接口返回的数据 同步到table 还得借助props改变父组件的值 由父组件传给table 兄弟组件的
      const newbookList = res.data.data.records;
      props.getNewBookData(newbookList)
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