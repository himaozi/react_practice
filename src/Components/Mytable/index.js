import React from 'react';
import './index.less';
import { Table, Space, Button } from 'antd';
import EditModal from '../EditModal';
import { getPagedBooksList, DeleteBookByID } from '../../api';
import AddBookModal from '../AddBookModal';


export default class BookLists extends React.Component {
    constructor(props) {
        super(props)
        this.bookParam = {}

        this.ChildRef = React.createRef();



    }
    state = {
        pageSize: 10,
        current: 1,
        total: 0,
        bookList: [],
        editData: {},
        showEditModal: false// 控制editModal的显示隐藏
    }


    // 父组件传递的bookList在这里接收 通过setState更新bookList数据继而重新渲染table
    componentWillReceiveProps(nextProps) {
        this.bookParam = nextProps.bookParam
        console.log('已经接收到参数', this.bookParam)
        const { pageSize, current } = this.state;
        const newBook = this.bookParam
        getPagedBooksList(current, pageSize, newBook).then(res => {
            this.setState({
                bookList: res.data.data.records,
                total: res.data.data.total,
            })
        })


    }

    componentDidMount() {
        const { pageSize, current } = this.state;
        const newBook = this.bookParam
        getPagedBooksList(current, pageSize, newBook).then(res => {
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
    newList = () => {
        const { pageSize, current } = this.state;
        const newBook = this.bookParam
        getPagedBooksList(current, pageSize, newBook).then(res => {
            this.setState({
                bookList: res.data.data.records,
                total: res.data.data.total,
            })
        })

    }

    // 编辑图书
    editBooks = (record) => {
        //  ref并不是一个常用的api 绝大部分情况我们尽量不去用它 个人感觉它和react的理念有点冲突 只是一个不得已的口子
        // 如果让我实现这个功能我会这么做
        // 1.点击编辑按钮更新下要编辑的数据到当前这个组件的state
        this.setState({
            editData: record,
            showEditModal: true
        })
        // 2.editModal通过props传递这个值进去

        // this.bookForModal=record
        // console.log(this.bookForModal)
        // this.ChildRef.current.showModal(this.bookForModal)
    }

    // 删除图书
    deleteBooks = (record) => {
        DeleteBookByID(record.id)
        this.newList()
    }
    toogleShow = (visible) => {
        this.setState({
            showEditModal: visible
        })
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


                    return (

                        <Space size="middle">
                            <Button type="primary" onClick={() => this.editBooks(record)}>编辑</Button>
                            <Button type="default" onClick={() => this.deleteBooks(record)}>删除</Button>
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
                <AddBookModal newList={this.newList} />
                {/* toogleShow把父组件改变state的方法暴露给子组件 */}
                <EditModal toogleShow={this.toogleShow} showEditModal={this.state.showEditModal} editData={this.state.editData} newList={this.newList} />

            </div>

        )
    }
}