export function ensureArray(a) {
	if(Array.isArray(a)) return a;
	return [a];
}
