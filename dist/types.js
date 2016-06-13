"use strict";
function isVTextNode(a) {
    return a.type === 'text';
}
exports.isVTextNode = isVTextNode;
function isVElement(a) {
    return a.type === 'element';
}
exports.isVElement = isVElement;
function isVNode(a) {
    return a && a.type && (isVElement(a) || isVTextNode(a));
}
exports.isVNode = isVNode;
