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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(8),
	    isHostObject = __webpack_require__(9),
	    isObjectLike = __webpack_require__(10);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it don't break things.
	var cachedSetTimeout = setTimeout;
	var cachedClearTimeout = clearTimeout;

	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  } else {
	    var _ret = function () {
	      var last = funcs[funcs.length - 1];
	      var rest = funcs.slice(0, -1);
	      return {
	        v: function v() {
	          return rest.reduceRight(function (composed, f) {
	            return f(composed);
	          }, last.apply(undefined, arguments));
	        }
	      };
	    }();

	    if (typeof _ret === "object") return _ret.v;
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;

	var _isPlainObject = __webpack_require__(0);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(14);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  var _ref2;

	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, initialState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2["default"])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */

	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2["default"]] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports =
	/******/function (modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/var installedModules = {};

		/******/ // The require function
		/******/function __webpack_require__(moduleId) {

			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;

			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/i: moduleId,
				/******/l: false,
				/******/exports: {}
				/******/ };

			/******/ // Execute the module function
			/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

			/******/ // Flag the module as loaded
			/******/module.l = true;

			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}

		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;

		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;

		/******/ // identity function for calling harmory imports with the correct context
		/******/__webpack_require__.i = function (value) {
			return value;
		};

		/******/ // define getter function for harmory exports
		/******/__webpack_require__.d = function (exports, name, getter) {
			/******/Object.defineProperty(exports, name, {
				/******/configurable: false,
				/******/enumerable: true,
				/******/get: getter
				/******/ });
			/******/
		};

		/******/ // Object.prototype.hasOwnProperty.call
		/******/__webpack_require__.o = function (object, property) {
			return Object.prototype.hasOwnProperty.call(object, property);
		};

		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "";

		/******/ // Load entry module and return exports
		/******/return __webpack_require__(__webpack_require__.s = 3);
		/******/
	}(
	/************************************************************************/
	/******/[
	/* 0 */
	/***/function (module, exports, __webpack_require__) {

		"use strict";
		/* harmony export */
		exports["b"] = h; /* harmony export */exports["a"] = sanitizeChildren;function h(name, props) {
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

		/***/
	},
	/* 1 */
	/***/function (module, exports, __webpack_require__) {

		"use strict";
		/* harmony export */
		exports["a"] = isVTextNode; /* harmony export */exports["b"] = isVElement;function isVTextNode(a) {
			return a.type === 'text';
		}
		function isVElement(a) {
			return a.type === 'element';
		}

		/***/
	},
	/* 2 */
	/***/function (module, exports, __webpack_require__) {

		"use strict";
		/* harmony import */
		var __WEBPACK_IMPORTED_MODULE_0_dift__ = __webpack_require__(7);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_0_dift___default = __WEBPACK_IMPORTED_MODULE_0_dift__ && __WEBPACK_IMPORTED_MODULE_0_dift__.__esModule ? function () {
			return __WEBPACK_IMPORTED_MODULE_0_dift__['default'];
		} : function () {
			return __WEBPACK_IMPORTED_MODULE_0_dift__;
		};
		/* harmony import */__webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_dift___default, 'a', __WEBPACK_IMPORTED_MODULE_0_dift___default);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__to_dom__ = __webpack_require__(4);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(5);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_3__h__ = __webpack_require__(0);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_4__types__ = __webpack_require__(1);
		/* harmony export */exports["a"] = updateChildren;

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

		/***/
	},
	/* 3 */
	/***/function (module, exports, __webpack_require__) {

		"use strict";
		/* harmony import */
		var __WEBPACK_IMPORTED_MODULE_0__update_dom__ = __webpack_require__(2);
		/* harmony import */var __WEBPACK_IMPORTED_MODULE_1__h__ = __webpack_require__(0);
		/* harmony reexport */if (__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__update_dom__, "a")) __webpack_require__.d(exports, "updateChildren", function () {
			return __WEBPACK_IMPORTED_MODULE_0__update_dom__["a"];
		});
		/* harmony reexport */if (__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__h__, "b")) __webpack_require__.d(exports, "h", function () {
			return __WEBPACK_IMPORTED_MODULE_1__h__["b"];
		});

		/***/
	},
	/* 4 */
	/***/function (module, exports, __webpack_require__) {

		"use strict";
		/* harmony import */
		var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(1);
		/* harmony export */exports["a"] = createRealDomNode;
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

		/***/
	},
	/* 5 */
	/***/function (module, exports, __webpack_require__) {

		"use strict";
		/* harmony export */
		exports["a"] = ensureArray; /* harmony export */exports["b"] = clone;function ensureArray(a) {
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

		/***/
	},
	/* 6 */
	/***/function (module, exports) {

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

		/***/
	},
	/* 7 */
	/***/function (module, exports, __webpack_require__) {

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

		/***/
	}
	/******/]);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(3);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(13);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(12);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(11);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(2);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(4);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist__ = __webpack_require__(5);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist___default = __WEBPACK_IMPORTED_MODULE_0__dist__ && __WEBPACK_IMPORTED_MODULE_0__dist__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__dist__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__dist__; };
	/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__dist___default, 'a', __WEBPACK_IMPORTED_MODULE_0__dist___default);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(6);
	/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux___default = __WEBPACK_IMPORTED_MODULE_1_redux__ && __WEBPACK_IMPORTED_MODULE_1_redux__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_redux__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_redux__; };
	/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1_redux___default, 'a', __WEBPACK_IMPORTED_MODULE_1_redux___default);
	/** @jsx h */



	var root = document.getElementById('root');
	var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_redux__["createStore"])(function () {
		var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
		var _ref = arguments[1];
		var type = _ref.type;
		var payload = _ref.payload;

		if (type === 'TIME') return payload;
		return state;
	});

	var previousRender = null;
	function render(state) {
		var timeStr = new Date(state).toLocaleTimeString();
		var currentRender = timeStr;
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__dist__["updateChildren"])(root, previousRender, currentRender);
		previousRender = currentRender;
	}

	store.subscribe(function () {
		return render(store.getState());
	});

	setInterval(function () {
		return store.dispatch({
			type: 'TIME',
			payload: Date.now()
		});
	}, 1000);

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = applyMiddleware;

	var _compose = __webpack_require__(2);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	exports.__esModule = true;
	exports["default"] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports["default"] = combineReducers;

	var _createStore = __webpack_require__(3);

	var _isPlainObject = __webpack_require__(0);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(4);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(15)(global || window || this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	var g;

	// This works in non-strict mode
	g = (function() { return this; })();

	try {
		// This works if eval is allowed (see CSP)
		g = g || Function("return this")() || (1,eval)("this");
	} catch(e) {
		// This works if the window reference is available
		if(typeof window === "object")
			g = window;
	}

	// g can still be undefined, but nothing to do about it...
	// We return undefined, instead of nothing here, so it's
	// easier to handle this case. if(!global) { ...}

	module.exports = g;


/***/ }
/******/ ]);