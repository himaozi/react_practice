import React from 'react';
import { Modal, Form, Input } from 'antd';
import { EditBook } from '../../api';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.showEditModal,
      editData: props.editData
    }
  }
  // props变换时触发
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.showEditModal,
      editData: nextProps.editData
    })
  }

  handleOk = () => {
    // 进行编辑接口操作
    const newBook = this.state.editData
    console.log(newBook)
    EditBook(newBook).then(res => {
      if (res.data.flag === true) {
        this.setState({
          visible: false
        })
        this.props.toogleShow(false)
      }
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false
    })
    this.props.toogleShow(false)
  };
  changeName = (ev) => {
    this.setState({
      editData: { ...this.state.editData, name: ev.target.value }
    })
  }
  changeType = (ev) => {
    this.setState({
      editData: { ...this.state.editData, type: ev.target.value }
    })
  }
  changeDes = (ev) => {
    this.setState({
      editData: { ...this.state.editData, description: ev.target.value }
    })
  }

  // 表单的组件太繁琐了  我用了基本的input
  render() {
    const { visible, editData } = this.state;
    const { name, type, description } = editData;
    return (
      <Modal title="Basic Modal" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} afterClose={this.props.newList}>
        <div> <label>类型:</label> <Input onChange={this.changeType} value={type} /></div>
        <div> <label>书名:</label> <Input onChange={this.changeName} value={name} /></div>
        <div> <label>描述:</label> <Input onChange={this.changeDes} value={description} /></div>
      </Modal >
    );
  }
}

export default EditModal;