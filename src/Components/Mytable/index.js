import React from 'react';
import './index.less';
import { Table, Space, Button } from 'antd';
import { getPagedBooksList } from '../../api';

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
        render: (text, record) => (
            <Space size="middle">
                <Button type="primary" >编辑</Button>
                <Button type="default" >删除</Button>
            </Space>
        ),
    },
];


export default class BookLists extends React.Component {
    state = this.props.state
    

    componentDidMount() {
        const { pageSize, current,book } = this.state;
        getPagedBooksList(current, pageSize,book).then(res => {
            this.setState({
                bookList: res.data.data.records,
                total: res.data.data.total
            })
        })
    }
    changePage = (currPageNO) => {
        const { pageSize,book } = this.state;
        // state里的值的改变必须用setstate  值改变后 视图自动变化
        // react用一个公式来表示就是 UI=f(state) 我们只需要关系state的管理,UI由react去变化
        getPagedBooksList(currPageNO, pageSize,book).then(res => {
            this.setState({
                bookList: res.data.data.records,
                total: res.data.data.total,
                current: currPageNO
            })
        })
    }
    render() {
        const { total, pageSize, current } = this.state;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共${total}条 `,
            pageSize: pageSize,
            current: current,
            total: total,
            onChange: (current) => this.changePage(current),// 这个current就是你点击的页码,这是antd封装好的,可以直接拿到页码
        }

        return (
            <Table columns={columns} dataSource={this.state.bookList} pagination={paginationProps} />
        )
    }
}