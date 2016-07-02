"use strict";
var dift_1 = require('dift');
var util_1 = require('./util');
var h_1 = require('./h');
var types_1 = require('./types');
function updateChildren(parentNode, oldChildren, newChildren) {
    var oldVNodes = h_1.normalizeChildren(util_1.ensureArray(oldChildren));
    var newVNodes = h_1.normalizeChildren(util_1.ensureArray(newChildren));
    updateChildrenInternal(parentNode, oldVNodes, newVNodes);
    return newVNodes;
}
exports.updateChildren = updateChildren;
function updateChildrenInternal(parentNode, oldChildren, newChildren) {
    dift_1.default(oldChildren, newChildren, function (editType, old, next, index) {
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
            parentNode.insertBefore(createDomNode(newVNode), indexNode);
            break;
        case dift_1.UPDATE:
            updateNode(indexNode, oldVNode, newVNode);
            break;
        case dift_1.MOVE:
            parentNode.insertBefore(updateNode(oldVNode.nodeRef, oldVNode, newVNode), indexNode);
            break;
        case dift_1.REMOVE:
            parentNode.removeChild(oldVNode.nodeRef);
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
    updateProps(oldNode, oldVNode.props, newVNode.props);
    updateChildrenInternal(oldNode, oldVNode.children, newVNode.children);
    return oldNode;
}
function updateProps(element, oldPropsArg, newPropsArg) {
    var oldProps = util_1.clone(oldPropsArg);
    var newProps = util_1.clone(newPropsArg);
    for (var name_1 in newProps) {
        if (newProps[name_1] !== oldProps[name_1]) {
            addProp(element, name_1, newProps[name_1]);
        }
        delete oldProps[name_1];
    }
    for (var name_2 in oldProps) {
        removeProp(element, name_2);
    }
}
exports.updateProps = updateProps;
function addProp(element, name, value) {
    if (name in element) {
        element[name] = value;
    }
    else {
        element.setAttribute(name, value);
    }
}
function removeProp(element, name) {
    if (name in element) {
        if (typeof element[name] === 'string') {
            element[name] = '';
        }
        else {
            element[name] = undefined;
        }
    }
    else {
        element.removeAttribute(name);
    }
}
function createDomNode(vnode, doc) {
    if (doc === void 0) { doc = document; }
    if (types_1.isVTextNode(vnode)) {
        var textNode = doc.createTextNode(vnode.text);
        vnode.nodeRef = textNode;
        return textNode;
    }
    var element = doc.createElement(vnode.name);
    vnode.nodeRef = element;
    updateProps(element, {}, vnode.props);
    vnode.children
        .map(function (vnode) { return createDomNode(vnode); })
        .forEach(function (node) { return element.appendChild(node); });
    return element;
}
