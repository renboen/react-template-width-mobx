/**
 * @name AxiosDemo
 * @author darcrand
 * @desc 演示使用axios来请求数据
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, List } from 'antd'

@inject('AxiosDemo')
@observer
class AxiosDemo extends Component {
    render() {
        const { list, getList } = this.props.AxiosDemo
        return (
            <div className="container">
                <h1>the data from axios request.</h1>
                <Button size="large" onClick={getList}>
                    click to get news list
                </Button>

                <List size="large" style={{ marginTop: '20px' }} bordered dataSource={list} renderItem={item => <List.Item>{item.title}</List.Item>} />
            </div>
        )
    }
}

export default AxiosDemo
