import { createStore } from "./vanilla.js";
import { useSyncExternalStore } from "./hooks.js";

const useStore = (api, selector) => {
	const snapshot = useSyncExternalStore(
		api.subscribe,
		// Client Snapshot
		() => selector(api.getState()),
	);

	return snapshot;
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
	// Example: const { userId } = useUserStore.getState();
	return useBoundStore;
};

export { create };
