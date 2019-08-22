/**
 * @name Test
 * @desc
 * @author darcrand
 * @version
 */

import { observable, action, configure, computed } from 'mobx'
import { Module } from '@/utils/mobx-store'

configure({ enforceActions: 'observed' })

class Test extends Module {
    @observable
    msg = ''
    @computed
    get delMsg() {
        return this.msg + '我computed'
    }
    @action
    handleChangeMsg = e => {
        this.setState({ msg: e.target.value })
    }

    @action
    handleReset = () => {
        this.setState({ msg: '' })
    }
}

export default Test;



