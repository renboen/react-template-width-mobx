/**
 * @name Store
 * @desc store 构造器
 * @author daecrand
 * @version 2018-08-07
 */

import { action, configure } from 'mobx'

// 开启严格模式
configure({ enforceActions: 'observed' })

class Store {
    constructor(modules) {
        Object.keys(modules).forEach(moduleName => {
            this[moduleName] = new modules[moduleName]({
                mapStore: this.mapStore.bind(this),
                rootState: this.rootState
            })
        })
    }

    // 根级state,包含一些公共属性
    rootState = {}

    // 让子store可以访问其他同级store
    mapStore(moduleName) {
        if (moduleName) {
            return this[moduleName] ? this[moduleName] : console.error(new Error(`has no store named "${moduleName}"`))
        } else {
            return this
        }
    }
}

// 每个子store的公共类,包含了所有的公共属性和方法
let $mapStore = null;
let $rootState = null;
class StoreModule {
    constructor({ mapStore, rootState }) {
        $mapStore = mapStore
        $rootState = rootState
    }

    mapStore(name) {
        return $mapStore(name)
    }

    getRootState() {
        return $rootState
    }

    setState(options) {
        action(opt => {
            Object.keys(opt).forEach(key => {
                if (Object.prototype.hasOwnProperty.call(this, key)) {
                    this[key] = opt[key]
                } else {
                    console.error(new Error(`mobx action "setState": has no attribute named "${key}"`))
                }
            })
        })(options)
    }
}

export { Store, StoreModule }
