"use strict";
var types_1 = require('./types');
function createRealDomNode(vnode, doc) {
    if (doc === void 0) { doc = document; }
    if (types_1.isVTextNode(vnode)) {
        return doc.createTextNode(vnode.text);
    }
    var element = doc.createElement(vnode.name);
    populateAttributes(element, vnode.props);
    vnode.children
        .map(function (vnode) { return createRealDomNode(vnode); })
        .forEach(element.appendChild.bind(element));
    return element;
}
exports.createRealDomNode = createRealDomNode;
function populateAttributes(element, props) {
    for (var key in props) {
        element[name] = props[name];
    }
}
