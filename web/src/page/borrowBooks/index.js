import React, {Component} from 'react';
import {Button, Card, Col, Row, Pagination, Modal, Input, Form, DatePicker, message} from "antd";
import axios from 'axios';
import moment from 'moment';


//获取书籍列表
function getList(_this, current, pagesize) {
    axios.post('http://localhost:8080/book', {
        current: current,
        pagesize: pagesize,
    }).then((res) => {
        res = res.data;
        _this.setState({
            list: res.data,
            total: res.total
        });
        console.log(_this.state.total);
    }).catch(() => {
        console.log("error");
    });
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const dateFormat = 'YYYY/MM/DD';

class BorrowBooks extends Component {

    state = {
        list: [],
        total: 0,
        curent: 1,
        visible: false,
        bookname: '',
        limitTime: '2020/01/01',
        phone: '',
        name: '',
    };

    showModal = (item) => {
        this.setState({
            visible: true,
            bookname: item,
        });
    };

    handleOk = e => {
        axios.post('http://localhost:8080/addorder', {
            name: this.state.name,
            phone: this.state.phone,
            bookname: this.state.bookname,
            limitTime: this.state.limitTime
        }).then((res) => {
            console.log(res);
            message.success("借书成功");
        }).catch(() => {
            message.error("借书失败");
            console.log("error");
        });
        this.setState({
            visible: false,
            name: '',
            phone: '',
            bookname: '',
            limitTime: '2020/01/01'
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            name: '',
            phone: '',
            bookname: '',
            limitTime: '2020/01/01'
        });
    };

    render() {

        return (
            <Card title={"借书服务"}>
                <Modal
                    title={this.state.bookname}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form {...layout}>
                        <Form.Item
                            label="姓名"
                        >
                            <Input style={{width:'70%'}} value={this.state.name} onChange={(e) => {
                                this.setState({
                                    name :e.target.value
                                });
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label="手机号码"
                        >
                            <Input style={{width:'70%'}} value={this.state.phone} onChange={(e) => {
                                this.setState({
                                    phone :e.target.value
                                });
                            }}/>
                        </Form.Item>
                        <Form.Item
                            label="截止时间"
                        >
                            <DatePicker value={moment(this.state.limitTime, dateFormat)} format={dateFormat}  onChange={(date, dateString) => {
                                this.setState({
                                    limitTime: dateString
                                })
                            }} />
                        </Form.Item>
                    </Form>
                </Modal>
                <Row gutter={16}>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <Col span={8} style = {{marginBottom: '30px'}}>
                                    <Card title={item.name} extra={
                                        <Button type={"primary"} onClick={() => this.showModal(item.name)}>借书登记</Button>
                                    }>
                                        <Row>
                                            <Col span={4}>作者:</Col>
                                            <Col span={20}>{item.author}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={4}>类型:</Col>
                                            <Col span={20}>{item.type}</Col>
                                        </Row>
                                        <Row>
                                            <Col span={4}>描述:</Col>
                                            <Col span={20}>{item.describion}</Col>
                                        </Row>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
                <Pagination current={this.state.current} total={this.state.total} pageSize={6} style={{float: 'right'}} onChange={(e) => {
                    this.setState({
                        current: e
                    });
                    getList(this, e, 6);
                }}/>
            </Card>
        );
    }

    componentDidMount() {
        getList(this, 1, 6);
    }
}

export default BorrowBooks;