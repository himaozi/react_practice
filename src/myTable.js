import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import axios from 'axios'

import { Table,Space } from 'antd';




const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width:100,
    
  },
  {
    title: '书名',
    dataIndex: 'name',
    key: 'name',
    width:200,
  },
  {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
    
  },
  {
    title: '描述',
    key: 'description',
    dataIndex: 'description',
    width:600,
  
  },
  {
    title: '操作',
    key: 'action',
    
    render: (text, record) => (
      <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    ),
  },
];

const data = [
    {
        "id": 244,
        "type": "漫画2",
        "name": "海贼王",
        "description": "这是一部热血动漫",
        "creatTime": "2022-05-06T23:05:54",
        "updateTime": "2022-05-06T23:06:02"
      },
      {
        "id": 243,
        "type": "",
        "name": "",
        "description": "",
        "creatTime": "2022-04-30T23:22:56",
        "updateTime": "2022-04-30T23:22:56"
      },
      {
        "id": 242,
        "type": "",
        "name": "",
        "description": "",
        "creatTime": "2022-04-30T23:22:41",
        "updateTime": "2022-04-30T23:22:41"
      },
      {
        "id": 241,
        "type": "",
        "name": "",
        "description": "",
        "creatTime": "2022-04-30T23:21:52",
        "updateTime": "2022-04-30T23:21:52"
      },
];


class GetBookLists extends React.Component{
    constructor(props){
        super(props)
        
   
    }
    state = {
        pageSize:10,
        current:1,
        total:0,
        selected:true,
        bookList:[],
    }
  
    componentDidMount(){
        const url = '/api1'+'/'+this.state.current+'/'+this.state.pageSize
        let data1 = []
       
        axios.get(url).then(res => {
            
            data1 = res.data.data.records
            console.log(data1)
            this.setState(
                
                {   total:res.data.data.total,
                    bookList: data1,} 
             
          )
         
          });
          
    }
    
    render(
        
    ){
        const paginationProps = {
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: () => `共${this.state.total}条`,
            pageSize: this.state.pageSize,
            current: this.state.current,
            total: this.state.total,
            onChange: (current) => this.changePage(current),
        }
        
        return(
            <Table columns={columns} dataSource={this.state.bookList} pagination={paginationProps}/>
        )
    }
}


export default () => <GetBookLists />;