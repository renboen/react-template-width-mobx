/**
 * @desc 在这里合并全部子模块的store
 */

import { Store } from '@/utils/mobx-store'
import Test from './module-test'
import AxiosDemo from './axios-demo'

export default new Store({ Test, AxiosDemo })
