import diffList, {CREATE, UPDATE, MOVE, REMOVE} from 'dift';
import {ensureArray, clone} from './util';
import {normalizeChildren} from './h';
import {
	VNode,
	VTextNode,
	VElement,
	isVElement,
	isVTextNode,
	Children
} from './types';


export function updateChildren(parentNode: HTMLElement, oldChildren: any, newChildren: any): Children {
	const oldVNodes = normalizeChildren(ensureArray(oldChildren));
	const newVNodes = normalizeChildren(ensureArray(newChildren));

	updateChildrenInternal(parentNode, oldVNodes, newVNodes);

	return newVNodes;
}

function updateChildrenInternal(parentNode: HTMLElement, oldChildren: Children, newChildren: Children): void {
	//console.log('dift', oldChildren, newChildren);
	diffList<VNode>(oldChildren, newChildren, (editType: number, old: VNode, next: VNode, index: number) => {
		//console.log('listdiff', editType, old, next, index);
		repositionNode(parentNode, editType, old, next, index);
	}, getKey);
}

function getKey(item: VNode): string {
	if(isVElement(item)) {
		let key = item.props['key'];
		if(typeof key === 'string') return key;
		return item.name + '_' + item.index.toString();
	}
	return '#text_' + item.index.toString();
}

function repositionNode(parentNode: HTMLElement, editType: number, oldVNode: VNode, newVNode: VNode, index: number): void {
	const indexNode = parentNode.childNodes[index] || null;

	switch(editType) {
		case CREATE:
			parentNode.insertBefore(
				createDomNode(newVNode),
				indexNode
			);
			//console.log('CREATE', newVNode);
			break;
		case UPDATE:
			//console.log('UPDATE', newVNode);
			updateNode(indexNode, oldVNode, newVNode);
			break;
		case MOVE:
			//console.log('MOVE', newVNode);
			parentNode.insertBefore(
				updateNode(oldVNode.nodeRef, oldVNode, newVNode),
				indexNode
			);
			break;
		case REMOVE:
			//console.log('REMOVE', oldVNode);
			parentNode.removeChild(oldVNode.nodeRef);
			break;
	}
}

function updateNode(oldNode: Node, oldVNode: VNode, newVNode: VNode): Node {
	//console.log('updateNode', oldNode, oldVNode, newVNode)
	if(oldNode instanceof Text && isVTextNode(newVNode)) {
		return updateText(oldNode, newVNode);
	}

	if(oldNode instanceof HTMLElement && isVElement(oldVNode) && isVElement(newVNode)) {
		return updateElement(oldNode, oldVNode, newVNode);
	}

	console.error('updateNode error', oldNode, oldVNode, newVNode);
	throw new Error('This should never happen');
}

function updateText(oldNode: Text, newVNode: VTextNode): Text {
	oldNode.textContent = newVNode.text;
	newVNode.nodeRef = oldNode;
	return oldNode;
}

function updateElement(oldNode: HTMLElement, oldVNode: VElement, newVNode: VElement): HTMLElement {
	updateProps(oldNode, oldVNode.props, newVNode.props);
	updateChildrenInternal(oldNode, oldVNode.children, newVNode.children);
	newVNode.nodeRef = oldNode;
	return oldNode;
}

export function updateProps(element: HTMLElement, oldPropsArg: Object, newPropsArg: Object): void {
	//console.log('updateProps', element, oldVNode, newVNode);
	const oldProps = clone(oldPropsArg);
	const newProps = clone(newPropsArg);

	for(let name in newProps) {
		if(newProps[name] !== oldProps[name]) {
			// Add the new property to the element
			addProp(element, name, newProps[name]);
		}

		// Consider it to have overwritten the old property
		delete oldProps[name];
	}

	// Any old properties not also in the new properties get removed
	for(let name in oldProps) {
		removeProp(element, name);
	}
}



function addProp(element: HTMLElement, name: string, value: any): void {
	if(name in element) {
		element[name] = value;
	} else {
		element.setAttribute(name, value);
	}
}

function removeProp(element: HTMLElement, name: string): void {
	if(name in element) {
		if(typeof element[name] === 'string') {
			element[name] = '';
		} else {
			element[name] = undefined;
		}
	} else {
		element.removeAttribute(name);
	}
}

function createDomNode(vnode: VNode, doc = document): Text | HTMLElement {
	if(isVTextNode(vnode)) {
		const textNode = doc.createTextNode(vnode.text);
		vnode.nodeRef = textNode;
		return textNode;
	}

	const element = doc.createElement(vnode.name);
	vnode.nodeRef = element;
	updateProps(element, {}, vnode.props);
	vnode.children
		.map(vnode => createDomNode(vnode))
		.forEach(node => element.appendChild(node));
	return element;
}
