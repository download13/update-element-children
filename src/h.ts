import {
	VElement,
	isVNode,
	UnsanitizedChildren,
	Children,
	Child
} from './types';


export function h(name: string, props: Object, ...children: UnsanitizedChildren): VElement {
	return {
		type: 'element',
		name,
		props: normalizeProps(props),
		children: normalizeChildren(children)
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

export function normalizeChildren(children: UnsanitizedChildren): Children {
	return children
		.filter(nonNull)
		.reduce(expandItem, [])
		.map(normalizeChild)
		.map(addIndex);
}

function normalizeChild(child: any): Child {
	if(typeof child === 'string') {
		return {
			type: 'text',
			text: child
		};
	}

	if(isVNode(child)) {
		return child;
	}

	return normalizeChild(child.toString());
}

function expandItem(acc: any[], item: any): any[] {
	return acc.concat(item);
}

function addIndex(item: any, i: number): any {
	item.index = i;
	return item;
}

function nonNull(a: any): boolean {
	return a != null;
}
