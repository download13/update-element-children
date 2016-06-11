# update-element-children

Unlike most other virtual doms, this one is intended to operate on the children of an existing [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).

## Examples:

### Simple Example

```javascript
/** @jsx h */
import {h, updateChildren} from 'update-element-children';

const root = document.getElementById('root');

updateChildren(root, null, <div>Test</div>);
```

### Redux Example

```javascript
/** @jsx h */
import {h, updateChildren} from 'update-element-children';
import {createStore} from 'redux';

const root = document.getElementById('root');
const store = createStore((state = 0, {type, payload}) => {
	if(type === 'TIME') return payload;
	return state;
});

let previousRender = null;
function render(state) {
	const timeStr = new Date(state).toLocaleTimeString();
	updateChildren(root, previousRender, [timeStr]);
	previousRender = currentRender;
}

store.subscribe(() => render(store.getState()));

setInterval(
	() => store.dispatch({
		type: 'TIME',
		payload: Date.now()
	}),
	1000
);
```
