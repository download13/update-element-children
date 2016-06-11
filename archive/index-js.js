const Type = require('union-type');


const blankAttributes = Object.seal({});
function sanitizeAttributes(attributes) {
	if(!attributes) return blankAttributes;

	Object.keys(attributes).forEach(key => {
		if(attributes[key] === undefined) delete attributes[key];
	});
	return attributes;
}
function sanitizeChildren(children) {
	return children.map((child) => {
		if(typeof child === 'number') {
			return {type: 'string', v: child.toString()};
		}
		if(typeof child === 'string') {
			return {type: 'string', v: child};
		}
		return child;
	});
}

function App({props, h}) {
	return h('div', {t: props.firstAttr},
		h('p', null, 'First'),
		h('p', null, props.val),
		h(Link, {to: "/about"}, 'LinkText')
	);
}

function Link({props, children}) {
	return h('a', {href: props.to}, ...children);
}

function h(component, attributes, ...children) {
	attributes = sanitizeAttributes(attributes);
	const sanitizedChildren = sanitizeChildren(children);

	if(typeof component === 'string') {
		return vElement(component, attributes, sanitizedChildren);
	} else {
		return vFunction(component, attributes, sanitizedChildren);
	}
}

function vElement(name, attributes, children) {
	return {
		type: 'element',
		name,
		attributes,
		children
	};
}

function vFunction(fn, attributes, children) {
	return fn({
		props: attributes,
		children,
		h
	});
}


const Any = () => true;

const VNode = Type({
	StringVNode: [String],
	ElementVNode: [String, Object, Array]
});

const Change = Type({
	addNode: [VNode],
	removeNode: [VNode]
});

function diff(a, b) {
	VNode.case({
		StringVNode: str =>
	}, a);

	if(a.type === 'element' && b.type === 'element') {

	}
}

function diffNode(a, b) {
	const atype = typeof a;
	const btype = typeof b;
	if(a && !b) { // Was here, gone now
		return Change.removeNode(a);
	}
	if(!a && b) { // Suddenly appeared
		return Change.addNode(b);
	}
	if(a.type === 'string') {
		a.type;
	}

	if(a.type === 'element' && b.type === 'element') {

	}
}


const oldVDom = h(App, null);
const newVDom = h(App, {firstAttr: 'test'});
console.log(diff(oldVDom, newVDom));
