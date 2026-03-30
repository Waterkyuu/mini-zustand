import { useCallback, useSyncExternalStore } from "react";
import { createStore } from "./vanilla.js";

const useStore = (api, selector) => {
	const slice = useSyncExternalStore(
		api.subscribe,
		// Client Snapshot
		useCallback(() => selector(api.getState()), [api, selector]),
		// Server Snapshot
		useCallback(() => selector(api.getInitState()), [api, selector]),
	);

	return slice;
};

/**
 * const userStore = create((set) => {
 * 		name: "",
 * 		setName: (name) => set({name: name}))
 * })
 *
 * Comp A:
 *  function A() {
 * 		const { name } = userStore()
 * 		const name = userStore(state => state.name)
 * }
 *
 * const count = useStore(state => state.name)
				↓
	React call useSyncExternalStore
				↓
	useSyncExternalStore call store.subscribe(listener)
				↓
 */
const create = (createState) => {
	const api = createStore(createState);

	const useBoundStore = (selector) => useStore(api, selector);

	Object.assign(useBoundStore, api);
	// Example
	// const { userId } = useUserStore.getState();
	return useBoundStore;
};

export { create };
