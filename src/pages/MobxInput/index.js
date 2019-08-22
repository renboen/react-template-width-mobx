/**
 * @name MobxInput
 * @author darcrand
 * @desc 使用mobx
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Input, Button } from 'antd'
@inject('Test')
@observer
class MobxInput extends Component {
    render() {
        const { msg, handleChangeMsg, handleReset, delMsg } = this.props.Test;
        return (
            <div className="container">
                <h1>mobx input module.</h1>
                <Button onClick={handleReset}>reset</Button>
                <Input size="large" placeholder="enter your text" value={msg} onChange={handleChangeMsg} />
                <h2>Store Text: {delMsg}</h2>
            </div>
        )
    }
}

export default MobxInput
