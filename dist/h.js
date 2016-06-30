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
        props: normalizeProps(props),
        children: normalizeChildren(children)
    };
}
exports.h = h;
function normalizeProps(props) {
    if (props === void 0) { props = {}; }
    var r = {};
    for (var k in props) {
        r[normalizePropName(k)] = props[k];
    }
    return r;
}
var onRegex = /^on[A-Z]+/;
function normalizePropName(name) {
    if (name === 'className') {
        return 'class';
    }
    if (onRegex.test(name)) {
        return name.toLowerCase();
    }
    return name;
}
function normalizeChildren(children) {
    return children
        .filter(nonNull)
        .reduce(expandItem, [])
        .map(normalizeChild)
        .map(addIndex);
}
exports.normalizeChildren = normalizeChildren;
function normalizeChild(child) {
    if (typeof child === 'string') {
        return {
            type: 'text',
            text: child
        };
    }
    if (types_1.isVNode(child)) {
        return child;
    }
    return normalizeChild(child.toString());
}
function expandItem(acc, item) {
    return acc.concat(item);
}
function addIndex(item, i) {
    item.index = i;
    return item;
}
function nonNull(a) {
    return a != null;
}
