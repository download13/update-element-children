const {VNode} = require('./types');


const blankAttributes = Object.seal({});
function sanitizeAttributes(attributes) {
	if(!attributes) return blankAttributes;

	Object.keys(attributes).forEach(key => {
		if(attributes[key] === undefined) delete attributes[key];
	});
	return attributes;
}

function flattenArray(arr) {
	return [].concat(...arr);
}

function sanitizeChildren(children) {
	return flattenArray(children).filter(Boolean);
}

function normalizeChildren(children) {
	return sanitizeChildren(children).map(child => {
		if(typeof child === 'string') {
			return VNode.Text(child);
		}
		return child;
	});
}

const nop = () => {};
function nullSafeOnce(fn = nop) {
	let used = false;
	return (...args) => {
		if(!used) {
			used = true;
			fn(...args);
		}
	};
}

const g = this;
let doAsync;
if(g.requestIdleCallback) {
	doAsync = fn => requestIdleCallback(fn);
} else if(g.setImmediate) {
	doAsync = fn => setImmediate(fn);
} else {
	doAsync = fn => setTimeout(fn, 0);
}

module.exports = {
	nop,
	nullSafeOnce,
	doAsync,
	sanitizeAttributes,
	normalizeChildren
};
