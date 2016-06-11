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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony export */ exports["b"] = h;/* harmony export */ exports["a"] = sanitizeChildren;function h(name, props) {
	    var children = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        children[_i - 2] = arguments[_i];
	    }
	    return {
	        type: 'element',
	        name: name,
	        props: props || {},
	        children: children.filter(truthy).map(childToVNode)
	    };
	}
	function sanitizeChildren(children) {
	    return children.filter(truthy).map(childToVNode);
	}
	function childToVNode(child, i) {
	    if (typeof child === 'string') {
	        return {
	            type: 'text',
	            text: child,
	            index: i
	        };
	    }
	    child.index = i;
	    return child;
	}
	function truthy(a) {
	    return !!a;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony export */ exports["a"] = isVTextNode;/* harmony export */ exports["b"] = isVElement;function isVTextNode(a) {
	    return a.type === 'text';
	}
	function isVElement(a) {
	    return a.type === 'element';
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dift__ = __webpack_require__(7);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dift___default = __WEBPACK_IMPORTED_MODULE_0_dift__ && __WEBPACK_IMPORTED_MODULE_0_dift__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_dift__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_dift__; };
	/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_dift___default, 'a', __WEBPACK_IMPORTED_MODULE_0_dift___default);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__to_dom__ = __webpack_require__(4);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__h__ = __webpack_require__(0);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__(1);
	/* harmony export */ exports["a"] = updateChildren;




	function updateChildren(parentNode, oldChildren, newChildren) {
	    var oldVNodes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__h__["a" /* sanitizeChildren */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* ensureArray */])(oldChildren));
	    var newVNodes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__h__["a" /* sanitizeChildren */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* ensureArray */])(newChildren));
	    updateChildrenInternal(parentNode, oldVNodes, newVNodes);
	}
	function updateChildrenInternal(parentNode, oldVNodes, newVNodes) {
	    __WEBPACK_IMPORTED_MODULE_0_dift___default()(oldVNodes, newVNodes, function (editType, old, next, index) {
	        repositionNode(parentNode, editType, old, next, index);
	    }, getKey);
	}
	function getKey(item) {
	    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__types__["b" /* isVElement */])(item)) {
	        var key = item.props['key'];
	        if (typeof key === 'string') return key;
	        return item.name + '_' + item.index.toString();
	    }
	    return '#text_' + item.index.toString();
	}
	function repositionNode(parentNode, editType, oldVNode, newVNode, index) {
	    var indexNode = parentNode.childNodes[index] || null;
	    switch (editType) {
	        case __WEBPACK_IMPORTED_MODULE_0_dift__["CREATE"]:
	            parentNode.insertBefore(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__to_dom__["a" /* createRealDomNode */])(newVNode), indexNode);
	            break;
	        case __WEBPACK_IMPORTED_MODULE_0_dift__["UPDATE"]:
	            updateNode(indexNode, oldVNode, newVNode);
	            break;
	        case __WEBPACK_IMPORTED_MODULE_0_dift__["MOVE"]:
	            var oldNodeMove = parentNode.childNodes[oldVNode.index];
	            parentNode.insertBefore(updateNode(oldNodeMove, oldVNode, newVNode), indexNode);
	            break;
	        case __WEBPACK_IMPORTED_MODULE_0_dift__["REMOVE"]:
	            var oldNodeRemove = parentNode.childNodes[oldVNode.index];
	            parentNode.removeChild(oldNodeRemove);
	            break;
	    }
	}
	function updateNode(oldNode, oldVNode, newVNode) {
	    if (oldNode instanceof Text && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__types__["a" /* isVTextNode */])(newVNode)) {
	        return updateText(oldNode, newVNode);
	    }
	    if (oldNode instanceof HTMLElement && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__types__["b" /* isVElement */])(oldVNode) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__types__["b" /* isVElement */])(newVNode)) {
	        return updateElement(oldNode, oldVNode, newVNode);
	    }
	    console.error('updateNode error', oldNode, oldVNode, newVNode);
	    throw new Error('This should never happen');
	}
	function updateText(oldNode, newVNode) {
	    oldNode.textContent = newVNode.text;
	    return oldNode;
	}
	function updateElement(oldNode, oldVNode, newVNode) {
	    updateProps(oldNode, oldVNode, newVNode);
	    updateChildrenInternal(oldNode, oldVNode.children, newVNode.children);
	    return oldNode;
	}
	function updateProps(element, oldVNode, newVNode) {
	    var oldProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* clone */])(oldVNode.props);
	    var newProps = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["b" /* clone */])(newVNode.props);
	    for (var name_1 in newProps) {
	        if (newProps[name_1] !== oldProps[name_1]) {
	            element[normalizeProp(name_1)] = newProps[name_1];
	        }
	        delete oldProps[name_1];
	    }
	    for (var name_2 in oldProps) {
	        delete element[normalizeProp(name_2)];
	    }
	}
	function normalizeProp(name) {
	    switch (name) {
	        case 'class':
	            return 'className';
	        default:
	            return name;
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__update_dom__ = __webpack_require__(2);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__h__ = __webpack_require__(0);
	/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__update_dom__, "a")) __webpack_require__.d(exports, "updateChildren", function() { return __WEBPACK_IMPORTED_MODULE_0__update_dom__["a"]; });
	/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__h__, "b")) __webpack_require__.d(exports, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__h__["b"]; });



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(1);
	/* harmony export */ exports["a"] = createRealDomNode;
	function createRealDomNode(vnode, doc) {
	    if (doc === void 0) {
	        doc = document;
	    }
	    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__types__["a" /* isVTextNode */])(vnode)) {
	        return doc.createTextNode(vnode.text);
	    }
	    var element = doc.createElement(vnode.name);
	    populateAttributes(element, vnode.props);
	    vnode.children.map(function (vnode) {
	        return createRealDomNode(vnode);
	    }).forEach(element.appendChild.bind(element));
	    return element;
	}
	function populateAttributes(element, props) {
	    for (var key in props) {
	        element[name] = props[name];
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony export */ exports["a"] = ensureArray;/* harmony export */ exports["b"] = clone;function ensureArray(a) {
	    if (Array.isArray(a)) return a;
	    if (a) return [a];
	    return [];
	}
	function clone(a) {
	    var r = {};
	    for (var key in a) {
	        r[key] = a[key];
	    }
	    return r;
	}

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;

	var _bitVector = __webpack_require__(6);

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