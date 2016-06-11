export {updateChildren} from './update-dom';

export function h(type, props, ...children) {
	return {
		type,
		props: props || {},
		children: children.map(normalizeChild)
	};
}

function normalizeChild(child) {
	if(child === undefined) return null;
	return child;
}
