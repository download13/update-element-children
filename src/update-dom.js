import diffList, {CREATE, UPDATE, MOVE, REMOVE} from 'dift';
import {createRealDomNode} from './to-dom';
import {ensureArray} from './util';


export function updateChildren(parentNode, oldVNodes, newVNodes) {
	oldVNodes = comparableVNodes(ensureArray(oldVNodes));
	newVNodes = comparableVNodes(ensureArray(newVNodes));

	diffList(oldVNodes, newVNodes, (editType, old, next, index) => {
		//console.log('listdiff', editType, old, next, index);
		repositionNode(parentNode, editType, old, next, index);
	}, a => a.key);
}

function repositionNode(parentNode, editType, oldItem, newItem, index) {
	const node = parentNode.childNodes[index] || null;

	switch(editType) {
		case CREATE:
			parentNode.insertBefore(
				createRealDomNode(newItem.vnode),
				node
			);
			break;
		case UPDATE:
			updateNode(node, oldItem.vnode, newItem.vnode);
			break;
		case MOVE:
			const oldNode = parentNode.childNodes[oldItem.index];
			parentNode.insertBefore(
				updateNode(oldNode, oldItem.vnode, newItem.vnode),
				node
			);
			break;
		case REMOVE:
			parentNode.removeChild(node);
			break;
	}
}

function updateNode(oldNode, oldVNode, newVNode) {
	console.log('updateNode', oldVNode, newVNode)
	if(
		(oldVNode === null && newVNode !== null)
		|| (oldVNode !== null && newVNode === null)
		|| (typeof oldVNode !== typeof newVNode)
		|| (oldVNode.type !== newVNode.type)
	) {
		const newNode = createRealDomNode(newVNode);
		console.log('new', oldNode, newNode)
		oldNode.parentNode.replaceChild(
			newNode,
			oldNode
		);
		return newNode;
	} else if(newVNode.type) {
		updateProps(oldNode, oldVNode, newVNode);
		updateChildren(oldNode, oldVNode.children, newVNode.children);
	} else if(typeof newVNode === 'string') {
		oldNode.textContent = newVNode;
	}

	return oldNode;
}

function updateProps(node, oldVNode, newVNode) {
	const oldProps = {...oldVNode.props};
	const newProps = {...newVNode.props};

	for(let name in newProps) {
		if(newProps[name] !== oldProps[name]) {
			node[name] = newProps[name];
		}
		delete oldProps[name];
	}

	for(let name in oldProps) {
		delete node[name];
	}

	return node;
}

function comparableVNodes(vnodes) {
	return vnodes.map((vnode, i) => {
		return {
			key: ((vnode && vnode.props && vnode.props.key) || i).toString(),
			vnode,
			index: i
		};
	});
}
