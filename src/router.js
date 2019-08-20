/**
 * @name Routes
 * @desc 页面路由配置
 * @author darcrand
 * @version 2018-10-04
 */

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '@/pages/Home'

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Redirect exact path="/" to="/home" />
                <Route path="/home" component={Home} />
            </Switch>
        )
    }
}

export default Routes
