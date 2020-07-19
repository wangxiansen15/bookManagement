import React, {Component} from "react";
import {Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {actionCreators} from '../page/login/store';
import Touxiang from '../static/img/touxiang.jpg'
import BookList from '../page/bookList/index.js';
import Login from "../page/login";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './css.css';
import BorrowBooks from "../page/borrowBooks";
import ReturnBooks from "../page/returnbooks";

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;


class Nav extends Component {

    state = {
        collapsed: false,
        login: false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={() => {
                    this.props.changeLogin()
                }}>
                    <Link to='/'>
                        退出登录
                    </Link>
                </Menu.Item>
            </Menu>
        );

        return(
            <Layout style={{height:'100%'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" height='100%'/>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="3" icon={<UserOutlined />}>
                            <Link to='/bookList'>
                                图书管理
                            </Link>
                        </Menu.Item>
                        <SubMenu key="sub2" icon={<UserOutlined />} title="服务">
                            <Menu.Item key="1">
                                <Link to='/borrowBooks'>
                                    借书
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/returnBooks'>
                                    还书
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        {
                            this.props.login ?
                                <Dropdown overlay={menu}>
                                    <Avatar size={50} src={Touxiang} style={{float: 'right', marginRight: '10%', marginTop: '7px'}}/>
                                </Dropdown>:
                                <Avatar size={50} icon={<UserOutlined/>} style={{float: 'right', marginRight: '10%', marginTop: '7px'}}/>
                        }
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                            <Route path="/bookList" component={this.props.login ? BookList : Login} exact/>
                            <Route path="/" component={Login} exact/>
                            <Route path="/borrowBooks" component={this.props.login ? BorrowBooks : Login} exact/>
                            <Route path="/returnBooks" component={this.props.login ? ReturnBooks : Login} exact/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

const mapState = (state) => ({
    login: state.getIn(['login', 'Login'])
});

const mapDispatch = (dispatch) => ({
    changeLogin() {
        dispatch(actionCreators.changeLogin(false))
    }
});

export default connect(mapState, mapDispatch)(Nav);