import React, { useState } from 'react';
import { Modal, Button,Form,Input} from 'antd';
import {EditBook } from '../../api';


const EditModal = (props) => {
    
    const newBookInfo = props.book
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
      console.log('modal接收到了',newBookInfo)
      form.setFieldsValue({
          name:newBookInfo.name,
          type:newBookInfo.type,
          description:newBookInfo.description,
      })

    setIsModalVisible(true);
  };

  const handleOk = () => {
      const book = form.getFieldValue()
       book.id=newBookInfo.id
    //   进行编辑接口操作
    console.log(book)
    EditBook(book).then(res=>{
        if(res.data.flag===true){
            setIsModalVisible(false);
        }
    })
    

    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // 把收集的book参数作为props传给表格组件，进行异步操作生成表格和页码
    
    
  };

  return (
    <>
      <Button type="primary" onClick={()=>showModal()}>
        编辑
      </Button>
      <Modal forceRender title="Basic Modal" visible={isModalVisible} onOk={()=>handleOk()} onCancel={handleCancel} afterClose={()=>props.newList()}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} >
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
      
    </Form>
      </Modal>
    </>
  );
};

export default EditModal;