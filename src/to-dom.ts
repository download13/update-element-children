import {
	VNode,
	isVTextNode
} from './types';


export function createRealDomNode(vnode: VNode, doc = document): Text | HTMLElement {
	if(isVTextNode(vnode)) {
		return doc.createTextNode(vnode.text);
	}

	const element = doc.createElement(vnode.name);
	populateAttributes(element, vnode.props);
	vnode.children
		.map(vnode => createRealDomNode(vnode))
		.forEach(element.appendChild.bind(element));
	return element;
}

function populateAttributes(element: HTMLElement, props: Object) {
	for(let key in props) {
		element[name] = props[name];
	}
}
