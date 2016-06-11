module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dift__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dift___default = __WEBPACK_IMPORTED_MODULE_0_dift__ && __WEBPACK_IMPORTED_MODULE_0_dift__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_dift__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_dift__; };
	/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_dift___default, 'a', __WEBPACK_IMPORTED_MODULE_0_dift___default);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__to_dom__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);
	/* harmony export */ exports["a"] = updateChildren;var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };





	function updateChildren(parentNode, oldVNodes, newVNodes) {
		oldVNodes = comparableVNodes(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* ensureArray */])(oldVNodes));
		newVNodes = comparableVNodes(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* ensureArray */])(newVNodes));

		__WEBPACK_IMPORTED_MODULE_0_dift___default()(oldVNodes, newVNodes, function (editType, old, next, index) {
			//console.log('listdiff', editType, old, next, index);
			repositionNode(parentNode, editType, old, next, index);
		}, function (a) {
			return a.key;
		});
	}

	function repositionNode(parentNode, editType, oldItem, newItem, index) {
		var node = parentNode.childNodes[index] || null;

		switch (editType) {
			case __WEBPACK_IMPORTED_MODULE_0_dift__["CREATE"]:
				parentNode.insertBefore(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__to_dom__["a" /* createRealDomNode */])(newItem.vnode), node);
				break;
			case __WEBPACK_IMPORTED_MODULE_0_dift__["UPDATE"]:
				updateNode(node, oldItem.vnode, newItem.vnode);
				break;
			case __WEBPACK_IMPORTED_MODULE_0_dift__["MOVE"]:
				var oldNode = parentNode.childNodes[oldItem.index];
				parentNode.insertBefore(updateNode(oldNode, oldItem.vnode, newItem.vnode), node);
				break;
			case __WEBPACK_IMPORTED_MODULE_0_dift__["REMOVE"]:
				parentNode.removeChild(node);
				break;
		}
	}

	function updateNode(oldNode, oldVNode, newVNode) {
		console.log('updateNode', oldVNode, newVNode);
		if (oldVNode === null && newVNode !== null || oldVNode !== null && newVNode === null || (typeof oldVNode === 'undefined' ? 'undefined' : _typeof(oldVNode)) !== (typeof newVNode === 'undefined' ? 'undefined' : _typeof(newVNode)) || oldVNode.type !== newVNode.type) {
			var newNode = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__to_dom__["a" /* createRealDomNode */])(newVNode);
			console.log('new', oldNode, newNode);
			oldNode.parentNode.replaceChild(newNode, oldNode);
			return newNode;
		} else if (newVNode.type) {
			updateProps(oldNode, oldVNode, newVNode);
			updateChildren(oldNode, oldVNode.children, newVNode.children);
		} else if (typeof newVNode === 'string') {
			oldNode.textContent = newVNode;
		}

		return oldNode;
	}

	function updateProps(node, oldVNode, newVNode) {
		var oldProps = _extends({}, oldVNode.props);
		var newProps = _extends({}, newVNode.props);

		for (var name in newProps) {
			if (newProps[name] !== oldProps[name]) {
				node[name] = newProps[name];
			}
			delete oldProps[name];
		}

		for (var _name in oldProps) {
			delete node[_name];
		}

		return node;
	}

	function comparableVNodes(vnodes) {
		return vnodes.map(function (vnode, i) {
			return {
				key: (vnode && vnode.props && vnode.props.key || i).toString(),
				vnode: vnode,
				index: i
			};
		});
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__update_dom__ = __webpack_require__(0);
	/* harmony export */ exports["h"] = h;/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__update_dom__, "a")) __webpack_require__.d(exports, "updateChildren", function() { return __WEBPACK_IMPORTED_MODULE_0__update_dom__["a"]; });


	function h(type, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}

		return {
			type: type,
			props: props || {},
			children: children.map(normalizeChild)
		};
	}

	function normalizeChild(child) {
		if (child === undefined) return null;
		return child;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony export */ exports["a"] = createRealDomNode;function createRealDomNode(vnode) {
		var doc = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

		if (typeof vnode === 'string') {
			return doc.createTextNode(vnode);
		}

		var node = doc.createElement(vnode.type);
		populateAttributes(node, vnode.props);
		vnode.children.map(createRealDomNode).forEach(node.appendChild.bind(node));
		return node;
	}

	function populateAttributes(node, props) {
		for (var key in props) {
			node[name] = props[name];
		}
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony export */ exports["a"] = ensureArray;function ensureArray(a) {
		if (Array.isArray(a)) return a;
		return [a];
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Use typed arrays if we can
	 */

	var FastArray = typeof Uint32Array === 'undefined' ? Array : Uint32Array;

	/**
	 * Bit vector
	 */

	function createBv(sizeInBits) {
	  return new FastArray(Math.ceil(sizeInBits / 32));
	}

	function setBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;

	  v[pos] |= 1 << r;
	}

	function clearBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;

	  v[pos] &= ~(1 << r);
	}

	function getBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;

	  return !!(v[pos] & 1 << r);
	}

	/**
	 * Exports
	 */

	exports.createBv = createBv;
	exports.setBit = setBit;
	exports.clearBit = clearBit;
	exports.getBit = getBit;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;

	var _bitVector = __webpack_require__(4);

	/**
	 * Actions
	 */

	var CREATE = 0; /**
	                 * Imports
	                 */

	var UPDATE = 1;
	var MOVE = 2;
	var REMOVE = 3;

	/**
	 * dift
	 */

	function dift(prev, next, effect, key) {
	  var pStartIdx = 0;
	  var nStartIdx = 0;
	  var pEndIdx = prev.length - 1;
	  var nEndIdx = next.length - 1;
	  var pStartItem = prev[pStartIdx];
	  var nStartItem = next[nStartIdx];

	  // List head is the same
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nStartItem)) {
	    effect(UPDATE, pStartItem, nStartItem, nStartIdx);
	    pStartItem = prev[++pStartIdx];
	    nStartItem = next[++nStartIdx];
	  }

	  // The above case is orders of magnitude more common than the others, so fast-path it
	  if (nStartIdx > nEndIdx && pStartIdx > pEndIdx) {
	    return;
	  }

	  var pEndItem = prev[pEndIdx];
	  var nEndItem = next[nEndIdx];
	  var movedFromFront = 0;

	  // Reversed
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nEndItem)) {
	    effect(MOVE, pStartItem, nEndItem, pEndIdx - movedFromFront + 1);
	    pStartItem = prev[++pStartIdx];
	    nEndItem = next[--nEndIdx];
	    ++movedFromFront;
	  }

	  // Reversed the other way (in case of e.g. reverse and append)
	  while (pEndIdx >= pStartIdx && nStartIdx <= nEndIdx && equal(nStartItem, pEndItem)) {
	    effect(MOVE, pEndItem, nStartItem, nStartIdx);
	    pEndItem = prev[--pEndIdx];
	    nStartItem = next[++nStartIdx];
	    --movedFromFront;
	  }

	  // List tail is the same
	  while (pEndIdx >= pStartIdx && nEndIdx >= nStartIdx && equal(pEndItem, nEndItem)) {
	    effect(UPDATE, pEndItem, nEndItem, nEndIdx);
	    pEndItem = prev[--pEndIdx];
	    nEndItem = next[--nEndIdx];
	  }

	  if (pStartIdx > pEndIdx) {
	    while (nStartIdx <= nEndIdx) {
	      effect(CREATE, null, nStartItem, nStartIdx);
	      nStartItem = next[++nStartIdx];
	    }

	    return;
	  }

	  if (nStartIdx > nEndIdx) {
	    while (pStartIdx <= pEndIdx) {
	      effect(REMOVE, pStartItem);
	      pStartItem = prev[++pStartIdx];
	    }

	    return;
	  }

	  var created = 0;
	  var pivotDest = null;
	  var pivotIdx = pStartIdx - movedFromFront;
	  var keepBase = pStartIdx;
	  var keep = (0, _bitVector.createBv)(pEndIdx - pStartIdx);

	  var prevMap = keyMap(prev, pStartIdx, pEndIdx + 1, key);

	  for (; nStartIdx <= nEndIdx; nStartItem = next[++nStartIdx]) {
	    var oldIdx = prevMap[key(nStartItem)];

	    if (isUndefined(oldIdx)) {
	      effect(CREATE, null, nStartItem, pivotIdx++);
	      ++created;
	    } else if (pStartIdx !== oldIdx) {
	      (0, _bitVector.setBit)(keep, oldIdx - keepBase);
	      effect(MOVE, prev[oldIdx], nStartItem, pivotIdx++);
	    } else {
	      pivotDest = nStartIdx;
	    }
	  }

	  if (pivotDest !== null) {
	    (0, _bitVector.setBit)(keep, 0);
	    effect(MOVE, prev[pStartIdx], next[pivotDest], pivotDest);
	  }

	  // If there are no creations, then you have to
	  // remove exactly max(prevLen - nextLen, 0) elements in this
	  // diff. You have to remove one more for each element
	  // that was created. This means once we have
	  // removed that many, we can stop.
	  var necessaryRemovals = prev.length - next.length + created;
	  for (var removals = 0; removals < necessaryRemovals; pStartItem = prev[++pStartIdx]) {
	    if (!(0, _bitVector.getBit)(keep, pStartIdx - keepBase)) {
	      effect(REMOVE, pStartItem);
	      ++removals;
	    }
	  }

	  function equal(a, b) {
	    return key(a) === key(b);
	  }
	}

	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	function keyMap(items, start, end, key) {
	  var map = {};

	  for (var i = start; i < end; ++i) {
	    map[key(items[i])] = i;
	  }

	  return map;
	}

	/**
	 * Exports
	 */

	exports.default = dift;
	exports.CREATE = CREATE;
	exports.UPDATE = UPDATE;
	exports.MOVE = MOVE;
	exports.REMOVE = REMOVE;

/***/ }
/******/ ]);