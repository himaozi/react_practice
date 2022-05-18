import React from 'react';
import './index.less';
import { Table, Space, Button } from 'antd';
import EditModal from '../EditModal';
import { getPagedBooksList,DeleteBookByID} from '../../api';
import AddBookModal from '../AddBookModal';


export default class BookLists extends React.Component {
    constructor(props){
        super(props)
        this.bookParam={}
        
        

    }
    state = {
        pageSize: 10,
        current: 1,
        total: 0,
        bookList: [],
        
        
        
    }
    

    // 父组件传递的bookList在这里接收 通过setState更新bookList数据继而重新渲染table
    componentWillReceiveProps(nextProps) {
       this.bookParam = nextProps.bookParam
       console.log('已经接收到参数',this.bookParam)
       const { pageSize, current } = this.state;
       const newBook = this.bookParam
       getPagedBooksList(current, pageSize,newBook).then(res => {
           this.setState({
               bookList: res.data.data.records,
               total: res.data.data.total,
           })
       })

       
    }

    componentDidMount() {
        const { pageSize, current } = this.state;
        const newBook = this.bookParam
        getPagedBooksList(current, pageSize,newBook).then(res => {
            this.setState({
                bookList: res.data.data.records,
                total: res.data.data.total,
            })
        })
    }

   
    changePage = (currPageNO, currPageSize) => {
        // state里的值的改变必须用setstate  值改变后 视图自动变化
        // react用一个公式来表示就是 UI=f(state) 我们只需要关系state的管理,UI由react去变化
        const newBook = this.bookParam
        getPagedBooksList(currPageNO, currPageSize, newBook).then(res => {
            this.setState({
                bookList: res.data.data.records,
                total: res.data.data.total,
                current: currPageNO,
                pageSize: currPageSize
            })
           
            
        })
    }
// 刷新列表
newList=()=>{
    const { pageSize, current } = this.state;
    const newBook = this.bookParam
    getPagedBooksList(current, pageSize,newBook).then(res => {
        this.setState({
            bookList: res.data.data.records,
            total: res.data.data.total,
        })
    })

}

// 编辑图书
    editBooks = (record)=>{
        
        console.log(record)

    }

// 删除图书
    deleteBooks = (record) =>{
       
        DeleteBookByID(record.id) 
        this.newList()
    

    }

    render() {
        const columns = [
            {
                title: '编号',
                dataIndex: 'id',
                key: 'id',
                width: 100,
        
            },
            {
                title: '书名',
                dataIndex: 'name',
                key: 'name',
                width: 200,
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
                width: 600,
        
            },
            {
                title: '操作',
                key: 'action',
                width: 200,
                render: (text, record) => {
                    
                    
                    return(
                        
                    <Space size="middle">
                    <EditModal book={record} newList={this.newList} />
                    {/* <Button type="primary" onClick={() =>this.editBooks(record)}>编辑</Button> */}
                    <Button type="default" onClick={() =>this.deleteBooks(record)}>删除</Button>
                </Space>
        
                    )
                }
            },
        ];
        
        const { total, pageSize, current } = this.state;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共${total}条 `,
            pageSize: pageSize,
            current: current,
            total: total,
            onChange: (newPage, newPageSize) => this.changePage(newPage, newPageSize),// 这个current就是你点击的页码,这是antd封装好的,可以直接拿到页码
        }

        return (
            <div>
                
            <Table columns={columns} dataSource={this.state.bookList} pagination={paginationProps} />
            <AddBookModal newList={this.newList}/>

            </div>
            
        )
    }
}