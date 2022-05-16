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
                <Button type="primary">编辑</Button>
                <Button type="default">删除</Button>
            </Space>
        ),
    },
];


export default class BookLists extends React.Component {
    state = {
        pageSize: 10,
        current: 1,
        total: 0,
        selected: true,
        bookList: [],
    }

    componentDidMount() {
        const { pageSize, current } = this.state;
        getPagedBooksList(current, pageSize).then(res => {
            this.setState({
                bookList: res.data.data.records,
                total: res.data.data.total
            })
        })
    }
    changePage = (currPageNO) => {
        const { pageSize } = this.state;
        // 页码加1  state里的值的改变必须用setstate
        getPagedBooksList(currPageNO, pageSize).then(res => {
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
            showSizeChanger: false,
            showQuickJumper: false,
            showTotal: () => `共${total}条 `,
            pageSize: pageSize,
            current: current,
            total: total,
            onChange: (current) => this.changePage(current),
        }

        return (
            <Table columns={columns} dataSource={this.state.bookList} pagination={paginationProps} />
        )
    }
}