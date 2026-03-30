import { useCallback, useSyncExternalStore } from "react";
import { createStore } from "./vanilla.js";

const useStore = (api, selector) => {
	const slice = useSyncExternalStore(
		api.subscribe,
		useCallback(() => selector(api.getState()), [api, selector]),
		useCallback(() => selector(api.getInitState()), [api, selector]),
	);

	return slice;
};

const create = (createState) => {
	const api = createStore(createState);

	const useBoundStore = (selector) => useStore(api, selector);

	Object.assign(useBoundStore, api);
	// Example
	// const { userId } = useUserStore.getState();
	return useBoundStore;
};

export { create };
