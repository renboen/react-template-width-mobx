import { Store } from "./mobx-store"
let $store = Store.getInstance();
export const mapState = normalizeNamespace((namespace, states) => {
    console.log('%cnamespace: ', 'color:MidnightBlue;background:Aqumamarine;font-size:20px;', namespace);
    const res = {}
    let _store = $store[namespace];
    console.log('%c_store: ', 'color:MidnightBlue;background:Aqumamarine;font-size:20px;', _store);
    normalizeMap(states).forEach(({ key, val }) => {
        res[key] = _store[key]
    })
    return res
})

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace(fn) {
    return (namespace, map) => {
        if (typeof namespace !== 'string') {
            throw new Error('namespace must be string')
        }
        return fn(namespace, map)
    }
}

/**
  * Normalize the map
  * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
  * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
  * @param {Array|Object} map
  * @return {Object}
  */
function normalizeMap(map) {
    return Array.isArray(map)
        ? map.map(key => ({ key, val: key }))
        : Object.keys(map).map(key => ({ key, val: map[key] }))
}
/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace(store, helper, namespace) {
    const module = store._modulesNamespaceMap[namespace]
    if (process.env.NODE_ENV !== 'production' && !module) {
        console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`)
    }
    return module
}