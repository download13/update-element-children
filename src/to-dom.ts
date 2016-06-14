import {
	VNode,
	isVTextNode
} from './types';
import {updateProps} from './update-dom';


export function createRealDomNode(vnode: VNode, doc = document): Text | HTMLElement {
	if(isVTextNode(vnode)) {
		return doc.createTextNode(vnode.text);
	}

	const element = doc.createElement(vnode.name);
	updateProps(element, {}, vnode.props);
	vnode.children
		.map(vnode => createRealDomNode(vnode))
		.forEach(node => element.appendChild(node));
	return element;
}
