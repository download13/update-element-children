"use strict";
function isVTextNode(a) {
    return a.type === 'text';
}
exports.isVTextNode = isVTextNode;
function isVElement(a) {
    return a.type === 'element';
}
exports.isVElement = isVElement;
