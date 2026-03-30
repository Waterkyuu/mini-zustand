const createStore = (createState) => {
    let state = null
    const listeners = new Set()

    const getInitState = () => initState

    const getState = () => state

    const setState = (partial, replace) => {
        const nextPartialState = typeof partial === 'function' ? partial(state) : partial

        if (nextPartialState !== state) {
            const prevState = state
            state = {...state, ...nextPartialState}            

            listeners.forEach((listener) => listener(state, prevState))
        }
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

    const initState = (state = createState(setState, getState, api))

    return api
}

export { createStore }

