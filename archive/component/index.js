const {
	sanitizeAttributes,
	sanitizeChildren,
	doAsync
} = require('./util');


const
	TYPE_ELEMENT = 'element',
	TYPE_STRING = 'string',
	TYPE_COMPONENT = 'component';


const initializationCommand = {
	type: '_*INITIALIZATION_COMMAND',
	payload: null
};

// TODO: Memoize render
function createComponent(spec) {
	const {
		render,
		onMount,
		onPropsChange,
		onUnmount
	} = spec;
	if(!render) throw new Error('createComponent requires you to specify a `render` method');
	const reduce = spec.reduce || nop;

	let renderNode = null;
	let renderPending = false;
	let model = {
		props: {},
		state: undefined,
		update,
		h
	};

	update(initializationCommand);

	function mount(node) {
		renderNode = node;
		if(onMount) {
			onMount(model);
		}
		// Render first time
		queueRender();
	}

	// Takes an action and updates the component state
	function update(command) {
		const newState = reduce(model.state, command);
		if(newState !== model.state) {
			model = {...model, state: newState};
			queueRender();
		}
		return newState;
	}

	function setProps(newProps) {
		// TODO: Do shallow comparison of props
		if(newProps !== model.props) {
			model = {...model, props: newProps};
			queueRender();
			if(onPropsChange) {
				onPropsChange(model);
			}
		}
	}

	function setChildren(newChildren) {
		// TODO: Do shallow comparison of children
	}

	function queueRender() {
		if(!renderPending && renderNode !== null) {
			renderPending = true;
			doAsync(doRender);
		}
	}

	function doRender() {
		if(!renderPending) return;
		patch(renderNode, () => {
			const doPatch = render(model);
			doPatch();
		});
		renderPending = false;
	}

	function unmount() {
		if(onUnmount) {
			onUnmount(model);
		}
		// TODO: Cleanup
	}

	return {
		mount,
		setProps,
		setChildren,
		unmount,
		spec
	};
}

function nop() {}


class Tree {
	constructor(parentElement) {
		while(parentElement.firstChild) {
			parentElement.removeChild(parentElement.firstChild);
		}

		this.parentElement = parentElement;
		this.lastRender = null;
	}

	render(newVNode) {
		// TODO: diff with old vnode, patch dom
		const diff = diffVNode(this.lastRender, newVNode);
		patchDOM(this.parentElement, diff);
	}
}

function diffVNode(a, b, keyPrefix) {
	if(!a && b) {
		return {change: ADD_NODE, node: b};
	} else if(a && !b) {
		return {change: REMOVE_NODE, node: a};
	} else if(!a && !b) {
		return [];
	}

	if(a.type === b.type) {
		if(a.type === TYPE_STRING) {
			return {change: SET_TEXT, value: b.value};
		} else if(a.type === TYPE_ELEMENT && a.name === b.name) {
			return diffElement(a, b);
		} else if(a.type === TYPE_COMPONENT && a.spec === b.spec) {
			return diffComponent(a, b);
		}
	}

	return [
		{change: REMOVE_NODE, node: a},
		{change: ADD_NODE, node: b}
	];
	console.log('diffVNode', a, b);
}

function diffElement(a, b) {
	// TODO: Make this key-based
}

function patchDOM(el, diff) {
	console.log('patchDOM', diff);
}


const CountBtn = {
	render({h, update, state}) {
		return <button onClick={() => update({type: 'INCREMENT'})}>
			I've been clicked {state.count} times. Also: {children}
		</button>;
	},
	reduce(state = {count: 0}, {type, payload}) {
		if(type === 'INCREMENT') return {...state, count: state.count + 1};
		return state;
	}
};

const App = {
	render() {
		const g = <div data-test="val">
			<p>First Second</p>
			<CountBtn>count children</CountBtn>
		</div>;
		return g;
	},
	reduce(state = {init: 1, changes: 0}, {type, payload}) {
		if(type === 'CMD') return {...state, changes: payload};
		return state;
	}
};

function main() {
	const tree = new Tree(document.getElementById('approot'));
	tree.render(<App/>);
}

main();


function h(nameOrSpec, attributes, ...children) {
	attributes = sanitizeAttributes(attributes);
	children = sanitizeChildren(children);

	const type = typeof nameOrSpec;

	if(type === 'string') {
		return {
			type: TYPE_ELEMENT,
			name: nameOrSpec,
			attributes,
			children: childrenToNodes(children)
		};
	}

	if(type === 'function') {
		nameOrSpec = {render: nameOrSpec};
	}

	return {
		type: TYPE_COMPONENT,
		spec: nameOrSpec,
		props: attributes,
		children
	};
}

function childrenToNodes(children) {
	return children.map(child => {
		if(typeof child === 'string') {
			return {
				type: TYPE_STRING,
				value: child
			};
		}
		return child;
	});
}

function renderElement(name, attributes, children) {
	const childComponents = [];
	//console.log('rendering', name, attributes, children);
	elementOpenStart(name, attributes.key, null);
	for(let key in attributes) {
		attr(key.toLowerCase(), attributes[key]);
	}
	elementOpenEnd();
	for(let i = 0; i < children.length; i++) {
		const child = children[i];
		if(typeof child === 'number' || typeof child === 'string') {
			text(child);
		} else {
			const possibleComponent = child();

		}
	}
	elementClose(name);
	//console.log('done', name);
	return childComponents;
}

function renderFunction(fn, attributes, children) {
	//console.log('fn rendering', attributes, children)
	const doRender = fn({props: attributes, children, h});
	return doRender();
}

function renderComponent(component, spec, attributes, children) {
	if(!component) {
		component = createComponent(spec);
	}
	component.setProps(attributes);
	component.setChildren(children);
	component.mount(SOMEWHERE_TODO);
}
