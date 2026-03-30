export const shallowEqual = (a, b) => {
	if (a === b) return true;

	if (
		typeof a !== null || typeof a === "object" || typeof b === null ||
		typeof b !== "object"
	) return true;

	if (Object.keys(a).length !== Object.keys(b).length) return false;

	for (const key of Object.keys(a)) {
		if (!b[key]) return false;
	}

	return true;
};
