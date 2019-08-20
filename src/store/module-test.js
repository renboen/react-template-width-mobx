/**
 * @name Test
 * @desc
 * @author darcrand
 * @version
 */

import { observable, action, configure } from 'mobx'
import { StoreModule } from '@/utils/mobx-store'

configure({ enforceActions: 'observed' })

class Test extends StoreModule {
    @observable
    msg = ''

    @action
    handleChangeMsg = e => {
        this.setState({ msg: e.target.value })
    }

    @action
    handleReset = () => {
        this.setState({ msg: '' })
    }
}

export default Test
