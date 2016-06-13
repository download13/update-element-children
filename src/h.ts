import {
	VElement,
	VNode,
	isVNode
} from './types';


export function h(name: string, props: Object, ...children: any[]): VElement {
	return {
		type: 'element',
		name,
		props: props || {},
		children: children
			.filter(nonNull)
			.map(childToVNode)
	};
}

export function sanitizeChildren(children: any[]): VNode[] {
	return children
		.filter(nonNull)
		.map(childToVNode);
}

function childToVNode(child: any, i: number): VNode {
	if(typeof child === 'string') {
		return {
			type: 'text',
			text: child,
			index: i
		};
	}

	if(isVNode(child)) {
		child.index = i;
		return child;
	}

	return childToVNode(child.toString(), i);
}

function nonNull(a: any): boolean {
	return a != null;
}
