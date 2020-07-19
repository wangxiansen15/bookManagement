import React, {Component} from 'react';
import axios from 'axios';
import {Form, Input, Button, Checkbox, Card, message} from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {actionCreators} from "./store";

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 19 },
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

class Login extends Component {

    state = {
        login: false
    };

    render() {
        const onFinish = values => {
            axios.post('http://localhost:8080/login', {
                username: values.username,
                password: values.password
            }).then((res) => {
                console.log(res.data);
                if (res.data === 1) {
                    message.success("登录成功");
                    this.props.changeLogin();
                    this.setState({
                        login: true
                    })
                } else {
                    message.error("登录失败");
                }
            }).catch(() => {
                console.log('error');
            });
        };
        return (
            <Card title={"登录"} style={{width:'40%',margin: '5% auto'}}>
                {
                    this.state.login ? <Redirect to='/bookList'/> : null
                }
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }


}

const mapDispatch = (dispatch) => ({
    changeLogin() {
        dispatch(actionCreators.changeLogin(true))
    }
});

export default connect(null, mapDispatch)(Login);