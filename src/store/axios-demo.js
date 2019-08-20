/**
 * @name AxiosDemo
 * @author darcrand
 * @desc
 */

import { observable, action, configure } from 'mobx'
import { StoreModule } from '@/utils/mobx-store'
import { get } from '@/utils/axios'

configure({ enforceActions: 'observed' })

class AxiosDemo extends StoreModule {
    @observable
    list = []

    @action
    getList = async () => {
        try {
            const res = await get('/topics')
            res.success && this.setState({ list: res.data })
        } catch (err) {
            console.error(err)
        }
    }
}

export default AxiosDemo
