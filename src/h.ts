import {
	Child,
	VElement,
	VNode
} from './types';


export function h(name: string, props: Object, ...children: Child[]): VElement {
	return {
		type: 'element',
		name,
		props: props || {},
		children: children
			.filter(truthy)
			.map(childToVNode)
	};
}

export function sanitizeChildren(children: Child[]): VNode[] {
	return children
		.filter(truthy)
		.map(childToVNode);
}

function childToVNode(child: Child, i: number): VNode {
	if(typeof child === 'string') {
		return {
			type: 'text',
			text: child,
			index: i
		};
	}
	child.index = i;
	return child;
}

function truthy(a: any): boolean {
	return !!a;
}
