

import { configure } from 'mobx';
// 开启严格模式
configure({ enforceActions: 'observed' })
/**
 * 通过静态属性_instance和静态类init方法。实现单例模式。必须调用类的静态方法init实现单例;
 * rootState 根级state,包含一些公共属性必须是一个对象{}
 * @class Store
 */
class Store {
    constructor(rootState, modules) {
        // 根级state,包含一些公共属性必须是一个对象{}
        this.rootState = rootState;
        Object.keys(modules).forEach(moduleName => {
            this[moduleName] = new modules[moduleName]({
                getModule: this.getModule.bind(this),
                rootState: this.rootState
            })
        })
    }
    // static _instance = null;
    // static init(rootState, modules) {
    //     if (this._instance === null) {
    //         this._instance = new Store(rootState, modules)
    //     };
    //     return this._instance;
    // }
    // static getInstance() {
    //     return this._instance
    // }
    addModule(moduleName, module) {
        this[moduleName] = new module({
            getModule: this.getModule.bind(this),
            rootState: this.rootState
        })
        return this
    }
    removeModule(moduleName) {
        delete this[moduleName];
        return this
    }
    // 让子store可以访问其他同级store
    getModule(moduleName) {
        console.log(this);
        if (moduleName) {
            return this[moduleName] ? this[moduleName] : console.error(new Error(`has no store named "${moduleName}"`))
        } else {
            return this
        }
    }
}
export default Store;
