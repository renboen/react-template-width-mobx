

import { action, configure } from 'mobx'
// 开启严格模式
configure({ enforceActions: 'observed' })
// 每个子store的公共类,包含了所有的公共属性和方法
let $getModule = null;
let $rootState = null;
class Module {
    constructor({ getModule, rootState }) {
        $getModule = getModule
        $rootState = rootState;
        this.partent = $getModule();
    }
    children = [];
    addModule(moduleName, module) {
        this[moduleName] = new module({
            getModule: this.getModule.bind(this),
            rootState: $rootState
        })
        this.children.push(this[moduleName])
        return this
    }
    getModule(name, options = { brotherModule: true }) {
        console.log('%cthis: ', 'color:MidnightBlue;background:Aqumamarine;font-size:20px;', this);
        return name ? this[name] : this
    }
    getRootState() {
        return { rootState: $rootState, partent: this }
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

export default Module
