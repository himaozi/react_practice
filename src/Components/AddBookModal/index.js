import React, { useState } from 'react';
import { Modal, Button,Form,Input} from 'antd';
import {AddBook } from '../../api';


const AddBookModal = (props) => {
    
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
      

    setIsModalVisible(true);
  };

  const handleOk = () => {
      const book = form.getFieldValue()
       
    //   进行编辑接口操作
    console.log(book)
    
    AddBook(book).then(res=>{
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



  return (
    <>
      <Button type="primary" onClick={()=>showModal()}>
        新增
      </Button>
      <Modal forceRender title="Basic Modal" visible={isModalVisible} onOk={()=>handleOk()} onCancel={handleCancel} afterClose={()=>props.newList()}>
      <Form {...layout} form={form} name="control-hooks" >
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

export default AddBookModal;