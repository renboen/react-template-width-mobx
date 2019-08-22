

// import { action, configure } from 'mobx'
// // 开启严格模式
// configure({ enforceActions: 'observed' })

// /**
//  * 通过静态属性_instance和静态类init方法。实现单例模式。必须调用类的静态方法init实现单例;
//  * rootState 根级state,包含一些公共属性必须是一个对象{}
//  * @class Store
//  */
// class Store {
//     constructor(rootState, modules) {
//         // 根级state,包含一些公共属性必须是一个对象{}
//         this.rootState = rootState;
//         Object.keys(modules).forEach(moduleName => {
//             this[moduleName] = new modules[moduleName]({
//                 mapStore: this.mapStore.bind(this),
//                 rootState: this.rootState
//             })
//         })
//     }
//     static _instance = null;
//     static init(rootState, modules) {
//         if (this._instance == null) {
//             this._instance = new Store(modules, rootState);
//         }
//         return this._instance;
//     }
//     static mapState(...arg) {
//         //参数1必须为字符串;参数2位对象和数组
//         if (arg.length > 2) {
//             throw new Error('最多只接受两个参数,第一个参数为模块名称(空字符代表全局state,第二个参数代表要从当前模块取出的值的键.)')
//         }
//         console.log('%cthis._instance: ', 'color:MidnightBlue;background:Aqumamarine;font-size:20px;', this.init({})[arg[0]]);
//         if (arg.length === 2) {
//             if (typeof arg[0] === 'string' && arg[0]) {
//                 let list = Array.isArray(arg[1]) ? arg[1] : Object.keys(arg[1]);
//                 //是否打断引用？？？？？？可能会有bug
//                 return list.reduce((acc, current) => {
//                     acc[current] = this[arg[0]][current]
//                     return acc
//                 }, {})
//             }
//         } else {
//             return this[arg[0]]

//         }

//     }

//     // 让子store可以访问其他同级store
//     mapStore(moduleName) {
//         if (moduleName) {
//             return this[moduleName] ? this[moduleName] : console.error(new Error(`has no store named "${moduleName}"`))
//         } else {
//             return this
//         }
//     }
// }

























// // 每个子store的公共类,包含了所有的公共属性和方法
// let $mapStore = null;
// let $rootState = null;
// class Module {
//     constructor({ mapStore, rootState }) {
//         $mapStore = mapStore
//         $rootState = rootState
//     }

//     mapStore(name) {
//         return $mapStore(name)
//     }

//     getRootState() {
//         return $rootState
//     }

//     setState(options) {
//         action(opt => {
//             Object.keys(opt).forEach(key => {
//                 if (Object.prototype.hasOwnProperty.call(this, key)) {
//                     this[key] = opt[key]
//                 } else {
//                     console.error(new Error(`mobx action "setState": has no attribute named "${key}"`))
//                 }
//             })
//         })(options)
//     }
// }
import Store from './store'
import Module from './module'
export { Store, Module }
