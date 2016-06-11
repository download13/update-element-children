import {VNode} from './types';


export function ensureArray(a: any): any[] {
	if(Array.isArray(a)) return a;
	if(a) return [a];
	return [];
}

export function clone(a: Object): Object {
	const r = {};
	for(let key in a) {
		r[key] = a[key];
	}
	return r;
}
