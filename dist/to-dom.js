"use strict";
var types_1 = require('./types');
var update_dom_1 = require('./update-dom');
function createRealDomNode(vnode, doc) {
    if (doc === void 0) { doc = document; }
    if (types_1.isVTextNode(vnode)) {
        return doc.createTextNode(vnode.text);
    }
    var element = doc.createElement(vnode.name);
    update_dom_1.updateProps(element, {}, vnode.props);
    vnode.children
        .map(function (vnode) { return createRealDomNode(vnode); })
        .forEach(function (node) { return element.appendChild(node); });
    return element;
}
exports.createRealDomNode = createRealDomNode;
