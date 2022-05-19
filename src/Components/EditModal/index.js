import React, { useState,useImperativeHandle } from 'react';
import { Modal, Form,Input} from 'antd';
import {EditBook } from '../../api';



const EditModal = (props,ref) => {
  
  const [bookInfo, setBookInfo] = useState();

  
  
    
    
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (newBookInfo) => {
   
      console.log('modal接收到了',newBookInfo)
      form.setFieldsValue({
          name:newBookInfo.name,
          type:newBookInfo.type,
          description:newBookInfo.description,
      })
      setBookInfo(newBookInfo)
    setIsModalVisible(true);
  };
  useImperativeHandle(ref,()=>({showModal}))

 

  const handleOk = () => {
      const book = form.getFieldValue()
       book.id=bookInfo.id
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
      span: 4,
    },
  };
  
  const [form] = Form.useForm();
 


  return (
    <>
      
      <Modal forceRender title="Basic Modal" visible={isModalVisible} onOk={()=>handleOk()} onCancel={handleCancel} afterClose={()=>props.newList()}>
      <Form {...layout} form={form} name="control-hooks"  layout="inline" >
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

export default React.forwardRef(EditModal);