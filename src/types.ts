export interface VTextNode {
	type: 'text';
	text: string;
	index?: number;
}

export interface VElement {
	type: 'element';
	name: string;
	props: Object;
	children: VNode[];
	index?: number;
}

export type VNode = VTextNode | VElement;
export type Child = undefined | null | string | VNode;

export function isVTextNode(a: VNode): a is VTextNode {
	return a.type === 'text';
}

export function isVElement(a: VNode): a is VElement {
	return a.type === 'element';
}

export function isVNode(a: any): a is VNode {
	return a && a.type && (isVElement(a) || isVTextNode(a));
}
