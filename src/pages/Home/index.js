/**
 * @name Home
 * @author darcrand
 * @desc
 */

import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Row, Col, Menu } from 'antd'
import MobxInput from '@/pages/MobxInput'
import AxiosDemo from '@/pages/AxiosDemo'

@withRouter
class Home extends Component {
    state = {
        curr: this.props.location.pathname
    }

    onNav = e => {
        this.props.history.push(e.key)
        this.setState({ curr: e.key })
    }

    render() {
        const { curr } = this.state
        return (
            <div className="container">
                <Menu selectedKeys={[curr]} mode="horizontal" onClick={this.onNav}>
                    <Menu.Item key="/home/input">Input</Menu.Item>
                    <Menu.Item key="/home/axios">Axios</Menu.Item>
                </Menu>

                <Row gutter={16}>
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                </Row>

                <Switch>
                    <Route path="/home/input" component={MobxInput} />
                    <Route path="/home/axios" component={AxiosDemo} />
                </Switch>
            </div>
        )
    }
}

export default Home
