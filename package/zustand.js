const createStore = (fn) => {
    let state = null
    const listeners = new Set()

    const getInitState = () => {
        initState = fn()
        return initState
    }

    const getState = () => state

    const setState = () => {
        
    }

    const subscribe = (listener) => {
        listeners.add(listener)

        return () => listeners.delete(listener)
    }

    const api = {
        getInitState,
        getState,
        setState,
        subscribe
    }

    return api
}