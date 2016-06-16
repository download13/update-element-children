import {
	VElement,
	VNode,
	isVNode
} from './types';


export function h(name: string, props: Object, ...children: any[]): VElement {
	return {
		type: 'element',
		name,
		props: normalizeProps(props),
		children: sanitizeChildren(children)
	};
}

function normalizeProps(props: Object = {}): Object {
	const r = {};
	for(let k in props) {
		r[normalizePropName(k)] = props[k];
	}
	return r;
}

const onRegex = /^on[A-Z]+/;
function normalizePropName(name: string): string {
	if(name === 'className') {
		return 'class';
	}

	if(onRegex.test(name)) {
		return name.toLowerCase();
	}

	return name;
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
