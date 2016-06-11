export function createRealDomNode(vnode, doc = document) {
	if(typeof vnode === 'string') {
		return doc.createTextNode(vnode);
	}

	const node = doc.createElement(vnode.type);
	populateAttributes(node, vnode.props);
	vnode.children
		.map(createRealDomNode)
		.forEach(node.appendChild.bind(node));
	return node;
}

function populateAttributes(node, props) {
	for(let key in props) {
		node[name] = props[name];
	}
}
