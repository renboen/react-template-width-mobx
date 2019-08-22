import { Store } from '@/utils/mobx-store'
import Test from './module-test'
import AxiosDemo from './axios-demo'
let store = new Store({ name: 123 }, { AxiosDemo })
store.addModule('Test', Test)
let abs = store.getModule('AxiosDemo').addModule('Test', Test)
console.log('%cabs: ', 'color:MidnightBlue;background:Aqumamarine;font-size:20px;', abs);
export default store;