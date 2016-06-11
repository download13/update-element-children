const Type = require('./sum-type');


const isNullableArray = a => !a || Array.isArray(a);
const isComponent = t => VNode.Component.isInstance(t);

const VNode = Type({
	Text: ['string'],
	// name, attributes, children
	Element: ['string', 'object', isNullableArray],
	// spec ||
	Component: ['object', 'object', isNullableArray]
});

const isVNode = t =>
	VNode.Text.isInstance(t) ||
	VNode.Element.isInstance(t) ||
	isComponent(t);
const isAny = () => true;

const DOMChanges = Type({
	SkipNode: [],
	AddNode: [isVNode],
	RemoveNode: [],
	InsertChild: [isVNode, 'number'],
	RemoveChild: ['number'],
	UpdateChild: [isVNode],
	SetAttribute: ['string', isAny],
	RemoveAttribute: ['string'],
	UpdateComponent: [isComponent, 'object', isNullableArray]
});


module.exports = {
	VNode,
	DOMChanges
};
