import { useEffect, useReducer } from "react";

export const useSyncExternalStore = (subscribe, getSnapShot) => {
	const [_, forceUpdate] = useReducer((x) => x + 1, 0);
	const snapshot = getSnapShot();

	useEffect(() => {
		return subscribe((state, preState) => {
			if (state !== preState) {
				forceUpdate();
			}
		});
	}, []);

	return snapshot;
};
