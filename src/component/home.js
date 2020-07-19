import React from 'react';
import { Layout, Menu } from 'antd';
import Customer from './customer';
import Orders from './orders';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const { Header, Content } = Layout;

class Home extends React.Component{
    render() {
        console.log("start");
        return (
            <Router>
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                        <Menu id="nav-menu" theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" >
                            <a href="/home">Home</a>
                        </Menu.Item>
                        </Menu> 
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <Switch>
                            <Route exact path={['/', '/home']} >
                                <Customer />
                            </Route>
                            <Route exact path="/customer/:id" component={Orders} />
                        </Switch>
                </div>
                </Content>
                </Layout>
            </Router>
        )
    }
}

export default Home;