const blankAttributes = Object.seal({});
function sanitizeAttributes(attributes?: Object): Object {
	if(!attributes) return blankAttributes;

	Object.keys(attributes).forEach(key => {
		if(attributes[key] === undefined) delete attributes[key];
	});
	return attributes;
}
function sanitizeChildren(children: VNodeChild[]): VNode[] {
	return children.map((child: VNodeChild) => {
		if(typeof child === 'number') {
			return {type: 'string', v: child.toString()} as StringVNode;
		}
		if(typeof child === 'string') {
			return {type: 'string', v: child} as StringVNode;
		}
		return child;
	});
}

interface AppProps {
	val: string;
	firstAttr: string;
}
function App({props, h}: FunctionalModel<AppProps>): VNode {
	return h('div', {t: props.firstAttr},
		h('p', null, 'First'),
		h('p', null, props.val),
		h(Link, {to: "/about"}, 'LinkText')
	);
}

interface LinkProps extends Object { to: string; }
function Link({props, children}: FunctionalModel<LinkProps>): VNode {
	return h('a', {href: props.to}, ...children);
}

function h(component: JsxInput, attributes: Object, ...children: VNodeChild[]): VNode {
	attributes = sanitizeAttributes(attributes);
	const sanitizedChildren = sanitizeChildren(children);

	if(typeof component === 'string') {
		return vElement(component, attributes, sanitizedChildren);
	} else {
		return vFunction(component, attributes, sanitizedChildren);
	}
}

function vElement(name: string, attributes: Object, children: VNode[]): ElementVNode {
	return {
		type: 'element',
		name,
		attributes,
		children
	};
}

function vFunction(fn: FunctionalComponent<Object>, attributes: Object, children: VNode[]): VNode {
	return fn({
		props: attributes,
		children,
		h
	});
}


type Mods = ModRemoveNode;
interface ModRemoveNode {
	type: 'removeNode',
	node: VNode
}

function diffNode(a: VNode, b: VNode) {
	const atype = typeof a;
	const btype = typeof b;
	if(a && !b) {
		return {type: 'removeNode', node: a};
	}
	if(a.type === 'string') {
		a.type;
	}

	if(a.type === 'element' && b.type === 'element') {

	}
}


const oldVDom = h(App, null);
const newVDom = h(App, {firstAttr: 'test'});
console.log(diffNode(oldVDom, newVDom));
