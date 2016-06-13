"use strict";
var types_1 = require('./types');
function h(name, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return {
        type: 'element',
        name: name,
        props: props || {},
        children: children
            .filter(nonNull)
            .map(childToVNode)
    };
}
exports.h = h;
function sanitizeChildren(children) {
    return children
        .filter(nonNull)
        .map(childToVNode);
}
exports.sanitizeChildren = sanitizeChildren;
function childToVNode(child, i) {
    if (typeof child === 'string') {
        return {
            type: 'text',
            text: child,
            index: i
        };
    }
    if (types_1.isVNode(child)) {
        child.index = i;
        return child;
    }
    return childToVNode(child.toString(), i);
}
function nonNull(a) {
    return a != null;
}
