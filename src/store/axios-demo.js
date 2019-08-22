/**
 * @name AxiosDemo
 * @author darcrand
 * @desc
 */

import { observable, action, configure } from 'mobx'
import { Module } from '@/utils/mobx-store'
import { get } from '@/utils/axios'

configure({ enforceActions: 'observed' })

class AxiosDemo extends Module {
    @observable
    list = [{ title: '一个action里面调用另一个action' }]
    @action
    doub = () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res([{ title: '一个action里面调用另一个action' }])
            }, 1000)
        })
    }
    @action
    getList = async () => {
        try {
            const an = await this.doub();
            const res = await get('/topics')
            res.success && this.setState({ list: [...an, ...res.data] })
        } catch (err) {
            console.error(err)
        }
    }
}

export default AxiosDemo
