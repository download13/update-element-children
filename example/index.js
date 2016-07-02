/** @jsx h */
import {h, updateChildren} from '../dist';
import {createStore} from 'redux';

const root = document.getElementById('root');
const store = createStore((state = 0, {type, payload}) => {
	if(type === 'TIME') return payload;
	return state;
});

let previousRender = null;
function render(state) {
	const timeStr = new Date(state).toLocaleTimeString();
	previousRender = updateChildren(root, previousRender, timeStr);;
}

store.subscribe(() => render(store.getState()));

setInterval(
	() => store.dispatch({
		type: 'TIME',
		payload: Date.now()
	}),
	1000
);
