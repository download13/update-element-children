import diffList, { CREATE, UPDATE, MOVE, REMOVE } from 'dift';
import { createRealDomNode } from './to-dom';
import { ensureArray, clone } from './util';
import { sanitizeChildren } from './h';
import { isVElement, isVTextNode } from './types';
export function updateChildren(parentNode, oldChildren, newChildren) {
    var oldVNodes = sanitizeChildren(ensureArray(oldChildren));
    var newVNodes = sanitizeChildren(ensureArray(newChildren));
    updateChildrenInternal(parentNode, oldVNodes, newVNodes);
}
function updateChildrenInternal(parentNode, oldVNodes, newVNodes) {
    diffList(oldVNodes, newVNodes, function (editType, old, next, index) {
        repositionNode(parentNode, editType, old, next, index);
    }, getKey);
}
function getKey(item) {
    if (isVElement(item)) {
        var key = item.props['key'];
        if (typeof key === 'string')
            return key;
        return item.name + '_' + item.index.toString();
    }
    return '#text_' + item.index.toString();
}
function repositionNode(parentNode, editType, oldVNode, newVNode, index) {
    var indexNode = parentNode.childNodes[index] || null;
    switch (editType) {
        case CREATE:
            parentNode.insertBefore(createRealDomNode(newVNode), indexNode);
            break;
        case UPDATE:
            updateNode(indexNode, oldVNode, newVNode);
            break;
        case MOVE:
            var oldNodeMove = parentNode.childNodes[oldVNode.index];
            parentNode.insertBefore(updateNode(oldNodeMove, oldVNode, newVNode), indexNode);
            break;
        case REMOVE:
            var oldNodeRemove = parentNode.childNodes[oldVNode.index];
            parentNode.removeChild(oldNodeRemove);
            break;
    }
}
function updateNode(oldNode, oldVNode, newVNode) {
    if (oldNode instanceof Text && isVTextNode(newVNode)) {
        return updateText(oldNode, newVNode);
    }
    if (oldNode instanceof HTMLElement && isVElement(oldVNode) && isVElement(newVNode)) {
        return updateElement(oldNode, oldVNode, newVNode);
    }
    console.error('updateNode error', oldNode, oldVNode, newVNode);
    throw new Error('This should never happen');
}
function updateText(oldNode, newVNode) {
    oldNode.textContent = newVNode.text;
    return oldNode;
}
function updateElement(oldNode, oldVNode, newVNode) {
    updateProps(oldNode, oldVNode, newVNode);
    updateChildrenInternal(oldNode, oldVNode.children, newVNode.children);
    return oldNode;
}
function updateProps(element, oldVNode, newVNode) {
    var oldProps = clone(oldVNode.props);
    var newProps = clone(newVNode.props);
    for (var name_1 in newProps) {
        if (newProps[name_1] !== oldProps[name_1]) {
            element[normalizeProp(name_1)] = newProps[name_1];
        }
        delete oldProps[name_1];
    }
    for (var name_2 in oldProps) {
        delete element[normalizeProp(name_2)];
    }
}
function normalizeProp(name) {
    switch (name) {
        case 'class':
            return 'className';
        default:
            return name;
    }
}
