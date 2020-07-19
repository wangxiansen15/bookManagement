import React, {Component} from 'react';
import {Table, Space, Card, Button, Modal, Form, Input, message} from 'antd';
import axios from 'axios';

//获取书籍列表
function getList(_this, current, pagesize) {
    axios.post('http://localhost:8080/book', {
        current: current,
        pagesize: pagesize,
    }).then((res) => {
        res = res.data;
        console.log(_this.state);
        _this.setState({
            list: res.data,
            total: res.total
        });
    }).catch(() => {
        console.log("error");
    });
}

//删除书籍
function deletebook(_this, id) {
    axios.delete('http://localhost:8080/book/' + id).then((res) => {
        getList(_this,1,5);
        _this.setState({
            current: 1
        });
        message.success("删除成功");
    }).catch(() => {
        message.error("删除失败");
        console.log("error");
    });
}

//获取书籍细节
function getDetail(_this, id) {
    axios.get('http://localhost:8080/book/' + id, ).then((res) => {
        res = res.data;
        _this.setState({
            name: res[0].name,
            author: res[0].author,
            type: res[0].type,
            describtion: res[0].describion,
            id: res[0].key
        });
    }).catch(() => {
        console.log("error");
    });
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};



class BookList extends Component {

    state = {
        current: 1,
        visible: false,
        name: '',
        author: '',
        type: '',
        describtion: '',
        list: [],
        visible1: false,
        id: '',
        total: '',
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showModal1 = () => {
        this.setState({
            visible1: true,
        });
    };

    handleOk = e => {
        const {name, author, describtion, type} = this.state;
        axios.post('http://localhost:8080/addbook', {
            name: name,
            author: author,
            type: type,
            describtion: describtion
        }).then((res) => {
               this.setState({
                   name: '',
                   author: '',
                   type: '',
                   describtion: '',
               }) ;
               getList(this, this.state.current, 5);
            message.success("录入成功");
        }).catch(() => {
           console.log("error");
        });
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            name: '',
            author: '',
            type: '',
            describtion: '',
            visible: false,
        }) ;
    };

    handleOk1 = e => {
        const {name, author, describtion, type, id} = this.state;
        axios.put('http://localhost:8080/book/' + id, {
            name: name,
            author: author,
            type: type,
            describtion: describtion
        }).then((res) => {
            if (res.data === 1) {
                this.setState({
                    name: '',
                    author: '',
                    type: '',
                    describtion: '',
                }) ;
                getList(this,this.state.current,5);
                message.success("修改成功");
            }
        }).catch(() => {
            message.error("修改失败");
            console.log("error");
        });
        this.setState({
            visible1: false,
        });
    };

    handleCancel1 = e => {
        this.setState({
            visible1: false,
        });
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
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '作者',
                dataIndex: 'author',
                key: 'author',
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '描述',
                key: 'describion',
                dataIndex: 'describion',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={() => {
                            this.showModal1();
                            getDetail(this, record.key)
                        }}>修改</a>
                        <a onClick={() => {
                            deletebook(this, record.key);
                        }}>删除</a>
                    </Space>
                ),
            },
        ];

        const onFinish = values => {
            axios.post('http://localhost:8080/jqueryBook', {
                current: this.state.current,
                pagesize: 5,
                name: values.name ? values.name : ''
            }).then((res) => {
                res = res.data;
                console.log(res);
                console.log(this.state);
                this.setState({
                    list: res.data,
                    total: res.total
                });
            }).catch(() => {
                console.log("error");
            });
        };

        return (
            <Card title={
                <Form layout="inline" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                    >
                        <Input placeholder="书籍名称" />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            search
                        </Button>
                    </Form.Item>
                </Form>
            } extra={
                <Button type="primary" size={32} onClick={this.showModal}>
                    添加图书
                </Button>
            }>
                <Table columns={columns} dataSource={this.state.list} pagination={page} onChange = {(e) => {
                    this.setState({
                        current: e.current
                    });
                    getList(this,e.current,5);
                }}/>
                <Modal
                    title="添加图书"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label="名称"
                            name="name"
                        >
                            <Input style={{width: '50%'}} value={this.state.name} onChange={(e) => {
                                this.setState({
                                   name :e.target.value
                                });
                            }}/>&nbsp;
                        </Form.Item>

                        <Form.Item
                            label="作者"
                            name="author"
                        >
                            <Input style={{width: '50%'}} value={this.state.author} onChange={(e) => {
                                this.setState({
                                   author:e.target.value
                                });
                            }}/>&nbsp;
                        </Form.Item>

                        <Form.Item
                            label="类型"
                            name="type"
                        >
                            <Input style={{width: '50%'}} value={this.state.type} onChange={(e) => {
                                console.log(e.target.value);
                                this.setState({
                                   type:e.target.value
                                });
                            }}/>&nbsp;
                        </Form.Item>
                        <Form.Item
                            label="简介"
                            name="describtion"
                        >
                            <Input.TextArea value={this.state.describtion} onChange={(e) => {
                                console.log(e.target.value);
                                this.setState({
                                   describtion:e.target.value
                                });
                            }}/>&nbsp;
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="修改书籍"
                    visible={this.state.visible1}
                    onOk={this.handleOk1}
                    onCancel={this.handleCancel1}
                >
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label="名称"
                            name="name"
                        >
                            <Input style={{width: '50%'}} value={this.state.name} onChange={(e) => {
                                this.setState({
                                    name :e.target.value
                                });
                            }}/>&nbsp;
                        </Form.Item>

                        <Form.Item
                            label="作者"
                            name="author"
                        >
                            <Input style={{width: '50%'}} value={this.state.author} onChange={(e) => {
                                this.setState({
                                    author:e.target.value
                                });
                            }}/>&nbsp;
                        </Form.Item>

                        <Form.Item
                            label="类型"
                            name="type"
                        >
                            <Input style={{width: '50%'}} value={this.state.type} onChange={(e) => {
                                console.log(e.target.value);
                                this.setState({
                                    type:e.target.value
                                });
                            }}/>&nbsp;
                        </Form.Item>
                        <Form.Item
                            label="简介"
                            name="describtion"
                        >
                            <Input.TextArea value={this.state.describtion} onChange={(e) => {
                                console.log(e.target.value);
                                this.setState({
                                    describtion:e.target.value
                                });
                            }}/>&nbsp;
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        );
    }

    componentDidMount() {
        getList(this, 1, 5);
    }

}

export default BookList;