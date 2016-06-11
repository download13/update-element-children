export function h(name, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return {
        type: 'element',
        name: name,
        props: props || {},
        children: children
            .filter(truthy)
            .map(childToVNode)
    };
}
export function sanitizeChildren(children) {
    return children
        .filter(truthy)
        .map(childToVNode);
}
function childToVNode(child, i) {
    if (typeof child === 'string') {
        return {
            type: 'text',
            text: child,
            index: i
        };
    }
    child.index = i;
    return child;
}
function truthy(a) {
    return !!a;
}
