import diffList, {CREATE, UPDATE, MOVE, REMOVE} from 'dift';
import {ensureArray, clone} from './util';
import {sanitizeChildren} from './h';
import {
	VNode,
	VTextNode,
	VElement,
	isVElement,
	isVTextNode
} from './types';


export function updateChildren(parentNode: HTMLElement, oldChildren: any, newChildren: any): void {
	const oldVNodes = sanitizeChildren(ensureArray(oldChildren));
	const newVNodes = sanitizeChildren(ensureArray(newChildren));

	updateChildrenInternal(parentNode, oldVNodes, newVNodes);
}

function updateChildrenInternal(parentNode: HTMLElement, oldVNodes: VNode[], newVNodes: VNode[]): void {
	diffList<VNode>(oldVNodes, newVNodes, (editType: number, old: VNode, next: VNode, index: number) => {
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
			break;
		case UPDATE:
			//console.log('UPDATE', parentNode, index, indexNode)
			updateNode(indexNode, oldVNode, newVNode);
			break;
		case MOVE:
			const oldNodeMove = parentNode.childNodes[oldVNode.index];
			parentNode.insertBefore(
				updateNode(oldNodeMove, oldVNode, newVNode),
				indexNode
			);
			break;
		case REMOVE:
			const oldNodeRemove = parentNode.childNodes[oldVNode.index];
			parentNode.removeChild(oldNodeRemove);
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
	return oldNode;
}

function updateElement(oldNode: HTMLElement, oldVNode: VElement, newVNode: VElement): HTMLElement {
	updateProps(oldNode, oldVNode.props, newVNode.props);
	updateChildrenInternal(oldNode, oldVNode.children, newVNode.children);
	return oldNode;
}

export function updateProps(element: HTMLElement, oldPropsArg: Object, newPropsArg: Object): void {
	//console.log('updateProps', element, oldVNode, newVNode);
	const oldProps = clone(oldPropsArg);
	const newProps = clone(newPropsArg);

	for(let name in newProps) {
		if(newProps[name] !== oldProps[name]) {
			element[normalizeProp(name)] = newProps[name];
		}
		delete oldProps[name];
	}

	for(let name in oldProps) {
		delete element[normalizeProp(name)];
	}
}

function normalizeProp(name: string): string {
	if(name === 'class') {
		return 'className';
	}
	if(name.indexOf('on') === 0) {
		return name.toLowerCase();
	}
	return name;
}

function createDomNode(vnode: VNode, doc = document): Text | HTMLElement {
	if(isVTextNode(vnode)) {
		return doc.createTextNode(vnode.text);
	}

	const element = doc.createElement(vnode.name);
	updateProps(element, {}, vnode.props);
	vnode.children
		.map(vnode => createDomNode(vnode))
		.forEach(node => element.appendChild(node));
	return element;
}
