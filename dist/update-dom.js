"use strict";
var dift_1 = require('dift');
var to_dom_1 = require('./to-dom');
var util_1 = require('./util');
var h_1 = require('./h');
var types_1 = require('./types');
function updateChildren(parentNode, oldChildren, newChildren) {
    var oldVNodes = h_1.sanitizeChildren(util_1.ensureArray(oldChildren));
    var newVNodes = h_1.sanitizeChildren(util_1.ensureArray(newChildren));
    updateChildrenInternal(parentNode, oldVNodes, newVNodes);
}
exports.updateChildren = updateChildren;
function updateChildrenInternal(parentNode, oldVNodes, newVNodes) {
    dift_1.default(oldVNodes, newVNodes, function (editType, old, next, index) {
        repositionNode(parentNode, editType, old, next, index);
    }, getKey);
}
function getKey(item) {
    if (types_1.isVElement(item)) {
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
        case dift_1.CREATE:
            parentNode.insertBefore(to_dom_1.createRealDomNode(newVNode), indexNode);
            break;
        case dift_1.UPDATE:
            updateNode(indexNode, oldVNode, newVNode);
            break;
        case dift_1.MOVE:
            var oldNodeMove = parentNode.childNodes[oldVNode.index];
            parentNode.insertBefore(updateNode(oldNodeMove, oldVNode, newVNode), indexNode);
            break;
        case dift_1.REMOVE:
            var oldNodeRemove = parentNode.childNodes[oldVNode.index];
            parentNode.removeChild(oldNodeRemove);
            break;
    }
}
function updateNode(oldNode, oldVNode, newVNode) {
    if (oldNode instanceof Text && types_1.isVTextNode(newVNode)) {
        return updateText(oldNode, newVNode);
    }
    if (oldNode instanceof HTMLElement && types_1.isVElement(oldVNode) && types_1.isVElement(newVNode)) {
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
    var oldProps = util_1.clone(oldVNode.props);
    var newProps = util_1.clone(newVNode.props);
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
