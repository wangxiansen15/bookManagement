import React, {Component} from 'react';
import {Table, Tag, Space, Card, Popconfirm, message} from 'antd';
import axios from "axios";

//获取订单列表
function getList(_this, current, pagesize) {
    axios.post('http://localhost:8080/getorder', {
        current: current,
        pagesize: pagesize,
    }).then((res) => {
        res = res.data;
        _this.setState({
            list: res.data,
            total: res.total
        });
        console.log(_this.state);
    }).catch(() => {
        console.log("error");
    });
}

function confirm(e, _this) {
    axios.delete('http://localhost:8080/deleteOrder/' + e).then((res) => {
        getList(_this, 1, 5);
    }).catch(() => {
        console.log("error");
    });
    message.success('还书成功');
}

function cancel(e) {
    console.log(e);
    message.error('还书失败');
}


class ReturnBooks extends Component {

    state = {
        total: 0,
        list: []
    };

    render() {
        const page = {
            current: this.state.current,
            total: this.state.total,
            pageSize: 5,
        };
        const columns = [
            {
                key: 'key',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '手机号码',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '书籍',
                dataIndex: 'bookname',
                key: 'bookname',
            },
            {
                title: '截止时间',
                key: 'limitTime',
                dataIndex: 'limitTime',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Popconfirm
                            title="确定还书吗?"
                            onConfirm={() => confirm(record.key, this)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="#">还书</a>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];

        return(
            <Card title={"归还书籍"}>
                <Table columns={columns} dataSource={this.state.list} pagination={page} onChange = {(e) => {
                    this.setState({
                        current: e.current
                    });
                    getList(this,e.current,5);
                }}/>
            </Card>
        );
    }

    componentDidMount() {
        getList(this, 1, 5);
    }
}

export default ReturnBooks;