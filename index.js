const dift = require('dift');
const {nop, normalizeChildren, sanitizeAttributes} = require('./util');
const {VNode, DOMChanges} = require('./types');


function h(nameOrSpec, attributes, ...children) {
	attributes = sanitizeAttributes(attributes);
	children = normalizeChildren(children);
	// console.log('h', nameOrSpec, attributes, children)

	const {Text, Element, Component} = VNode;

	const type = typeof nameOrSpec;

	if(type === 'string') {
		return Element(nameOrSpec, attributes, children);
	}

	if(type === 'function') {
		return Component({render: nameOrSpec}, attributes, children);
	}

	return Component(nameOrSpec, attributes, children);
}


function createVElement(spec) {
	const mounted = once(spec.onMount);
	const unmount = once(spec.onUnmount);
	const propsChanged = spec.onPropsChange || nop;
	const reduce = spec.reduce || nop;
	const render = spec.render || nop;

	// this.node = doRender();
	// TODO: Whenever we render, call this.onRendered(this.node)
	// This alerts our parent to make sure we are inserted in the right place
}

/*
There are two places a component interacts with other components/renderers/things: their parent, and their children. When we change our root node, call this.onRendered(this.node) so our parent (who defined this.onRendered) can see our changes and add/remove in their tree.

A mapping of key => state is used to keep track of children. If a child's key is not set, create a default one from it's position in the tree. Call child.mounted to alert this.
*/


function diffNode(prev, next, path) {
	const {Text, Element, Component} = VNode;
	const {SkipNode, AddNode, RemoveNode, SetAttribute, UpdateComponent} = DOMChanges;

	// Bail out and skip updating this whole sub-tree
	if(prev === next) {
		return [SkipNode()];
	}

	// Add
	if(!prev) {
		return [AddNode(next)];
	}

	// Remove
	if(prev && !next) {
		return [RemoveNode()];
	}

	// Not the same type?
	if(!(next instanceof prev.constructor)) {
		return [
			RemoveNode(),
			AddNode(next)
		];
	}

	// console.log('types', prev.constructor, next instanceof prev.constructor);

	return VNode.case({
		Text(text) {
			if(text !== prev[0]) {
				return [SetAttribute('nodeValue', text)];
			}
		},
		Element(name, attributes, children) {
			if(name !== prev[0]) {
				//console.log('Element3', name, prev[0]);
				return [
					RemoveNode(),
					AddNode(next)
				];
			}
			return diffAttributes(
					prev[1],
					attributes
				)
					.concat(diffChildren(
						prev[2],
						children
					));
		},
		Component(spec, props, children) {
			if(spec !== prev[0]) {
				return [
					RemoveNode(),
					AddNode(next)
				];
			}
			return [UpdateComponent(prev, props, children)];
		}
	}, next);
}

function diffAttributes(a, b) {
	const {SetAttribute, RemoveAttribute} = DOMChanges;
	const r = [];
	const bClone = Object.assign({}, b);

	Object.keys(a).forEach(key => {
		if(key in bClone) {
			r.push(SetAttribute(key, bClone[key]));
			delete bClone[key];
		} else {
			r.push(RemoveAttribute(key));
		}
	});
	Object.keys(bClone).forEach(key => {
		r.push(SetAttribute(key, bClone[key]))
	});

	return r;
}

function diffChildren(a, b) {
	const {InsertChild, RemoveChild, UpdateChild} = DOMChanges;
	const {default: diffList, CREATE, UPDATE, MOVE, REMOVE} = dift;

	const r = [];
	// TODO Add key support
	diffList(
		a.map(toKeyStruct),
		b.map(toKeyStruct),
		(type, prev, next, pos) => {
			// console.log('diffList',pos)
			if(type === CREATE) {
				r.push(InsertChild(next.node, pos));
			} else if(type === UPDATE) {
				// TODO
				console.warn('UPDATE in diffChildren not implemented');
				r.push(UpdateChild(next.node))
			} else if(type === MOVE) {
				// TODO: Move
				console.warn('MOVE in diffChildren not implemented');
			} else if(type === REMOVE) {
				console.log('remove pos', pos, next, prev)
				r.push(RemoveChild(pos || 0));
			}
		},
		a => a.key
	);
	return r;
}

function toKeyStruct(v, i) {
	const key = VNode.case({
		Text: text => '_#text',
		Element: (name, attributes) => attributes.key || i,
		Component: (spec, props) => props.key || i
	}, v);

	return {
		key,
		node: v
	};
}


function updateNode(document, element, diff) {
	for(let i = 0; i < diff.length; i++) {
		const change = diff[i];

		DOMChanges.case({
			AddNode(node) {
				//console.log('up', createNode(document, node).)
				element.appendChild(createNode(document, node));
			}
		}, change);
	}
}

function createNode(document, vnode) {
	return VNode.case({
		Text(text) {
			return document.createTextNode(text);
		},
		Element(name, attributes, children) {
			const el = document.createElement(name);
			// TODO: Put events into properties
			Object.keys(attributes).forEach(name => {
				el.setAttribute(name, attributes[name]);
			});
			children.forEach(child => {
				el.appendChild(createNode(document, child));
			});
			return el;
		}
	}, vnode);
}


module.exports = {
	h,
	diffNode,
	updateNode
};
