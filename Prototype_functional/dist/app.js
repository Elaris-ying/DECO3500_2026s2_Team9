(function() {
	//#region \0rolldown/runtime.js
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
	//#endregion
	//#region node_modules/react/cjs/react.production.js
	/**
	* @license React
	* react.production.js
	*
	* Copyright (c) Meta Platforms, Inc. and affiliates.
	*
	* This source code is licensed under the MIT license found in the
	* LICENSE file in the root directory of this source tree.
	*/
	var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
		var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
		var REACT_PORTAL_TYPE = Symbol.for("react.portal");
		var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
		var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
		var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
		var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
		var REACT_CONTEXT_TYPE = Symbol.for("react.context");
		var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
		var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
		var REACT_MEMO_TYPE = Symbol.for("react.memo");
		var REACT_LAZY_TYPE = Symbol.for("react.lazy");
		var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
		var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		function getIteratorFn(maybeIterable) {
			if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
			maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
			return "function" === typeof maybeIterable ? maybeIterable : null;
		}
		var ReactNoopUpdateQueue = {
			isMounted: function() {
				return !1;
			},
			enqueueForceUpdate: function() {},
			enqueueReplaceState: function() {},
			enqueueSetState: function() {}
		};
		var assign = Object.assign;
		var emptyObject = {};
		function Component(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		Component.prototype.isReactComponent = {};
		Component.prototype.setState = function(partialState, callback) {
			if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, partialState, callback, "setState");
		};
		Component.prototype.forceUpdate = function(callback) {
			this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
		};
		function ComponentDummy() {}
		ComponentDummy.prototype = Component.prototype;
		function PureComponent(props, context, updater) {
			this.props = props;
			this.context = context;
			this.refs = emptyObject;
			this.updater = updater || ReactNoopUpdateQueue;
		}
		var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
		pureComponentPrototype.constructor = PureComponent;
		assign(pureComponentPrototype, Component.prototype);
		pureComponentPrototype.isPureReactComponent = !0;
		var isArrayImpl = Array.isArray;
		function noop() {}
		var ReactSharedInternals = {
			H: null,
			A: null,
			T: null,
			S: null
		};
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		function ReactElement(type, key, props) {
			var refProp = props.ref;
			return {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				ref: void 0 !== refProp ? refProp : null,
				props
			};
		}
		function cloneAndReplaceKey(oldElement, newKey) {
			return ReactElement(oldElement.type, newKey, oldElement.props);
		}
		function isValidElement(object) {
			return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		function escape(key) {
			var escaperLookup = {
				"=": "=0",
				":": "=2"
			};
			return "$" + key.replace(/[=:]/g, function(match) {
				return escaperLookup[match];
			});
		}
		var userProvidedKeyEscapeRegex = /\/+/g;
		function getElementKey(element, index) {
			return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
		}
		function resolveThenable(thenable) {
			switch (thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
				default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
					"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
				}, function(error) {
					"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
				})), thenable.status) {
					case "fulfilled": return thenable.value;
					case "rejected": throw thenable.reason;
				}
			}
			throw thenable;
		}
		function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
			var type = typeof children;
			if ("undefined" === type || "boolean" === type) children = null;
			var invokeCallback = !1;
			if (null === children) invokeCallback = !0;
			else switch (type) {
				case "bigint":
				case "string":
				case "number":
					invokeCallback = !0;
					break;
				case "object": switch (children.$$typeof) {
					case REACT_ELEMENT_TYPE:
					case REACT_PORTAL_TYPE:
						invokeCallback = !0;
						break;
					case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
				}
			}
			if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
				return c;
			})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
			invokeCallback = 0;
			var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
			if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
			else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
			else if ("object" === type) {
				if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
				array = String(children);
				throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
			}
			return invokeCallback;
		}
		function mapChildren(children, func, context) {
			if (null == children) return children;
			var result = [], count = 0;
			mapIntoArray(children, result, "", "", function(child) {
				return func.call(context, child, count++);
			});
			return result;
		}
		function lazyInitializer(payload) {
			if (-1 === payload._status) {
				var ctor = payload._result, thenable = ctor();
				thenable.then(function(moduleObject) {
					if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
				}, function(error) {
					if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
				});
				-1 === payload._status && (payload._status = 0, payload._result = thenable);
			}
			if (1 === payload._status) return payload._result.default;
			throw payload._result;
		}
		var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
			if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
				var event = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
					error
				});
				if (!window.dispatchEvent(event)) return;
			} else if ("object" === typeof process && "function" === typeof process.emit) {
				process.emit("uncaughtException", error);
				return;
			}
			console.error(error);
		};
		function startTransition(scope) {
			var prevTransition = ReactSharedInternals.T, currentTransition = {};
			currentTransition.types = null !== prevTransition ? prevTransition.types : null;
			ReactSharedInternals.T = currentTransition;
			try {
				var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
				null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
				"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
			} catch (error) {
				reportGlobalError(error);
			} finally {
				null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
			}
		}
		function addTransitionType(type) {
			var transition = ReactSharedInternals.T;
			if (null !== transition) {
				var transitionTypes = transition.types;
				null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
			} else startTransition(addTransitionType.bind(null, type));
		}
		var Children = {
			map: mapChildren,
			forEach: function(children, forEachFunc, forEachContext) {
				mapChildren(children, function() {
					forEachFunc.apply(this, arguments);
				}, forEachContext);
			},
			count: function(children) {
				var n = 0;
				mapChildren(children, function() {
					n++;
				});
				return n;
			},
			toArray: function(children) {
				return mapChildren(children, function(child) {
					return child;
				}) || [];
			},
			only: function(children) {
				if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
				return children;
			}
		};
		exports.Activity = REACT_ACTIVITY_TYPE;
		exports.Children = Children;
		exports.Component = Component;
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.Profiler = REACT_PROFILER_TYPE;
		exports.PureComponent = PureComponent;
		exports.StrictMode = REACT_STRICT_MODE_TYPE;
		exports.Suspense = REACT_SUSPENSE_TYPE;
		exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
		exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
		exports.__COMPILER_RUNTIME = {
			__proto__: null,
			c: function(size) {
				return ReactSharedInternals.H.useMemoCache(size);
			}
		};
		exports.addTransitionType = addTransitionType;
		exports.cache = function(fn) {
			return function() {
				return fn.apply(null, arguments);
			};
		};
		exports.cacheSignal = function() {
			return null;
		};
		exports.cloneElement = function(element, config, children) {
			if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
			var props = assign({}, element.props), key = element.key;
			if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
			var propName = arguments.length - 2;
			if (1 === propName) props.children = children;
			else if (1 < propName) {
				for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
				props.children = childArray;
			}
			return ReactElement(element.type, key, props);
		};
		exports.createContext = function(defaultValue) {
			defaultValue = {
				$$typeof: REACT_CONTEXT_TYPE,
				_currentValue: defaultValue,
				_currentValue2: defaultValue,
				_threadCount: 0,
				Provider: null,
				Consumer: null
			};
			defaultValue.Provider = defaultValue;
			defaultValue.Consumer = {
				$$typeof: REACT_CONSUMER_TYPE,
				_context: defaultValue
			};
			return defaultValue;
		};
		exports.createElement = function(type, config, children) {
			var propName, props = {}, key = null;
			if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
			var childrenLength = arguments.length - 2;
			if (1 === childrenLength) props.children = children;
			else if (1 < childrenLength) {
				for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
				props.children = childArray;
			}
			if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
			return ReactElement(type, key, props);
		};
		exports.createRef = function() {
			return { current: null };
		};
		exports.forwardRef = function(render) {
			return {
				$$typeof: REACT_FORWARD_REF_TYPE,
				render
			};
		};
		exports.isValidElement = isValidElement;
		exports.lazy = function(ctor) {
			return {
				$$typeof: REACT_LAZY_TYPE,
				_payload: {
					_status: -1,
					_result: ctor
				},
				_init: lazyInitializer
			};
		};
		exports.memo = function(type, compare) {
			return {
				$$typeof: REACT_MEMO_TYPE,
				type,
				compare: void 0 === compare ? null : compare
			};
		};
		exports.startTransition = startTransition;
		exports.unstable_useCacheRefresh = function() {
			return ReactSharedInternals.H.useCacheRefresh();
		};
		exports.use = function(usable) {
			return ReactSharedInternals.H.use(usable);
		};
		exports.useActionState = function(action, initialState, permalink) {
			return ReactSharedInternals.H.useActionState(action, initialState, permalink);
		};
		exports.useCallback = function(callback, deps) {
			return ReactSharedInternals.H.useCallback(callback, deps);
		};
		exports.useContext = function(Context) {
			return ReactSharedInternals.H.useContext(Context);
		};
		exports.useDebugValue = function() {};
		exports.useDeferredValue = function(value, initialValue) {
			return ReactSharedInternals.H.useDeferredValue(value, initialValue);
		};
		exports.useEffect = function(create, deps) {
			return ReactSharedInternals.H.useEffect(create, deps);
		};
		exports.useEffectEvent = function(callback) {
			return ReactSharedInternals.H.useEffectEvent(callback);
		};
		exports.useId = function() {
			return ReactSharedInternals.H.useId();
		};
		exports.useImperativeHandle = function(ref, create, deps) {
			return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
		};
		exports.useInsertionEffect = function(create, deps) {
			return ReactSharedInternals.H.useInsertionEffect(create, deps);
		};
		exports.useLayoutEffect = function(create, deps) {
			return ReactSharedInternals.H.useLayoutEffect(create, deps);
		};
		exports.useMemo = function(create, deps) {
			return ReactSharedInternals.H.useMemo(create, deps);
		};
		exports.useOptimistic = function(passthrough, reducer) {
			return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
		};
		exports.useReducer = function(reducer, initialArg, init) {
			return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
		};
		exports.useRef = function(initialValue) {
			return ReactSharedInternals.H.useRef(initialValue);
		};
		exports.useState = function(initialState) {
			return ReactSharedInternals.H.useState(initialState);
		};
		exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
			return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
		};
		exports.useTransition = function() {
			return ReactSharedInternals.H.useTransition();
		};
		exports.version = "19.3.0";
	}));
	//#endregion
	//#region node_modules/react/index.js
	var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_react_production();
	}));
	//#endregion
	//#region node_modules/scheduler/cjs/scheduler.production.js
	/**
	* @license React
	* scheduler.production.js
	*
	* Copyright (c) Meta Platforms, Inc. and affiliates.
	*
	* This source code is licensed under the MIT license found in the
	* LICENSE file in the root directory of this source tree.
	*/
	var require_scheduler_production = /* @__PURE__ */ __commonJSMin(((exports) => {
		function push(heap, node) {
			var index = heap.length;
			heap.push(node);
			a: for (; 0 < index;) {
				var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
				if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
				else break a;
			}
		}
		function peek(heap) {
			return 0 === heap.length ? null : heap[0];
		}
		function pop(heap) {
			if (0 === heap.length) return null;
			var first = heap[0], last = heap.pop();
			if (last !== first) {
				heap[0] = last;
				a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength;) {
					var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
					if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
					else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;
					else break a;
				}
			}
			return first;
		}
		function compare(a, b) {
			var diff = a.sortIndex - b.sortIndex;
			return 0 !== diff ? diff : a.id - b.id;
		}
		exports.unstable_now = void 0;
		if ("object" === typeof performance && "function" === typeof performance.now) {
			var localPerformance = performance;
			exports.unstable_now = function() {
				return localPerformance.now();
			};
		} else {
			var localDate = Date, initialTime = localDate.now();
			exports.unstable_now = function() {
				return localDate.now() - initialTime;
			};
		}
		var taskQueue = [];
		var timerQueue = [];
		var taskIdCounter = 1;
		var currentTask = null;
		var currentPriorityLevel = 3;
		var isPerformingWork = !1;
		var isHostCallbackScheduled = !1;
		var isHostTimeoutScheduled = !1;
		var needsPaint = !1;
		var localSetTimeout = "function" === typeof setTimeout ? setTimeout : null;
		var localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null;
		var localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
		function advanceTimers(currentTime) {
			for (var timer = peek(timerQueue); null !== timer;) {
				if (null === timer.callback) pop(timerQueue);
				else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
				else break;
				timer = peek(timerQueue);
			}
		}
		function handleTimeout(currentTime) {
			isHostTimeoutScheduled = !1;
			advanceTimers(currentTime);
			if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());
			else {
				var firstTimer = peek(timerQueue);
				null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
			}
		}
		var isMessageLoopRunning = !1;
		var taskTimeoutID = -1;
		var frameInterval = 5;
		var startTime = -1;
		function shouldYieldToHost() {
			return needsPaint ? !0 : exports.unstable_now() - startTime < frameInterval ? !1 : !0;
		}
		function performWorkUntilDeadline() {
			needsPaint = !1;
			if (isMessageLoopRunning) {
				var currentTime = exports.unstable_now();
				startTime = currentTime;
				var hasMoreWork = !0;
				try {
					a: {
						isHostCallbackScheduled = !1;
						isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
						isPerformingWork = !0;
						var previousPriorityLevel = currentPriorityLevel;
						try {
							b: {
								advanceTimers(currentTime);
								for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());) {
									var callback = currentTask.callback;
									if ("function" === typeof callback) {
										currentTask.callback = null;
										currentPriorityLevel = currentTask.priorityLevel;
										var continuationCallback = callback(currentTask.expirationTime <= currentTime);
										currentTime = exports.unstable_now();
										if ("function" === typeof continuationCallback) {
											currentTask.callback = continuationCallback;
											advanceTimers(currentTime);
											hasMoreWork = !0;
											break b;
										}
										currentTask === peek(taskQueue) && pop(taskQueue);
										advanceTimers(currentTime);
									} else pop(taskQueue);
									currentTask = peek(taskQueue);
								}
								if (null !== currentTask) hasMoreWork = !0;
								else {
									var firstTimer = peek(timerQueue);
									null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
									hasMoreWork = !1;
								}
							}
							break a;
						} finally {
							currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
						}
						hasMoreWork = void 0;
					}
				} finally {
					hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
				}
			}
		}
		var schedulePerformWorkUntilDeadline;
		if ("function" === typeof localSetImmediate) schedulePerformWorkUntilDeadline = function() {
			localSetImmediate(performWorkUntilDeadline);
		};
		else if ("undefined" !== typeof MessageChannel) {
			var channel = new MessageChannel(), port = channel.port2;
			channel.port1.onmessage = performWorkUntilDeadline;
			schedulePerformWorkUntilDeadline = function() {
				port.postMessage(null);
			};
		} else schedulePerformWorkUntilDeadline = function() {
			localSetTimeout(performWorkUntilDeadline, 0);
		};
		function requestHostTimeout(callback, ms) {
			taskTimeoutID = localSetTimeout(function() {
				callback(exports.unstable_now());
			}, ms);
		}
		exports.unstable_IdlePriority = 5;
		exports.unstable_ImmediatePriority = 1;
		exports.unstable_LowPriority = 4;
		exports.unstable_NormalPriority = 3;
		exports.unstable_Profiling = null;
		exports.unstable_UserBlockingPriority = 2;
		exports.unstable_cancelCallback = function(task) {
			task.callback = null;
		};
		exports.unstable_forceFrameRate = function(fps) {
			0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
		};
		exports.unstable_getCurrentPriorityLevel = function() {
			return currentPriorityLevel;
		};
		exports.unstable_next = function(eventHandler) {
			switch (currentPriorityLevel) {
				case 1:
				case 2:
				case 3:
					var priorityLevel = 3;
					break;
				default: priorityLevel = currentPriorityLevel;
			}
			var previousPriorityLevel = currentPriorityLevel;
			currentPriorityLevel = priorityLevel;
			try {
				return eventHandler();
			} finally {
				currentPriorityLevel = previousPriorityLevel;
			}
		};
		exports.unstable_requestPaint = function() {
			needsPaint = !0;
		};
		exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
			switch (priorityLevel) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5: break;
				default: priorityLevel = 3;
			}
			var previousPriorityLevel = currentPriorityLevel;
			currentPriorityLevel = priorityLevel;
			try {
				return eventHandler();
			} finally {
				currentPriorityLevel = previousPriorityLevel;
			}
		};
		exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
			var currentTime = exports.unstable_now();
			"object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
			switch (priorityLevel) {
				case 1:
					var timeout = -1;
					break;
				case 2:
					timeout = 250;
					break;
				case 5:
					timeout = 1073741823;
					break;
				case 4:
					timeout = 1e4;
					break;
				default: timeout = 5e3;
			}
			timeout = options + timeout;
			priorityLevel = {
				id: taskIdCounter++,
				callback,
				priorityLevel,
				startTime: options,
				expirationTime: timeout,
				sortIndex: -1
			};
			options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline())));
			return priorityLevel;
		};
		exports.unstable_shouldYield = shouldYieldToHost;
		exports.unstable_wrapCallback = function(callback) {
			var parentPriorityLevel = currentPriorityLevel;
			return function() {
				var previousPriorityLevel = currentPriorityLevel;
				currentPriorityLevel = parentPriorityLevel;
				try {
					return callback.apply(this, arguments);
				} finally {
					currentPriorityLevel = previousPriorityLevel;
				}
			};
		};
	}));
	//#endregion
	//#region node_modules/scheduler/index.js
	var require_scheduler = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_scheduler_production();
	}));
	//#endregion
	//#region node_modules/react-dom/cjs/react-dom.production.js
	/**
	* @license React
	* react-dom.production.js
	*
	* Copyright (c) Meta Platforms, Inc. and affiliates.
	*
	* This source code is licensed under the MIT license found in the
	* LICENSE file in the root directory of this source tree.
	*/
	var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
		var React = require_react();
		function formatProdErrorMessage(code) {
			var url = "https://react.dev/errors/" + code;
			if (1 < arguments.length) {
				url += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
			}
			return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
		}
		function noop() {}
		var Internals = {
			d: {
				f: noop,
				r: function() {
					throw Error(formatProdErrorMessage(522));
				},
				D: noop,
				C: noop,
				L: noop,
				m: noop,
				X: noop,
				S: noop,
				M: noop
			},
			p: 0,
			findDOMNode: null
		};
		var REACT_PORTAL_TYPE = Symbol.for("react.portal");
		var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
		var REACT_OPTIMISTIC_KEY = Symbol.for("react.optimistic_key");
		function createPortal$1(children, containerInfo, implementation) {
			var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
			return {
				$$typeof: REACT_PORTAL_TYPE,
				key: null == key ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
				children,
				containerInfo,
				implementation
			};
		}
		var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		function getCrossOriginStringAs(as, input) {
			if ("font" === as) return "";
			if ("string" === typeof input) return "use-credentials" === input ? input : "";
		}
		exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
		exports.browser = function(reason) {
			return {
				$$typeof: REACT_RECOVERABLE_TYPE,
				_reason: reason
			};
		};
		exports.createPortal = function(children, container) {
			var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
			if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
			return createPortal$1(children, container, null, key);
		};
		exports.flushSync = function(fn) {
			var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
			try {
				if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
			} finally {
				ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
			}
		};
		exports.preconnect = function(href, options) {
			"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
		};
		exports.prefetchDNS = function(href) {
			"string" === typeof href && Internals.d.D(href);
		};
		exports.preinit = function(href, options) {
			if ("string" === typeof href && options && "string" === typeof options.as) {
				var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
				"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
					crossOrigin,
					integrity,
					fetchPriority
				}) : "script" === as && Internals.d.X(href, {
					crossOrigin,
					integrity,
					fetchPriority,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		};
		exports.preinitModule = function(href, options) {
			if ("string" === typeof href) if ("object" === typeof options && null !== options) {
				if (null == options.as || "script" === options.as) {
					var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
					Internals.d.M(href, {
						crossOrigin,
						integrity: "string" === typeof options.integrity ? options.integrity : void 0,
						nonce: "string" === typeof options.nonce ? options.nonce : void 0,
						fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
					});
				}
			} else options ?? Internals.d.M(href);
		};
		exports.preload = function(href, options) {
			if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
				var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
				Internals.d.L(href, as, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0,
					type: "string" === typeof options.type ? options.type : void 0,
					fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
					referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
					imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
					imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
					media: "string" === typeof options.media ? options.media : void 0
				});
			}
		};
		exports.preloadModule = function(href, options) {
			if ("string" === typeof href) if (options) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.m(href, {
					as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0,
					fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
				});
			} else Internals.d.m(href);
		};
		exports.requestFormReset = function(form) {
			Internals.d.r(form);
		};
		exports.unstable_batchedUpdates = function(fn, a) {
			return fn(a);
		};
		exports.useFormState = function(action, initialState, permalink) {
			return ReactSharedInternals.H.useFormState(action, initialState, permalink);
		};
		exports.useFormStatus = function() {
			return ReactSharedInternals.H.useHostTransitionStatus();
		};
		exports.version = "19.3.0";
	}));
	//#endregion
	//#region node_modules/react-dom/index.js
	var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function checkDCE() {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
			} catch (err) {
				console.error(err);
			}
		}
		checkDCE();
		module.exports = require_react_dom_production();
	}));
	//#endregion
	//#region node_modules/react-dom/cjs/react-dom-client.production.js
	/**
	* @license React
	* react-dom-client.production.js
	*
	* Copyright (c) Meta Platforms, Inc. and affiliates.
	*
	* This source code is licensed under the MIT license found in the
	* LICENSE file in the root directory of this source tree.
	*/
	var require_react_dom_client_production = /* @__PURE__ */ __commonJSMin(((exports) => {
		var Scheduler = require_scheduler();
		var React = require_react();
		var ReactDOM = require_react_dom();
		function formatProdErrorMessage(code) {
			var url = "https://react.dev/errors/" + code;
			if (1 < arguments.length) {
				url += "?args[]=" + encodeURIComponent(arguments[1]);
				for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
			}
			return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
		}
		function isValidContainer(node) {
			return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
		}
		function getNearestMountedFiber(fiber) {
			for (var node = fiber, nextNode = node; nextNode && !nextNode.alternate;) node = nextNode, 0 !== (node.flags & 4098) && (fiber = node.return), nextNode = node.return;
			for (; node.return;) node = node.return;
			return 3 === node.tag ? fiber : null;
		}
		function getSuspenseInstanceFromFiber(fiber) {
			if (13 === fiber.tag) {
				var suspenseState = fiber.memoizedState;
				null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
				if (null !== suspenseState) return suspenseState.dehydrated;
			}
			return null;
		}
		function getActivityInstanceFromFiber(fiber) {
			if (31 === fiber.tag) {
				var activityState = fiber.memoizedState;
				null === activityState && (fiber = fiber.alternate, null !== fiber && (activityState = fiber.memoizedState));
				if (null !== activityState) return activityState.dehydrated;
			}
			return null;
		}
		function assertIsMounted(fiber) {
			if (getNearestMountedFiber(fiber) !== fiber) throw Error(formatProdErrorMessage(188));
		}
		function findCurrentFiberUsingSlowPath(fiber) {
			var alternate = fiber.alternate;
			if (!alternate) {
				alternate = getNearestMountedFiber(fiber);
				if (null === alternate) throw Error(formatProdErrorMessage(188));
				return alternate !== fiber ? null : fiber;
			}
			for (var a = fiber, b = alternate;;) {
				var parentA = a.return;
				if (null === parentA) break;
				var parentB = parentA.alternate;
				if (null === parentB) {
					b = parentA.return;
					if (null !== b) {
						a = b;
						continue;
					}
					break;
				}
				if (parentA.child === parentB.child) {
					for (parentB = parentA.child; parentB;) {
						if (parentB === a) return assertIsMounted(parentA), fiber;
						if (parentB === b) return assertIsMounted(parentA), alternate;
						parentB = parentB.sibling;
					}
					throw Error(formatProdErrorMessage(188));
				}
				if (a.return !== b.return) a = parentA, b = parentB;
				else {
					for (var didFindChild = !1, child$0 = parentA.child; child$0;) {
						if (child$0 === a) {
							didFindChild = !0;
							a = parentA;
							b = parentB;
							break;
						}
						if (child$0 === b) {
							didFindChild = !0;
							b = parentA;
							a = parentB;
							break;
						}
						child$0 = child$0.sibling;
					}
					if (!didFindChild) {
						for (child$0 = parentB.child; child$0;) {
							if (child$0 === a) {
								didFindChild = !0;
								a = parentB;
								b = parentA;
								break;
							}
							if (child$0 === b) {
								didFindChild = !0;
								b = parentB;
								a = parentA;
								break;
							}
							child$0 = child$0.sibling;
						}
						if (!didFindChild) throw Error(formatProdErrorMessage(189));
					}
				}
				if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
			}
			if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
			return a.stateNode.current === a ? fiber : alternate;
		}
		function findCurrentHostFiberImpl(node) {
			var tag = node.tag;
			if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
			for (node = node.child; null !== node;) {
				tag = findCurrentHostFiberImpl(node);
				if (null !== tag) return tag;
				node = node.sibling;
			}
			return null;
		}
		function traverseVisibleInstancesAndTextInstances(child, searchWithinHosts, fn, a, b, c) {
			for (; null !== child;) {
				if ((5 === child.tag || 27 === child.tag || 6 === child.tag) && fn(child, a, b, c) || (22 !== child.tag || null === child.memoizedState) && (searchWithinHosts || 5 !== child.tag && 27 !== child.tag) && traverseVisibleInstancesAndTextInstances(child.child, searchWithinHosts, fn, a, b, c)) return !0;
				child = child.sibling;
			}
			return !1;
		}
		function getFragmentParentInstanceOrContainerFiber(fiber) {
			for (fiber = fiber.return; null !== fiber;) {
				if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) return fiber;
				fiber = fiber.return;
			}
			return null;
		}
		function fiberIsPortaledIntoHost(fiber) {
			var foundPortalParent = !1;
			for (fiber = fiber.return; null !== fiber;) {
				4 === fiber.tag && (foundPortalParent = !0);
				if (3 === fiber.tag || 5 === fiber.tag || 27 === fiber.tag) break;
				fiber = fiber.return;
			}
			return foundPortalParent;
		}
		function getFragmentInstanceOrTextInstanceSiblings(fiber) {
			var result = [null, null], parentHostFiber = getFragmentParentInstanceOrContainerFiber(fiber);
			if (null === parentHostFiber) return result;
			findFragmentInstanceOrTextInstanceSiblings(result, fiber, parentHostFiber.child, { foundSelf: !1 });
			return result;
		}
		function findFragmentInstanceOrTextInstanceSiblings(result, self, child, state) {
			for (; null !== child;) {
				if (child === self) state.foundSelf = !0;
				else if (5 === child.tag || 27 === child.tag || 6 === child.tag) {
					if (state.foundSelf) return result[1] = child, !0;
					result[0] = child;
				} else if ((22 !== child.tag || null === child.memoizedState) && findFragmentInstanceOrTextInstanceSiblings(result, self, child.child, state)) return !0;
				child = child.sibling;
			}
			return !1;
		}
		function getInstanceFromHostFiber(fiber) {
			switch (fiber.tag) {
				case 5:
				case 27:
				case 6: return fiber.stateNode;
				case 3: return fiber.stateNode.containerInfo;
				default: throw Error(formatProdErrorMessage(559));
			}
		}
		var searchTarget = null;
		var searchBoundary = null;
		function isFiberPrecedingCheck(child, target, boundary) {
			return child === boundary ? !0 : child === target ? (searchTarget = child, !0) : !1;
		}
		function isFiberFollowingCheck(child, target, boundary) {
			return child === boundary ? (searchBoundary = child, !1) : child === target ? (null !== searchBoundary && (searchTarget = child), !0) : !1;
		}
		function getParentForFragmentAncestors(inst) {
			if (null === inst) return null;
			do
				inst = null === inst ? null : inst.return;
			while (inst && 5 !== inst.tag && 27 !== inst.tag && 3 !== inst.tag);
			return inst ? inst : null;
		}
		function getLowestCommonAncestor(instA, instB, getParent) {
			for (var depthA = 0, tempA = instA; tempA; tempA = getParent(tempA)) depthA++;
			tempA = 0;
			for (var tempB = instB; tempB; tempB = getParent(tempB)) tempA++;
			for (; 0 < depthA - tempA;) instA = getParent(instA), depthA--;
			for (; 0 < tempA - depthA;) instB = getParent(instB), tempA--;
			for (; depthA--;) {
				if (instA === instB || null !== instB && instA === instB.alternate) return instA;
				instA = getParent(instA);
				instB = getParent(instB);
			}
			return null;
		}
		var assign = Object.assign;
		var REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element");
		var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
		var REACT_PORTAL_TYPE = Symbol.for("react.portal");
		var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
		var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
		var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
		var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
		var REACT_CONTEXT_TYPE = Symbol.for("react.context");
		var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
		var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
		var REACT_MEMO_TYPE = Symbol.for("react.memo");
		var REACT_LAZY_TYPE = Symbol.for("react.lazy");
		var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
		var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
		var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
		var REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition");
		var REACT_RECOVERABLE_TYPE = Symbol.for("react.recoverable");
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		function getIteratorFn(maybeIterable) {
			if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
			maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
			return "function" === typeof maybeIterable ? maybeIterable : null;
		}
		var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
		function getComponentNameFromType(type) {
			if (null == type) return null;
			if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
			if ("string" === typeof type) return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
				case REACT_ACTIVITY_TYPE: return "Activity";
				case REACT_VIEW_TRANSITION_TYPE: return "ViewTransition";
			}
			if ("object" === typeof type) switch (type.$$typeof) {
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_CONTEXT_TYPE: return type.displayName || "Context";
				case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
				case REACT_FORWARD_REF_TYPE:
					var innerType = type.render;
					type = type.displayName;
					type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
					return type;
				case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					innerType = type._payload;
					type = type._init;
					try {
						return getComponentNameFromType(type(innerType));
					} catch (x) {}
			}
			return null;
		}
		var isArrayImpl = Array.isArray;
		var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
		var sharedNotPendingObject = {
			pending: !1,
			data: null,
			method: null,
			action: null
		};
		var valueStack = [];
		var index = -1;
		function createCursor(defaultValue) {
			return { current: defaultValue };
		}
		function pop(cursor) {
			0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
		}
		function push(cursor, value) {
			index++;
			valueStack[index] = cursor.current;
			cursor.current = value;
		}
		var contextStackCursor = createCursor(null);
		var contextFiberStackCursor = createCursor(null);
		var rootInstanceStackCursor = createCursor(null);
		var hostTransitionProviderCursor = createCursor(null);
		function pushHostContainer(fiber, nextRootInstance) {
			push(rootInstanceStackCursor, nextRootInstance);
			push(contextFiberStackCursor, fiber);
			push(contextStackCursor, null);
			switch (nextRootInstance.nodeType) {
				case 9:
				case 11:
					fiber = (fiber = nextRootInstance.documentElement) ? (fiber = fiber.namespaceURI) ? getOwnHostContext(fiber) : 0 : 0;
					break;
				default: if (fiber = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI) nextRootInstance = getOwnHostContext(nextRootInstance), fiber = getChildHostContextProd(nextRootInstance, fiber);
				else switch (fiber) {
					case "svg":
						fiber = 1;
						break;
					case "math":
						fiber = 2;
						break;
					default: fiber = 0;
				}
			}
			pop(contextStackCursor);
			push(contextStackCursor, fiber);
		}
		function popHostContainer() {
			pop(contextStackCursor);
			pop(contextFiberStackCursor);
			pop(rootInstanceStackCursor);
		}
		function pushHostContext(fiber) {
			var stateHook = fiber.memoizedState;
			null !== stateHook && (HostTransitionContext._currentValue = stateHook.memoizedState, push(hostTransitionProviderCursor, fiber));
			stateHook = contextStackCursor.current;
			var JSCompiler_inline_result = getChildHostContextProd(stateHook, fiber.type);
			stateHook !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
		}
		function popHostContext(fiber) {
			contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
			hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
		}
		var prefix;
		var suffix;
		function describeBuiltInComponentFrame(name) {
			if (void 0 === prefix) try {
				throw Error();
			} catch (x) {
				var match = x.stack.trim().match(/\n( *(at )?)/);
				prefix = match && match[1] || "";
				suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
			}
			return "\n" + prefix + name + suffix;
		}
		var reentry = !1;
		function describeNativeComponentFrame(fn, construct) {
			if (!fn || reentry) return "";
			reentry = !0;
			var previousPrepareStackTrace = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			try {
				var RunInRootFrame = { DetermineComponentFrameRoot: function() {
					try {
						if (construct) {
							var Fake = function() {
								throw Error();
							};
							Object.defineProperty(Fake.prototype, "props", { set: function() {
								throw Error();
							} });
							if ("object" === typeof Reflect && Reflect.construct) {
								try {
									Reflect.construct(Fake, []);
								} catch (x) {
									var control = x;
								}
								Reflect.construct(fn, [], Fake);
							} else {
								try {
									Fake.call();
								} catch (x$1) {
									control = x$1;
								}
								Fake = !1;
								try {
									var prevProps = Object.getOwnPropertyDescriptor(fn.prototype, "props");
									Object.defineProperty(fn.prototype, "props", {
										configurable: !0,
										set: function() {
											throw Error();
										}
									});
									Fake = !0;
									new fn();
								} finally {
									Fake && (void 0 !== prevProps ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
								}
							}
						} else {
							try {
								throw Error();
							} catch (x$2) {
								control = x$2;
							}
							(Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {});
						}
					} catch (sample) {
						if (sample && control && "string" === typeof sample.stack) return [sample.stack, control.stack];
					}
					return [null, null];
				} };
				RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
				var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
				namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
				var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
				if (sampleStack && controlStack) {
					var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
					for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot");) RunInRootFrame++;
					for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes("DetermineComponentFrameRoot");) namePropDescriptor++;
					if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length) for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor];) namePropDescriptor--;
					for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--) if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
						if (1 !== RunInRootFrame || 1 !== namePropDescriptor) do
							if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
								var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
								fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
								return frame;
							}
						while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
						break;
					}
				}
			} finally {
				reentry = !1, Error.prepareStackTrace = previousPrepareStackTrace;
			}
			return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
		}
		function describeFiber(fiber, childFiber) {
			switch (fiber.tag) {
				case 26:
				case 27:
				case 5: return describeBuiltInComponentFrame(fiber.type);
				case 16: return describeBuiltInComponentFrame("Lazy");
				case 13: return fiber.child !== childFiber && null !== childFiber ? describeBuiltInComponentFrame("Suspense Fallback") : describeBuiltInComponentFrame("Suspense");
				case 19: return describeBuiltInComponentFrame("SuspenseList");
				case 0:
				case 15: return describeNativeComponentFrame(fiber.type, !1);
				case 11: return describeNativeComponentFrame(fiber.type.render, !1);
				case 1: return describeNativeComponentFrame(fiber.type, !0);
				case 31: return describeBuiltInComponentFrame("Activity");
				case 30: return describeBuiltInComponentFrame("ViewTransition");
				default: return "";
			}
		}
		function getStackByFiberInDevAndProd(workInProgress) {
			try {
				var info = "", previous = null;
				do
					info += describeFiber(workInProgress, previous), previous = workInProgress, workInProgress = workInProgress.return;
				while (workInProgress);
				return info;
			} catch (x) {
				return "\nError generating stack: " + x.message + "\n" + x.stack;
			}
		}
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var scheduleCallback$3 = Scheduler.unstable_scheduleCallback;
		var cancelCallback$1 = Scheduler.unstable_cancelCallback;
		var shouldYield = Scheduler.unstable_shouldYield;
		var requestPaint = Scheduler.unstable_requestPaint;
		var now = Scheduler.unstable_now;
		var getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel;
		var ImmediatePriority = Scheduler.unstable_ImmediatePriority;
		var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority;
		var NormalPriority$1 = Scheduler.unstable_NormalPriority;
		var LowPriority = Scheduler.unstable_LowPriority;
		var IdlePriority = Scheduler.unstable_IdlePriority;
		var log$1 = Scheduler.log;
		var unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue;
		var rendererID = null;
		var injectedHook = null;
		function setIsStrictModeForDevtools(newIsStrictMode) {
			"function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
			if (injectedHook && "function" === typeof injectedHook.setStrictMode) try {
				injectedHook.setStrictMode(rendererID, newIsStrictMode);
			} catch (err) {}
		}
		var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
		var log = Math.log;
		var LN2 = Math.LN2;
		function clz32Fallback(x) {
			x >>>= 0;
			return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
		}
		var nextTransitionUpdateLane = 256;
		var nextTransitionDeferredLane = 262144;
		var nextRetryLane = 4194304;
		function getHighestPriorityLanes(lanes) {
			var pendingSyncLanes = lanes & 42;
			if (0 !== pendingSyncLanes) return pendingSyncLanes;
			switch (lanes & -lanes) {
				case 1: return 1;
				case 2: return 2;
				case 4: return 4;
				case 8: return 8;
				case 16: return 16;
				case 32: return 32;
				case 64: return 64;
				case 128: return 128;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072: return lanes & -lanes;
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return lanes & 3932160;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return lanes & 62914560;
				case 67108864: return 67108864;
				case 134217728: return 134217728;
				case 268435456: return 268435456;
				case 536870912: return 536870912;
				case 1073741824: return 0;
				default: return lanes;
			}
		}
		function getNextLanes(root, wipLanes, rootHasPendingCommit) {
			var pendingLanes = root.pendingLanes;
			if (0 === pendingLanes) return 0;
			var nextLanes = 0, suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes;
			root = root.warmLanes;
			var nonIdlePendingLanes = pendingLanes & 134217727;
			0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
			return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
		}
		function checkIfRootIsPrerendering(root, renderLanes) {
			return 0 === (root.pendingLanes & ~(root.suspendedLanes & ~root.pingedLanes) & renderLanes);
		}
		function getEntangledLanes(root, renderLanes) {
			0 !== (renderLanes & 8) && (renderLanes |= renderLanes & 32);
			var allEntangledLanes = root.entangledLanes;
			if (0 !== allEntangledLanes) for (root = root.entanglements, allEntangledLanes &= renderLanes; 0 < allEntangledLanes;) {
				var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
				renderLanes |= root[index$4];
				allEntangledLanes &= ~lane;
			}
			return renderLanes;
		}
		function computeExpirationTime(lane, currentTime) {
			switch (lane) {
				case 1:
				case 2:
				case 4:
				case 8:
				case 64: return currentTime + 250;
				case 16:
				case 32:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152: return currentTime + 5e3;
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432: return -1;
				case 67108864:
				case 134217728:
				case 268435456:
				case 536870912:
				case 1073741824: return -1;
				default: return -1;
			}
		}
		function claimNextRetryLane() {
			var lane = nextRetryLane;
			nextRetryLane <<= 1;
			0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
			return lane;
		}
		function createLaneMap(initial) {
			for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
			return laneMap;
		}
		function markRootUpdated$1(root, updateLane) {
			root.pendingLanes |= updateLane;
			268435456 !== updateLane && (root.suspendedLanes = 0, root.pingedLanes = 0, root.warmLanes = 0);
		}
		function markRootFinished(root, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
			var previouslyPendingLanes = root.pendingLanes;
			root.pendingLanes = remainingLanes;
			root.suspendedLanes = 0;
			root.pingedLanes = 0;
			root.warmLanes = 0;
			root.expiredLanes &= remainingLanes;
			root.entangledLanes &= remainingLanes;
			root.errorRecoveryDisabledLanes &= remainingLanes;
			root.shellSuspendCounter = 0;
			var entanglements = root.entanglements, expirationTimes = root.expirationTimes, hiddenUpdates = root.hiddenUpdates;
			for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes;) {
				var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
				entanglements[index$7] = 0;
				expirationTimes[index$7] = -1;
				var hiddenUpdatesForLane = hiddenUpdates[index$7];
				if (null !== hiddenUpdatesForLane) for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
					var update = hiddenUpdatesForLane[index$7];
					null !== update && (update.lane &= -536870913);
				}
				remainingLanes &= ~lane;
			}
			0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, 0);
			0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root.tag && (root.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
		}
		function markSpawnedDeferredLane(root, spawnedLane, entangledLanes) {
			root.pendingLanes |= spawnedLane;
			root.suspendedLanes &= ~spawnedLane;
			var spawnedLaneIndex = 31 - clz32(spawnedLane);
			root.entangledLanes |= spawnedLane;
			root.entanglements[spawnedLaneIndex] = root.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 261930;
		}
		function markRootEntangled(root, entangledLanes) {
			var rootEntangledLanes = root.entangledLanes |= entangledLanes;
			for (root = root.entanglements; rootEntangledLanes;) {
				var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
				lane & entangledLanes | root[index$8] & entangledLanes && (root[index$8] |= entangledLanes);
				rootEntangledLanes &= ~lane;
			}
		}
		function getBumpedLaneForHydration(root, renderLanes) {
			var renderLane = renderLanes & -renderLanes;
			renderLane = 0 !== (renderLane & 42) ? 1 : getBumpedLaneForHydrationByLane(renderLane);
			return 0 !== (renderLane & (root.suspendedLanes | renderLanes)) ? 0 : renderLane;
		}
		function getBumpedLaneForHydrationByLane(lane) {
			switch (lane) {
				case 2:
					lane = 1;
					break;
				case 8:
					lane = 4;
					break;
				case 32:
					lane = 16;
					break;
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
					lane = 128;
					break;
				case 268435456:
					lane = 134217728;
					break;
				default: lane = 0;
			}
			return lane;
		}
		function lanesToEventPriority(lanes) {
			lanes &= -lanes;
			return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
		}
		function resolveUpdatePriority() {
			var updatePriority = ReactDOMSharedInternals.p;
			if (0 !== updatePriority) return updatePriority;
			updatePriority = window.event;
			return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
		}
		function runWithPriority(priority, fn) {
			var previousPriority = ReactDOMSharedInternals.p;
			try {
				return ReactDOMSharedInternals.p = priority, fn();
			} finally {
				ReactDOMSharedInternals.p = previousPriority;
			}
		}
		var randomKey = Math.random().toString(36).slice(2);
		var internalInstanceKey = "__reactFiber$" + randomKey;
		var internalPropsKey = "__reactProps$" + randomKey;
		var internalContainerInstanceKey = "__reactContainer$" + randomKey;
		var internalEventHandlersKey = "__reactEvents$" + randomKey;
		var internalEventHandlerListenersKey = "__reactListeners$" + randomKey;
		var internalEventHandlesSetKey = "__reactHandles$" + randomKey;
		var internalRootNodeResourcesKey = "__reactResources$" + randomKey;
		var internalHoistableMarker = "__reactMarker$" + randomKey;
		var internalLoadPendingKey = "__reactLoad$" + randomKey;
		function detachDeletedInstance(node) {
			delete node[internalInstanceKey];
			delete node[internalPropsKey];
			delete node[internalEventHandlerListenersKey];
			delete node[internalEventHandlesSetKey];
		}
		function getClosestInstanceFromNode(targetNode) {
			var targetInst;
			if (targetInst = targetNode[internalInstanceKey]) return targetInst;
			for (var parentNode = targetNode.parentNode; parentNode;) {
				if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
					parentNode = targetInst.alternate;
					if (null !== targetInst.child || null !== parentNode && null !== parentNode.child) for (targetNode = getParentHydrationBoundary(targetNode); null !== targetNode;) {
						if (parentNode = targetNode[internalInstanceKey]) return parentNode;
						targetNode = getParentHydrationBoundary(targetNode);
					}
					return targetInst;
				}
				targetNode = parentNode;
				parentNode = targetNode.parentNode;
			}
			return null;
		}
		function getInstanceFromNode(node) {
			if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
				var tag = node.tag;
				if (5 === tag || 6 === tag || 13 === tag || 31 === tag || 26 === tag || 27 === tag || 3 === tag) return node;
			}
			return null;
		}
		function getNodeFromInstance(inst) {
			var tag = inst.tag;
			if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
			throw Error(formatProdErrorMessage(33));
		}
		function getResourcesFromRoot(root) {
			var resources = root[internalRootNodeResourcesKey];
			resources || (resources = root[internalRootNodeResourcesKey] = {
				hoistableStyles: /* @__PURE__ */ new Map(),
				hoistableScripts: /* @__PURE__ */ new Map()
			});
			return resources;
		}
		function markNodeAsHoistable(node) {
			node[internalHoistableMarker] = !0;
		}
		function clearPendingLoadOnNode(node) {
			node[internalLoadPendingKey] = void 0;
		}
		var allNativeEvents = /* @__PURE__ */ new Set();
		var registrationNameDependencies = {};
		function registerTwoPhaseEvent(registrationName, dependencies) {
			registerDirectEvent(registrationName, dependencies);
			registerDirectEvent(registrationName + "Capture", dependencies);
		}
		function registerDirectEvent(registrationName, dependencies) {
			registrationNameDependencies[registrationName] = dependencies;
			for (registrationName = 0; registrationName < dependencies.length; registrationName++) allNativeEvents.add(dependencies[registrationName]);
		}
		var VALID_ATTRIBUTE_NAME_REGEX = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
		var illegalAttributeNameCache = {};
		var validatedAttributeNameCache = {};
		function isAttributeNameSafe(attributeName) {
			if (hasOwnProperty.call(validatedAttributeNameCache, attributeName)) return !0;
			if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
			if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) return validatedAttributeNameCache[attributeName] = !0;
			illegalAttributeNameCache[attributeName] = !0;
			return !1;
		}
		var viewTransitionMutationContext = !1;
		function pushMutationContext() {
			var prev = viewTransitionMutationContext;
			viewTransitionMutationContext = !1;
			return prev;
		}
		function setValueForAttribute(node, name, value) {
			if (isAttributeNameSafe(name)) if (null === value) node.removeAttribute(name);
			else {
				switch (typeof value) {
					case "undefined":
					case "function":
					case "symbol":
						node.removeAttribute(name);
						return;
					case "boolean":
						var prefix$10 = name.toLowerCase().slice(0, 5);
						if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
							node.removeAttribute(name);
							return;
						}
				}
				node.setAttribute(name, value);
			}
		}
		function setValueForKnownAttribute(node, name, value) {
			if (null === value) node.removeAttribute(name);
			else {
				switch (typeof value) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						node.removeAttribute(name);
						return;
				}
				node.setAttribute(name, value);
			}
		}
		function setValueForNamespacedAttribute(node, namespace, name, value) {
			if (null === value) node.removeAttribute(name);
			else {
				switch (typeof value) {
					case "undefined":
					case "function":
					case "symbol":
					case "boolean":
						node.removeAttribute(name);
						return;
				}
				node.setAttributeNS(namespace, name, value);
			}
		}
		function getToStringValue(value) {
			switch (typeof value) {
				case "bigint":
				case "boolean":
				case "number":
				case "string":
				case "undefined": return value;
				case "object": return value;
				default: return "";
			}
		}
		function isCheckable(elem) {
			var type = elem.type;
			return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
		}
		function trackValueOnNode(node, valueField, currentValue) {
			var descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField);
			if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
				var get = descriptor.get, set = descriptor.set;
				Object.defineProperty(node, valueField, {
					configurable: !0,
					get: function() {
						return get.call(this);
					},
					set: function(value) {
						currentValue = "" + value;
						set.call(this, value);
					}
				});
				Object.defineProperty(node, valueField, { enumerable: descriptor.enumerable });
				return {
					getValue: function() {
						return currentValue;
					},
					setValue: function(value) {
						currentValue = "" + value;
					},
					stopTracking: function() {
						node._valueTracker = null;
						delete node[valueField];
					}
				};
			}
		}
		function track(node) {
			if (!node._valueTracker) {
				var valueField = isCheckable(node) ? "checked" : "value";
				node._valueTracker = trackValueOnNode(node, valueField, "" + node[valueField]);
			}
		}
		function updateValueIfChanged(node) {
			if (!node) return !1;
			var tracker = node._valueTracker;
			if (!tracker) return !0;
			var lastValue = tracker.getValue();
			var value = "";
			node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
			node = value;
			return node !== lastValue ? (tracker.setValue(node), !0) : !1;
		}
		var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
		function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
			return value.replace(escapeSelectorAttributeValueInsideDoubleQuotesRegex, function(ch) {
				return "\\" + ch.charCodeAt(0).toString(16) + " ";
			});
		}
		function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
			element.name = "";
			null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
			if (null != value) if ("number" === type) {
				if (0 === value && "" === element.value || element.value != value) element.value = "" + getToStringValue(value);
			} else element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
			else "submit" !== type && "reset" !== type || element.removeAttribute("value");
			null != value ? "number" === type && element.value == value ? setDefaultValue(element, getToStringValue(element.value)) : setDefaultValue(element, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
			null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
			null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
			null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
		}
		function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating) {
			null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
			if (null != value || null != defaultValue) {
				if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value)) {
					track(element);
					return;
				}
				defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
				value = null != value ? "" + getToStringValue(value) : defaultValue;
				isHydrating || value === element.value || (element.value = value);
				element.defaultValue = value;
			}
			checked = null != checked ? checked : defaultChecked;
			checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
			element.checked = isHydrating ? element.checked : !!checked;
			element.defaultChecked = !!checked;
			null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
			track(element);
		}
		function setDefaultValue(node, value) {
			node.defaultValue !== "" + value && (node.defaultValue = "" + value);
		}
		function updateOptions(node, multiple, propValue, setDefaultSelected) {
			node = node.options;
			if (multiple) {
				multiple = {};
				for (var i = 0; i < propValue.length; i++) multiple["$" + propValue[i]] = !0;
				for (propValue = 0; propValue < node.length; propValue++) i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = !0);
			} else {
				propValue = "" + getToStringValue(propValue);
				multiple = null;
				for (i = 0; i < node.length; i++) {
					if (node[i].value === propValue) {
						node[i].selected = !0;
						setDefaultSelected && (node[i].defaultSelected = !0);
						return;
					}
					null !== multiple || node[i].disabled || (multiple = node[i]);
				}
				null !== multiple && (multiple.selected = !0);
			}
		}
		function updateTextarea(element, value, defaultValue) {
			if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
				element.defaultValue !== value && (element.defaultValue = value);
				return;
			}
			element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
		}
		function initTextarea(element, value, defaultValue, children) {
			if (null == value) {
				if (null != children) {
					if (null != defaultValue) throw Error(formatProdErrorMessage(92));
					if (isArrayImpl(children)) {
						if (1 < children.length) throw Error(formatProdErrorMessage(93));
						children = children[0];
					}
					defaultValue = children;
				}
				defaultValue ??= "";
				value = defaultValue;
			}
			defaultValue = getToStringValue(value);
			element.defaultValue = defaultValue;
			children = element.textContent;
			children === defaultValue && "" !== children && null !== children && (element.value = children);
			track(element);
		}
		function setTextContent(node, text) {
			if (text) {
				var firstChild = node.firstChild;
				if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
					firstChild.nodeValue = text;
					return;
				}
			}
			node.textContent = text;
		}
		var unitlessNumbers = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
		function setValueForStyle(style, styleName, value) {
			var isCustomProperty = 0 === styleName.indexOf("--");
			null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style.setProperty(styleName, "") : "float" === styleName ? style.cssFloat = "" : style[styleName] = "" : isCustomProperty ? style.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style.cssFloat = value : style[styleName] = ("" + value).trim() : style[styleName] = value + "px";
		}
		function setValueForStyles(node, styles, prevStyles) {
			if (null != styles && "object" !== typeof styles) throw Error(formatProdErrorMessage(62));
			node = node.style;
			if (null != prevStyles) {
				for (var styleName in prevStyles) !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "", viewTransitionMutationContext = !0);
				for (var styleName$16 in styles) styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && (setValueForStyle(node, styleName$16, styleName), viewTransitionMutationContext = !0);
			} else for (var styleName$17 in styles) styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
		}
		function isCustomElement(tagName) {
			if (-1 === tagName.indexOf("-")) return !1;
			switch (tagName) {
				case "annotation-xml":
				case "color-profile":
				case "font-face":
				case "font-face-src":
				case "font-face-uri":
				case "font-face-format":
				case "font-face-name":
				case "missing-glyph": return !1;
				default: return !0;
			}
		}
		var aliases = /* @__PURE__ */ new Map([
			["acceptCharset", "accept-charset"],
			["htmlFor", "for"],
			["httpEquiv", "http-equiv"],
			["crossOrigin", "crossorigin"],
			["accentHeight", "accent-height"],
			["alignmentBaseline", "alignment-baseline"],
			["arabicForm", "arabic-form"],
			["baselineShift", "baseline-shift"],
			["capHeight", "cap-height"],
			["clipPath", "clip-path"],
			["clipRule", "clip-rule"],
			["colorInterpolation", "color-interpolation"],
			["colorInterpolationFilters", "color-interpolation-filters"],
			["colorProfile", "color-profile"],
			["colorRendering", "color-rendering"],
			["dominantBaseline", "dominant-baseline"],
			["enableBackground", "enable-background"],
			["fillOpacity", "fill-opacity"],
			["fillRule", "fill-rule"],
			["floodColor", "flood-color"],
			["floodOpacity", "flood-opacity"],
			["fontFamily", "font-family"],
			["fontSize", "font-size"],
			["fontSizeAdjust", "font-size-adjust"],
			["fontStretch", "font-stretch"],
			["fontStyle", "font-style"],
			["fontVariant", "font-variant"],
			["fontWeight", "font-weight"],
			["glyphName", "glyph-name"],
			["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
			["glyphOrientationVertical", "glyph-orientation-vertical"],
			["horizAdvX", "horiz-adv-x"],
			["horizOriginX", "horiz-origin-x"],
			["imageRendering", "image-rendering"],
			["letterSpacing", "letter-spacing"],
			["lightingColor", "lighting-color"],
			["markerEnd", "marker-end"],
			["markerMid", "marker-mid"],
			["markerStart", "marker-start"],
			["maskType", "mask-type"],
			["overlinePosition", "overline-position"],
			["overlineThickness", "overline-thickness"],
			["paintOrder", "paint-order"],
			["panose-1", "panose-1"],
			["pointerEvents", "pointer-events"],
			["renderingIntent", "rendering-intent"],
			["shapeRendering", "shape-rendering"],
			["stopColor", "stop-color"],
			["stopOpacity", "stop-opacity"],
			["strikethroughPosition", "strikethrough-position"],
			["strikethroughThickness", "strikethrough-thickness"],
			["strokeDasharray", "stroke-dasharray"],
			["strokeDashoffset", "stroke-dashoffset"],
			["strokeLinecap", "stroke-linecap"],
			["strokeLinejoin", "stroke-linejoin"],
			["strokeMiterlimit", "stroke-miterlimit"],
			["strokeOpacity", "stroke-opacity"],
			["strokeWidth", "stroke-width"],
			["textAnchor", "text-anchor"],
			["textDecoration", "text-decoration"],
			["textRendering", "text-rendering"],
			["transformOrigin", "transform-origin"],
			["underlinePosition", "underline-position"],
			["underlineThickness", "underline-thickness"],
			["unicodeBidi", "unicode-bidi"],
			["unicodeRange", "unicode-range"],
			["unitsPerEm", "units-per-em"],
			["vAlphabetic", "v-alphabetic"],
			["vHanging", "v-hanging"],
			["vIdeographic", "v-ideographic"],
			["vMathematical", "v-mathematical"],
			["vectorEffect", "vector-effect"],
			["vertAdvY", "vert-adv-y"],
			["vertOriginX", "vert-origin-x"],
			["vertOriginY", "vert-origin-y"],
			["wordSpacing", "word-spacing"],
			["writingMode", "writing-mode"],
			["xmlnsXlink", "xmlns:xlink"],
			["xHeight", "x-height"]
		]);
		var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
		function sanitizeURL(url) {
			return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
		}
		function noop$1() {}
		var currentReplayingEvent = null;
		function getEventTarget(nativeEvent) {
			nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
			nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
			return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
		}
		var restoreTarget = null;
		var restoreQueue = null;
		function restoreStateOfTarget(target) {
			var internalInstance = getInstanceFromNode(target);
			if (internalInstance && (target = internalInstance.stateNode)) {
				var props = target[internalPropsKey] || null;
				a: switch (target = internalInstance.stateNode, internalInstance.type) {
					case "input":
						updateInput(target, props.value, props.defaultValue, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name);
						internalInstance = props.name;
						if ("radio" === props.type && null != internalInstance) {
							for (props = target; props.parentNode;) props = props.parentNode;
							props = props.querySelectorAll("input[name=\"" + escapeSelectorAttributeValueInsideDoubleQuotes("" + internalInstance) + "\"][type=\"radio\"]");
							for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
								var otherNode = props[internalInstance];
								if (otherNode !== target && otherNode.form === target.form) {
									var otherProps = otherNode[internalPropsKey] || null;
									if (!otherProps) throw Error(formatProdErrorMessage(90));
									updateInput(otherNode, otherProps.value, otherProps.defaultValue, otherProps.defaultValue, otherProps.checked, otherProps.defaultChecked, otherProps.type, otherProps.name);
								}
							}
							for (internalInstance = 0; internalInstance < props.length; internalInstance++) otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
						}
						break a;
					case "textarea":
						updateTextarea(target, props.value, props.defaultValue);
						break a;
					case "select": internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, !1);
				}
			}
		}
		var isInsideEventHandler = !1;
		function batchedUpdates$1(fn, a, b) {
			if (isInsideEventHandler) return fn(a, b);
			isInsideEventHandler = !0;
			try {
				return fn(a);
			} finally {
				if (isInsideEventHandler = !1, null !== restoreTarget || null !== restoreQueue) {
					if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn)) for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
				}
			}
		}
		function getListener(inst, registrationName) {
			var stateNode = inst.stateNode;
			if (null === stateNode) return null;
			var props = stateNode[internalPropsKey] || null;
			if (null === props) return null;
			stateNode = props[registrationName];
			a: switch (registrationName) {
				case "onClick":
				case "onClickCapture":
				case "onDoubleClick":
				case "onDoubleClickCapture":
				case "onMouseDown":
				case "onMouseDownCapture":
				case "onMouseMove":
				case "onMouseMoveCapture":
				case "onMouseUp":
				case "onMouseUpCapture":
				case "onMouseEnter":
					(props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
					inst = !props;
					break a;
				default: inst = !1;
			}
			if (inst) return null;
			if (stateNode && "function" !== typeof stateNode) throw Error(formatProdErrorMessage(231, registrationName, typeof stateNode));
			return stateNode;
		}
		var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
		var passiveBrowserEventsSupported = !1;
		if (canUseDOM) try {
			var options = {};
			Object.defineProperty(options, "passive", { get: function() {
				passiveBrowserEventsSupported = !0;
			} });
			window.addEventListener("test", options, options);
			window.removeEventListener("test", options, options);
		} catch (e) {
			passiveBrowserEventsSupported = !1;
		}
		var root = null;
		var startText = null;
		var fallbackText = null;
		function getData() {
			if (fallbackText) return fallbackText;
			var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
			for (start = 0; start < startLength && startValue[start] === endValue[start]; start++);
			var minEnd = startLength - start;
			for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++);
			return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
		}
		function getEventCharCode(nativeEvent) {
			var keyCode = nativeEvent.keyCode;
			"charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
			10 === nativeEvent && (nativeEvent = 13);
			return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
		}
		function functionThatReturnsTrue() {
			return !0;
		}
		function functionThatReturnsFalse() {
			return !1;
		}
		function createSyntheticEvent(Interface) {
			function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
				this._reactName = reactName;
				this._targetInst = targetInst;
				this.type = reactEventType;
				this.nativeEvent = nativeEvent;
				this.target = nativeEventTarget;
				this.currentTarget = null;
				for (var propName in Interface) Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
				this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : !1 === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
				this.isPropagationStopped = functionThatReturnsFalse;
				return this;
			}
			assign(SyntheticBaseEvent.prototype, {
				preventDefault: function() {
					this.defaultPrevented = !0;
					var event = this.nativeEvent;
					event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = !1), this.isDefaultPrevented = functionThatReturnsTrue);
				},
				stopPropagation: function() {
					var event = this.nativeEvent;
					event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0), this.isPropagationStopped = functionThatReturnsTrue);
				},
				persist: function() {},
				isPersistent: functionThatReturnsTrue
			});
			return SyntheticBaseEvent;
		}
		var EventInterface = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function(event) {
				return event.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0
		};
		var SyntheticEvent = createSyntheticEvent(EventInterface);
		var UIEventInterface = assign({}, EventInterface, {
			view: 0,
			detail: 0
		});
		var SyntheticUIEvent = createSyntheticEvent(UIEventInterface);
		var lastMovementX;
		var lastMovementY;
		var lastMouseEvent;
		var MouseEventInterface = assign({}, UIEventInterface, {
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			pageX: 0,
			pageY: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			getModifierState: getEventModifierState,
			button: 0,
			buttons: 0,
			relatedTarget: function(event) {
				return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
			},
			movementX: function(event) {
				if ("movementX" in event) return event.movementX;
				event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
				return lastMovementX;
			},
			movementY: function(event) {
				return "movementY" in event ? event.movementY : lastMovementY;
			}
		});
		var SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface);
		var SyntheticDragEvent = createSyntheticEvent(assign({}, MouseEventInterface, { dataTransfer: 0 }));
		var SyntheticFocusEvent = createSyntheticEvent(assign({}, UIEventInterface, { relatedTarget: 0 }));
		var SyntheticAnimationEvent = createSyntheticEvent(assign({}, EventInterface, {
			animationName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		}));
		var SyntheticClipboardEvent = createSyntheticEvent(assign({}, EventInterface, { clipboardData: function(event) {
			return "clipboardData" in event ? event.clipboardData : window.clipboardData;
		} }));
		var SyntheticCompositionEvent = createSyntheticEvent(assign({}, EventInterface, { data: 0 }));
		var normalizeKey = {
			Esc: "Escape",
			Spacebar: " ",
			Left: "ArrowLeft",
			Up: "ArrowUp",
			Right: "ArrowRight",
			Down: "ArrowDown",
			Del: "Delete",
			Win: "OS",
			Menu: "ContextMenu",
			Apps: "ContextMenu",
			Scroll: "ScrollLock",
			MozPrintableKey: "Unidentified"
		};
		var translateToKey = {
			8: "Backspace",
			9: "Tab",
			12: "Clear",
			13: "Enter",
			16: "Shift",
			17: "Control",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Escape",
			32: " ",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "ArrowLeft",
			38: "ArrowUp",
			39: "ArrowRight",
			40: "ArrowDown",
			45: "Insert",
			46: "Delete",
			112: "F1",
			113: "F2",
			114: "F3",
			115: "F4",
			116: "F5",
			117: "F6",
			118: "F7",
			119: "F8",
			120: "F9",
			121: "F10",
			122: "F11",
			123: "F12",
			144: "NumLock",
			145: "ScrollLock",
			224: "Meta"
		};
		var modifierKeyToProp = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey"
		};
		function modifierStateGetter(keyArg) {
			var nativeEvent = this.nativeEvent;
			return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : !1;
		}
		function getEventModifierState() {
			return modifierStateGetter;
		}
		var SyntheticKeyboardEvent = createSyntheticEvent(assign({}, UIEventInterface, {
			key: function(nativeEvent) {
				if (nativeEvent.key) {
					var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
					if ("Unidentified" !== key) return key;
				}
				return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: getEventModifierState,
			charCode: function(event) {
				return "keypress" === event.type ? getEventCharCode(event) : 0;
			},
			keyCode: function(event) {
				return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
			},
			which: function(event) {
				return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
			}
		}));
		var SyntheticPointerEvent = createSyntheticEvent(assign({}, MouseEventInterface, {
			pointerId: 0,
			width: 0,
			height: 0,
			pressure: 0,
			tangentialPressure: 0,
			tiltX: 0,
			tiltY: 0,
			twist: 0,
			pointerType: 0,
			isPrimary: 0
		}));
		var SyntheticSubmitEvent = createSyntheticEvent(assign({}, EventInterface, { submitter: 0 }));
		var SyntheticTouchEvent = createSyntheticEvent(assign({}, UIEventInterface, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: getEventModifierState
		}));
		var SyntheticTransitionEvent = createSyntheticEvent(assign({}, EventInterface, {
			propertyName: 0,
			elapsedTime: 0,
			pseudoElement: 0
		}));
		var SyntheticWheelEvent = createSyntheticEvent(assign({}, MouseEventInterface, {
			deltaX: function(event) {
				return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
			},
			deltaY: function(event) {
				return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0
		}));
		var SyntheticToggleEvent = createSyntheticEvent(assign({}, EventInterface, {
			newState: 0,
			oldState: 0,
			source: 0
		}));
		var END_KEYCODES = [
			9,
			13,
			27,
			32
		];
		var canUseCompositionEvent = canUseDOM && "CompositionEvent" in window;
		var documentMode = null;
		canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
		var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode;
		var useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode);
		var SPACEBAR_CHAR = String.fromCharCode(32);
		var hasSpaceKeypress = !1;
		function isFallbackCompositionEnd(domEventName, nativeEvent) {
			switch (domEventName) {
				case "keyup": return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
				case "keydown": return 229 !== nativeEvent.keyCode;
				case "keypress":
				case "mousedown":
				case "focusout": return !0;
				default: return !1;
			}
		}
		function getDataFromCustomEvent(nativeEvent) {
			nativeEvent = nativeEvent.detail;
			return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
		}
		var isComposing = !1;
		function getNativeBeforeInputChars(domEventName, nativeEvent) {
			switch (domEventName) {
				case "compositionend": return getDataFromCustomEvent(nativeEvent);
				case "keypress":
					if (32 !== nativeEvent.which) return null;
					hasSpaceKeypress = !0;
					return SPACEBAR_CHAR;
				case "textInput": return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
				default: return null;
			}
		}
		function getFallbackBeforeInputChars(domEventName, nativeEvent) {
			if (isComposing) return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = !1, domEventName) : null;
			switch (domEventName) {
				case "paste": return null;
				case "keypress":
					if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
						if (nativeEvent.char && 1 < nativeEvent.char.length) return nativeEvent.char;
						if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
					}
					return null;
				case "compositionend": return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
				default: return null;
			}
		}
		var supportedInputTypes = {
			color: !0,
			date: !0,
			datetime: !0,
			"datetime-local": !0,
			email: !0,
			month: !0,
			number: !0,
			password: !0,
			range: !0,
			search: !0,
			tel: !0,
			text: !0,
			time: !0,
			url: !0,
			week: !0
		};
		function isTextInputElement(elem) {
			var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
			return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? !0 : !1;
		}
		function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
			restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
			inst = accumulateTwoPhaseListeners(inst, "onChange");
			0 < inst.length && (nativeEvent = new SyntheticEvent("onChange", "change", null, nativeEvent, target), dispatchQueue.push({
				event: nativeEvent,
				listeners: inst
			}));
		}
		var activeElement$1 = null;
		var activeElementInst$1 = null;
		function runEventInBatch(dispatchQueue) {
			processDispatchQueue(dispatchQueue, 0);
		}
		function getInstIfValueChanged(targetInst) {
			if (updateValueIfChanged(getNodeFromInstance(targetInst))) return targetInst;
		}
		function getTargetInstForChangeEvent(domEventName, targetInst) {
			if ("change" === domEventName) return targetInst;
		}
		var isInputEventSupported = !1;
		if (canUseDOM) {
			var JSCompiler_inline_result$jscomp$318;
			if (canUseDOM) {
				var isSupported$jscomp$inline_474 = "oninput" in document;
				if (!isSupported$jscomp$inline_474) {
					var element$jscomp$inline_475 = document.createElement("div");
					element$jscomp$inline_475.setAttribute("oninput", "return;");
					isSupported$jscomp$inline_474 = "function" === typeof element$jscomp$inline_475.oninput;
				}
				JSCompiler_inline_result$jscomp$318 = isSupported$jscomp$inline_474;
			} else JSCompiler_inline_result$jscomp$318 = !1;
			isInputEventSupported = JSCompiler_inline_result$jscomp$318 && (!document.documentMode || 9 < document.documentMode);
		}
		function stopWatchingForValueChange() {
			activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
		}
		function handlePropertyChange(nativeEvent) {
			if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
				var dispatchQueue = [];
				createAndAccumulateChangeEvent(dispatchQueue, activeElementInst$1, nativeEvent, getEventTarget(nativeEvent));
				batchedUpdates$1(runEventInBatch, dispatchQueue);
			}
		}
		function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
			"focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
		}
		function getTargetInstForInputEventPolyfill(domEventName) {
			if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName) return getInstIfValueChanged(activeElementInst$1);
		}
		function getTargetInstForClickEvent(domEventName, targetInst) {
			if ("click" === domEventName) return getInstIfValueChanged(targetInst);
		}
		function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
			if ("input" === domEventName || "change" === domEventName) return getInstIfValueChanged(targetInst);
		}
		function is(x, y) {
			return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
		}
		var objectIs = "function" === typeof Object.is ? Object.is : is;
		function shallowEqual(objA, objB) {
			if (objectIs(objA, objB)) return !0;
			if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB) return !1;
			var keysA = Object.keys(objA), keysB = Object.keys(objB);
			if (keysA.length !== keysB.length) return !1;
			for (keysB = 0; keysB < keysA.length; keysB++) {
				var currentKey = keysA[keysB];
				if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey])) return !1;
			}
			return !0;
		}
		function getActiveElement(doc) {
			doc = doc || ("undefined" !== typeof document ? document : void 0);
			if ("undefined" === typeof doc) return null;
			try {
				return doc.activeElement || doc.body;
			} catch (e$20) {
				return doc.body;
			}
		}
		function getLeafNode(node) {
			for (; node && node.firstChild;) node = node.firstChild;
			return node;
		}
		function getNodeForCharacterOffset(root, offset) {
			var node = getLeafNode(root);
			root = 0;
			for (var nodeEnd; node;) {
				if (3 === node.nodeType) {
					nodeEnd = root + node.textContent.length;
					if (root <= offset && nodeEnd >= offset) return {
						node,
						offset: offset - root
					};
					root = nodeEnd;
				}
				a: {
					for (; node;) {
						if (node.nextSibling) {
							node = node.nextSibling;
							break a;
						}
						node = node.parentNode;
					}
					node = void 0;
				}
				node = getLeafNode(node);
			}
		}
		function containsNode(outerNode, innerNode) {
			return outerNode && innerNode ? outerNode === innerNode ? !0 : outerNode && 3 === outerNode.nodeType ? !1 : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : !1 : !1;
		}
		function getActiveElementDeep(containerInfo) {
			containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
			for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement;) {
				try {
					var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
				} catch (err) {
					JSCompiler_inline_result = !1;
				}
				if (JSCompiler_inline_result) containerInfo = element.contentWindow;
				else break;
				element = getActiveElement(containerInfo.document);
			}
			return element;
		}
		function hasSelectionCapabilities(elem) {
			var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
			return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
		}
		var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode;
		var activeElement = null;
		var activeElementInst = null;
		var lastSelection = null;
		var mouseDown = !1;
		function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
			var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
			mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = {
				start: doc.selectionStart,
				end: doc.selectionEnd
			} : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
				anchorNode: doc.anchorNode,
				anchorOffset: doc.anchorOffset,
				focusNode: doc.focusNode,
				focusOffset: doc.focusOffset
			}), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent("onSelect", "select", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
				event: nativeEvent,
				listeners: doc
			}), nativeEvent.target = activeElement)));
		}
		function makePrefixMap(styleProp, eventName) {
			var prefixes = {};
			prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
			prefixes["Webkit" + styleProp] = "webkit" + eventName;
			prefixes["Moz" + styleProp] = "moz" + eventName;
			return prefixes;
		}
		var vendorPrefixes = {
			animationend: makePrefixMap("Animation", "AnimationEnd"),
			animationiteration: makePrefixMap("Animation", "AnimationIteration"),
			animationstart: makePrefixMap("Animation", "AnimationStart"),
			transitionrun: makePrefixMap("Transition", "TransitionRun"),
			transitionstart: makePrefixMap("Transition", "TransitionStart"),
			transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
			transitionend: makePrefixMap("Transition", "TransitionEnd")
		};
		var prefixedEventNames = {};
		var style = {};
		canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
		function getVendorPrefixedEventName(eventName) {
			if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
			if (!vendorPrefixes[eventName]) return eventName;
			var prefixMap = vendorPrefixes[eventName], styleProp;
			for (styleProp in prefixMap) if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) return prefixedEventNames[eventName] = prefixMap[styleProp];
			return eventName;
		}
		var ANIMATION_END = getVendorPrefixedEventName("animationend");
		var ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration");
		var ANIMATION_START = getVendorPrefixedEventName("animationstart");
		var TRANSITION_RUN = getVendorPrefixedEventName("transitionrun");
		var TRANSITION_START = getVendorPrefixedEventName("transitionstart");
		var TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel");
		var TRANSITION_END = getVendorPrefixedEventName("transitionend");
		var topLevelEventsToReactNames = /* @__PURE__ */ new Map();
		var simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
		simpleEventPluginEvents.push("scrollEnd");
		function registerSimpleEvent(domEventName, reactName) {
			topLevelEventsToReactNames.set(domEventName, reactName);
			registerTwoPhaseEvent(reactName, [domEventName]);
		}
		var globalClientIdCounter$1 = 0;
		function getViewTransitionName(props, instance) {
			if (null != props.name && "auto" !== props.name) return props.name;
			if (null !== instance.autoName) return instance.autoName;
			props = pendingEffectsRoot.identifierPrefix;
			var globalClientId = globalClientIdCounter$1++;
			props = "_" + props + "t_" + globalClientId.toString(32) + "_";
			return instance.autoName = props;
		}
		function getClassNameByType(classByType) {
			if (null == classByType || "string" === typeof classByType) return classByType;
			var className = null, activeTypes = pendingTransitionTypes;
			if (null !== activeTypes) for (var i = 0; i < activeTypes.length; i++) {
				var match = classByType[activeTypes[i]];
				if (null != match) {
					if ("none" === match) return "none";
					className = null == className ? match : className + (" " + match);
				}
			}
			return null == className ? classByType.default : className;
		}
		function getViewTransitionClassName(defaultClass, eventClass) {
			defaultClass = getClassNameByType(defaultClass);
			eventClass = getClassNameByType(eventClass);
			return null == eventClass ? "auto" === defaultClass ? null : defaultClass : "auto" === eventClass ? null : eventClass;
		}
		var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
			if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
				var event = new window.ErrorEvent("error", {
					bubbles: !0,
					cancelable: !0,
					message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
					error
				});
				if (!window.dispatchEvent(event)) return;
			} else if ("object" === typeof process && "function" === typeof process.emit) {
				process.emit("uncaughtException", error);
				return;
			}
			console.error(error);
		};
		var concurrentQueues = [];
		var concurrentQueuesIndex = 0;
		var concurrentlyUpdatedLanes = 0;
		function finishQueueingConcurrentUpdates() {
			for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex;) {
				var fiber = concurrentQueues[i];
				concurrentQueues[i++] = null;
				var queue = concurrentQueues[i];
				concurrentQueues[i++] = null;
				var update = concurrentQueues[i];
				concurrentQueues[i++] = null;
				var lane = concurrentQueues[i];
				concurrentQueues[i++] = null;
				if (null !== queue && null !== update) {
					var pending = queue.pending;
					null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
					queue.pending = update;
				}
				0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
			}
		}
		function enqueueUpdate$1(fiber, queue, update, lane) {
			concurrentQueues[concurrentQueuesIndex++] = fiber;
			concurrentQueues[concurrentQueuesIndex++] = queue;
			concurrentQueues[concurrentQueuesIndex++] = update;
			concurrentQueues[concurrentQueuesIndex++] = lane;
			concurrentlyUpdatedLanes |= lane;
			fiber.lanes |= lane;
			fiber = fiber.alternate;
			null !== fiber && (fiber.lanes |= lane);
		}
		function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
			enqueueUpdate$1(fiber, queue, update, lane);
			return getRootForUpdatedFiber(fiber);
		}
		function enqueueConcurrentRenderForLane(fiber, lane) {
			enqueueUpdate$1(fiber, null, null, lane);
			return getRootForUpdatedFiber(fiber);
		}
		function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
			sourceFiber.lanes |= lane;
			var alternate = sourceFiber.alternate;
			null !== alternate && (alternate.lanes |= lane);
			for (var isHidden = !1, parent = sourceFiber.return; null !== parent;) parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = !0)), sourceFiber = parent, parent = parent.return;
			return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
		}
		function getRootForUpdatedFiber(sourceFiber) {
			if (50 < nestedUpdateCount) throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
			for (var parent = sourceFiber.return; null !== parent;) sourceFiber = parent, parent = sourceFiber.return;
			return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
		}
		var emptyContextObject = {};
		function FiberNode(tag, pendingProps, key, mode) {
			this.tag = tag;
			this.key = key;
			this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
			this.index = 0;
			this.refCleanup = this.ref = null;
			this.pendingProps = pendingProps;
			this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
			this.mode = mode;
			this.subtreeFlags = this.flags = 0;
			this.deletions = null;
			this.childLanes = this.lanes = 0;
			this.alternate = null;
		}
		function createFiberImplClass(tag, pendingProps, key, mode) {
			return new FiberNode(tag, pendingProps, key, mode);
		}
		function shouldConstruct(Component) {
			Component = Component.prototype;
			return !(!Component || !Component.isReactComponent);
		}
		function createWorkInProgress(current, pendingProps) {
			var workInProgress = current.alternate;
			null === workInProgress ? (workInProgress = createFiberImplClass(current.tag, pendingProps, current.key, current.mode), workInProgress.elementType = current.elementType, workInProgress.type = current.type, workInProgress.stateNode = current.stateNode, workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, workInProgress.type = current.type, workInProgress.flags = 0, workInProgress.subtreeFlags = 0, workInProgress.deletions = null);
			workInProgress.flags = current.flags & 1206910976;
			workInProgress.childLanes = current.childLanes;
			workInProgress.lanes = current.lanes;
			workInProgress.child = current.child;
			workInProgress.memoizedProps = current.memoizedProps;
			workInProgress.memoizedState = current.memoizedState;
			workInProgress.updateQueue = current.updateQueue;
			pendingProps = current.dependencies;
			workInProgress.dependencies = null === pendingProps ? null : {
				lanes: pendingProps.lanes,
				firstContext: pendingProps.firstContext
			};
			workInProgress.sibling = current.sibling;
			workInProgress.index = current.index;
			workInProgress.ref = current.ref;
			workInProgress.refCleanup = current.refCleanup;
			return workInProgress;
		}
		function resetWorkInProgress(workInProgress, renderLanes) {
			workInProgress.flags &= 1206910978;
			var current = workInProgress.alternate;
			null === current ? (workInProgress.childLanes = 0, workInProgress.lanes = renderLanes, workInProgress.child = null, workInProgress.subtreeFlags = 0, workInProgress.memoizedProps = null, workInProgress.memoizedState = null, workInProgress.updateQueue = null, workInProgress.dependencies = null, workInProgress.stateNode = null) : (workInProgress.childLanes = current.childLanes, workInProgress.lanes = current.lanes, workInProgress.child = current.child, workInProgress.subtreeFlags = 0, workInProgress.deletions = null, workInProgress.memoizedProps = current.memoizedProps, workInProgress.memoizedState = current.memoizedState, workInProgress.updateQueue = current.updateQueue, workInProgress.type = current.type, renderLanes = current.dependencies, workInProgress.dependencies = null === renderLanes ? null : {
				lanes: renderLanes.lanes,
				firstContext: renderLanes.firstContext
			});
			return workInProgress;
		}
		function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
			var fiberTag = 0;
			owner = type;
			if ("function" === typeof owner) shouldConstruct(owner) && (fiberTag = 1);
			else if ("string" === typeof owner) fiberTag = isHostHoistableType(type, pendingProps, contextStackCursor.current) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
			else a: switch (owner) {
				case REACT_ACTIVITY_TYPE: return type = createFiberImplClass(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
				case REACT_FRAGMENT_TYPE: return createFiberFromFragment(pendingProps.children, mode, lanes, key);
				case REACT_STRICT_MODE_TYPE:
					fiberTag = 8;
					mode |= 24;
					break;
				case REACT_PROFILER_TYPE: return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
				case REACT_SUSPENSE_TYPE: return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
				case REACT_SUSPENSE_LIST_TYPE: return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
				case REACT_LEGACY_HIDDEN_TYPE:
				case REACT_VIEW_TRANSITION_TYPE: return type = mode | 32, type = createFiberImplClass(30, pendingProps, key, type), type.elementType = REACT_VIEW_TRANSITION_TYPE, type.lanes = lanes, type.stateNode = {
					autoName: null,
					paired: null,
					clones: null,
					ref: null
				}, type;
				default:
					if ("object" === typeof owner && null !== owner) switch (owner.$$typeof) {
						case REACT_CONTEXT_TYPE:
							fiberTag = 10;
							break a;
						case REACT_CONSUMER_TYPE:
							fiberTag = 9;
							break a;
						case REACT_FORWARD_REF_TYPE:
							fiberTag = 11;
							break a;
						case REACT_MEMO_TYPE:
							fiberTag = 14;
							break a;
						case REACT_LAZY_TYPE:
							fiberTag = 16;
							owner = null;
							break a;
					}
					fiberTag = 29;
					pendingProps = Error(formatProdErrorMessage(130, null === type ? "null" : typeof type, ""));
					owner = null;
			}
			key = createFiberImplClass(fiberTag, pendingProps, key, mode);
			key.elementType = type;
			key.type = owner;
			key.lanes = lanes;
			return key;
		}
		function createFiberFromFragment(elements, mode, lanes, key) {
			elements = createFiberImplClass(7, elements, key, mode);
			elements.lanes = lanes;
			return elements;
		}
		function createFiberFromText(content, mode, lanes) {
			content = createFiberImplClass(6, content, null, mode);
			content.lanes = lanes;
			return content;
		}
		function createFiberFromDehydratedFragment(dehydratedNode) {
			var fiber = createFiberImplClass(18, null, null, 0);
			fiber.stateNode = dehydratedNode;
			return fiber;
		}
		function createFiberFromPortal(portal, mode, lanes) {
			mode = createFiberImplClass(4, null !== portal.children ? portal.children : [], portal.key, mode);
			mode.lanes = lanes;
			mode.stateNode = {
				containerInfo: portal.containerInfo,
				pendingChildren: null,
				implementation: portal.implementation
			};
			return mode;
		}
		var CapturedStacks = /* @__PURE__ */ new WeakMap();
		function createCapturedValueAtFiber(value, source) {
			if ("object" === typeof value && null !== value) {
				var existing = CapturedStacks.get(value);
				if (void 0 !== existing) return existing;
				source = {
					value,
					source,
					stack: getStackByFiberInDevAndProd(source)
				};
				CapturedStacks.set(value, source);
				return source;
			}
			return {
				value,
				source,
				stack: getStackByFiberInDevAndProd(source)
			};
		}
		var forkStack = [];
		var forkStackIndex = 0;
		var treeForkProvider = null;
		var treeForkCount = 0;
		var idStack = [];
		var idStackIndex = 0;
		var treeContextProvider = null;
		var treeContextId = 1;
		var treeContextOverflow = "";
		function pushTreeFork(workInProgress, totalChildren) {
			forkStack[forkStackIndex++] = treeForkCount;
			forkStack[forkStackIndex++] = treeForkProvider;
			treeForkProvider = workInProgress;
			treeForkCount = totalChildren;
		}
		function pushTreeId(workInProgress, totalChildren, index) {
			idStack[idStackIndex++] = treeContextId;
			idStack[idStackIndex++] = treeContextOverflow;
			idStack[idStackIndex++] = treeContextProvider;
			treeContextProvider = workInProgress;
			var baseIdWithLeadingBit = treeContextId;
			workInProgress = treeContextOverflow;
			var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
			baseIdWithLeadingBit &= ~(1 << baseLength);
			index += 1;
			var length = 32 - clz32(totalChildren) + baseLength;
			if (30 < length) {
				var numberOfOverflowBits = baseLength - baseLength % 5;
				length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
				baseIdWithLeadingBit >>= numberOfOverflowBits;
				baseLength -= numberOfOverflowBits;
				treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit;
				treeContextOverflow = length + workInProgress;
			} else treeContextId = 1 << length | index << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress;
		}
		function pushMaterializedTreeId(workInProgress) {
			null !== workInProgress.return && (pushTreeFork(workInProgress, 1), pushTreeId(workInProgress, 1, 0));
		}
		function popTreeContext(workInProgress) {
			for (; workInProgress === treeForkProvider;) treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
			for (; workInProgress === treeContextProvider;) treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
		}
		function restoreSuspendedTreeContext(workInProgress, suspendedContext) {
			idStack[idStackIndex++] = treeContextId;
			idStack[idStackIndex++] = treeContextOverflow;
			idStack[idStackIndex++] = treeContextProvider;
			treeContextId = suspendedContext.id;
			treeContextOverflow = suspendedContext.overflow;
			treeContextProvider = workInProgress;
		}
		var hydrationParentFiber = null;
		var nextHydratableInstance = null;
		var isHydrating = !1;
		var hydrationErrors = null;
		var rootOrSingletonContext = !1;
		var HydrationMismatchException = Error(formatProdErrorMessage(519));
		function throwOnHydrationMismatch(fiber) {
			queueHydrationError(createCapturedValueAtFiber(Error(formatProdErrorMessage(418, 1 < arguments.length && void 0 !== arguments[1] && arguments[1] ? "text" : "HTML", "")), fiber));
			throw HydrationMismatchException;
		}
		function prepareToHydrateHostInstance(fiber) {
			var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
			instance[internalInstanceKey] = fiber;
			instance[internalPropsKey] = props;
			switch (type) {
				case "dialog":
					listenToNonDelegatedEvent("cancel", instance);
					listenToNonDelegatedEvent("close", instance);
					break;
				case "iframe":
				case "object":
				case "embed":
					listenToNonDelegatedEvent("load", instance);
					break;
				case "video":
				case "audio":
					for (type = 0; type < mediaEventTypes.length; type++) listenToNonDelegatedEvent(mediaEventTypes[type], instance);
					break;
				case "source":
					listenToNonDelegatedEvent("error", instance);
					break;
				case "img":
				case "image":
				case "link":
					listenToNonDelegatedEvent("error", instance);
					listenToNonDelegatedEvent("load", instance);
					break;
				case "details":
					listenToNonDelegatedEvent("toggle", instance);
					break;
				case "input":
					listenToNonDelegatedEvent("invalid", instance);
					initInput(instance, props.value, props.defaultValue, props.checked, props.defaultChecked, props.type, props.name, !0);
					break;
				case "select":
					listenToNonDelegatedEvent("invalid", instance);
					break;
				case "textarea": listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children);
			}
			type = props.children;
			"string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || !0 === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = !0) : instance = !1;
			instance || throwOnHydrationMismatch(fiber, !0);
		}
		function popToNextHostParent(fiber) {
			for (hydrationParentFiber = fiber.return; hydrationParentFiber;) switch (hydrationParentFiber.tag) {
				case 5:
				case 31:
				case 13:
					rootOrSingletonContext = !1;
					return;
				case 27:
				case 3:
					rootOrSingletonContext = !0;
					return;
				default: hydrationParentFiber = hydrationParentFiber.return;
			}
		}
		function popHydrationState(fiber) {
			if (fiber !== hydrationParentFiber) return !1;
			if (!isHydrating) return popToNextHostParent(fiber), isHydrating = !0, !1;
			var tag = fiber.tag, JSCompiler_temp;
			if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
				if (JSCompiler_temp = 5 === tag) JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
				JSCompiler_temp = !JSCompiler_temp;
			}
			JSCompiler_temp && nextHydratableInstance && throwOnHydrationMismatch(fiber);
			popToNextHostParent(fiber);
			if (13 === tag) {
				fiber = fiber.memoizedState;
				fiber = null !== fiber ? fiber.dehydrated : null;
				if (!fiber) throw Error(formatProdErrorMessage(317));
				nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
			} else if (31 === tag) {
				fiber = fiber.memoizedState;
				fiber = null !== fiber ? fiber.dehydrated : null;
				if (!fiber) throw Error(formatProdErrorMessage(317));
				nextHydratableInstance = getNextHydratableInstanceAfterHydrationBoundary(fiber);
			} else 27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
			return !0;
		}
		function resetHydrationState() {
			nextHydratableInstance = hydrationParentFiber = null;
			isHydrating = !1;
		}
		function upgradeHydrationErrorsToRecoverable() {
			var queuedErrors = hydrationErrors;
			null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, queuedErrors), hydrationErrors = null);
			return queuedErrors;
		}
		function queueHydrationError(error) {
			null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
		}
		var valueCursor = createCursor(null);
		var currentlyRenderingFiber$1 = null;
		var lastContextDependency = null;
		function pushProvider(providerFiber, context, nextValue) {
			push(valueCursor, context._currentValue);
			context._currentValue = nextValue;
		}
		function popProvider(context) {
			context._currentValue = valueCursor.current;
			pop(valueCursor);
		}
		function scheduleContextWorkOnParentPath(parent, renderLanes, propagationRoot) {
			for (; null !== parent;) {
				var alternate = parent.alternate;
				(parent.childLanes & renderLanes) !== renderLanes ? (parent.childLanes |= renderLanes, null !== alternate && (alternate.childLanes |= renderLanes)) : null !== alternate && (alternate.childLanes & renderLanes) !== renderLanes && (alternate.childLanes |= renderLanes);
				if (parent === propagationRoot) break;
				parent = parent.return;
			}
		}
		function propagateContextChanges(workInProgress, contexts, renderLanes, forcePropagateEntireTree) {
			var fiber = workInProgress.child;
			null !== fiber && (fiber.return = workInProgress);
			for (; null !== fiber;) {
				var list = fiber.dependencies;
				if (null !== list) {
					var nextFiber = fiber.child;
					list = list.firstContext;
					a: for (; null !== list;) {
						var dependency = list;
						list = fiber;
						for (var i = 0; i < contexts.length; i++) if (dependency.context === contexts[i]) {
							list.lanes |= renderLanes;
							dependency = list.alternate;
							null !== dependency && (dependency.lanes |= renderLanes);
							scheduleContextWorkOnParentPath(list.return, renderLanes, workInProgress);
							forcePropagateEntireTree || (nextFiber = null);
							break a;
						}
						list = dependency.next;
					}
				} else if (18 === fiber.tag) {
					nextFiber = fiber.return;
					if (null === nextFiber) throw Error(formatProdErrorMessage(341));
					nextFiber.lanes |= renderLanes;
					list = nextFiber.alternate;
					null !== list && (list.lanes |= renderLanes);
					scheduleContextWorkOnParentPath(nextFiber, renderLanes, workInProgress);
					nextFiber = null;
				} else 13 === fiber.tag && null !== fiber.memoizedState && null === fiber.memoizedState.dehydrated ? (fiber.lanes |= renderLanes, nextFiber = fiber.alternate, null !== nextFiber && (nextFiber.lanes |= renderLanes), scheduleContextWorkOnParentPath(fiber.return, renderLanes, workInProgress), nextFiber = fiber.child, nextFiber = null !== nextFiber ? nextFiber.sibling : null) : nextFiber = fiber.child;
				if (null !== nextFiber) nextFiber.return = fiber;
				else for (nextFiber = fiber; null !== nextFiber;) {
					if (nextFiber === workInProgress) {
						nextFiber = null;
						break;
					}
					fiber = nextFiber.sibling;
					if (null !== fiber) {
						fiber.return = nextFiber.return;
						nextFiber = fiber;
						break;
					}
					nextFiber = nextFiber.return;
				}
				fiber = nextFiber;
			}
		}
		function propagateParentContextChanges(current, workInProgress, renderLanes, forcePropagateEntireTree) {
			current = null;
			for (var parent = workInProgress, isInsidePropagationBailout = !1; null !== parent;) {
				if (!isInsidePropagationBailout) {
					if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = !0;
					else if (0 !== (parent.flags & 262144)) break;
				}
				if (10 === parent.tag) {
					var currentParent = parent.alternate;
					if (null === currentParent) throw Error(formatProdErrorMessage(387));
					currentParent = currentParent.memoizedProps;
					if (null !== currentParent) {
						var context = parent.type;
						objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
					}
				} else if (parent === hostTransitionProviderCursor.current) {
					currentParent = parent.alternate;
					if (null === currentParent) throw Error(formatProdErrorMessage(387));
					currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
				}
				parent = parent.return;
			}
			null !== current && propagateContextChanges(workInProgress, current, renderLanes, forcePropagateEntireTree);
			workInProgress.flags |= 262144;
			return null !== current;
		}
		function checkIfContextChanged(currentDependencies) {
			for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies;) {
				if (!objectIs(currentDependencies.context._currentValue, currentDependencies.memoizedValue)) return !0;
				currentDependencies = currentDependencies.next;
			}
			return !1;
		}
		function prepareToReadContext(workInProgress) {
			currentlyRenderingFiber$1 = workInProgress;
			lastContextDependency = null;
			workInProgress = workInProgress.dependencies;
			null !== workInProgress && (workInProgress.firstContext = null);
		}
		function readContext(context) {
			return readContextForConsumer(currentlyRenderingFiber$1, context);
		}
		function readContextDuringReconciliation(consumer, context) {
			null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
			return readContextForConsumer(consumer, context);
		}
		function readContextForConsumer(consumer, context) {
			var value = context._currentValue;
			context = {
				context,
				memoizedValue: value,
				next: null
			};
			if (null === lastContextDependency) {
				if (null === consumer) throw Error(formatProdErrorMessage(308));
				lastContextDependency = context;
				consumer.dependencies = {
					lanes: 0,
					firstContext: context
				};
				consumer.flags |= 524288;
			} else lastContextDependency = lastContextDependency.next = context;
			return value;
		}
		var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
			var listeners = [], signal = this.signal = {
				aborted: !1,
				addEventListener: function(type, listener) {
					listeners.push(listener);
				}
			};
			this.abort = function() {
				signal.aborted = !0;
				listeners.forEach(function(listener) {
					return listener();
				});
			};
		};
		var scheduleCallback$2 = Scheduler.unstable_scheduleCallback;
		var NormalPriority = Scheduler.unstable_NormalPriority;
		var CacheContext = {
			$$typeof: REACT_CONTEXT_TYPE,
			Consumer: null,
			Provider: null,
			_currentValue: null,
			_currentValue2: null,
			_threadCount: 0
		};
		function createCache() {
			return {
				controller: new AbortControllerLocal(),
				data: /* @__PURE__ */ new Map(),
				refCount: 0
			};
		}
		function releaseCache(cache) {
			cache.refCount--;
			0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
				cache.controller.abort();
			});
		}
		function queueTransitionTypes(root, transitionTypes) {
			if (0 !== (root.pendingLanes & 4194048)) {
				var queued = root.transitionTypes;
				null === queued && (queued = root.transitionTypes = []);
				for (root = 0; root < transitionTypes.length; root++) {
					var transitionType = transitionTypes[root];
					-1 === queued.indexOf(transitionType) && queued.push(transitionType);
				}
			}
		}
		var entangledTransitionTypes = null;
		function claimQueuedTransitionTypes(root) {
			var claimed = root.transitionTypes;
			root.transitionTypes = null;
			return claimed;
		}
		var currentEntangledListeners = null;
		var currentEntangledPendingCount = 0;
		var currentEntangledLane = 0;
		var currentEntangledActionThenable = null;
		function entangleAsyncAction(transition, thenable) {
			if (null === currentEntangledListeners) {
				var entangledListeners = currentEntangledListeners = [];
				currentEntangledPendingCount = 0;
				currentEntangledLane = requestTransitionLane();
				currentEntangledActionThenable = {
					status: "pending",
					value: void 0,
					then: function(resolve) {
						entangledListeners.push(resolve);
					}
				};
			}
			currentEntangledPendingCount++;
			thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
			return thenable;
		}
		function pingEngtangledActionScope() {
			if (0 === --currentEntangledPendingCount && (entangledTransitionTypes = null, null !== currentEntangledListeners)) {
				null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
				var listeners = currentEntangledListeners;
				currentEntangledListeners = null;
				currentEntangledLane = 0;
				currentEntangledActionThenable = null;
				for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
			}
		}
		function chainThenableValue(thenable, result) {
			var listeners = [], thenableWithOverride = {
				status: "pending",
				value: null,
				reason: null,
				then: function(resolve) {
					listeners.push(resolve);
				}
			};
			thenable.then(function() {
				thenableWithOverride.status = "fulfilled";
				thenableWithOverride.value = result;
				for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
			}, function(error) {
				thenableWithOverride.status = "rejected";
				thenableWithOverride.reason = error;
				for (error = 0; error < listeners.length; error++) (0, listeners[error])(void 0);
			});
			return thenableWithOverride;
		}
		var prevOnStartTransitionFinish = ReactSharedInternals.S;
		ReactSharedInternals.S = function(transition, returnValue) {
			globalMostRecentTransitionTime = now();
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
			if (null !== entangledTransitionTypes) for (var root$28 = firstScheduledRoot; null !== root$28;) queueTransitionTypes(root$28, entangledTransitionTypes), root$28 = root$28.next;
			root$28 = transition.types;
			if (null !== root$28) {
				for (var root$29 = firstScheduledRoot; null !== root$29;) queueTransitionTypes(root$29, root$28), root$29 = root$29.next;
				if (0 !== currentEntangledLane) {
					root$29 = entangledTransitionTypes;
					null === root$29 && (root$29 = entangledTransitionTypes = []);
					for (var i = 0; i < root$28.length; i++) {
						var transitionType = root$28[i];
						-1 === root$29.indexOf(transitionType) && root$29.push(transitionType);
					}
				}
			}
			null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
		};
		var resumedCache = createCursor(null);
		function peekCacheFromPool() {
			var cacheResumedFromPreviousRender = resumedCache.current;
			return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
		}
		function pushTransition(offscreenWorkInProgress, prevCachePool) {
			null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
		}
		function getSuspendedCache() {
			var cacheFromPool = peekCacheFromPool();
			return null === cacheFromPool ? null : {
				parent: CacheContext._currentValue,
				pool: cacheFromPool
			};
		}
		var SuspenseException = Error(formatProdErrorMessage(460));
		var SuspenseyCommitException = Error(formatProdErrorMessage(474));
		var SuspenseActionException = Error(formatProdErrorMessage(542));
		var noopSuspenseyCommitThenable = { then: function() {} };
		function isThenableResolved(thenable) {
			thenable = thenable.status;
			return "fulfilled" === thenable || "rejected" === thenable;
		}
		function trackUsedThenable(thenableState, thenable, index) {
			index = thenableState[index];
			void 0 === index ? thenableState.push(thenable) : index !== thenable && (thenable.then(noop$1, noop$1), thenable = index);
			switch (thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected":
					thenableState = thenable.reason;
					checkIfUseWrappedInAsyncCatch(thenableState);
					if (void 0 === thenableState && !("reason" in thenable)) throw Error(formatProdErrorMessage(600));
					throw thenableState;
				default:
					if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
					else {
						thenableState = workInProgressRoot;
						if (null !== thenableState && 100 < thenableState.shellSuspendCounter) throw Error(formatProdErrorMessage(482));
						thenableState = thenable;
						thenableState.status = "pending";
						thenableState.then(function(fulfilledValue) {
							if ("pending" === thenable.status) {
								var fulfilledThenable = thenable;
								fulfilledThenable.status = "fulfilled";
								fulfilledThenable.value = fulfilledValue;
							}
						}, function(error) {
							if ("pending" === thenable.status) {
								var rejectedThenable = thenable;
								rejectedThenable.status = "rejected";
								rejectedThenable.reason = error;
							}
						});
					}
					switch (thenable.status) {
						case "fulfilled": return thenable.value;
						case "rejected": throw thenableState = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState), thenableState;
					}
					suspendedThenable = thenable;
					throw SuspenseException;
			}
		}
		function resolveLazy(lazyType) {
			try {
				var init = lazyType._init;
				return init(lazyType._payload);
			} catch (x) {
				if (null !== x && "object" === typeof x && "function" === typeof x.then) throw suspendedThenable = x, SuspenseException;
				throw x;
			}
		}
		var suspendedThenable = null;
		function getSuspendedThenable() {
			if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
			var thenable = suspendedThenable;
			suspendedThenable = null;
			return thenable;
		}
		function checkIfUseWrappedInAsyncCatch(rejectedReason) {
			if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException) throw Error(formatProdErrorMessage(483));
		}
		var thenableState$1 = null;
		var thenableIndexCounter$1 = 0;
		function unwrapThenable(thenable) {
			var index = thenableIndexCounter$1;
			thenableIndexCounter$1 += 1;
			null === thenableState$1 && (thenableState$1 = []);
			return trackUsedThenable(thenableState$1, thenable, index);
		}
		function coerceRef(workInProgress, element) {
			element = element.props.ref;
			workInProgress.ref = void 0 !== element ? element : null;
		}
		function throwOnInvalidObjectTypeImpl(returnFiber, newChild) {
			if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE) throw Error(formatProdErrorMessage(525));
			returnFiber = Object.prototype.toString.call(newChild);
			throw Error(formatProdErrorMessage(31, "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber));
		}
		function createChildReconciler(shouldTrackSideEffects) {
			function deleteChild(returnFiber, childToDelete) {
				if (shouldTrackSideEffects) {
					var deletions = returnFiber.deletions;
					null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
				}
			}
			function deleteRemainingChildren(returnFiber, currentFirstChild) {
				if (!shouldTrackSideEffects) return null;
				for (; null !== currentFirstChild;) deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
				return null;
			}
			function mapRemainingChildren(currentFirstChild) {
				for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild;) null === currentFirstChild.key ? existingChildren.set(currentFirstChild.index, currentFirstChild) : existingChildren.set(currentFirstChild.key, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
				return existingChildren;
			}
			function useFiber(fiber, pendingProps) {
				fiber = createWorkInProgress(fiber, pendingProps);
				fiber.index = 0;
				fiber.sibling = null;
				return fiber;
			}
			function placeChild(newFiber, lastPlacedIndex, newIndex) {
				newFiber.index = newIndex;
				if (!shouldTrackSideEffects) return newFiber.flags |= 1048576, lastPlacedIndex;
				newIndex = newFiber.alternate;
				if (null !== newIndex) return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 2, lastPlacedIndex) : newIndex;
				newFiber.flags |= 134217730;
				return lastPlacedIndex;
			}
			function placeSingleChild(newFiber) {
				shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 134217730);
				return newFiber;
			}
			function updateTextNode(returnFiber, current, textContent, lanes) {
				if (null === current || 6 !== current.tag) return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
				current = useFiber(current, textContent);
				current.return = returnFiber;
				return current;
			}
			function updateElement(returnFiber, current, element, lanes) {
				var elementType = element.type;
				if (elementType === REACT_FRAGMENT_TYPE) return returnFiber = updateFragment(returnFiber, current, element.props.children, lanes, element.key), coerceRef(returnFiber, element), returnFiber;
				if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type)) return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
				current = createFiberFromTypeAndProps(element.type, element.key, element.props, null, returnFiber.mode, lanes);
				coerceRef(current, element);
				current.return = returnFiber;
				return current;
			}
			function updatePortal(returnFiber, current, portal, lanes) {
				if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
				current = useFiber(current, portal.children || []);
				current.return = returnFiber;
				return current;
			}
			function updateFragment(returnFiber, current, fragment, lanes, key) {
				if (null === current || 7 !== current.tag) return current = createFiberFromFragment(fragment, returnFiber.mode, lanes, key), current.return = returnFiber, current;
				current = useFiber(current, fragment);
				current.return = returnFiber;
				return current;
			}
			function createChild(returnFiber, newChild, lanes) {
				if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild) return newChild = createFiberFromText("" + newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
				if ("object" === typeof newChild && null !== newChild) {
					switch (newChild.$$typeof) {
						case REACT_ELEMENT_TYPE: return lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
						case REACT_PORTAL_TYPE: return newChild = createFiberFromPortal(newChild, returnFiber.mode, lanes), newChild.return = returnFiber, newChild;
						case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), createChild(returnFiber, newChild, lanes);
					}
					if (isArrayImpl(newChild) || getIteratorFn(newChild)) return newChild = createFiberFromFragment(newChild, returnFiber.mode, lanes, null), newChild.return = returnFiber, newChild;
					if ("function" === typeof newChild.then) return createChild(returnFiber, unwrapThenable(newChild), lanes);
					if (newChild.$$typeof === REACT_CONTEXT_TYPE) return createChild(returnFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
					throwOnInvalidObjectTypeImpl(returnFiber, newChild);
				}
				return null;
			}
			function updateSlot(returnFiber, oldFiber, newChild, lanes) {
				var key = null !== oldFiber ? oldFiber.key : null;
				if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild) return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
				if ("object" === typeof newChild && null !== newChild) {
					switch (newChild.$$typeof) {
						case REACT_ELEMENT_TYPE: return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
						case REACT_PORTAL_TYPE: return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
						case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), updateSlot(returnFiber, oldFiber, newChild, lanes);
					}
					if (isArrayImpl(newChild) || getIteratorFn(newChild)) return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
					if ("function" === typeof newChild.then) return updateSlot(returnFiber, oldFiber, unwrapThenable(newChild), lanes);
					if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateSlot(returnFiber, oldFiber, readContextDuringReconciliation(returnFiber, newChild), lanes);
					throwOnInvalidObjectTypeImpl(returnFiber, newChild);
				}
				return null;
			}
			function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
				if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild) return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
				if ("object" === typeof newChild && null !== newChild) {
					switch (newChild.$$typeof) {
						case REACT_ELEMENT_TYPE: return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
						case REACT_PORTAL_TYPE: return existingChildren = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
						case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes);
					}
					if (isArrayImpl(newChild) || getIteratorFn(newChild)) return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
					if ("function" === typeof newChild.then) return updateFromMap(existingChildren, returnFiber, newIdx, unwrapThenable(newChild), lanes);
					if (newChild.$$typeof === REACT_CONTEXT_TYPE) return updateFromMap(existingChildren, returnFiber, newIdx, readContextDuringReconciliation(returnFiber, newChild), lanes);
					throwOnInvalidObjectTypeImpl(returnFiber, newChild);
				}
				return null;
			}
			function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
				for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
					oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
					var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);
					if (null === newFiber) {
						null === oldFiber && (oldFiber = nextOldFiber);
						break;
					}
					shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
					currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
					null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
					previousNewFiber = newFiber;
					oldFiber = nextOldFiber;
				}
				if (newIdx === newChildren.length) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
				if (null === oldFiber) {
					for (; newIdx < newChildren.length; newIdx++) oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(oldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
					isHydrating && pushTreeFork(returnFiber, newIdx);
					return resultingFirstChild;
				}
				for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++) nextOldFiber = updateFromMap(oldFiber, returnFiber, newIdx, newChildren[newIdx], lanes), null !== nextOldFiber && (shouldTrackSideEffects && (newFiber = nextOldFiber.alternate, null !== newFiber && oldFiber.delete(null === newFiber.key ? newIdx : newFiber.key)), currentFirstChild = placeChild(nextOldFiber, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
				shouldTrackSideEffects && oldFiber.forEach(function(child) {
					return deleteChild(returnFiber, child);
				});
				isHydrating && pushTreeFork(returnFiber, newIdx);
				return resultingFirstChild;
			}
			function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
				if (null == newChildren) throw Error(formatProdErrorMessage(151));
				for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
					oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
					var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
					if (null === newFiber) {
						null === oldFiber && (oldFiber = nextOldFiber);
						break;
					}
					shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
					currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
					null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
					previousNewFiber = newFiber;
					oldFiber = nextOldFiber;
				}
				if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
				if (null === oldFiber) {
					for (; !step.done; newIdx++, step = newChildren.next()) step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
					isHydrating && pushTreeFork(returnFiber, newIdx);
					return resultingFirstChild;
				}
				for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next()) step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && (nextOldFiber = step.alternate, null !== nextOldFiber && oldFiber.delete(null === nextOldFiber.key ? newIdx : nextOldFiber.key)), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
				shouldTrackSideEffects && oldFiber.forEach(function(child) {
					return deleteChild(returnFiber, child);
				});
				isHydrating && pushTreeFork(returnFiber, newIdx);
				return resultingFirstChild;
			}
			function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
				"object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && void 0 === newChild.props.ref && (newChild = newChild.props.children);
				if ("object" === typeof newChild && null !== newChild) {
					switch (newChild.$$typeof) {
						case REACT_ELEMENT_TYPE:
							a: {
								for (var key = newChild.key; null !== currentFirstChild;) {
									if (currentFirstChild.key === key) {
										key = newChild.type;
										if (key === REACT_FRAGMENT_TYPE) {
											if (7 === currentFirstChild.tag) {
												deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
												lanes = useFiber(currentFirstChild, newChild.props.children);
												coerceRef(lanes, newChild);
												lanes.return = returnFiber;
												returnFiber = lanes;
												break a;
											}
										} else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
											deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
											lanes = useFiber(currentFirstChild, newChild.props);
											coerceRef(lanes, newChild);
											lanes.return = returnFiber;
											returnFiber = lanes;
											break a;
										}
										deleteRemainingChildren(returnFiber, currentFirstChild);
										break;
									} else deleteChild(returnFiber, currentFirstChild);
									currentFirstChild = currentFirstChild.sibling;
								}
								newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(newChild.props.children, returnFiber.mode, lanes, newChild.key), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(newChild.type, newChild.key, newChild.props, null, returnFiber.mode, lanes), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
							}
							return placeSingleChild(returnFiber);
						case REACT_PORTAL_TYPE:
							a: {
								for (key = newChild.key; null !== currentFirstChild;) {
									if (currentFirstChild.key === key) if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
										deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
										lanes = useFiber(currentFirstChild, newChild.children || []);
										lanes.return = returnFiber;
										returnFiber = lanes;
										break a;
									} else {
										deleteRemainingChildren(returnFiber, currentFirstChild);
										break;
									}
									else deleteChild(returnFiber, currentFirstChild);
									currentFirstChild = currentFirstChild.sibling;
								}
								lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
								lanes.return = returnFiber;
								returnFiber = lanes;
							}
							return placeSingleChild(returnFiber);
						case REACT_LAZY_TYPE: return newChild = resolveLazy(newChild), reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
					}
					if (isArrayImpl(newChild)) return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
					if (getIteratorFn(newChild)) {
						key = getIteratorFn(newChild);
						if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
						newChild = key.call(newChild);
						return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
					}
					if ("function" === typeof newChild.then) return reconcileChildFibersImpl(returnFiber, currentFirstChild, unwrapThenable(newChild), lanes);
					if (newChild.$$typeof === REACT_CONTEXT_TYPE) return reconcileChildFibersImpl(returnFiber, currentFirstChild, readContextDuringReconciliation(returnFiber, newChild), lanes);
					throwOnInvalidObjectTypeImpl(returnFiber, newChild);
				}
				return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
			}
			return function(returnFiber, currentFirstChild, newChild, lanes) {
				try {
					thenableIndexCounter$1 = 0;
					var firstChildFiber = reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes);
					thenableState$1 = null;
					return firstChildFiber;
				} catch (x) {
					if (x === SuspenseException || x === SuspenseActionException) throw x;
					var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
					fiber.lanes = lanes;
					fiber.return = returnFiber;
					return fiber;
				}
			};
		}
		var reconcileChildFibers = createChildReconciler(!0);
		var mountChildFibers = createChildReconciler(!1);
		var hasForceUpdate = !1;
		function initializeUpdateQueue(fiber) {
			fiber.updateQueue = {
				baseState: fiber.memoizedState,
				firstBaseUpdate: null,
				lastBaseUpdate: null,
				shared: {
					pending: null,
					lanes: 0,
					hiddenCallbacks: null
				},
				callbacks: null
			};
		}
		function cloneUpdateQueue(current, workInProgress) {
			current = current.updateQueue;
			workInProgress.updateQueue === current && (workInProgress.updateQueue = {
				baseState: current.baseState,
				firstBaseUpdate: current.firstBaseUpdate,
				lastBaseUpdate: current.lastBaseUpdate,
				shared: current.shared,
				callbacks: null
			});
		}
		function createUpdate(lane) {
			return {
				lane,
				tag: 0,
				payload: null,
				callback: null,
				next: null
			};
		}
		function enqueueUpdate(fiber, update, lane) {
			var updateQueue = fiber.updateQueue;
			if (null === updateQueue) return null;
			updateQueue = updateQueue.shared;
			if (0 !== (executionContext & 2)) {
				var pending = updateQueue.pending;
				null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
				updateQueue.pending = update;
				update = getRootForUpdatedFiber(fiber);
				markUpdateLaneFromFiberToRoot(fiber, null, lane);
				return update;
			}
			enqueueUpdate$1(fiber, updateQueue, update, lane);
			return getRootForUpdatedFiber(fiber);
		}
		function entangleTransitions(root, fiber, lane) {
			fiber = fiber.updateQueue;
			if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
				var queueLanes = fiber.lanes;
				queueLanes &= root.pendingLanes;
				lane |= queueLanes;
				fiber.lanes = lane;
				markRootEntangled(root, lane);
			}
		}
		function enqueueCapturedUpdate(workInProgress, capturedUpdate) {
			var queue = workInProgress.updateQueue, current = workInProgress.alternate;
			if (null !== current && (current = current.updateQueue, queue === current)) {
				var newFirst = null, newLast = null;
				queue = queue.firstBaseUpdate;
				if (null !== queue) {
					do {
						var clone = {
							lane: queue.lane,
							tag: queue.tag,
							payload: queue.payload,
							callback: null,
							next: null
						};
						null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
						queue = queue.next;
					} while (null !== queue);
					null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
				} else newFirst = newLast = capturedUpdate;
				queue = {
					baseState: current.baseState,
					firstBaseUpdate: newFirst,
					lastBaseUpdate: newLast,
					shared: current.shared,
					callbacks: current.callbacks
				};
				workInProgress.updateQueue = queue;
				return;
			}
			workInProgress = queue.lastBaseUpdate;
			null === workInProgress ? queue.firstBaseUpdate = capturedUpdate : workInProgress.next = capturedUpdate;
			queue.lastBaseUpdate = capturedUpdate;
		}
		var didReadFromEntangledAsyncAction = !1;
		function suspendIfUpdateReadFromEntangledAsyncAction() {
			if (didReadFromEntangledAsyncAction) {
				var entangledActionThenable = currentEntangledActionThenable;
				if (null !== entangledActionThenable) throw entangledActionThenable;
			}
		}
		function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes) {
			didReadFromEntangledAsyncAction = !1;
			var queue = workInProgress$jscomp$0.updateQueue;
			hasForceUpdate = !1;
			var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
			if (null !== pendingQueue) {
				queue.shared.pending = null;
				var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
				lastPendingUpdate.next = null;
				null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
				lastBaseUpdate = lastPendingUpdate;
				var current = workInProgress$jscomp$0.alternate;
				null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
			}
			if (null !== firstBaseUpdate) {
				var newState = queue.baseState;
				lastBaseUpdate = 0;
				current = firstPendingUpdate = lastPendingUpdate = null;
				pendingQueue = firstBaseUpdate;
				do {
					var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
					if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
						0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = !0);
						null !== current && (current = current.next = {
							lane: 0,
							tag: pendingQueue.tag,
							payload: pendingQueue.payload,
							callback: null,
							next: null
						});
						a: {
							var workInProgress = workInProgress$jscomp$0, update = pendingQueue;
							updateLane = props;
							var instance = instance$jscomp$0;
							switch (update.tag) {
								case 1:
									workInProgress = update.payload;
									if ("function" === typeof workInProgress) {
										newState = workInProgress.call(instance, newState, updateLane);
										break a;
									}
									newState = workInProgress;
									break a;
								case 3: workInProgress.flags = workInProgress.flags & -65537 | 128;
								case 0:
									workInProgress = update.payload;
									updateLane = "function" === typeof workInProgress ? workInProgress.call(instance, newState, updateLane) : workInProgress;
									if (null === updateLane || void 0 === updateLane) break a;
									newState = assign({}, newState, updateLane);
									break a;
								case 2: hasForceUpdate = !0;
							}
						}
						updateLane = pendingQueue.callback;
						null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
					} else isHiddenUpdate = {
						lane: updateLane,
						tag: pendingQueue.tag,
						payload: pendingQueue.payload,
						callback: pendingQueue.callback,
						next: null
					}, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
					pendingQueue = pendingQueue.next;
					if (null === pendingQueue) if (pendingQueue = queue.shared.pending, null === pendingQueue) break;
					else isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
				} while (1);
				null === current && (lastPendingUpdate = newState);
				queue.baseState = lastPendingUpdate;
				queue.firstBaseUpdate = firstPendingUpdate;
				queue.lastBaseUpdate = current;
				null === firstBaseUpdate && (queue.shared.lanes = 0);
				workInProgressRootSkippedLanes |= lastBaseUpdate;
				workInProgress$jscomp$0.lanes = lastBaseUpdate;
				workInProgress$jscomp$0.memoizedState = newState;
			}
		}
		function callCallback(callback, context) {
			if ("function" !== typeof callback) throw Error(formatProdErrorMessage(191, callback));
			callback.call(context);
		}
		function commitCallbacks(updateQueue, context) {
			var callbacks = updateQueue.callbacks;
			if (null !== callbacks) for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++) callCallback(callbacks[updateQueue], context);
		}
		var currentTreeHiddenStackCursor = createCursor(null);
		var prevEntangledRenderLanesCursor = createCursor(0);
		function pushHiddenContext(fiber, context) {
			fiber = entangledRenderLanes;
			push(prevEntangledRenderLanesCursor, fiber);
			push(currentTreeHiddenStackCursor, context);
			entangledRenderLanes = fiber | context.baseLanes;
		}
		function reuseHiddenContextOnStack() {
			push(prevEntangledRenderLanesCursor, entangledRenderLanes);
			push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
		}
		function popHiddenContext() {
			entangledRenderLanes = prevEntangledRenderLanesCursor.current;
			pop(currentTreeHiddenStackCursor);
			pop(prevEntangledRenderLanesCursor);
		}
		var suspenseHandlerStackCursor = createCursor(null);
		var shellBoundary = null;
		function pushPrimaryTreeSuspenseHandler(handler) {
			var current = handler.alternate;
			push(suspenseStackCursor, suspenseStackCursor.current & 1);
			push(suspenseHandlerStackCursor, handler);
			null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
		}
		function pushDehydratedActivitySuspenseHandler(fiber) {
			push(suspenseStackCursor, suspenseStackCursor.current);
			push(suspenseHandlerStackCursor, fiber);
			null === shellBoundary && (shellBoundary = fiber);
		}
		function pushOffscreenSuspenseHandler(fiber) {
			22 === fiber.tag ? (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary && (shellBoundary = fiber)) : reuseSuspenseHandlerOnStack();
		}
		function reuseSuspenseHandlerOnStack() {
			push(suspenseStackCursor, suspenseStackCursor.current);
			push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
		}
		function popSuspenseHandler(fiber) {
			pop(suspenseHandlerStackCursor);
			shellBoundary === fiber && (shellBoundary = null);
			pop(suspenseStackCursor);
		}
		var suspenseStackCursor = createCursor(0);
		function pushSuspenseListContext(fiber, newContext) {
			push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
			push(suspenseStackCursor, newContext);
		}
		function popSuspenseListContext(fiber) {
			pop(suspenseStackCursor);
			pop(suspenseHandlerStackCursor);
			shellBoundary === fiber && (shellBoundary = null);
		}
		function findFirstSuspended(row) {
			for (var node = row; null !== node;) {
				if (13 === node.tag) {
					var state = node.memoizedState;
					if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state))) return node;
				} else if (19 === node.tag && "independent" !== node.memoizedProps.revealOrder) {
					if (0 !== (node.flags & 128)) return node;
				} else if (null !== node.child) {
					node.child.return = node;
					node = node.child;
					continue;
				}
				if (node === row) break;
				for (; null === node.sibling;) {
					if (null === node.return || node.return === row) return null;
					node = node.return;
				}
				node.sibling.return = node.return;
				node = node.sibling;
			}
			return null;
		}
		var renderLanes = 0;
		var currentlyRenderingFiber = null;
		var currentHook = null;
		var workInProgressHook = null;
		var didScheduleRenderPhaseUpdate = !1;
		var didScheduleRenderPhaseUpdateDuringThisPass = !1;
		var shouldDoubleInvokeUserFnsInHooksDEV = !1;
		var localIdCounter = 0;
		var thenableIndexCounter = 0;
		var thenableState = null;
		var globalClientIdCounter = 0;
		function throwInvalidHookError() {
			throw Error(formatProdErrorMessage(321));
		}
		function areHookInputsEqual(nextDeps, prevDeps) {
			if (null === prevDeps) return !1;
			for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++) if (!objectIs(nextDeps[i], prevDeps[i])) return !1;
			return !0;
		}
		function renderWithHooks(current, workInProgress, Component, props, secondArg, nextRenderLanes) {
			renderLanes = nextRenderLanes;
			currentlyRenderingFiber = workInProgress;
			workInProgress.memoizedState = null;
			workInProgress.updateQueue = null;
			workInProgress.lanes = 0;
			ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
			shouldDoubleInvokeUserFnsInHooksDEV = !1;
			nextRenderLanes = Component(props, secondArg);
			shouldDoubleInvokeUserFnsInHooksDEV = !1;
			didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(workInProgress, Component, props, secondArg));
			finishRenderingHooks(current);
			return nextRenderLanes;
		}
		function finishRenderingHooks(current) {
			ReactSharedInternals.H = ContextOnlyDispatcher;
			var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
			renderLanes = 0;
			workInProgressHook = currentHook = currentlyRenderingFiber = null;
			didScheduleRenderPhaseUpdate = !1;
			thenableIndexCounter = 0;
			thenableState = null;
			if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
			null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = !0));
		}
		function renderWithHooksAgain(workInProgress, Component, props, secondArg) {
			currentlyRenderingFiber = workInProgress;
			var numberOfReRenders = 0;
			do {
				didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
				thenableIndexCounter = 0;
				didScheduleRenderPhaseUpdateDuringThisPass = !1;
				if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
				numberOfReRenders += 1;
				workInProgressHook = currentHook = null;
				if (null != workInProgress.updateQueue) {
					var children = workInProgress.updateQueue;
					children.lastEffect = null;
					children.events = null;
					children.stores = null;
					null != children.memoCache && (children.memoCache.index = 0);
				}
				ReactSharedInternals.H = HooksDispatcherOnRerender;
				children = Component(props, secondArg);
			} while (didScheduleRenderPhaseUpdateDuringThisPass);
			return children;
		}
		function TransitionAwareHostComponent() {
			var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
			maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
			dispatcher = dispatcher.useState()[0];
			(null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
			return maybeThenable;
		}
		function checkDidRenderIdHook() {
			var didRenderIdHook = 0 !== localIdCounter;
			localIdCounter = 0;
			return didRenderIdHook;
		}
		function bailoutHooks(current, workInProgress, lanes) {
			workInProgress.updateQueue = current.updateQueue;
			workInProgress.flags &= -2053;
			current.lanes &= ~lanes;
		}
		function resetHooksOnUnwind(workInProgress) {
			if (didScheduleRenderPhaseUpdate) {
				for (workInProgress = workInProgress.memoizedState; null !== workInProgress;) {
					var queue = workInProgress.queue;
					null !== queue && (queue.pending = null);
					workInProgress = workInProgress.next;
				}
				didScheduleRenderPhaseUpdate = !1;
			}
			renderLanes = 0;
			workInProgressHook = currentHook = currentlyRenderingFiber = null;
			didScheduleRenderPhaseUpdateDuringThisPass = !1;
			thenableIndexCounter = localIdCounter = 0;
			thenableState = null;
		}
		function mountWorkInProgressHook() {
			var hook = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
			return workInProgressHook;
		}
		function updateWorkInProgressHook() {
			if (null === currentHook) {
				var nextCurrentHook = currentlyRenderingFiber.alternate;
				nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
			} else nextCurrentHook = currentHook.next;
			var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
			if (null !== nextWorkInProgressHook) workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
			else {
				if (null === nextCurrentHook) {
					if (null === currentlyRenderingFiber.alternate) throw Error(formatProdErrorMessage(467));
					throw Error(formatProdErrorMessage(310));
				}
				currentHook = nextCurrentHook;
				nextCurrentHook = {
					memoizedState: currentHook.memoizedState,
					baseState: currentHook.baseState,
					baseQueue: currentHook.baseQueue,
					queue: currentHook.queue,
					next: null
				};
				null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
			}
			return workInProgressHook;
		}
		function createFunctionComponentUpdateQueue() {
			return {
				lastEffect: null,
				events: null,
				stores: null,
				memoCache: null
			};
		}
		function useThenable(thenable) {
			var index = thenableIndexCounter;
			thenableIndexCounter += 1;
			null === thenableState && (thenableState = []);
			thenable = trackUsedThenable(thenableState, thenable, index);
			index = currentlyRenderingFiber;
			null === (null === workInProgressHook ? index.memoizedState : workInProgressHook.next) && (index = index.alternate, ReactSharedInternals.H = null === index || null === index.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
			return thenable;
		}
		function use(usable) {
			if (null !== usable && "object" === typeof usable) {
				if ("function" === typeof usable.then) return useThenable(usable);
				if (usable.$$typeof === REACT_RECOVERABLE_TYPE) return;
				if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
			}
			throw Error(formatProdErrorMessage(438, String(usable)));
		}
		function useMemoCache(size) {
			var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
			null !== updateQueue && (memoCache = updateQueue.memoCache);
			if (null == memoCache) {
				var current = currentlyRenderingFiber.alternate;
				null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
					data: current.data.map(function(array) {
						return array.slice();
					}),
					index: 0
				})));
			}
			memoCache ??= {
				data: [],
				index: 0
			};
			null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
			updateQueue.memoCache = memoCache;
			updateQueue = memoCache.data[memoCache.index];
			if (void 0 === updateQueue) for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++) updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
			memoCache.index++;
			return updateQueue;
		}
		function basicStateReducer(state, action) {
			return "function" === typeof action ? action(state) : action;
		}
		function updateReducer(reducer) {
			return updateReducerImpl(updateWorkInProgressHook(), currentHook, reducer);
		}
		function updateReducerImpl(hook, current, reducer) {
			var queue = hook.queue;
			if (null === queue) throw Error(formatProdErrorMessage(311));
			queue.lastRenderedReducer = reducer;
			var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
			if (null !== pendingQueue) {
				if (null !== baseQueue) {
					var baseFirst = baseQueue.next;
					baseQueue.next = pendingQueue.next;
					pendingQueue.next = baseFirst;
				}
				current.baseQueue = baseQueue = pendingQueue;
				queue.pending = null;
			}
			pendingQueue = hook.baseState;
			if (null === baseQueue) hook.memoizedState = pendingQueue;
			else {
				current = baseQueue.next;
				var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$64 = !1;
				do {
					var updateLane = update.lane & -536870913;
					if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
						var revertLane = update.revertLane;
						if (0 === revertLane) null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
							lane: 0,
							revertLane: 0,
							gesture: null,
							action: update.action,
							hasEagerState: update.hasEagerState,
							eagerState: update.eagerState,
							next: null
						}), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = !0);
						else if ((renderLanes & revertLane) === revertLane) {
							update = update.next;
							revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$64 = !0);
							continue;
						} else updateLane = {
							lane: 0,
							revertLane: update.revertLane,
							gesture: null,
							action: update.action,
							hasEagerState: update.hasEagerState,
							eagerState: update.eagerState,
							next: null
						}, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
						updateLane = update.action;
						shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
						pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
					} else revertLane = {
						lane: updateLane,
						revertLane: update.revertLane,
						gesture: update.gesture,
						action: update.action,
						hasEagerState: update.hasEagerState,
						eagerState: update.eagerState,
						next: null
					}, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
					update = update.next;
				} while (null !== update && update !== current);
				null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
				if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = !0, didReadFromEntangledAsyncAction$64 && (reducer = currentEntangledActionThenable, null !== reducer))) throw reducer;
				hook.memoizedState = pendingQueue;
				hook.baseState = baseFirst;
				hook.baseQueue = newBaseQueueLast;
				queue.lastRenderedState = pendingQueue;
			}
			null === baseQueue && (queue.lanes = 0);
			return [hook.memoizedState, queue.dispatch];
		}
		function rerenderReducer(reducer) {
			var hook = updateWorkInProgressHook(), queue = hook.queue;
			if (null === queue) throw Error(formatProdErrorMessage(311));
			queue.lastRenderedReducer = reducer;
			var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
			if (null !== lastRenderPhaseUpdate) {
				queue.pending = null;
				var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
				do
					newState = reducer(newState, update.action), update = update.next;
				while (update !== lastRenderPhaseUpdate);
				objectIs(newState, hook.memoizedState) || (didReceiveUpdate = !0);
				hook.memoizedState = newState;
				null === hook.baseQueue && (hook.baseState = newState);
				queue.lastRenderedState = newState;
			}
			return [newState, dispatch];
		}
		function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
			var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
			if (isHydrating$jscomp$0) {
				if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
				getServerSnapshot = getServerSnapshot();
			} else getServerSnapshot = getSnapshot();
			var snapshotChanged = !objectIs((currentHook || hook).memoizedState, getServerSnapshot);
			snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = !0);
			hook = hook.queue;
			updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [subscribe]);
			subscribe = hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && 0 !== (workInProgressHook.memoizedState.tag & 1);
			pushSimpleEffect(subscribe ? 9 : 8, { destroy: void 0 }, updateStoreInstance.bind(null, fiber, hook, getServerSnapshot, getSnapshot), null);
			if (subscribe) {
				fiber.flags |= 2048;
				if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
				isHydrating$jscomp$0 || 0 !== (renderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
			}
			return getServerSnapshot;
		}
		function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
			fiber.flags |= 16384;
			fiber = {
				getSnapshot,
				value: renderedSnapshot
			};
			getSnapshot = currentlyRenderingFiber.updateQueue;
			null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
		}
		function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
			inst.value = nextSnapshot;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
		}
		function subscribeToStore(fiber, inst, subscribe) {
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
			});
		}
		function checkIfSnapshotChanged(inst) {
			var latestGetSnapshot = inst.getSnapshot;
			inst = inst.value;
			try {
				var nextValue = latestGetSnapshot();
				return !objectIs(inst, nextValue);
			} catch (error) {
				return !0;
			}
		}
		function forceStoreRerender(fiber) {
			var root = enqueueConcurrentRenderForLane(fiber, 2);
			null !== root && scheduleUpdateOnFiber(root, fiber, 2);
		}
		function mountStateImpl(initialState) {
			var hook = mountWorkInProgressHook();
			if ("function" === typeof initialState) {
				var initialStateInitializer = initialState;
				initialState = initialStateInitializer();
				if (shouldDoubleInvokeUserFnsInHooksDEV) {
					setIsStrictModeForDevtools(!0);
					try {
						initialStateInitializer();
					} finally {
						setIsStrictModeForDevtools(!1);
					}
				}
			}
			hook.memoizedState = hook.baseState = initialState;
			hook.queue = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: basicStateReducer,
				lastRenderedState: initialState
			};
			return hook;
		}
		function updateOptimisticImpl(hook, current, passthrough, reducer) {
			hook.baseState = passthrough;
			return updateReducerImpl(hook, currentHook, "function" === typeof reducer ? reducer : basicStateReducer);
		}
		function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
			if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
			fiber = actionQueue.action;
			if (null !== fiber) {
				var actionNode = {
					payload,
					action: fiber,
					next: null,
					isTransition: !0,
					status: "pending",
					value: null,
					reason: null,
					listeners: [],
					then: function(listener) {
						actionNode.listeners.push(listener);
					}
				};
				null !== ReactSharedInternals.T ? setPendingState(!0) : actionNode.isTransition = !1;
				setState(actionNode);
				setPendingState = actionQueue.pending;
				null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
			}
		}
		function runActionStateAction(actionQueue, node) {
			var action = node.action, payload = node.payload, prevState = actionQueue.state;
			if (node.isTransition) {
				var prevTransition = ReactSharedInternals.T, currentTransition = {};
				currentTransition.types = null !== prevTransition ? prevTransition.types : null;
				ReactSharedInternals.T = currentTransition;
				try {
					var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
					null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
					handleActionReturnValue(actionQueue, node, returnValue);
				} catch (error) {
					onActionError(actionQueue, node, error);
				} finally {
					null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
				}
			} else try {
				prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
			} catch (error$70) {
				onActionError(actionQueue, node, error$70);
			}
		}
		function handleActionReturnValue(actionQueue, node, returnValue) {
			null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(function(nextState) {
				onActionSuccess(actionQueue, node, nextState);
			}, function(error) {
				return onActionError(actionQueue, node, error);
			}) : onActionSuccess(actionQueue, node, returnValue);
		}
		function onActionSuccess(actionQueue, actionNode, nextState) {
			actionNode.status = "fulfilled";
			actionNode.value = nextState;
			notifyActionListeners(actionNode);
			actionQueue.state = nextState;
			actionNode = actionQueue.pending;
			null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
		}
		function onActionError(actionQueue, actionNode, error) {
			var last = actionQueue.pending;
			actionQueue.pending = null;
			if (null !== last) {
				last = last.next;
				do
					actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
				while (actionNode !== last);
			}
			actionQueue.action = null;
		}
		function notifyActionListeners(actionNode) {
			actionNode = actionNode.listeners;
			for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
		}
		function actionStateReducer(oldState, newState) {
			return newState;
		}
		function mountActionState(action, initialStateProp) {
			if (isHydrating) {
				var ssrFormState = workInProgressRoot.formState;
				if (null !== ssrFormState) {
					a: {
						var JSCompiler_inline_result = currentlyRenderingFiber;
						if (isHydrating) {
							if (nextHydratableInstance) {
								b: {
									var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
									for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType;) {
										if (!inRootOrSingleton) {
											JSCompiler_inline_result$jscomp$0 = null;
											break b;
										}
										JSCompiler_inline_result$jscomp$0 = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
										if (null === JSCompiler_inline_result$jscomp$0) {
											JSCompiler_inline_result$jscomp$0 = null;
											break b;
										}
									}
									inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
									JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
								}
								if (JSCompiler_inline_result$jscomp$0) {
									nextHydratableInstance = getNextHydratable(JSCompiler_inline_result$jscomp$0.nextSibling);
									JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
									break a;
								}
							}
							throwOnHydrationMismatch(JSCompiler_inline_result);
						}
						JSCompiler_inline_result = !1;
					}
					JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
				}
			}
			ssrFormState = mountWorkInProgressHook();
			ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
			JSCompiler_inline_result = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: actionStateReducer,
				lastRenderedState: initialStateProp
			};
			ssrFormState.queue = JSCompiler_inline_result;
			ssrFormState = dispatchSetState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result);
			JSCompiler_inline_result.dispatch = ssrFormState;
			JSCompiler_inline_result = mountStateImpl(!1);
			inRootOrSingleton = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, !1, JSCompiler_inline_result.queue);
			JSCompiler_inline_result = mountWorkInProgressHook();
			JSCompiler_inline_result$jscomp$0 = {
				state: initialStateProp,
				dispatch: null,
				action,
				pending: null
			};
			JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
			ssrFormState = dispatchActionState.bind(null, currentlyRenderingFiber, JSCompiler_inline_result$jscomp$0, inRootOrSingleton, ssrFormState);
			JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
			JSCompiler_inline_result.memoizedState = action;
			return [
				initialStateProp,
				ssrFormState,
				!1
			];
		}
		function updateActionState(action) {
			return updateActionStateImpl(updateWorkInProgressHook(), currentHook, action);
		}
		function updateActionStateImpl(stateHook, currentStateHook, action) {
			currentStateHook = updateReducerImpl(stateHook, currentStateHook, actionStateReducer)[0];
			stateHook = updateReducer(basicStateReducer)[0];
			if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then) try {
				var state = useThenable(currentStateHook);
			} catch (x) {
				if (x === SuspenseException) throw SuspenseActionException;
				throw x;
			}
			else state = currentStateHook;
			currentStateHook = updateWorkInProgressHook();
			var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
			action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(9, { destroy: void 0 }, actionStateActionEffect.bind(null, actionQueue, action), null));
			return [
				state,
				dispatch,
				stateHook
			];
		}
		function actionStateActionEffect(actionQueue, action) {
			actionQueue.action = action;
		}
		function rerenderActionState(action) {
			var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
			if (null !== currentStateHook) return updateActionStateImpl(stateHook, currentStateHook, action);
			updateWorkInProgressHook();
			stateHook = stateHook.memoizedState;
			currentStateHook = updateWorkInProgressHook();
			var dispatch = currentStateHook.queue.dispatch;
			currentStateHook.memoizedState = action;
			return [
				stateHook,
				dispatch,
				!1
			];
		}
		function pushSimpleEffect(tag, inst, create, deps) {
			tag = {
				tag,
				create,
				deps,
				inst,
				next: null
			};
			inst = currentlyRenderingFiber.updateQueue;
			null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
			create = inst.lastEffect;
			null === create ? inst.lastEffect = tag.next = tag : (deps = create.next, create.next = tag, tag.next = deps, inst.lastEffect = tag);
			return tag;
		}
		function updateRef() {
			return updateWorkInProgressHook().memoizedState;
		}
		function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
			var hook = mountWorkInProgressHook();
			currentlyRenderingFiber.flags |= fiberFlags;
			hook.memoizedState = pushSimpleEffect(1 | hookFlags, { destroy: void 0 }, create, void 0 === deps ? null : deps);
		}
		function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
			var hook = updateWorkInProgressHook();
			deps = void 0 === deps ? null : deps;
			var inst = hook.memoizedState.inst;
			null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(1 | hookFlags, inst, create, deps));
		}
		function mountEffect(create, deps) {
			mountEffectImpl(8390656, 8, create, deps);
		}
		function updateEffect(create, deps) {
			updateEffectImpl(2048, 8, create, deps);
		}
		function useEffectEventImpl(payload) {
			currentlyRenderingFiber.flags |= 4;
			var componentUpdateQueue = currentlyRenderingFiber.updateQueue;
			if (null === componentUpdateQueue) componentUpdateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = componentUpdateQueue, componentUpdateQueue.events = [payload];
			else {
				var events = componentUpdateQueue.events;
				null === events ? componentUpdateQueue.events = [payload] : events.push(payload);
			}
		}
		function updateEvent(callback) {
			var ref = updateWorkInProgressHook().memoizedState;
			useEffectEventImpl({
				ref,
				nextImpl: callback
			});
			return function() {
				if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
				return ref.impl.apply(void 0, arguments);
			};
		}
		function updateInsertionEffect(create, deps) {
			return updateEffectImpl(4, 2, create, deps);
		}
		function updateLayoutEffect(create, deps) {
			return updateEffectImpl(4, 4, create, deps);
		}
		function imperativeHandleEffect(create, ref) {
			if ("function" === typeof ref) {
				create = create();
				var refCleanup = ref(create);
				return function() {
					"function" === typeof refCleanup ? refCleanup() : ref(null);
				};
			}
			if (null !== ref && void 0 !== ref) return create = create(), ref.current = create, function() {
				ref.current = null;
			};
		}
		function updateImperativeHandle(ref, create, deps) {
			deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
			updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
		}
		function mountDebugValue() {}
		function updateCallback(callback, deps) {
			var hook = updateWorkInProgressHook();
			deps = void 0 === deps ? null : deps;
			var prevState = hook.memoizedState;
			if (null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
			hook.memoizedState = [callback, deps];
			return callback;
		}
		function updateMemo(nextCreate, deps) {
			var hook = updateWorkInProgressHook();
			deps = void 0 === deps ? null : deps;
			var prevState = hook.memoizedState;
			if (null !== deps && areHookInputsEqual(deps, prevState[1])) return prevState[0];
			prevState = nextCreate();
			if (shouldDoubleInvokeUserFnsInHooksDEV) {
				setIsStrictModeForDevtools(!0);
				try {
					nextCreate();
				} finally {
					setIsStrictModeForDevtools(!1);
				}
			}
			hook.memoizedState = [prevState, deps];
			return prevState;
		}
		function mountDeferredValueImpl(hook, value, initialValue) {
			if (void 0 === initialValue || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930)) return hook.memoizedState = value;
			hook.memoizedState = initialValue;
			hook = requestDeferredLane();
			currentlyRenderingFiber.lanes |= hook;
			workInProgressRootSkippedLanes |= hook;
			return initialValue;
		}
		function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
			if (objectIs(value, prevValue)) return value;
			if (null !== currentTreeHiddenStackCursor.current) return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = !0), hook;
			if (0 === (renderLanes & 106) || 0 !== (renderLanes & 1073741824) && 0 === (workInProgressRootRenderLanes & 261930)) return didReceiveUpdate = !0, hook.memoizedState = value;
			hook = requestDeferredLane();
			currentlyRenderingFiber.lanes |= hook;
			workInProgressRootSkippedLanes |= hook;
			return prevValue;
		}
		function startTransition(fiber, queue, pendingState, finishedState, callback) {
			var previousPriority = ReactDOMSharedInternals.p;
			ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
			var prevTransition = ReactSharedInternals.T, currentTransition = {};
			currentTransition.types = null !== prevTransition ? prevTransition.types : null;
			ReactSharedInternals.T = currentTransition;
			dispatchOptimisticSetState(fiber, !1, queue, pendingState);
			try {
				var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
				null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
				if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) dispatchSetStateInternal(fiber, queue, chainThenableValue(returnValue, finishedState), requestUpdateLane(fiber));
				else dispatchSetStateInternal(fiber, queue, finishedState, requestUpdateLane(fiber));
			} catch (error) {
				dispatchSetStateInternal(fiber, queue, {
					then: function() {},
					status: "rejected",
					reason: error
				}, requestUpdateLane());
			} finally {
				ReactDOMSharedInternals.p = previousPriority, null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
			}
		}
		function noop() {}
		function startHostTransition(formFiber, pendingState, action, formData) {
			if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
			var queue = ensureFormComponentIsStateful(formFiber).queue;
			startTransition(formFiber, queue, pendingState, sharedNotPendingObject, null === action ? noop : function() {
				requestFormReset$1(formFiber);
				return action(formData);
			});
		}
		function ensureFormComponentIsStateful(formFiber) {
			var existingStateHook = formFiber.memoizedState;
			if (null !== existingStateHook) return existingStateHook;
			existingStateHook = {
				memoizedState: sharedNotPendingObject,
				baseState: sharedNotPendingObject,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: basicStateReducer,
					lastRenderedState: sharedNotPendingObject
				},
				next: null
			};
			var initialResetState = {};
			existingStateHook.next = {
				memoizedState: initialResetState,
				baseState: initialResetState,
				baseQueue: null,
				queue: {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: basicStateReducer,
					lastRenderedState: initialResetState
				},
				next: null
			};
			formFiber.memoizedState = existingStateHook;
			formFiber = formFiber.alternate;
			null !== formFiber && (formFiber.memoizedState = existingStateHook);
			return existingStateHook;
		}
		function requestFormReset$1(formFiber) {
			var stateHook = ensureFormComponentIsStateful(formFiber);
			null === stateHook.next && (stateHook = formFiber.alternate.memoizedState);
			dispatchSetStateInternal(formFiber, stateHook.next.queue, {}, requestUpdateLane());
		}
		function useHostTransitionStatus() {
			return readContext(HostTransitionContext);
		}
		function updateId() {
			return updateWorkInProgressHook().memoizedState;
		}
		function updateRefresh() {
			return updateWorkInProgressHook().memoizedState;
		}
		function refreshCache(fiber) {
			for (var provider = fiber.return; null !== provider;) {
				switch (provider.tag) {
					case 24:
					case 3:
						var lane = requestUpdateLane();
						fiber = createUpdate(lane);
						var root$73 = enqueueUpdate(provider, fiber, lane);
						null !== root$73 && (scheduleUpdateOnFiber(root$73, provider, lane), entangleTransitions(root$73, provider, lane));
						provider = { cache: createCache() };
						fiber.payload = provider;
						return;
				}
				provider = provider.return;
			}
		}
		function dispatchReducerAction(fiber, queue, action) {
			var lane = requestUpdateLane();
			action = {
				lane,
				revertLane: 0,
				gesture: null,
				action,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
		}
		function dispatchSetState(fiber, queue, action) {
			dispatchSetStateInternal(fiber, queue, action, requestUpdateLane());
		}
		function dispatchSetStateInternal(fiber, queue, action, lane) {
			var update = {
				lane,
				revertLane: 0,
				gesture: null,
				action,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
			else {
				var alternate = fiber.alternate;
				if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate)) try {
					var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
					update.hasEagerState = !0;
					update.eagerState = eagerState;
					if (objectIs(eagerState, currentState)) return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), !1;
				} catch (error) {}
				action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
				if (null !== action) return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), !0;
			}
			return !1;
		}
		function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
			action = {
				lane: 2,
				revertLane: requestTransitionLane(),
				gesture: null,
				action,
				hasEagerState: !1,
				eagerState: null,
				next: null
			};
			if (isRenderPhaseUpdate(fiber)) {
				if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
			} else throwIfDuringRender = enqueueConcurrentHookUpdate(fiber, queue, action, 2), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
		}
		function isRenderPhaseUpdate(fiber) {
			var alternate = fiber.alternate;
			return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
		}
		function enqueueRenderPhaseUpdate(queue, update) {
			didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = !0;
			var pending = queue.pending;
			null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
			queue.pending = update;
		}
		function entangleTransitionUpdate(root, queue, lane) {
			if (0 !== (lane & 4194048)) {
				var queueLanes = queue.lanes;
				queueLanes &= root.pendingLanes;
				lane |= queueLanes;
				queue.lanes = lane;
				markRootEntangled(root, lane);
			}
		}
		var ContextOnlyDispatcher = {
			readContext,
			use,
			useCallback: throwInvalidHookError,
			useContext: throwInvalidHookError,
			useEffect: throwInvalidHookError,
			useImperativeHandle: throwInvalidHookError,
			useLayoutEffect: throwInvalidHookError,
			useInsertionEffect: throwInvalidHookError,
			useMemo: throwInvalidHookError,
			useReducer: throwInvalidHookError,
			useRef: throwInvalidHookError,
			useState: throwInvalidHookError,
			useDebugValue: throwInvalidHookError,
			useDeferredValue: throwInvalidHookError,
			useTransition: throwInvalidHookError,
			useSyncExternalStore: throwInvalidHookError,
			useId: throwInvalidHookError,
			useHostTransitionStatus: throwInvalidHookError,
			useFormState: throwInvalidHookError,
			useActionState: throwInvalidHookError,
			useOptimistic: throwInvalidHookError,
			useMemoCache: throwInvalidHookError,
			useCacheRefresh: throwInvalidHookError,
			useEffectEvent: throwInvalidHookError
		};
		var HooksDispatcherOnMount = {
			readContext,
			use,
			useCallback: function(callback, deps) {
				mountWorkInProgressHook().memoizedState = [callback, void 0 === deps ? null : deps];
				return callback;
			},
			useContext: readContext,
			useEffect: mountEffect,
			useImperativeHandle: function(ref, create, deps) {
				deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
				mountEffectImpl(4194308, 4, imperativeHandleEffect.bind(null, create, ref), deps);
			},
			useLayoutEffect: function(create, deps) {
				return mountEffectImpl(4194308, 4, create, deps);
			},
			useInsertionEffect: function(create, deps) {
				mountEffectImpl(4, 2, create, deps);
			},
			useMemo: function(nextCreate, deps) {
				var hook = mountWorkInProgressHook();
				deps = void 0 === deps ? null : deps;
				var nextValue = nextCreate();
				if (shouldDoubleInvokeUserFnsInHooksDEV) {
					setIsStrictModeForDevtools(!0);
					try {
						nextCreate();
					} finally {
						setIsStrictModeForDevtools(!1);
					}
				}
				hook.memoizedState = [nextValue, deps];
				return nextValue;
			},
			useReducer: function(reducer, initialArg, init) {
				var hook = mountWorkInProgressHook();
				if (void 0 !== init) {
					var initialState = init(initialArg);
					if (shouldDoubleInvokeUserFnsInHooksDEV) {
						setIsStrictModeForDevtools(!0);
						try {
							init(initialArg);
						} finally {
							setIsStrictModeForDevtools(!1);
						}
					}
				} else initialState = initialArg;
				hook.memoizedState = hook.baseState = initialState;
				reducer = {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: reducer,
					lastRenderedState: initialState
				};
				hook.queue = reducer;
				reducer = reducer.dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber, reducer);
				return [hook.memoizedState, reducer];
			},
			useRef: function(initialValue) {
				var hook = mountWorkInProgressHook();
				initialValue = { current: initialValue };
				return hook.memoizedState = initialValue;
			},
			useState: function(initialState) {
				initialState = mountStateImpl(initialState);
				var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
				queue.dispatch = dispatch;
				return [initialState.memoizedState, dispatch];
			},
			useDebugValue: mountDebugValue,
			useDeferredValue: function(value, initialValue) {
				return mountDeferredValueImpl(mountWorkInProgressHook(), value, initialValue);
			},
			useTransition: function() {
				var stateHook = mountStateImpl(!1);
				stateHook = startTransition.bind(null, currentlyRenderingFiber, stateHook.queue, !0, !1);
				mountWorkInProgressHook().memoizedState = stateHook;
				return [!1, stateHook];
			},
			useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
				var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
				if (isHydrating) {
					if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
					getServerSnapshot = getServerSnapshot();
				} else {
					getServerSnapshot = getSnapshot();
					if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
					0 !== (workInProgressRootRenderLanes & 127) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
				}
				hook.memoizedState = getServerSnapshot;
				var inst = {
					value: getServerSnapshot,
					getSnapshot
				};
				hook.queue = inst;
				mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe]);
				fiber.flags |= 2048;
				pushSimpleEffect(9, { destroy: void 0 }, updateStoreInstance.bind(null, fiber, inst, getServerSnapshot, getSnapshot), null);
				return getServerSnapshot;
			},
			useId: function() {
				var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
				if (isHydrating) {
					var JSCompiler_inline_result = treeContextOverflow;
					var idWithLeadingBit = treeContextId;
					JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
					identifierPrefix = "_" + identifierPrefix + "R_" + JSCompiler_inline_result;
					JSCompiler_inline_result = localIdCounter++;
					0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
					identifierPrefix += "_";
				} else JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "_" + identifierPrefix + "r_" + JSCompiler_inline_result.toString(32) + "_";
				return hook.memoizedState = identifierPrefix;
			},
			useHostTransitionStatus,
			useFormState: mountActionState,
			useActionState: mountActionState,
			useOptimistic: function(passthrough) {
				var hook = mountWorkInProgressHook();
				hook.memoizedState = hook.baseState = passthrough;
				var queue = {
					pending: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: null,
					lastRenderedState: null
				};
				hook.queue = queue;
				hook = dispatchOptimisticSetState.bind(null, currentlyRenderingFiber, !0, queue);
				queue.dispatch = hook;
				return [passthrough, hook];
			},
			useMemoCache,
			useCacheRefresh: function() {
				return mountWorkInProgressHook().memoizedState = refreshCache.bind(null, currentlyRenderingFiber);
			},
			useEffectEvent: function(callback) {
				var hook = mountWorkInProgressHook(), ref = { impl: callback };
				hook.memoizedState = ref;
				return function() {
					if (0 !== (executionContext & 2)) throw Error(formatProdErrorMessage(440));
					return ref.impl.apply(void 0, arguments);
				};
			}
		};
		var HooksDispatcherOnUpdate = {
			readContext,
			use,
			useCallback: updateCallback,
			useContext: readContext,
			useEffect: updateEffect,
			useImperativeHandle: updateImperativeHandle,
			useInsertionEffect: updateInsertionEffect,
			useLayoutEffect: updateLayoutEffect,
			useMemo: updateMemo,
			useReducer: updateReducer,
			useRef: updateRef,
			useState: function() {
				return updateReducer(basicStateReducer);
			},
			useDebugValue: mountDebugValue,
			useDeferredValue: function(value, initialValue) {
				return updateDeferredValueImpl(updateWorkInProgressHook(), currentHook.memoizedState, value, initialValue);
			},
			useTransition: function() {
				var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
				return ["boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable), start];
			},
			useSyncExternalStore: updateSyncExternalStore,
			useId: updateId,
			useHostTransitionStatus,
			useFormState: updateActionState,
			useActionState: updateActionState,
			useOptimistic: function(passthrough, reducer) {
				return updateOptimisticImpl(updateWorkInProgressHook(), currentHook, passthrough, reducer);
			},
			useMemoCache,
			useCacheRefresh: updateRefresh,
			useEffectEvent: updateEvent
		};
		var HooksDispatcherOnRerender = {
			readContext,
			use,
			useCallback: updateCallback,
			useContext: readContext,
			useEffect: updateEffect,
			useImperativeHandle: updateImperativeHandle,
			useInsertionEffect: updateInsertionEffect,
			useLayoutEffect: updateLayoutEffect,
			useMemo: updateMemo,
			useReducer: rerenderReducer,
			useRef: updateRef,
			useState: function() {
				return rerenderReducer(basicStateReducer);
			},
			useDebugValue: mountDebugValue,
			useDeferredValue: function(value, initialValue) {
				var hook = updateWorkInProgressHook();
				return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(hook, currentHook.memoizedState, value, initialValue);
			},
			useTransition: function() {
				var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
				return ["boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable), start];
			},
			useSyncExternalStore: updateSyncExternalStore,
			useId: updateId,
			useHostTransitionStatus,
			useFormState: rerenderActionState,
			useActionState: rerenderActionState,
			useOptimistic: function(passthrough, reducer) {
				var hook = updateWorkInProgressHook();
				if (null !== currentHook) return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
				hook.baseState = passthrough;
				return [passthrough, hook.queue.dispatch];
			},
			useMemoCache,
			useCacheRefresh: updateRefresh,
			useEffectEvent: updateEvent
		};
		function applyDerivedStateFromProps(workInProgress, ctor, getDerivedStateFromProps, nextProps) {
			ctor = workInProgress.memoizedState;
			getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
			getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
			workInProgress.memoizedState = getDerivedStateFromProps;
			0 === workInProgress.lanes && (workInProgress.updateQueue.baseState = getDerivedStateFromProps);
		}
		var classComponentUpdater = {
			enqueueSetState: function(inst, payload, callback) {
				inst = inst._reactInternals;
				var lane = requestUpdateLane(), update = createUpdate(lane);
				update.payload = payload;
				void 0 !== callback && null !== callback && (update.callback = callback);
				payload = enqueueUpdate(inst, update, lane);
				null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
			},
			enqueueReplaceState: function(inst, payload, callback) {
				inst = inst._reactInternals;
				var lane = requestUpdateLane(), update = createUpdate(lane);
				update.tag = 1;
				update.payload = payload;
				void 0 !== callback && null !== callback && (update.callback = callback);
				payload = enqueueUpdate(inst, update, lane);
				null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
			},
			enqueueForceUpdate: function(inst, callback) {
				inst = inst._reactInternals;
				var lane = requestUpdateLane(), update = createUpdate(lane);
				update.tag = 2;
				void 0 !== callback && null !== callback && (update.callback = callback);
				callback = enqueueUpdate(inst, update, lane);
				null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
			}
		};
		function checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext) {
			workInProgress = workInProgress.stateNode;
			return "function" === typeof workInProgress.shouldComponentUpdate ? workInProgress.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : !0;
		}
		function callComponentWillReceiveProps(workInProgress, instance, newProps, nextContext) {
			workInProgress = instance.state;
			"function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
			"function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
			instance.state !== workInProgress && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
		}
		function resolveClassComponentProps(Component, baseProps) {
			var newProps = baseProps;
			if ("ref" in baseProps) {
				newProps = {};
				for (var propName in baseProps) "ref" !== propName && (newProps[propName] = baseProps[propName]);
			}
			if (Component = Component.defaultProps) {
				newProps === baseProps && (newProps = assign({}, newProps));
				for (var propName$77 in Component) void 0 === newProps[propName$77] && (newProps[propName$77] = Component[propName$77]);
			}
			return newProps;
		}
		function defaultOnUncaughtError(error) {
			reportGlobalError(error);
		}
		function defaultOnCaughtError(error) {
			console.error(error);
		}
		function defaultOnRecoverableError(error) {
			reportGlobalError(error);
		}
		function logUncaughtError(root, errorInfo) {
			try {
				var onUncaughtError = root.onUncaughtError;
				onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
			} catch (e$78) {
				setTimeout(function() {
					throw e$78;
				});
			}
		}
		function logCaughtError(root, boundary, errorInfo) {
			try {
				var onCaughtError = root.onCaughtError;
				onCaughtError(errorInfo.value, {
					componentStack: errorInfo.stack,
					errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
				});
			} catch (e$79) {
				setTimeout(function() {
					throw e$79;
				});
			}
		}
		function createRootErrorUpdate(root, errorInfo, lane) {
			lane = createUpdate(lane);
			lane.tag = 3;
			lane.payload = { element: null };
			lane.callback = function() {
				logUncaughtError(root, errorInfo);
			};
			return lane;
		}
		function createClassErrorUpdate(lane) {
			lane = createUpdate(lane);
			lane.tag = 3;
			return lane;
		}
		function initializeClassErrorUpdate(update, root, fiber, errorInfo) {
			var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
			if ("function" === typeof getDerivedStateFromError) {
				var error = errorInfo.value;
				update.payload = function() {
					return getDerivedStateFromError(error);
				};
				update.callback = function() {
					logCaughtError(root, fiber, errorInfo);
				};
			}
			var inst = fiber.stateNode;
			null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
				logCaughtError(root, fiber, errorInfo);
				"function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
				var stack = errorInfo.stack;
				this.componentDidCatch(errorInfo.value, { componentStack: null !== stack ? stack : "" });
			});
		}
		function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
			sourceFiber.flags |= 32768;
			if (null !== value && "object" === typeof value && "function" === typeof value.then) {
				returnFiber = sourceFiber.alternate;
				null !== returnFiber && propagateParentContextChanges(returnFiber, sourceFiber, rootRenderLanes, !0);
				sourceFiber = suspenseHandlerStackCursor.current;
				if (null !== sourceFiber) {
					switch (sourceFiber.tag) {
						case 31:
						case 13:
						case 19: return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root, value, rootRenderLanes)), !1;
						case 22: return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
							transitions: null,
							markerInstances: null,
							retryQueue: /* @__PURE__ */ new Set([value])
						}, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root, value, rootRenderLanes)), !1;
					}
					throw Error(formatProdErrorMessage(435, sourceFiber.tag));
				}
				attachPingListener(root, value, rootRenderLanes);
				renderDidSuspendDelayIfPossible();
				return !1;
			}
			if (isHydrating) return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), { cause: value }), queueHydrationError(createCapturedValueAtFiber(returnFiber, sourceFiber))), root = root.current.alternate, root.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(root.stateNode, value, rootRenderLanes), enqueueCapturedUpdate(root, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), !1;
			var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
			wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
			null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
			4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
			if (null === returnFiber) return !0;
			value = createCapturedValueAtFiber(value, sourceFiber);
			sourceFiber = returnFiber;
			do {
				switch (sourceFiber.tag) {
					case 3: return sourceFiber.flags |= 65536, root = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root, root = createRootErrorUpdate(sourceFiber.stateNode, value, root), enqueueCapturedUpdate(sourceFiber, root), !1;
					case 1:
						returnFiber = sourceFiber.type;
						wrapperError = sourceFiber.stateNode;
						if (0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError)))) return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(rootRenderLanes, root, sourceFiber, value), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), !1;
						break;
					case 22: if (null !== sourceFiber.memoizedState) return sourceFiber.flags |= 65536, !1;
				}
				sourceFiber = sourceFiber.return;
			} while (null !== sourceFiber);
			return !1;
		}
		var SelectiveHydrationException = Error(formatProdErrorMessage(461));
		var didReceiveUpdate = !1;
		function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
			workInProgress.child = null === current ? mountChildFibers(workInProgress, null, nextChildren, renderLanes) : reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
		}
		function updateForwardRef(current, workInProgress, Component, nextProps, renderLanes) {
			Component = Component.render;
			var ref = workInProgress.ref;
			if ("ref" in nextProps) {
				var propsWithoutRef = {};
				for (var key in nextProps) "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
			} else propsWithoutRef = nextProps;
			prepareToReadContext(workInProgress);
			nextProps = renderWithHooks(current, workInProgress, Component, propsWithoutRef, ref, renderLanes);
			key = checkDidRenderIdHook();
			if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
			isHydrating && key && pushMaterializedTreeId(workInProgress);
			workInProgress.flags |= 1;
			reconcileChildren(current, workInProgress, nextProps, renderLanes);
			return workInProgress.child;
		}
		function updateMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
			if (null === current) {
				var type = Component.type;
				if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare) return workInProgress.tag = 15, workInProgress.type = type, updateSimpleMemoComponent(current, workInProgress, type, nextProps, renderLanes);
				current = createFiberFromTypeAndProps(Component.type, null, nextProps, workInProgress, workInProgress.mode, renderLanes);
				current.ref = workInProgress.ref;
				current.return = workInProgress;
				return workInProgress.child = current;
			}
			type = current.child;
			if (!checkScheduledUpdateOrContext(current, renderLanes)) {
				var prevProps = type.memoizedProps;
				Component = Component.compare;
				Component = null !== Component ? Component : shallowEqual;
				if (Component(prevProps, nextProps) && current.ref === workInProgress.ref) return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
			}
			workInProgress.flags |= 1;
			current = createWorkInProgress(type, nextProps);
			current.ref = workInProgress.ref;
			current.return = workInProgress;
			return workInProgress.child = current;
		}
		function updateSimpleMemoComponent(current, workInProgress, Component, nextProps, renderLanes) {
			if (null !== current) {
				var prevProps = current.memoizedProps;
				if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress.ref) if (didReceiveUpdate = !1, workInProgress.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes)) 0 !== (current.flags & 131072) && (didReceiveUpdate = !0);
				else return workInProgress.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
			}
			return updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes);
		}
		function updateOffscreenComponent(current, workInProgress, renderLanes, nextProps) {
			var nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
			null === current && null === workInProgress.stateNode && (workInProgress.stateNode = {
				_visibility: 1,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			});
			if ("hidden" === nextProps.mode) {
				if (0 !== (workInProgress.flags & 128)) {
					prevState = null !== prevState ? prevState.baseLanes | renderLanes : renderLanes;
					if (null !== current) {
						nextProps = workInProgress.child = current.child;
						for (nextChildren = 0; null !== nextProps;) nextChildren = nextChildren | nextProps.lanes | nextProps.childLanes, nextProps = nextProps.sibling;
						nextProps = nextChildren & ~prevState;
					} else nextProps = 0, workInProgress.child = null;
					return deferHiddenOffscreenComponent(current, workInProgress, prevState, renderLanes, nextProps);
				}
				if (0 !== (renderLanes & 536870912)) workInProgress.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, null !== current && pushTransition(workInProgress, null !== prevState ? prevState.cachePool : null), null !== prevState ? pushHiddenContext(workInProgress, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress);
				else return nextProps = workInProgress.lanes = 536870912, deferHiddenOffscreenComponent(current, workInProgress, null !== prevState ? prevState.baseLanes | renderLanes : renderLanes, renderLanes, nextProps);
			} else null !== prevState ? (pushTransition(workInProgress, prevState.cachePool), pushHiddenContext(workInProgress, prevState), reuseSuspenseHandlerOnStack(), workInProgress.memoizedState = null) : (null !== current && pushTransition(workInProgress, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
			reconcileChildren(current, workInProgress, nextChildren, renderLanes);
			return workInProgress.child;
		}
		function bailoutOffscreenComponent(current, workInProgress) {
			null !== current && 22 === current.tag || null !== workInProgress.stateNode || (workInProgress.stateNode = {
				_visibility: 1,
				_pendingMarkers: null,
				_retryCache: null,
				_transitions: null
			});
			return workInProgress.sibling;
		}
		function deferHiddenOffscreenComponent(current, workInProgress, nextBaseLanes, renderLanes, remainingChildLanes) {
			var JSCompiler_inline_result = peekCacheFromPool();
			JSCompiler_inline_result = null === JSCompiler_inline_result ? null : {
				parent: CacheContext._currentValue,
				pool: JSCompiler_inline_result
			};
			workInProgress.memoizedState = {
				baseLanes: nextBaseLanes,
				cachePool: JSCompiler_inline_result
			};
			null !== current && pushTransition(workInProgress, null);
			reuseHiddenContextOnStack();
			pushOffscreenSuspenseHandler(workInProgress);
			null !== current && propagateParentContextChanges(current, workInProgress, renderLanes, !0);
			workInProgress.childLanes = remainingChildLanes;
			return null;
		}
		function mountActivityChildren(workInProgress, nextProps) {
			nextProps = mountWorkInProgressOffscreenFiber({
				mode: nextProps.mode,
				children: nextProps.children
			}, workInProgress.mode);
			nextProps.ref = workInProgress.ref;
			workInProgress.child = nextProps;
			nextProps.return = workInProgress;
			return nextProps;
		}
		function retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes) {
			reconcileChildFibers(workInProgress, current.child, null, renderLanes);
			current = mountActivityChildren(workInProgress, workInProgress.pendingProps);
			current.flags |= 2;
			popSuspenseHandler(workInProgress);
			workInProgress.memoizedState = null;
			return current;
		}
		function updateActivityComponent(current, workInProgress, renderLanes) {
			var nextProps = workInProgress.pendingProps, didSuspend = 0 !== (workInProgress.flags & 128);
			workInProgress.flags &= -129;
			if (null === current) {
				if (isHydrating) {
					if ("hidden" === nextProps.mode) return current = mountActivityChildren(workInProgress, nextProps), workInProgress.lanes = 536870912, current.memoizedState = {
						baseLanes: 0,
						cachePool: null
					}, bailoutOffscreenComponent(null, current);
					pushDehydratedActivitySuspenseHandler(workInProgress);
					(current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = null !== current && "&" === current.data ? current : null, null !== current && (workInProgress.memoizedState = {
						dehydrated: current,
						treeContext: null !== treeContextProvider ? {
							id: treeContextId,
							overflow: treeContextOverflow
						} : null,
						retryLane: 536870912,
						hydrationErrors: null
					}, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null)) : current = null;
					if (null === current) throw throwOnHydrationMismatch(workInProgress);
					workInProgress.lanes = 536870912;
					return null;
				}
				return mountActivityChildren(workInProgress, nextProps);
			}
			var prevState = current.memoizedState;
			if (null !== prevState) {
				var dehydrated = prevState.dehydrated;
				pushDehydratedActivitySuspenseHandler(workInProgress);
				if (didSuspend) if (workInProgress.flags & 256) workInProgress.flags &= -257, workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
				else if (null !== workInProgress.memoizedState) workInProgress.child = current.child, workInProgress.flags |= 128, workInProgress = null;
				else throw Error(formatProdErrorMessage(558));
				else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1), didSuspend = 0 !== (renderLanes & current.childLanes), didReceiveUpdate || didSuspend) {
					if (null === currentTreeHiddenStackCursor.current) {
						nextProps = workInProgressRoot;
						if (null !== nextProps && (dehydrated = getBumpedLaneForHydration(nextProps, renderLanes), 0 !== dehydrated && dehydrated !== prevState.retryLane)) throw prevState.retryLane = dehydrated, enqueueConcurrentRenderForLane(current, dehydrated), scheduleUpdateOnFiber(nextProps, current, dehydrated), SelectiveHydrationException;
						renderDidSuspendDelayIfPossible();
					}
					workInProgress = retryActivityComponentWithoutHydrating(current, workInProgress, renderLanes);
				} else current = prevState.treeContext, nextHydratableInstance = getNextHydratable(dehydrated.nextSibling), hydrationParentFiber = workInProgress, isHydrating = !0, hydrationErrors = null, rootOrSingletonContext = !1, null !== current && restoreSuspendedTreeContext(workInProgress, current), workInProgress = mountActivityChildren(workInProgress, nextProps), workInProgress.flags |= 134221824;
				return workInProgress;
			}
			current = createWorkInProgress(current.child, {
				mode: nextProps.mode,
				children: nextProps.children
			});
			current.ref = workInProgress.ref;
			workInProgress.child = current;
			current.return = workInProgress;
			return current;
		}
		function markRef(current, workInProgress) {
			var ref = workInProgress.ref;
			if (null === ref) null !== current && null !== current.ref && (workInProgress.flags |= 4194816);
			else {
				if ("function" !== typeof ref && "object" !== typeof ref) throw Error(formatProdErrorMessage(284));
				if (null === current || current.ref !== ref) workInProgress.flags |= 4194816;
			}
		}
		function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
			prepareToReadContext(workInProgress);
			Component = renderWithHooks(current, workInProgress, Component, nextProps, void 0, renderLanes);
			nextProps = checkDidRenderIdHook();
			if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
			isHydrating && nextProps && pushMaterializedTreeId(workInProgress);
			workInProgress.flags |= 1;
			reconcileChildren(current, workInProgress, Component, renderLanes);
			return workInProgress.child;
		}
		function replayFunctionComponent(current, workInProgress, nextProps, Component, secondArg, renderLanes) {
			prepareToReadContext(workInProgress);
			workInProgress.updateQueue = null;
			nextProps = renderWithHooksAgain(workInProgress, Component, nextProps, secondArg);
			finishRenderingHooks(current);
			Component = checkDidRenderIdHook();
			if (null !== current && !didReceiveUpdate) return bailoutHooks(current, workInProgress, renderLanes), bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
			isHydrating && Component && pushMaterializedTreeId(workInProgress);
			workInProgress.flags |= 1;
			reconcileChildren(current, workInProgress, nextProps, renderLanes);
			return workInProgress.child;
		}
		function updateClassComponent(current, workInProgress, Component, nextProps, renderLanes) {
			prepareToReadContext(workInProgress);
			if (null === workInProgress.stateNode) {
				var context = emptyContextObject, contextType = Component.contextType;
				"object" === typeof contextType && null !== contextType && (context = readContext(contextType));
				context = new Component(nextProps, context);
				workInProgress.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
				context.updater = classComponentUpdater;
				workInProgress.stateNode = context;
				context._reactInternals = workInProgress;
				context = workInProgress.stateNode;
				context.props = nextProps;
				context.state = workInProgress.memoizedState;
				context.refs = {};
				initializeUpdateQueue(workInProgress);
				contextType = Component.contextType;
				context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
				context.state = workInProgress.memoizedState;
				contextType = Component.getDerivedStateFromProps;
				"function" === typeof contextType && (applyDerivedStateFromProps(workInProgress, Component, contextType, nextProps), context.state = workInProgress.memoizedState);
				"function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress, nextProps, context, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress.memoizedState);
				"function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308);
				nextProps = !0;
			} else if (null === current) {
				context = workInProgress.stateNode;
				var unresolvedOldProps = workInProgress.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
				context.props = oldProps;
				var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
				contextType = emptyContextObject;
				"object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
				var getDerivedStateFromProps = Component.getDerivedStateFromProps;
				contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
				unresolvedOldProps = workInProgress.pendingProps !== unresolvedOldProps;
				contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(workInProgress, context, nextProps, contextType);
				hasForceUpdate = !1;
				var oldState = workInProgress.memoizedState;
				context.state = oldState;
				processUpdateQueue(workInProgress, nextProps, context, renderLanes);
				suspendIfUpdateReadFromEntangledAsyncAction();
				oldContext = workInProgress.memoizedState;
				unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, Component, getDerivedStateFromProps, nextProps), oldContext = workInProgress.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, oldProps, nextProps, oldState, oldContext, contextType)) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress.flags |= 4194308), nextProps = !1);
			} else {
				context = workInProgress.stateNode;
				cloneUpdateQueue(current, workInProgress);
				contextType = workInProgress.memoizedProps;
				contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
				context.props = contextType$jscomp$0;
				getDerivedStateFromProps = workInProgress.pendingProps;
				oldState = context.context;
				oldContext = Component.contextType;
				oldProps = emptyContextObject;
				"object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
				unresolvedOldProps = Component.getDerivedStateFromProps;
				(oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(workInProgress, context, nextProps, oldProps);
				hasForceUpdate = !1;
				oldState = workInProgress.memoizedState;
				context.state = oldState;
				processUpdateQueue(workInProgress, nextProps, context, renderLanes);
				suspendIfUpdateReadFromEntangledAsyncAction();
				var newState = workInProgress.memoizedState;
				contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(workInProgress, Component, unresolvedOldProps, nextProps), newState = workInProgress.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(workInProgress, Component, contextType$jscomp$0, nextProps, oldState, newState, oldProps) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(nextProps, newState, oldProps)), "function" === typeof context.componentDidUpdate && (workInProgress.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), workInProgress.memoizedProps = nextProps, workInProgress.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress.flags |= 1024), nextProps = !1);
			}
			context = nextProps;
			markRef(current, workInProgress);
			nextProps = 0 !== (workInProgress.flags & 128);
			context || nextProps ? (context = workInProgress.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress.flags |= 1, null !== current && nextProps ? (workInProgress.child = reconcileChildFibers(workInProgress, current.child, null, renderLanes), workInProgress.child = reconcileChildFibers(workInProgress, null, Component, renderLanes)) : reconcileChildren(current, workInProgress, Component, renderLanes), workInProgress.memoizedState = context.state, current = workInProgress.child) : current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
			return current;
		}
		function mountHostRootWithoutHydrating(current, workInProgress, nextChildren, renderLanes) {
			resetHydrationState();
			workInProgress.flags |= 256;
			reconcileChildren(current, workInProgress, nextChildren, renderLanes);
			return workInProgress.child;
		}
		var SUSPENDED_MARKER = {
			dehydrated: null,
			treeContext: null,
			retryLane: 0,
			hydrationErrors: null
		};
		function mountSuspenseOffscreenState(renderLanes) {
			return {
				baseLanes: renderLanes,
				cachePool: getSuspendedCache()
			};
		}
		function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes) {
			current = null !== current ? current.childLanes & ~renderLanes : 0;
			primaryTreeDidDefer && (current |= workInProgressDeferredLane);
			return current;
		}
		function updateSuspenseComponent(current, workInProgress, renderLanes) {
			var nextProps = workInProgress.pendingProps, showFallback = !1, didSuspend = 0 !== (workInProgress.flags & 128), JSCompiler_temp;
			(JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? !1 : 0 !== (suspenseStackCursor.current & 2));
			JSCompiler_temp && (showFallback = !0, workInProgress.flags &= -129);
			JSCompiler_temp = 0 !== (workInProgress.flags & 32);
			workInProgress.flags &= -33;
			if (null === current) {
				if (isHydrating) {
					showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress) : reuseSuspenseHandlerOnStack();
					(current = nextHydratableInstance) ? (current = canHydrateHydrationBoundary(current, rootOrSingletonContext), current = null !== current && "&" !== current.data ? current : null, null !== current && (workInProgress.memoizedState = {
						dehydrated: current,
						treeContext: null !== treeContextProvider ? {
							id: treeContextId,
							overflow: treeContextOverflow
						} : null,
						retryLane: 536870912,
						hydrationErrors: null
					}, renderLanes = createFiberFromDehydratedFragment(current), renderLanes.return = workInProgress, workInProgress.child = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null)) : current = null;
					if (null === current) throw throwOnHydrationMismatch(workInProgress);
					isSuspenseInstanceFallback(current) ? workInProgress.lanes = 32 : workInProgress.lanes = 536870912;
					return null;
				}
				didSuspend = nextProps.children;
				nextProps = nextProps.fallback;
				if (showFallback) return reuseSuspenseHandlerOnStack(), showFallback = workInProgress.mode, didSuspend = mountWorkInProgressOffscreenFiber({
					mode: "hidden",
					children: didSuspend
				}, showFallback), nextProps = createFiberFromFragment(nextProps, showFallback, renderLanes, null), didSuspend.return = workInProgress, nextProps.return = workInProgress, didSuspend.sibling = nextProps, workInProgress.child = didSuspend, nextProps = workInProgress.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes), nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(null, nextProps);
				pushPrimaryTreeSuspenseHandler(workInProgress);
				return mountSuspensePrimaryChildren(workInProgress, didSuspend);
			}
			var prevState = current.memoizedState;
			if (null !== prevState) {
				var dehydrated$96 = prevState.dehydrated;
				if (null !== dehydrated$96) return updateDehydratedSuspenseComponent(current, workInProgress, didSuspend, JSCompiler_temp, nextProps, dehydrated$96, prevState, renderLanes);
			}
			if (showFallback) return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, didSuspend = workInProgress.mode, prevState = current.child, dehydrated$96 = prevState.sibling, nextProps = createWorkInProgress(prevState, {
				mode: "hidden",
				children: nextProps.children
			}), nextProps.subtreeFlags = prevState.subtreeFlags & 1206910976, null !== dehydrated$96 ? showFallback = createWorkInProgress(dehydrated$96, showFallback) : (showFallback = createFiberFromFragment(showFallback, didSuspend, renderLanes, null), showFallback.flags |= 2), showFallback.return = workInProgress, nextProps.return = workInProgress, nextProps.sibling = showFallback, workInProgress.child = nextProps, bailoutOffscreenComponent(null, nextProps), nextProps = workInProgress.child, showFallback = current.child.memoizedState, null === showFallback ? showFallback = mountSuspenseOffscreenState(renderLanes) : (didSuspend = showFallback.cachePool, null !== didSuspend ? (prevState = CacheContext._currentValue, didSuspend = didSuspend.parent !== prevState ? {
				parent: prevState,
				pool: prevState
			} : didSuspend) : didSuspend = getSuspendedCache(), showFallback = {
				baseLanes: showFallback.baseLanes | renderLanes,
				cachePool: didSuspend
			}), nextProps.memoizedState = showFallback, nextProps.childLanes = getRemainingWorkInPrimaryTree(current, JSCompiler_temp, renderLanes), workInProgress.memoizedState = SUSPENDED_MARKER, bailoutOffscreenComponent(current.child, nextProps);
			pushPrimaryTreeSuspenseHandler(workInProgress);
			renderLanes = current.child;
			current = renderLanes.sibling;
			renderLanes = createWorkInProgress(renderLanes, {
				mode: "visible",
				children: nextProps.children
			});
			renderLanes.return = workInProgress;
			renderLanes.sibling = null;
			null !== current && (JSCompiler_temp = workInProgress.deletions, null === JSCompiler_temp ? (workInProgress.deletions = [current], workInProgress.flags |= 16) : JSCompiler_temp.push(current));
			workInProgress.child = renderLanes;
			workInProgress.memoizedState = null;
			return renderLanes;
		}
		function mountSuspensePrimaryChildren(workInProgress, primaryChildren) {
			primaryChildren = mountWorkInProgressOffscreenFiber({
				mode: "visible",
				children: primaryChildren
			}, workInProgress.mode);
			primaryChildren.return = workInProgress;
			return workInProgress.child = primaryChildren;
		}
		function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
			offscreenProps = createFiberImplClass(22, offscreenProps, null, mode);
			offscreenProps.lanes = 0;
			return offscreenProps;
		}
		function retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes) {
			reconcileChildFibers(workInProgress, current.child, null, renderLanes);
			current = mountSuspensePrimaryChildren(workInProgress, workInProgress.pendingProps.children);
			current.flags |= 2;
			workInProgress.memoizedState = null;
			return current;
		}
		function updateDehydratedSuspenseComponent(current, workInProgress, didSuspend, didPrimaryChildrenDefer, nextProps, suspenseInstance, suspenseState, renderLanes) {
			if (didSuspend) {
				if (workInProgress.flags & 256) return pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags &= -257, retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
				if (null !== workInProgress.memoizedState) return reuseSuspenseHandlerOnStack(), workInProgress.child = current.child, workInProgress.flags |= 128, null;
				reuseSuspenseHandlerOnStack();
				suspenseInstance = nextProps.fallback;
				suspenseState = workInProgress.mode;
				nextProps = mountWorkInProgressOffscreenFiber({
					mode: "visible",
					children: nextProps.children
				}, suspenseState);
				suspenseInstance = createFiberFromFragment(suspenseInstance, suspenseState, renderLanes, null);
				suspenseInstance.flags |= 2;
				nextProps.return = workInProgress;
				suspenseInstance.return = workInProgress;
				nextProps.sibling = suspenseInstance;
				workInProgress.child = nextProps;
				reconcileChildFibers(workInProgress, current.child, null, renderLanes);
				nextProps = workInProgress.child;
				nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes);
				nextProps.childLanes = getRemainingWorkInPrimaryTree(current, didPrimaryChildrenDefer, renderLanes);
				workInProgress.memoizedState = SUSPENDED_MARKER;
				return bailoutOffscreenComponent(null, nextProps);
			}
			pushPrimaryTreeSuspenseHandler(workInProgress);
			if (isSuspenseInstanceFallback(suspenseInstance)) {
				didPrimaryChildrenDefer = suspenseInstance.nextSibling && suspenseInstance.nextSibling.dataset;
				if (didPrimaryChildrenDefer) var digest = didPrimaryChildrenDefer.dgst;
				didPrimaryChildrenDefer = digest;
				"" !== didPrimaryChildrenDefer && (nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = didPrimaryChildrenDefer, queueHydrationError({
					value: nextProps,
					source: null,
					stack: null
				}));
				return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
			}
			didReceiveUpdate || propagateParentContextChanges(current, workInProgress, renderLanes, !1);
			didPrimaryChildrenDefer = 0 !== (renderLanes & current.childLanes);
			if (didReceiveUpdate || didPrimaryChildrenDefer) {
				if (null !== currentTreeHiddenStackCursor.current) return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
				didPrimaryChildrenDefer = workInProgressRoot;
				if (null !== didPrimaryChildrenDefer && (nextProps = getBumpedLaneForHydration(didPrimaryChildrenDefer, renderLanes), 0 !== nextProps && nextProps !== suspenseState.retryLane)) throw suspenseState.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(didPrimaryChildrenDefer, current, nextProps), SelectiveHydrationException;
				isSuspenseInstancePending(suspenseInstance) || renderDidSuspendDelayIfPossible();
				return retrySuspenseComponentWithoutHydrating(current, workInProgress, renderLanes);
			}
			if (isSuspenseInstancePending(suspenseInstance)) return workInProgress.flags |= 192, workInProgress.child = current.child, null;
			current = suspenseState.treeContext;
			nextHydratableInstance = getNextHydratable(suspenseInstance.nextSibling);
			hydrationParentFiber = workInProgress;
			isHydrating = !0;
			hydrationErrors = null;
			rootOrSingletonContext = !1;
			null !== current && restoreSuspendedTreeContext(workInProgress, current);
			workInProgress = mountSuspensePrimaryChildren(workInProgress, nextProps.children);
			workInProgress.flags |= 134221824;
			return workInProgress;
		}
		function scheduleSuspenseWorkOnFiber(fiber, renderLanes, propagationRoot) {
			fiber.lanes |= renderLanes;
			var alternate = fiber.alternate;
			null !== alternate && (alternate.lanes |= renderLanes);
			scheduleContextWorkOnParentPath(fiber.return, renderLanes, propagationRoot);
		}
		function findLastContentRow(firstChild) {
			for (var lastContentRow = null; null !== firstChild;) {
				var currentRow = firstChild.alternate;
				null !== currentRow && null === findFirstSuspended(currentRow) && (lastContentRow = firstChild);
				firstChild = firstChild.sibling;
			}
			return lastContentRow;
		}
		function initSuspenseListRenderState(workInProgress, isBackwards, tail, lastContentRow, tailMode, treeForkCount) {
			var renderState = workInProgress.memoizedState;
			null === renderState ? workInProgress.memoizedState = {
				isBackwards,
				rendering: null,
				renderingStartTime: 0,
				last: lastContentRow,
				tail,
				tailMode,
				treeForkCount
			} : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode, renderState.treeForkCount = treeForkCount);
		}
		function reverseChildren(fiber) {
			var row = fiber.child;
			for (fiber.child = null; null !== row;) {
				var nextRow = row.sibling;
				row.sibling = fiber.child;
				fiber.child = row;
				row = nextRow;
			}
		}
		function updateSuspenseListComponent(current, workInProgress, renderLanes) {
			var nextProps = workInProgress.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
			nextProps = nextProps.children;
			var suspenseContext = suspenseStackCursor.current;
			if (workInProgress.flags & 128) return pushSuspenseListContext(workInProgress, suspenseContext), null;
			var shouldForceFallback = 0 !== (suspenseContext & 2);
			shouldForceFallback ? (suspenseContext = suspenseContext & 1 | 2, workInProgress.flags |= 128) : suspenseContext &= 1;
			pushSuspenseListContext(workInProgress, suspenseContext);
			"backwards" === revealOrder && null !== current ? (reverseChildren(current), reconcileChildren(current, workInProgress, nextProps, renderLanes), reverseChildren(current)) : reconcileChildren(current, workInProgress, nextProps, renderLanes);
			nextProps = isHydrating ? treeForkCount : 0;
			if (!shouldForceFallback && null !== current && 0 !== (current.flags & 128)) a: for (current = workInProgress.child; null !== current;) {
				if (13 === current.tag) null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);
				else if (19 === current.tag) scheduleSuspenseWorkOnFiber(current, renderLanes, workInProgress);
				else if (null !== current.child) {
					current.child.return = current;
					current = current.child;
					continue;
				}
				if (current === workInProgress) break a;
				for (; null === current.sibling;) {
					if (null === current.return || current.return === workInProgress) break a;
					current = current.return;
				}
				current.sibling.return = current.return;
				current = current.sibling;
			}
			switch (revealOrder) {
				case "backwards":
					renderLanes = findLastContentRow(workInProgress.child);
					null === renderLanes ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderLanes.sibling, renderLanes.sibling = null, reverseChildren(workInProgress));
					initSuspenseListRenderState(workInProgress, !0, revealOrder, null, tailMode, nextProps);
					break;
				case "unstable_legacy-backwards":
					renderLanes = null;
					revealOrder = workInProgress.child;
					for (workInProgress.child = null; null !== revealOrder;) {
						current = revealOrder.alternate;
						if (null !== current && null === findFirstSuspended(current)) {
							workInProgress.child = revealOrder;
							break;
						}
						current = revealOrder.sibling;
						revealOrder.sibling = renderLanes;
						renderLanes = revealOrder;
						revealOrder = current;
					}
					initSuspenseListRenderState(workInProgress, !0, renderLanes, null, tailMode, nextProps);
					break;
				case "together":
					initSuspenseListRenderState(workInProgress, !1, null, null, void 0, nextProps);
					break;
				case "independent":
					workInProgress.memoizedState = null;
					break;
				default: renderLanes = findLastContentRow(workInProgress.child), null === renderLanes ? (revealOrder = workInProgress.child, workInProgress.child = null) : (revealOrder = renderLanes.sibling, renderLanes.sibling = null), initSuspenseListRenderState(workInProgress, !1, revealOrder, renderLanes, tailMode, nextProps);
			}
			return workInProgress.child;
		}
		function updateContextProvider(current, workInProgress, renderLanes) {
			var newProps = workInProgress.pendingProps;
			pushProvider(workInProgress, workInProgress.type, newProps.value);
			reconcileChildren(current, workInProgress, newProps.children, renderLanes);
			return workInProgress.child;
		}
		function bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes) {
			null !== current && (workInProgress.dependencies = current.dependencies);
			workInProgressRootSkippedLanes |= workInProgress.lanes;
			if (0 === (renderLanes & workInProgress.childLanes)) if (null !== current) {
				if (propagateParentContextChanges(current, workInProgress, renderLanes, !1), 0 === (renderLanes & workInProgress.childLanes)) return null;
			} else return null;
			if (null !== current && workInProgress.child !== current.child) throw Error(formatProdErrorMessage(153));
			if (null !== workInProgress.child) {
				current = workInProgress.child;
				renderLanes = createWorkInProgress(current, current.pendingProps);
				workInProgress.child = renderLanes;
				for (renderLanes.return = workInProgress; null !== current.sibling;) current = current.sibling, renderLanes = renderLanes.sibling = createWorkInProgress(current, current.pendingProps), renderLanes.return = workInProgress;
				renderLanes.sibling = null;
			}
			return workInProgress.child;
		}
		function checkScheduledUpdateOrContext(current, renderLanes) {
			if (0 !== (current.lanes & renderLanes)) return !0;
			current = current.dependencies;
			return null !== current && checkIfContextChanged(current) ? !0 : !1;
		}
		function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes) {
			switch (workInProgress.tag) {
				case 3:
					pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
					pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
					resetHydrationState();
					break;
				case 27:
				case 5:
					pushHostContext(workInProgress);
					break;
				case 4:
					pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
					break;
				case 10:
					pushProvider(workInProgress, workInProgress.type, workInProgress.memoizedProps.value);
					break;
				case 31:
					if (null !== workInProgress.memoizedState) return workInProgress.flags |= 128, pushDehydratedActivitySuspenseHandler(workInProgress), null;
					break;
				case 13:
					var state$108 = workInProgress.memoizedState;
					if (null !== state$108) {
						if (null !== state$108.dehydrated) return pushPrimaryTreeSuspenseHandler(workInProgress), workInProgress.flags |= 128, null;
						state$108 = propagateParentContextChanges(current, workInProgress, renderLanes, !1);
						var primaryChildLanes = workInProgress.child.childLanes;
						if (state$108 || 0 !== (renderLanes & primaryChildLanes)) return updateSuspenseComponent(current, workInProgress, renderLanes);
						pushPrimaryTreeSuspenseHandler(workInProgress);
						current = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
						return null !== current ? current.sibling : null;
					}
					pushPrimaryTreeSuspenseHandler(workInProgress);
					break;
				case 19:
					if (workInProgress.flags & 128) return updateSuspenseListComponent(current, workInProgress, renderLanes);
					primaryChildLanes = 0 !== (current.flags & 128);
					state$108 = 0 !== (renderLanes & workInProgress.childLanes);
					state$108 || (propagateParentContextChanges(current, workInProgress, renderLanes, !1), state$108 = 0 !== (renderLanes & workInProgress.childLanes));
					if (primaryChildLanes) {
						if (state$108) return updateSuspenseListComponent(current, workInProgress, renderLanes);
						workInProgress.flags |= 128;
					}
					primaryChildLanes = workInProgress.memoizedState;
					null !== primaryChildLanes && (primaryChildLanes.rendering = null, primaryChildLanes.tail = null, primaryChildLanes.lastEffect = null);
					pushSuspenseListContext(workInProgress, suspenseStackCursor.current);
					if (state$108) break;
					else return null;
				case 22: return workInProgress.lanes = 0, updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
				case 24: pushProvider(workInProgress, CacheContext, current.memoizedState.cache);
			}
			return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
		}
		function beginWork(current, workInProgress, renderLanes) {
			if (null !== current) if (current.memoizedProps !== workInProgress.pendingProps) didReceiveUpdate = !0;
			else {
				if (!checkScheduledUpdateOrContext(current, renderLanes) && 0 === (workInProgress.flags & 128)) return didReceiveUpdate = !1, attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
				didReceiveUpdate = 0 !== (current.flags & 131072) ? !0 : !1;
			}
			else didReceiveUpdate = !1, isHydrating && 0 !== (workInProgress.flags & 1048576) && pushTreeId(workInProgress, treeForkCount, workInProgress.index);
			workInProgress.lanes = 0;
			switch (workInProgress.tag) {
				case 16:
					a: {
						var props = workInProgress.pendingProps;
						current = resolveLazy(workInProgress.elementType);
						workInProgress.type = current;
						if ("function" === typeof current) shouldConstruct(current) ? (props = resolveClassComponentProps(current, props), workInProgress.tag = 1, workInProgress = updateClassComponent(null, workInProgress, current, props, renderLanes)) : (workInProgress.tag = 0, workInProgress = updateFunctionComponent(null, workInProgress, current, props, renderLanes));
						else {
							if (void 0 !== current && null !== current) {
								var $$typeof = current.$$typeof;
								if ($$typeof === REACT_FORWARD_REF_TYPE) {
									workInProgress.tag = 11;
									workInProgress = updateForwardRef(null, workInProgress, current, props, renderLanes);
									break a;
								} else if ($$typeof === REACT_MEMO_TYPE) {
									workInProgress.tag = 14;
									workInProgress = updateMemoComponent(null, workInProgress, current, props, renderLanes);
									break a;
								} else if ($$typeof === REACT_CONTEXT_TYPE) {
									workInProgress.tag = 10;
									workInProgress.type = current;
									workInProgress = updateContextProvider(null, workInProgress, renderLanes);
									break a;
								}
							}
							workInProgress = getComponentNameFromType(current) || current;
							throw Error(formatProdErrorMessage(306, workInProgress, ""));
						}
					}
					return workInProgress;
				case 0: return updateFunctionComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
				case 1: return props = workInProgress.type, $$typeof = resolveClassComponentProps(props, workInProgress.pendingProps), updateClassComponent(current, workInProgress, props, $$typeof, renderLanes);
				case 3:
					a: {
						pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
						if (null === current) throw Error(formatProdErrorMessage(387));
						props = workInProgress.pendingProps;
						var prevState = workInProgress.memoizedState;
						$$typeof = prevState.element;
						cloneUpdateQueue(current, workInProgress);
						processUpdateQueue(workInProgress, props, null, renderLanes);
						var nextState = workInProgress.memoizedState;
						props = nextState.cache;
						pushProvider(workInProgress, CacheContext, props);
						props !== prevState.cache && propagateContextChanges(workInProgress, [CacheContext], renderLanes, !0);
						suspendIfUpdateReadFromEntangledAsyncAction();
						props = nextState.element;
						if (prevState.isDehydrated) if (prevState = {
							element: props,
							isDehydrated: !1,
							cache: nextState.cache
						}, workInProgress.updateQueue.baseState = prevState, workInProgress.memoizedState = prevState, workInProgress.flags & 256) {
							workInProgress = mountHostRootWithoutHydrating(current, workInProgress, props, renderLanes);
							break a;
						} else if (props !== $$typeof) {
							$$typeof = createCapturedValueAtFiber(Error(formatProdErrorMessage(424)), workInProgress);
							queueHydrationError($$typeof);
							workInProgress = mountHostRootWithoutHydrating(current, workInProgress, props, renderLanes);
							break a;
						} else {
							current = workInProgress.stateNode.containerInfo;
							switch (current.nodeType) {
								case 9:
									current = current.body;
									break;
								default: current = "HTML" === current.nodeName ? current.ownerDocument.body : current;
							}
							nextHydratableInstance = getNextHydratable(current.firstChild);
							hydrationParentFiber = workInProgress;
							isHydrating = !0;
							hydrationErrors = null;
							rootOrSingletonContext = !0;
							renderLanes = mountChildFibers(workInProgress, null, props, renderLanes);
							for (workInProgress.child = renderLanes; renderLanes;) renderLanes.flags = renderLanes.flags & -3 | 134221824, renderLanes = renderLanes.sibling;
						}
						else {
							resetHydrationState();
							if (props === $$typeof) {
								workInProgress = bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
								break a;
							}
							reconcileChildren(current, workInProgress, props, renderLanes);
						}
						workInProgress = workInProgress.child;
					}
					return workInProgress;
				case 26: return markRef(current, workInProgress), null === current ? (renderLanes = getResource(workInProgress.type, null, workInProgress.pendingProps, null)) ? workInProgress.memoizedState = renderLanes : isHydrating || (workInProgress.stateNode = createHoistableInstance(workInProgress.type, workInProgress.pendingProps, rootInstanceStackCursor.current, workInProgress)) : workInProgress.memoizedState = getResource(workInProgress.type, current.memoizedProps, workInProgress.pendingProps, current.memoizedState), null;
				case 27: return pushHostContext(workInProgress), null === current && isHydrating && (props = workInProgress.stateNode = resolveSingletonInstance(workInProgress.type, workInProgress.pendingProps, rootInstanceStackCursor.current), hydrationParentFiber = workInProgress, rootOrSingletonContext = !0, $$typeof = nextHydratableInstance, isSingletonScope(workInProgress.type) ? (previousHydratableOnEnteringScopedSingleton = $$typeof, nextHydratableInstance = getNextHydratable(props.firstChild)) : nextHydratableInstance = $$typeof), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), markRef(current, workInProgress), null === current && (workInProgress.flags |= 4194304), workInProgress.child;
				case 5:
					if (null === current && isHydrating) {
						if ($$typeof = props = nextHydratableInstance) props = canHydrateInstance(props, workInProgress.type, workInProgress.pendingProps, rootOrSingletonContext), null !== props ? (workInProgress.stateNode = props, hydrationParentFiber = workInProgress, nextHydratableInstance = getNextHydratable(props.firstChild), rootOrSingletonContext = !1, $$typeof = !0) : $$typeof = !1;
						$$typeof || throwOnHydrationMismatch(workInProgress);
					}
					pushHostContext(workInProgress);
					$$typeof = workInProgress.type;
					prevState = workInProgress.pendingProps;
					nextState = null !== current ? current.memoizedProps : null;
					props = prevState.children;
					shouldSetTextContent($$typeof, prevState) ? props = null : null !== nextState && shouldSetTextContent($$typeof, nextState) && (workInProgress.flags |= 32);
					null !== workInProgress.memoizedState && ($$typeof = renderWithHooks(current, workInProgress, TransitionAwareHostComponent, null, null, renderLanes), HostTransitionContext._currentValue = $$typeof);
					markRef(current, workInProgress);
					reconcileChildren(current, workInProgress, props, renderLanes);
					return workInProgress.child;
				case 6:
					if (null === current && isHydrating) {
						if (current = renderLanes = nextHydratableInstance) renderLanes = canHydrateTextInstance(renderLanes, workInProgress.pendingProps, rootOrSingletonContext), null !== renderLanes ? (workInProgress.stateNode = renderLanes, hydrationParentFiber = workInProgress, nextHydratableInstance = null, current = !0) : current = !1;
						current || throwOnHydrationMismatch(workInProgress);
					}
					return null;
				case 13: return updateSuspenseComponent(current, workInProgress, renderLanes);
				case 4: return pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo), props = workInProgress.pendingProps, null === current ? workInProgress.child = reconcileChildFibers(workInProgress, null, props, renderLanes) : reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
				case 11: return updateForwardRef(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
				case 7: return props = workInProgress.pendingProps, markRef(current, workInProgress), reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
				case 8: return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
				case 12: return reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
				case 10: return updateContextProvider(current, workInProgress, renderLanes);
				case 9: return $$typeof = workInProgress.type._context, props = workInProgress.pendingProps.children, prepareToReadContext(workInProgress), $$typeof = readContext($$typeof), props = props($$typeof), workInProgress.flags |= 1, reconcileChildren(current, workInProgress, props, renderLanes), workInProgress.child;
				case 14: return updateMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
				case 15: return updateSimpleMemoComponent(current, workInProgress, workInProgress.type, workInProgress.pendingProps, renderLanes);
				case 19: return updateSuspenseListComponent(current, workInProgress, renderLanes);
				case 31: return updateActivityComponent(current, workInProgress, renderLanes);
				case 22: return updateOffscreenComponent(current, workInProgress, renderLanes, workInProgress.pendingProps);
				case 24: return prepareToReadContext(workInProgress), props = readContext(CacheContext), null === current ? ($$typeof = peekCacheFromPool(), null === $$typeof && ($$typeof = workInProgressRoot, prevState = createCache(), $$typeof.pooledCache = prevState, prevState.refCount++, null !== prevState && ($$typeof.pooledCacheLanes |= renderLanes), $$typeof = prevState), workInProgress.memoizedState = {
					parent: props,
					cache: $$typeof
				}, initializeUpdateQueue(workInProgress), pushProvider(workInProgress, CacheContext, $$typeof)) : (0 !== (current.lanes & renderLanes) && (cloneUpdateQueue(current, workInProgress), processUpdateQueue(workInProgress, null, null, renderLanes), suspendIfUpdateReadFromEntangledAsyncAction()), $$typeof = current.memoizedState, prevState = workInProgress.memoizedState, $$typeof.parent !== props ? ($$typeof = {
					parent: props,
					cache: props
				}, workInProgress.memoizedState = $$typeof, 0 === workInProgress.lanes && (workInProgress.memoizedState = workInProgress.updateQueue.baseState = $$typeof), pushProvider(workInProgress, CacheContext, props)) : (props = prevState.cache, pushProvider(workInProgress, CacheContext, props), props !== $$typeof.cache && propagateContextChanges(workInProgress, [CacheContext], renderLanes, !0))), reconcileChildren(current, workInProgress, workInProgress.pendingProps.children, renderLanes), workInProgress.child;
				case 30: return null === workInProgress.stateNode && (workInProgress.stateNode = {
					autoName: null,
					paired: null,
					clones: null,
					ref: null
				}), props = workInProgress.pendingProps, null != props.name && "auto" !== props.name ? workInProgress.flags |= null === current ? 18882560 : 18874368 : isHydrating && pushMaterializedTreeId(workInProgress), null !== current && current.memoizedProps.name !== props.name ? workInProgress.flags |= 4194816 : markRef(current, workInProgress), reconcileChildren(current, workInProgress, props.children, renderLanes), workInProgress.child;
				case 29: throw workInProgress.pendingProps;
			}
			throw Error(formatProdErrorMessage(156, workInProgress.tag));
		}
		function markUpdate(workInProgress) {
			workInProgress.flags |= 4;
		}
		function preloadInstanceAndSuspendIfNeeded(workInProgress, type, oldProps, newProps, renderLanes) {
			var JSCompiler_temp;
			if (JSCompiler_temp = 0 !== (workInProgress.mode & 32)) JSCompiler_temp = null === oldProps ? maySuspendCommit(type, newProps) : maySuspendCommit(type, newProps) && (newProps.src !== oldProps.src || newProps.srcSet !== oldProps.srcSet);
			if (JSCompiler_temp) {
				if (workInProgress.flags |= 16777216, (renderLanes & 335544128) === renderLanes) if (workInProgress.stateNode.complete) workInProgress.flags |= 8192;
				else if (shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;
				else throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
			} else workInProgress.flags &= -16777217;
		}
		function preloadResourceAndSuspendIfNeeded(workInProgress, resource) {
			if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4)) workInProgress.flags &= -16777217;
			else if (workInProgress.flags |= 16777216, !preloadResource(resource)) if (shouldRemainOnPreviousScreen()) workInProgress.flags |= 8192;
			else throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
		}
		function scheduleRetryEffect(workInProgress, retryQueue) {
			null !== retryQueue && (workInProgress.flags |= 4);
			workInProgress.flags & 16384 && (retryQueue = 22 !== workInProgress.tag ? claimNextRetryLane() : 536870912, workInProgress.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
		}
		function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
			if (!isHydrating) switch (renderState.tailMode) {
				case "visible": break;
				case "collapsed":
					for (var tailNode = renderState.tail, lastTailNode = null; null !== tailNode;) null !== tailNode.alternate && (lastTailNode = tailNode), tailNode = tailNode.sibling;
					null === lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode.sibling = null;
					break;
				default:
					hasRenderedATailFallback = renderState.tail;
					for (tailNode = null; null !== hasRenderedATailFallback;) null !== hasRenderedATailFallback.alternate && (tailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
					null === tailNode ? renderState.tail = null : tailNode.sibling = null;
			}
		}
		function bubbleProperties(completedWork) {
			var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
			if (didBailout) for (var child$113 = completedWork.child; null !== child$113;) newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags & 1206910976, subtreeFlags |= child$113.flags & 1206910976, child$113.return = completedWork, child$113 = child$113.sibling;
			else for (child$113 = completedWork.child; null !== child$113;) newChildLanes |= child$113.lanes | child$113.childLanes, subtreeFlags |= child$113.subtreeFlags, subtreeFlags |= child$113.flags, child$113.return = completedWork, child$113 = child$113.sibling;
			completedWork.subtreeFlags |= subtreeFlags;
			completedWork.childLanes = newChildLanes;
			return didBailout;
		}
		function completeWork(current, workInProgress, renderLanes) {
			var newProps = workInProgress.pendingProps;
			popTreeContext(workInProgress);
			switch (workInProgress.tag) {
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14: return bubbleProperties(workInProgress), null;
				case 1: return bubbleProperties(workInProgress), null;
				case 3:
					renderLanes = workInProgress.stateNode;
					newProps = null;
					null !== current && (newProps = current.memoizedState.cache);
					workInProgress.memoizedState.cache !== newProps && (workInProgress.flags |= 2048);
					popProvider(CacheContext);
					popHostContainer();
					renderLanes.pendingContext && (renderLanes.context = renderLanes.pendingContext, renderLanes.pendingContext = null);
					if (null === current || null === current.child) popHydrationState(workInProgress) ? markUpdate(workInProgress) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress.flags & 256) || (workInProgress.flags |= 1024, upgradeHydrationErrorsToRecoverable());
					bubbleProperties(workInProgress);
					return null;
				case 26:
					var type = workInProgress.type, nextResource = workInProgress.memoizedState;
					null === current ? (markUpdate(workInProgress), null !== nextResource ? (bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, type, null, newProps, renderLanes))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress), bubbleProperties(workInProgress), preloadResourceAndSuspendIfNeeded(workInProgress, nextResource)) : (bubbleProperties(workInProgress), workInProgress.flags &= -16777217) : (current = current.memoizedProps, current !== newProps && markUpdate(workInProgress), bubbleProperties(workInProgress), preloadInstanceAndSuspendIfNeeded(workInProgress, type, current, newProps, renderLanes));
					return null;
				case 27:
					popHostContext(workInProgress);
					renderLanes = rootInstanceStackCursor.current;
					type = workInProgress.type;
					if (null !== current && null != workInProgress.stateNode) current.memoizedProps !== newProps && markUpdate(workInProgress);
					else {
						if (!newProps) {
							if (null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
							bubbleProperties(workInProgress);
							workInProgress.subtreeFlags &= -33554433;
							return null;
						}
						current = contextStackCursor.current;
						popHydrationState(workInProgress) ? prepareToHydrateHostInstance(workInProgress, current) : (current = resolveSingletonInstance(type, newProps, renderLanes), workInProgress.stateNode = current, markUpdate(workInProgress));
					}
					bubbleProperties(workInProgress);
					workInProgress.subtreeFlags &= -33554433;
					return null;
				case 5:
					popHostContext(workInProgress);
					type = workInProgress.type;
					if (null !== current && null != workInProgress.stateNode) current.memoizedProps !== newProps && markUpdate(workInProgress);
					else {
						if (!newProps) {
							if (null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
							bubbleProperties(workInProgress);
							workInProgress.subtreeFlags &= -33554433;
							return null;
						}
						nextResource = contextStackCursor.current;
						if (popHydrationState(workInProgress)) prepareToHydrateHostInstance(workInProgress, nextResource);
						else {
							var ownerDocument = getOwnerDocumentFromRootContainer(rootInstanceStackCursor.current);
							switch (nextResource) {
								case 1:
									nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
									break;
								case 2:
									nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
									break;
								default: switch (type) {
									case "svg":
										nextResource = ownerDocument.createElementNS("http://www.w3.org/2000/svg", type);
										break;
									case "math":
										nextResource = ownerDocument.createElementNS("http://www.w3.org/1998/Math/MathML", type);
										break;
									case "script":
										nextResource = ownerDocument.createElement("div");
										nextResource.innerHTML = "<script><\/script>";
										nextResource = nextResource.removeChild(nextResource.firstChild);
										break;
									case "select":
										nextResource = "string" === typeof newProps.is ? ownerDocument.createElement("select", { is: newProps.is }) : ownerDocument.createElement("select");
										newProps.multiple ? nextResource.multiple = !0 : newProps.size && (nextResource.size = newProps.size);
										break;
									default: nextResource = "string" === typeof newProps.is ? ownerDocument.createElement(type, { is: newProps.is }) : ownerDocument.createElement(type);
								}
							}
							nextResource[internalInstanceKey] = workInProgress;
							nextResource[internalPropsKey] = newProps;
							a: for (ownerDocument = workInProgress.child; null !== ownerDocument;) {
								if (5 === ownerDocument.tag || 6 === ownerDocument.tag) nextResource.appendChild(ownerDocument.stateNode);
								else if (4 !== ownerDocument.tag && 27 !== ownerDocument.tag && null !== ownerDocument.child) {
									ownerDocument.child.return = ownerDocument;
									ownerDocument = ownerDocument.child;
									continue;
								}
								if (ownerDocument === workInProgress) break a;
								for (; null === ownerDocument.sibling;) {
									if (null === ownerDocument.return || ownerDocument.return === workInProgress) break a;
									ownerDocument = ownerDocument.return;
								}
								ownerDocument.sibling.return = ownerDocument.return;
								ownerDocument = ownerDocument.sibling;
							}
							workInProgress.stateNode = nextResource;
							a: switch (setInitialProperties(nextResource, type, newProps), type) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									newProps = !!newProps.autoFocus;
									break a;
								case "img":
									newProps = !0;
									break a;
								default: newProps = !1;
							}
							newProps && markUpdate(workInProgress);
						}
					}
					bubbleProperties(workInProgress);
					workInProgress.subtreeFlags &= -33554433;
					preloadInstanceAndSuspendIfNeeded(workInProgress, workInProgress.type, null === current ? null : current.memoizedProps, workInProgress.pendingProps, renderLanes);
					return null;
				case 6:
					if (current && null != workInProgress.stateNode) current.memoizedProps !== newProps && markUpdate(workInProgress);
					else {
						if ("string" !== typeof newProps && null === workInProgress.stateNode) throw Error(formatProdErrorMessage(166));
						current = rootInstanceStackCursor.current;
						if (popHydrationState(workInProgress)) {
							current = workInProgress.stateNode;
							renderLanes = workInProgress.memoizedProps;
							newProps = null;
							type = hydrationParentFiber;
							if (null !== type) switch (type.tag) {
								case 27:
								case 5: newProps = type.memoizedProps;
							}
							current[internalInstanceKey] = workInProgress;
							current = current.nodeValue === renderLanes || null !== newProps && !0 === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes) ? !0 : !1;
							current || throwOnHydrationMismatch(workInProgress, !0);
						} else current = getOwnerDocumentFromRootContainer(current).createTextNode(newProps), current[internalInstanceKey] = workInProgress, workInProgress.stateNode = current;
					}
					bubbleProperties(workInProgress);
					return null;
				case 31:
					renderLanes = workInProgress.memoizedState;
					if (null === current || null !== current.memoizedState) {
						newProps = popHydrationState(workInProgress);
						if (null !== renderLanes) {
							if (null === current) {
								if (!newProps) throw Error(formatProdErrorMessage(318));
								current = workInProgress.memoizedState;
								current = null !== current ? current.dehydrated : null;
								if (!current) throw Error(formatProdErrorMessage(557));
								current[internalInstanceKey] = workInProgress;
							} else resetHydrationState(), 0 === (workInProgress.flags & 128) && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
							bubbleProperties(workInProgress);
							current = !1;
						} else renderLanes = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = renderLanes), current = !0;
						if (!current) {
							if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
							popSuspenseHandler(workInProgress);
							return null;
						}
						if (0 !== (workInProgress.flags & 128)) throw Error(formatProdErrorMessage(558));
					}
					bubbleProperties(workInProgress);
					return null;
				case 13:
					newProps = workInProgress.memoizedState;
					if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
						type = popHydrationState(workInProgress);
						if (null !== newProps && null !== newProps.dehydrated) {
							if (null === current) {
								if (!type) throw Error(formatProdErrorMessage(318));
								type = workInProgress.memoizedState;
								type = null !== type ? type.dehydrated : null;
								if (!type) throw Error(formatProdErrorMessage(317));
								type[internalInstanceKey] = workInProgress;
							} else resetHydrationState(), 0 === (workInProgress.flags & 128) && (workInProgress.memoizedState = null), workInProgress.flags |= 4;
							bubbleProperties(workInProgress);
							type = !1;
						} else type = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = type), type = !0;
						if (!type) {
							if (workInProgress.flags & 256) return popSuspenseHandler(workInProgress), workInProgress;
							popSuspenseHandler(workInProgress);
							return null;
						}
					}
					popSuspenseHandler(workInProgress);
					if (0 !== (workInProgress.flags & 128)) return workInProgress.lanes = renderLanes, workInProgress;
					renderLanes = null !== newProps;
					current = null !== current && null !== current.memoizedState;
					renderLanes && (newProps = workInProgress.child, type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool), nextResource = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (nextResource = newProps.memoizedState.cachePool.pool), nextResource !== type && (newProps.flags |= 2048));
					renderLanes !== current && renderLanes && (workInProgress.child.flags |= 8192);
					scheduleRetryEffect(workInProgress, workInProgress.updateQueue);
					bubbleProperties(workInProgress);
					return null;
				case 4: return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress.stateNode.containerInfo), workInProgress.flags |= 67108864, bubbleProperties(workInProgress), null;
				case 10: return popProvider(workInProgress.type), bubbleProperties(workInProgress), null;
				case 19:
					popSuspenseListContext(workInProgress);
					newProps = workInProgress.memoizedState;
					if (null === newProps) return bubbleProperties(workInProgress), null;
					type = 0 !== (workInProgress.flags & 128);
					nextResource = newProps.rendering;
					if (null === nextResource) if (type) cutOffTailIfNeeded(newProps, !1);
					else {
						if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128)) for (current = workInProgress.child; null !== current;) {
							nextResource = findFirstSuspended(current);
							if (null !== nextResource) {
								workInProgress.flags |= 128;
								cutOffTailIfNeeded(newProps, !1);
								current = nextResource.updateQueue;
								workInProgress.updateQueue = current;
								scheduleRetryEffect(workInProgress, current);
								workInProgress.subtreeFlags = 0;
								current = renderLanes;
								for (renderLanes = workInProgress.child; null !== renderLanes;) resetWorkInProgress(renderLanes, current), renderLanes = renderLanes.sibling;
								pushSuspenseListContext(workInProgress, suspenseStackCursor.current & 1 | 2);
								isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount);
								return workInProgress.child;
							}
							current = current.sibling;
						}
						null !== newProps.tail && now() > workInProgressRootRenderTargetTime && (workInProgress.flags |= 128, type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
					}
					else {
						if (!type) if (current = findFirstSuspended(nextResource), null !== current) {
							if (workInProgress.flags |= 128, type = !0, current = current.updateQueue, workInProgress.updateQueue = current, scheduleRetryEffect(workInProgress, current), cutOffTailIfNeeded(newProps, !0), null === newProps.tail && "collapsed" !== newProps.tailMode && "visible" !== newProps.tailMode && !nextResource.alternate && !isHydrating) return bubbleProperties(workInProgress), null;
						} else 2 * now() - newProps.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes && (workInProgress.flags |= 128, type = !0, cutOffTailIfNeeded(newProps, !1), workInProgress.lanes = 4194304);
						newProps.isBackwards ? (nextResource.sibling = workInProgress.child, workInProgress.child = nextResource) : (current = newProps.last, null !== current ? current.sibling = nextResource : workInProgress.child = nextResource, newProps.last = nextResource);
					}
					if (null !== newProps.tail) {
						current = newProps.tail;
						a: {
							for (renderLanes = current; null !== renderLanes;) {
								if (null !== renderLanes.alternate) {
									renderLanes = !1;
									break a;
								}
								renderLanes = renderLanes.sibling;
							}
							renderLanes = !0;
						}
						newProps.rendering = current;
						newProps.tail = current.sibling;
						newProps.renderingStartTime = now();
						current.sibling = null;
						nextResource = suspenseStackCursor.current;
						nextResource = type ? nextResource & 1 | 2 : nextResource & 1;
						"visible" === newProps.tailMode || "collapsed" === newProps.tailMode || !renderLanes || isHydrating ? pushSuspenseListContext(workInProgress, nextResource) : (renderLanes = nextResource, push(suspenseHandlerStackCursor, workInProgress), push(suspenseStackCursor, renderLanes), null === shellBoundary && (shellBoundary = workInProgress));
						isHydrating && pushTreeFork(workInProgress, newProps.treeForkCount);
						return current;
					}
					bubbleProperties(workInProgress);
					return null;
				case 22:
				case 23: return popSuspenseHandler(workInProgress), popHiddenContext(), newProps = null !== workInProgress.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress.flags |= 8192) : newProps && (workInProgress.flags |= 8192), newProps ? 0 !== (renderLanes & 536870912) && 0 === (workInProgress.flags & 128) && (bubbleProperties(workInProgress), workInProgress.subtreeFlags & 6 && (workInProgress.flags |= 8192)) : bubbleProperties(workInProgress), renderLanes = workInProgress.updateQueue, null !== renderLanes && scheduleRetryEffect(workInProgress, renderLanes.retryQueue), renderLanes = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress.memoizedState && null !== workInProgress.memoizedState.cachePool && (newProps = workInProgress.memoizedState.cachePool.pool), newProps !== renderLanes && (workInProgress.flags |= 2048), null !== current && pop(resumedCache), null;
				case 24: return renderLanes = null, null !== current && (renderLanes = current.memoizedState.cache), workInProgress.memoizedState.cache !== renderLanes && (workInProgress.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress), null;
				case 25: return null;
				case 30: return workInProgress.flags |= 33554432, bubbleProperties(workInProgress), null;
			}
			throw Error(formatProdErrorMessage(156, workInProgress.tag));
		}
		function unwindWork(current, workInProgress) {
			popTreeContext(workInProgress);
			switch (workInProgress.tag) {
				case 1: return current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
				case 3: return popProvider(CacheContext), popHostContainer(), current = workInProgress.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
				case 26:
				case 27:
				case 5: return popHostContext(workInProgress), null;
				case 31:
					if (null !== workInProgress.memoizedState) {
						popSuspenseHandler(workInProgress);
						if (null === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
						resetHydrationState();
					}
					current = workInProgress.flags;
					return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
				case 13:
					popSuspenseHandler(workInProgress);
					current = workInProgress.memoizedState;
					if (null !== current && null !== current.dehydrated) {
						if (null === workInProgress.alternate) throw Error(formatProdErrorMessage(340));
						resetHydrationState();
					}
					current = workInProgress.flags;
					return current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
				case 19: return popSuspenseListContext(workInProgress), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, current = workInProgress.memoizedState, null !== current && (current.rendering = null, current.tail = null), workInProgress.flags |= 4, workInProgress) : null;
				case 4: return popHostContainer(), null;
				case 10: return popProvider(workInProgress.type), null;
				case 22:
				case 23: return popSuspenseHandler(workInProgress), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress.flags, current & 65536 ? (workInProgress.flags = current & -65537 | 128, workInProgress) : null;
				case 24: return popProvider(CacheContext), null;
				case 25: return null;
				default: return null;
			}
		}
		function unwindInterruptedWork(current, interruptedWork) {
			popTreeContext(interruptedWork);
			switch (interruptedWork.tag) {
				case 3:
					popProvider(CacheContext);
					popHostContainer();
					break;
				case 26:
				case 27:
				case 5:
					popHostContext(interruptedWork);
					break;
				case 4:
					popHostContainer();
					break;
				case 31:
					null !== interruptedWork.memoizedState && popSuspenseHandler(interruptedWork);
					break;
				case 13:
					popSuspenseHandler(interruptedWork);
					break;
				case 19:
					popSuspenseListContext(interruptedWork);
					break;
				case 10:
					popProvider(interruptedWork.type);
					break;
				case 22:
				case 23:
					popSuspenseHandler(interruptedWork);
					popHiddenContext();
					null !== current && pop(resumedCache);
					break;
				case 24: popProvider(CacheContext);
			}
		}
		function commitHookEffectListMount(flags, finishedWork) {
			try {
				var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
				if (null !== lastEffect) {
					var firstEffect = lastEffect.next;
					updateQueue = firstEffect;
					do {
						if ((updateQueue.tag & flags) === flags) {
							lastEffect = void 0;
							var create = updateQueue.create, inst = updateQueue.inst;
							lastEffect = create();
							inst.destroy = lastEffect;
						}
						updateQueue = updateQueue.next;
					} while (updateQueue !== firstEffect);
				}
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
		function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
			try {
				var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
				if (null !== lastEffect) {
					var firstEffect = lastEffect.next;
					updateQueue = firstEffect;
					do {
						if ((updateQueue.tag & flags) === flags) {
							var inst = updateQueue.inst, destroy = inst.destroy;
							if (void 0 !== destroy) {
								inst.destroy = void 0;
								lastEffect = finishedWork;
								var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
								try {
									destroy_();
								} catch (error) {
									captureCommitPhaseError(lastEffect, nearestMountedAncestor, error);
								}
							}
						}
						updateQueue = updateQueue.next;
					} while (updateQueue !== firstEffect);
				}
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
		function commitClassCallbacks(finishedWork) {
			var updateQueue = finishedWork.updateQueue;
			if (null !== updateQueue) {
				var instance = finishedWork.stateNode;
				try {
					commitCallbacks(updateQueue, instance);
				} catch (error) {
					captureCommitPhaseError(finishedWork, finishedWork.return, error);
				}
			}
		}
		function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
			instance.props = resolveClassComponentProps(current.type, current.memoizedProps);
			instance.state = current.memoizedState;
			try {
				instance.componentWillUnmount();
			} catch (error) {
				captureCommitPhaseError(current, nearestMountedAncestor, error);
			}
		}
		function safelyAttachRef(current, nearestMountedAncestor) {
			try {
				var ref = current.ref;
				if (null !== ref) {
					switch (current.tag) {
						case 26:
						case 27:
						case 5:
							var instanceToUse = current.stateNode;
							break;
						case 30:
							var instance = current.stateNode, name = getViewTransitionName(current.memoizedProps, instance);
							if (null === instance.ref || instance.ref.name !== name) instance.ref = createViewTransitionInstance(name);
							instanceToUse = instance.ref;
							break;
						case 7:
							if (null === current.stateNode) {
								var fragmentInstance = new FragmentInstance(current);
								traverseVisibleInstancesAndTextInstances(current.child, !1, addFragmentHandleToFiber, fragmentInstance, void 0, void 0);
								current.stateNode = fragmentInstance;
							}
							instanceToUse = current.stateNode;
							break;
						default: instanceToUse = current.stateNode;
					}
					"function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
				}
			} catch (error) {
				captureCommitPhaseError(current, nearestMountedAncestor, error);
			}
		}
		function safelyDetachRef(current, nearestMountedAncestor) {
			var ref = current.ref, refCleanup = current.refCleanup;
			if (null !== ref) if ("function" === typeof refCleanup) try {
				refCleanup();
			} catch (error) {
				captureCommitPhaseError(current, nearestMountedAncestor, error);
			} finally {
				current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
			}
			else if ("function" === typeof ref) try {
				ref(null);
			} catch (error$148) {
				captureCommitPhaseError(current, nearestMountedAncestor, error$148);
			}
			else ref.current = null;
		}
		function commitNewChildToFragmentInstances(fiber, parentFragmentInstances) {
			if ((5 === fiber.tag || 27 === fiber.tag || 6 === fiber.tag) && null === fiber.alternate && null !== parentFragmentInstances) for (var i = 0; i < parentFragmentInstances.length; i++) commitNewChildToFragmentInstance(fiber.stateNode, parentFragmentInstances[i]);
		}
		function commitFragmentInstanceInsertionEffects(fiber) {
			for (var parent = fiber.return; null !== parent;) {
				isFragmentInstanceParent(parent) && commitNewChildToFragmentInstance(fiber.stateNode, parent.stateNode);
				if (isFragmentInstanceHostBoundary(parent)) break;
				parent = parent.return;
			}
		}
		function commitFragmentInstanceDeletionEffects(fiber) {
			for (var parent = fiber.return; null !== parent;) {
				isFragmentInstanceParent(parent) && deleteChildFromFragmentInstance(fiber.stateNode, parent.stateNode);
				if (isFragmentInstanceHostBoundary(parent)) break;
				parent = parent.return;
			}
		}
		function isFragmentInstanceHostBoundary(fiber) {
			return 5 === fiber.tag || 3 === fiber.tag || 27 === fiber.tag;
		}
		function isFragmentInstanceParent(fiber) {
			return fiber && 7 === fiber.tag && null !== fiber.stateNode;
		}
		function commitHostMount(finishedWork) {
			var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
			try {
				a: switch (type) {
					case "button":
					case "input":
					case "select":
					case "textarea":
						props.autoFocus && instance.focus();
						break a;
					case "img": props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
				}
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
		function commitHostUpdate(finishedWork, newProps, oldProps) {
			try {
				var domElement = finishedWork.stateNode;
				updateProperties(domElement, finishedWork.type, oldProps, newProps);
				domElement[internalPropsKey] = newProps;
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
		function isHostParent(fiber) {
			return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
		}
		function getHostSibling(fiber) {
			a: for (;;) {
				for (; null === fiber.sibling;) {
					if (null === fiber.return || isHostParent(fiber.return)) return null;
					fiber = fiber.return;
				}
				fiber.sibling.return = fiber.return;
				for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag;) {
					if (27 === fiber.tag && isSingletonScope(fiber.type)) continue a;
					if (fiber.flags & 2) continue a;
					if (null === fiber.child || 4 === fiber.tag) continue a;
					else fiber.child.return = fiber, fiber = fiber.child;
				}
				if (!(fiber.flags & 2)) return fiber.stateNode;
			}
		}
		function insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances) {
			var tag = node.tag;
			if (5 === tag || 6 === tag) tag = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(tag, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(tag), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1)), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = !0;
			else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode, before = null)), node = node.child, null !== node)) for (insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances), node = node.sibling; null !== node;) insertOrAppendPlacementNodeIntoContainer(node, before, parent, parentFragmentInstances), node = node.sibling;
		}
		function insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances) {
			var tag = node.tag;
			if (5 === tag || 6 === tag) tag = node.stateNode, before ? parent.insertBefore(tag, before) : parent.appendChild(tag), commitNewChildToFragmentInstances(node, parentFragmentInstances), viewTransitionMutationContext = !0;
			else if (4 !== tag && (27 === tag && (commitNewChildToFragmentInstances(node, parentFragmentInstances), parentFragmentInstances = null, isSingletonScope(node.type) && (parent = node.stateNode)), node = node.child, null !== node)) for (insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances), node = node.sibling; null !== node;) insertOrAppendPlacementNode(node, before, parent, parentFragmentInstances), node = node.sibling;
		}
		function commitHostSingletonAcquisition(finishedWork) {
			var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
			try {
				for (var type = finishedWork.type, attributes = singleton.attributes; attributes.length;) singleton.removeAttributeNode(attributes[0]);
				setInitialProperties(singleton, type, props);
				singleton[internalInstanceKey] = finishedWork;
				singleton[internalPropsKey] = props;
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
		var shouldStartViewTransition = !1;
		var appearingViewTransitions = null;
		function trackEnterViewTransitions(placement) {
			if (30 === placement.tag || 0 !== (placement.subtreeFlags & 33554432)) shouldStartViewTransition = !0;
		}
		var viewTransitionCancelableChildren = null;
		function pushViewTransitionCancelableScope() {
			var prevChildren = viewTransitionCancelableChildren;
			viewTransitionCancelableChildren = null;
			return prevChildren;
		}
		var viewTransitionHostInstanceIdx = 0;
		function applyViewTransitionToHostInstances(fiber, name, className, collectMeasurements, stopAtNestedViewTransitions) {
			viewTransitionHostInstanceIdx = 0;
			return applyViewTransitionToHostInstancesRecursive(fiber.child, name, className, collectMeasurements, stopAtNestedViewTransitions);
		}
		function applyViewTransitionToHostInstancesRecursive(child, name, className, collectMeasurements, stopAtNestedViewTransitions) {
			for (var inViewport = !1; null !== child;) {
				if (5 === child.tag) {
					var instance = child.stateNode;
					if (null !== collectMeasurements) {
						var measurement = measureInstance(instance);
						collectMeasurements.push(measurement);
						measurement.view && (inViewport = !0);
					} else inViewport || measureInstance(instance).view && (inViewport = !0);
					shouldStartViewTransition = !0;
					applyViewTransitionName(instance, 0 === viewTransitionHostInstanceIdx ? name : name + "_" + viewTransitionHostInstanceIdx, className);
					viewTransitionHostInstanceIdx++;
				} else if (22 !== child.tag || null === child.memoizedState) 30 === child.tag && stopAtNestedViewTransitions || applyViewTransitionToHostInstancesRecursive(child.child, name, className, collectMeasurements, stopAtNestedViewTransitions) && (inViewport = !0);
				child = child.sibling;
			}
			return inViewport;
		}
		function restoreViewTransitionOnHostInstances(child, stopAtNestedViewTransitions) {
			for (; null !== child;) {
				if (5 === child.tag) restoreViewTransitionName(child.stateNode, child.memoizedProps);
				else if (22 !== child.tag || null === child.memoizedState) 30 === child.tag && stopAtNestedViewTransitions || restoreViewTransitionOnHostInstances(child.child, stopAtNestedViewTransitions);
				child = child.sibling;
			}
		}
		function commitAppearingPairViewTransitions(placement) {
			if (0 !== (placement.subtreeFlags & 18874368)) for (placement = placement.child; null !== placement;) {
				if (22 !== placement.tag || null === placement.memoizedState) {
					if (commitAppearingPairViewTransitions(placement), 30 === placement.tag && 0 !== (placement.flags & 18874368) && placement.stateNode.paired) {
						var props = placement.memoizedProps;
						if (null == props.name || "auto" === props.name) throw Error(formatProdErrorMessage(544));
						var name = props.name;
						props = getViewTransitionClassName(props.default, props.share);
						"none" !== props && (applyViewTransitionToHostInstances(placement, name, props, null, !1) || restoreViewTransitionOnHostInstances(placement.child, !1));
					}
				}
				placement = placement.sibling;
			}
		}
		function commitEnterViewTransitions(placement, gesture) {
			if (30 === placement.tag) {
				var state = placement.stateNode, props = placement.memoizedProps, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, state.paired ? props.share : props.enter);
				"none" !== className ? applyViewTransitionToHostInstances(placement, name, className, null, !1) ? (commitAppearingPairViewTransitions(placement), state.paired || gesture || scheduleViewTransitionEvent(placement, props.onEnter)) : restoreViewTransitionOnHostInstances(placement.child, !1) : commitAppearingPairViewTransitions(placement);
			} else if (0 !== (placement.subtreeFlags & 33554432)) for (placement = placement.child; null !== placement;) commitEnterViewTransitions(placement, gesture), placement = placement.sibling;
			else commitAppearingPairViewTransitions(placement);
		}
		function commitDeletedPairViewTransitions(deletion) {
			if (null !== appearingViewTransitions && 0 !== appearingViewTransitions.size) {
				var pairs = appearingViewTransitions;
				if (0 !== (deletion.subtreeFlags & 18874368)) for (deletion = deletion.child; null !== deletion;) {
					if (22 !== deletion.tag || null === deletion.memoizedState) {
						if (30 === deletion.tag && 0 !== (deletion.flags & 18874368)) {
							var props = deletion.memoizedProps, name = props.name;
							if (null != name && "auto" !== name) {
								var pair = pairs.get(name);
								if (void 0 !== pair) {
									var className = getViewTransitionClassName(props.default, props.share);
									"none" !== className && (applyViewTransitionToHostInstances(deletion, name, className, null, !1) ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, scheduleViewTransitionEvent(deletion, props.onShare)) : restoreViewTransitionOnHostInstances(deletion.child, !1));
									pairs.delete(name);
									if (0 === pairs.size) break;
								}
							}
						}
						commitDeletedPairViewTransitions(deletion);
					}
					deletion = deletion.sibling;
				}
			}
		}
		function commitExitViewTransitions(deletion) {
			if (30 === deletion.tag) {
				var props = deletion.memoizedProps, name = getViewTransitionName(props, deletion.stateNode), pair = null !== appearingViewTransitions ? appearingViewTransitions.get(name) : void 0, className = getViewTransitionClassName(props.default, void 0 !== pair ? props.share : props.exit);
				"none" !== className && (applyViewTransitionToHostInstances(deletion, name, className, null, !1) ? void 0 !== pair ? (className = deletion.stateNode, pair.paired = className, className.paired = pair, appearingViewTransitions.delete(name), scheduleViewTransitionEvent(deletion, props.onShare)) : scheduleViewTransitionEvent(deletion, props.onExit) : restoreViewTransitionOnHostInstances(deletion.child, !1));
				null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
			} else if (0 !== (deletion.subtreeFlags & 33554432)) for (deletion = deletion.child; null !== deletion;) commitExitViewTransitions(deletion), deletion = deletion.sibling;
			else null !== appearingViewTransitions && commitDeletedPairViewTransitions(deletion);
		}
		function commitNestedViewTransitions(changedParent) {
			for (changedParent = changedParent.child; null !== changedParent;) {
				if (30 === changedParent.tag) {
					var props = changedParent.memoizedProps, name = getViewTransitionName(props, changedParent.stateNode);
					props = getViewTransitionClassName(props.default, props.update);
					changedParent.flags &= -5;
					"none" !== props && applyViewTransitionToHostInstances(changedParent, name, props, changedParent.memoizedState = [], !1);
				} else 0 !== (changedParent.subtreeFlags & 33554432) && commitNestedViewTransitions(changedParent);
				changedParent = changedParent.sibling;
			}
		}
		function restorePairedViewTransitions(parent) {
			if (0 !== (parent.subtreeFlags & 18874368)) for (parent = parent.child; null !== parent;) {
				if (22 !== parent.tag || null === parent.memoizedState) {
					if (30 === parent.tag && 0 !== (parent.flags & 18874368)) {
						var instance = parent.stateNode;
						null !== instance.paired && (instance.paired = null, restoreViewTransitionOnHostInstances(parent.child, !1));
					}
					restorePairedViewTransitions(parent);
				}
				parent = parent.sibling;
			}
		}
		function restoreEnterOrExitViewTransitions(fiber) {
			if (30 === fiber.tag) fiber.stateNode.paired = null, restoreViewTransitionOnHostInstances(fiber.child, !1), restorePairedViewTransitions(fiber);
			else if (0 !== (fiber.subtreeFlags & 33554432)) for (fiber = fiber.child; null !== fiber;) restoreEnterOrExitViewTransitions(fiber), fiber = fiber.sibling;
			else restorePairedViewTransitions(fiber);
		}
		function restoreNestedViewTransitions(changedParent) {
			for (changedParent = changedParent.child; null !== changedParent;) 30 === changedParent.tag ? restoreViewTransitionOnHostInstances(changedParent.child, !1) : 0 !== (changedParent.subtreeFlags & 33554432) && restoreNestedViewTransitions(changedParent), changedParent = changedParent.sibling;
		}
		function measureViewTransitionHostInstancesRecursive(parentViewTransition, child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) {
			for (var inViewport = !1; null !== child;) {
				if (5 === child.tag) {
					var instance = child.stateNode;
					if (null !== previousMeasurements && viewTransitionHostInstanceIdx < previousMeasurements.length) {
						var previousMeasurement = previousMeasurements[viewTransitionHostInstanceIdx], nextMeasurement = measureInstance(instance);
						if (previousMeasurement.view || nextMeasurement.view) inViewport = !0;
						var JSCompiler_temp;
						if (JSCompiler_temp = 0 === (parentViewTransition.flags & 4)) if (nextMeasurement.clip) JSCompiler_temp = !0;
						else {
							JSCompiler_temp = previousMeasurement.rect;
							var newRect = nextMeasurement.rect;
							JSCompiler_temp = JSCompiler_temp.y !== newRect.y || JSCompiler_temp.x !== newRect.x || JSCompiler_temp.height !== newRect.height || JSCompiler_temp.width !== newRect.width;
						}
						JSCompiler_temp && (parentViewTransition.flags |= 4);
						nextMeasurement.abs ? nextMeasurement = !previousMeasurement.abs : (previousMeasurement = previousMeasurement.rect, nextMeasurement = nextMeasurement.rect, nextMeasurement = previousMeasurement.height !== nextMeasurement.height || previousMeasurement.width !== nextMeasurement.width);
						nextMeasurement && (parentViewTransition.flags |= 32);
					} else parentViewTransition.flags |= 32;
					0 !== (parentViewTransition.flags & 4) && applyViewTransitionName(instance, 0 === viewTransitionHostInstanceIdx ? newName : newName + "_" + viewTransitionHostInstanceIdx, className);
					inViewport && 0 !== (parentViewTransition.flags & 4) || (null === viewTransitionCancelableChildren && (viewTransitionCancelableChildren = []), viewTransitionCancelableChildren.push(instance, 0 === viewTransitionHostInstanceIdx ? oldName : oldName + "_" + viewTransitionHostInstanceIdx, child.memoizedProps));
					viewTransitionHostInstanceIdx++;
				} else if (22 !== child.tag || null === child.memoizedState) 30 === child.tag && stopAtNestedViewTransitions ? parentViewTransition.flags |= child.flags & 32 : measureViewTransitionHostInstancesRecursive(parentViewTransition, child.child, newName, oldName, className, previousMeasurements, stopAtNestedViewTransitions) && (inViewport = !0);
				child = child.sibling;
			}
			return inViewport;
		}
		function measureNestedViewTransitions(changedParent, gesture) {
			for (changedParent = changedParent.child; null !== changedParent;) {
				if (30 === changedParent.tag) {
					var props = changedParent.memoizedProps, state = changedParent.stateNode, name = getViewTransitionName(props, state), className = getViewTransitionClassName(props.default, props.update);
					if (gesture) {
						state = state.clones;
						var previousMeasurements = null === state ? null : state.map(measureClonedInstance);
					} else previousMeasurements = changedParent.memoizedState, changedParent.memoizedState = null;
					state = changedParent;
					var child = changedParent.child;
					viewTransitionHostInstanceIdx = 0;
					name = measureViewTransitionHostInstancesRecursive(state, child, name, name, className, previousMeasurements, !1);
					0 !== (changedParent.flags & 4) && name && (gesture || scheduleViewTransitionEvent(changedParent, props.onUpdate));
				} else 0 !== (changedParent.subtreeFlags & 33554432) && measureNestedViewTransitions(changedParent, gesture);
				changedParent = changedParent.sibling;
			}
		}
		var offscreenSubtreeIsHidden = !1;
		var offscreenSubtreeWasHidden = !1;
		var offscreenDirectParentIsHidden = !1;
		var needsFormReset = !1;
		var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set;
		var nextEffect = null;
		var viewTransitionContextChanged = !1;
		var inUpdateViewTransition = !1;
		var rootViewTransitionAffected = !1;
		var rootViewTransitionNameCanceled = !1;
		function commitBeforeMutationEffects(root, firstChild, committedLanes) {
			root = root.containerInfo;
			eventsEnabled = _enabled;
			root = getActiveElementDeep(root);
			if (hasSelectionCapabilities(root)) {
				if ("selectionStart" in root) var JSCompiler_temp = {
					start: root.selectionStart,
					end: root.selectionEnd
				};
				else a: {
					JSCompiler_temp = (JSCompiler_temp = root.ownerDocument) && JSCompiler_temp.defaultView || window;
					var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
					if (selection && 0 !== selection.rangeCount) {
						JSCompiler_temp = selection.anchorNode;
						var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
						selection = selection.focusOffset;
						try {
							JSCompiler_temp.nodeType, focusNode.nodeType;
						} catch (e$21) {
							JSCompiler_temp = null;
							break a;
						}
						var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root, parentNode = null;
						b: for (;;) {
							for (var next;;) {
								node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
								node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
								3 === node.nodeType && (length += node.nodeValue.length);
								if (null === (next = node.firstChild)) break;
								parentNode = node;
								node = next;
							}
							for (;;) {
								if (node === root) break b;
								parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
								parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
								if (null !== (next = node.nextSibling)) break;
								node = parentNode;
								parentNode = node.parentNode;
							}
							node = next;
						}
						JSCompiler_temp = -1 === start || -1 === end ? null : {
							start,
							end
						};
					} else JSCompiler_temp = null;
				}
				JSCompiler_temp = JSCompiler_temp || {
					start: 0,
					end: 0
				};
			} else JSCompiler_temp = null;
			selectionInformation = {
				focusedElem: root,
				selectionRange: JSCompiler_temp
			};
			_enabled = !1;
			committedLanes = (committedLanes & 335544064) === committedLanes;
			nextEffect = firstChild;
			for (firstChild = committedLanes ? 9270 : 1024; null !== nextEffect;) {
				root = nextEffect;
				if (committedLanes && (JSCompiler_temp = root.deletions, null !== JSCompiler_temp)) for (anchorOffset = 0; anchorOffset < JSCompiler_temp.length; anchorOffset++) committedLanes && commitExitViewTransitions(JSCompiler_temp[anchorOffset]);
				if (null === root.alternate && 0 !== (root.flags & 2)) committedLanes && trackEnterViewTransitions(root), commitBeforeMutationEffects_complete(committedLanes);
				else {
					if (22 === root.tag) {
						if (JSCompiler_temp = root.alternate, null !== root.memoizedState) {
							null !== JSCompiler_temp && null === JSCompiler_temp.memoizedState && committedLanes && commitExitViewTransitions(JSCompiler_temp);
							commitBeforeMutationEffects_complete(committedLanes);
							continue;
						} else if (null !== JSCompiler_temp && null !== JSCompiler_temp.memoizedState) {
							committedLanes && trackEnterViewTransitions(root);
							commitBeforeMutationEffects_complete(committedLanes);
							continue;
						}
					}
					JSCompiler_temp = root.child;
					0 !== (root.subtreeFlags & firstChild) && null !== JSCompiler_temp ? (JSCompiler_temp.return = root, nextEffect = JSCompiler_temp) : (committedLanes && commitNestedViewTransitions(root), commitBeforeMutationEffects_complete(committedLanes));
				}
			}
			appearingViewTransitions = null;
		}
		function commitBeforeMutationEffects_complete(isViewTransitionEligible$jscomp$0) {
			for (; null !== nextEffect;) {
				var fiber = nextEffect, isViewTransitionEligible = isViewTransitionEligible$jscomp$0, current = fiber.alternate, flags = fiber.flags;
				switch (fiber.tag) {
					case 0:
					case 11:
					case 15: break;
					case 1:
						if (0 !== (flags & 1024) && null !== current) {
							isViewTransitionEligible = void 0;
							flags = current.memoizedProps;
							current = current.memoizedState;
							var instance = fiber.stateNode;
							try {
								var resolvedPrevProps = resolveClassComponentProps(fiber.type, flags);
								isViewTransitionEligible = instance.getSnapshotBeforeUpdate(resolvedPrevProps, current);
								instance.__reactInternalSnapshotBeforeUpdate = isViewTransitionEligible;
							} catch (error) {
								captureCommitPhaseError(fiber, fiber.return, error);
							}
						}
						break;
					case 3:
						if (0 !== (flags & 1024)) {
							if (current = fiber.stateNode.containerInfo, isViewTransitionEligible = current.nodeType, 9 === isViewTransitionEligible) clearContainerSparingly(current);
							else if (1 === isViewTransitionEligible) switch (current.nodeName) {
								case "HEAD":
								case "HTML":
								case "BODY":
									clearContainerSparingly(current);
									break;
								default: current.textContent = "";
							}
						}
						break;
					case 5:
					case 26:
					case 27:
					case 6:
					case 4:
					case 17: break;
					case 30:
						isViewTransitionEligible && null !== current && (isViewTransitionEligible = getViewTransitionName(current.memoizedProps, current.stateNode), flags = fiber.memoizedProps, flags = getViewTransitionClassName(flags.default, flags.update), "none" !== flags && applyViewTransitionToHostInstances(current, isViewTransitionEligible, flags, current.memoizedState = [], !0));
						break;
					default: if (0 !== (flags & 1024)) throw Error(formatProdErrorMessage(163));
				}
				current = fiber.sibling;
				if (null !== current) {
					current.return = fiber.return;
					nextEffect = current;
					break;
				}
				nextEffect = fiber.return;
			}
		}
		function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
			var flags = finishedWork.flags;
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 15:
					recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					flags & 4 && commitHookEffectListMount(5, finishedWork);
					break;
				case 1:
					recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					if (flags & 4) if (finishedRoot = finishedWork.stateNode, null === current) try {
						finishedRoot.componentDidMount();
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
					else {
						var prevProps = resolveClassComponentProps(finishedWork.type, current.memoizedProps);
						current = current.memoizedState;
						try {
							finishedRoot.componentDidUpdate(prevProps, current, finishedRoot.__reactInternalSnapshotBeforeUpdate);
						} catch (error$146) {
							captureCommitPhaseError(finishedWork, finishedWork.return, error$146);
						}
					}
					flags & 64 && commitClassCallbacks(finishedWork);
					flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 3:
					recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
						current = null;
						if (null !== finishedWork.child) switch (finishedWork.child.tag) {
							case 27:
							case 5:
								current = finishedWork.child.stateNode;
								break;
							case 1: current = finishedWork.child.stateNode;
						}
						try {
							commitCallbacks(finishedRoot, current);
						} catch (error) {
							captureCommitPhaseError(finishedWork, finishedWork.return, error);
						}
					}
					break;
				case 27: null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
				case 26:
				case 5:
					recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					null === current && flags & 4 && commitHostMount(finishedWork);
					flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 12:
					recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					break;
				case 31:
					recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
					break;
				case 13:
					recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
					flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(null, finishedWork), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
					break;
				case 22:
					flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
					if (!flags) {
						var newOffscreenSubtreeWasHidden = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
						current = offscreenSubtreeIsHidden;
						prevProps = offscreenSubtreeWasHidden;
						offscreenSubtreeIsHidden = flags;
						(offscreenSubtreeWasHidden = newOffscreenSubtreeWasHidden) && !prevProps ? (flags = 2, 0 !== (finishedWork.subtreeFlags & 8772) && (flags |= 1), recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, flags)) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
						offscreenSubtreeIsHidden = current;
						offscreenSubtreeWasHidden = prevProps;
					}
					break;
				case 30:
					recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
					flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
					break;
				case 7: flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
				default: recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
			}
		}
		function hideOrUnhideAllChildren(parentFiber, isHidden) {
			for (parentFiber = parentFiber.child; null !== parentFiber;) hideOrUnhideAllChildrenOnFiber(parentFiber, isHidden), parentFiber = parentFiber.sibling;
		}
		function hideOrUnhideAllChildrenOnFiber(fiber, isHidden) {
			switch (fiber.tag) {
				case 5:
				case 26:
					try {
						var instance = fiber.stateNode;
						if (isHidden) {
							var style = instance.style;
							"function" === typeof style.setProperty ? style.setProperty("display", "none", "important") : style.display = "none";
						} else {
							var instance$jscomp$0 = fiber.stateNode, styleProp = fiber.memoizedProps.style, display = void 0 !== styleProp && null !== styleProp && styleProp.hasOwnProperty("display") ? styleProp.display : null;
							instance$jscomp$0.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
						}
					} catch (error) {
						captureCommitPhaseError(fiber, fiber.return, error);
					}
					hideOrUnhideNearestPortals(fiber, isHidden);
					break;
				case 6:
					try {
						fiber.stateNode.nodeValue = isHidden ? "" : fiber.memoizedProps, viewTransitionMutationContext = !0;
					} catch (error) {
						captureCommitPhaseError(fiber, fiber.return, error);
					}
					break;
				case 18:
					try {
						var instance$jscomp$1 = fiber.stateNode;
						isHidden ? hideOrUnhideDehydratedBoundary(instance$jscomp$1, !0) : hideOrUnhideDehydratedBoundary(fiber.stateNode, !1);
					} catch (error) {
						captureCommitPhaseError(fiber, fiber.return, error);
					}
					break;
				case 22:
				case 23:
					null === fiber.memoizedState && hideOrUnhideAllChildren(fiber, isHidden);
					break;
				default: hideOrUnhideAllChildren(fiber, isHidden);
			}
		}
		function hideOrUnhideNearestPortals(parentFiber, isHidden$jscomp$0) {
			if (parentFiber.subtreeFlags & 67108864) for (parentFiber = parentFiber.child; null !== parentFiber;) {
				a: {
					var fiber = parentFiber, isHidden = isHidden$jscomp$0;
					switch (fiber.tag) {
						case 4:
							hideOrUnhideAllChildrenOnFiber(fiber, isHidden);
							break a;
						case 22:
							null === fiber.memoizedState && hideOrUnhideNearestPortals(fiber, isHidden);
							break a;
						default: hideOrUnhideNearestPortals(fiber, isHidden);
					}
				}
				parentFiber = parentFiber.sibling;
			}
		}
		function detachFiberAfterEffects(fiber) {
			var alternate = fiber.alternate;
			null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
			fiber.child = null;
			fiber.deletions = null;
			fiber.sibling = null;
			5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
			fiber.stateNode = null;
			fiber.return = null;
			fiber.dependencies = null;
			fiber.memoizedProps = null;
			fiber.memoizedState = null;
			fiber.pendingProps = null;
			fiber.stateNode = null;
			fiber.updateQueue = null;
		}
		var hostParent = null;
		var hostParentIsContainer = !1;
		function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
			for (parent = parent.child; null !== parent;) commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
		}
		function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
			if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount) try {
				injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
			} catch (err) {}
			switch (deletedFiber.tag) {
				case 26:
					offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && !offscreenSubtreeWasHidden && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
					break;
				case 27:
					offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
					commitFragmentInstanceDeletionEffects(deletedFiber);
					var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
					isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = !1);
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					releaseSingletonInstance(deletedFiber.stateNode, deletedFiber.type, deletedFiber.memoizedProps);
					hostParent = prevHostParent;
					hostParentIsContainer = prevHostParentIsContainer;
					break;
				case 5: offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor), commitFragmentInstanceDeletionEffects(deletedFiber);
				case 6:
					6 === deletedFiber.tag && commitFragmentInstanceDeletionEffects(deletedFiber);
					prevHostParent = hostParent;
					prevHostParentIsContainer = hostParentIsContainer;
					hostParent = null;
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					hostParent = prevHostParent;
					hostParentIsContainer = prevHostParentIsContainer;
					if (null !== hostParent) if (hostParentIsContainer) try {
						(9 === hostParent.nodeType ? hostParent.body : "HTML" === hostParent.nodeName ? hostParent.ownerDocument.body : hostParent).removeChild(deletedFiber.stateNode), viewTransitionMutationContext = !0;
					} catch (error) {
						captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
					}
					else try {
						hostParent.removeChild(deletedFiber.stateNode), viewTransitionMutationContext = !0;
					} catch (error) {
						captureCommitPhaseError(deletedFiber, nearestMountedAncestor, error);
					}
					break;
				case 18:
					null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearHydrationBoundary(9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot, deletedFiber.stateNode), retryIfBlockedOn(finishedRoot)) : clearHydrationBoundary(hostParent, deletedFiber.stateNode));
					break;
				case 4:
					prevHostParent = hostParent;
					prevHostParentIsContainer = hostParentIsContainer;
					hostParent = deletedFiber.stateNode.containerInfo;
					hostParentIsContainer = !0;
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					hostParent = prevHostParent;
					hostParentIsContainer = prevHostParentIsContainer;
					break;
				case 0:
				case 11:
				case 14:
				case 15:
					commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
					offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					break;
				case 1:
					offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(deletedFiber, nearestMountedAncestor, prevHostParent));
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					break;
				case 21:
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					break;
				case 22:
					offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					offscreenSubtreeWasHidden = prevHostParent;
					break;
				case 30:
					safelyDetachRef(deletedFiber, nearestMountedAncestor);
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					break;
				case 7:
					offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
					recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
					break;
				default: recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, deletedFiber);
			}
		}
		function commitActivityHydrationCallbacks(finishedRoot, finishedWork) {
			if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot))) {
				finishedRoot = finishedRoot.dehydrated;
				try {
					retryIfBlockedOn(finishedRoot);
				} catch (error) {
					captureCommitPhaseError(finishedWork, finishedWork.return, error);
				}
			}
		}
		function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
			if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot)))) try {
				retryIfBlockedOn(finishedRoot);
			} catch (error) {
				captureCommitPhaseError(finishedWork, finishedWork.return, error);
			}
		}
		function getRetryCache(finishedWork) {
			switch (finishedWork.tag) {
				case 31:
				case 13:
				case 19:
					var retryCache = finishedWork.stateNode;
					null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
					return retryCache;
				case 22: return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
				default: throw Error(formatProdErrorMessage(435, finishedWork.tag));
			}
		}
		function attachSuspenseRetryListeners(finishedWork, wakeables) {
			var retryCache = getRetryCache(finishedWork);
			wakeables.forEach(function(wakeable) {
				if (!retryCache.has(wakeable)) {
					retryCache.add(wakeable);
					var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
					wakeable.then(retry, retry);
				}
			});
		}
		function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber, lanes) {
			var deletions = parentFiber.deletions;
			if (null !== deletions) for (var i = 0; i < deletions.length; i++) {
				var childToDelete = deletions[i], root = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
				a: for (; null !== parent;) {
					switch (parent.tag) {
						case 27:
							if (isSingletonScope(parent.type)) {
								hostParent = parent.stateNode;
								hostParentIsContainer = !1;
								break a;
							}
							break;
						case 5:
							hostParent = parent.stateNode;
							hostParentIsContainer = !1;
							break a;
						case 3:
						case 4:
							hostParent = parent.stateNode.containerInfo;
							hostParentIsContainer = !0;
							break a;
					}
					parent = parent.return;
				}
				if (null === hostParent) throw Error(formatProdErrorMessage(160));
				commitDeletionEffectsOnFiber(root, returnFiber, childToDelete);
				hostParent = null;
				hostParentIsContainer = !1;
				root = childToDelete.alternate;
				null !== root && (root.return = null);
				childToDelete.return = null;
			}
			if (parentFiber.subtreeFlags & 13886) for (parentFiber = parentFiber.child; null !== parentFiber;) commitMutationEffectsOnFiber(parentFiber, root$jscomp$0, lanes), parentFiber = parentFiber.sibling;
		}
		var currentHoistableRoot = null;
		function commitMutationEffectsOnFiber(finishedWork, root, lanes) {
			var current = finishedWork.alternate, flags = finishedWork.flags;
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					if (flags & 4 && (current = finishedWork.updateQueue, current = null !== current ? current.events : null, null !== current)) for (var ii = 0; ii < current.length; ii++) {
						var _eventPayloads$ii2 = current[ii];
						_eventPayloads$ii2.ref.impl = _eventPayloads$ii2.nextImpl;
					}
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
					break;
				case 1:
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
					flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (root = finishedWork.callbacks, null !== root && (lanes = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === lanes ? root : lanes.concat(root))));
					break;
				case 26:
					ii = currentHoistableRoot;
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
					if (flags & 4) if (flags = null !== current ? current.memoizedState : null, lanes = finishedWork.memoizedState, null === current) if (null === lanes) if (null === finishedWork.stateNode) if (offscreenSubtreeIsHidden) finishedWork.stateNode = createHoistableInstance(finishedWork.type, finishedWork.memoizedProps, root.containerInfo, finishedWork);
					else {
						a: {
							root = finishedWork.type;
							lanes = finishedWork.memoizedProps;
							flags = ii.ownerDocument || ii;
							b: switch (root) {
								case "title":
									current = flags.getElementsByTagName("title")[0];
									if (!current || current[internalHoistableMarker] || current[internalInstanceKey] || "http://www.w3.org/2000/svg" === current.namespaceURI || current.hasAttribute("itemprop")) current = flags.createElement(root), flags.head.insertBefore(current, flags.querySelector("head > title"));
									setInitialProperties(current, root, lanes);
									current[internalInstanceKey] = finishedWork;
									markNodeAsHoistable(current);
									root = current;
									break a;
								case "link":
									if (ii = getHydratableHoistableCache("link", "href", flags).get(root + (lanes.href || ""))) {
										for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++) if (current = ii[_eventPayloads$ii2], current.getAttribute("href") === (null == lanes.href || "" === lanes.href ? null : lanes.href) && current.getAttribute("rel") === (null == lanes.rel ? null : lanes.rel) && current.getAttribute("title") === (null == lanes.title ? null : lanes.title) && current.getAttribute("crossorigin") === (null == lanes.crossOrigin ? null : lanes.crossOrigin)) {
											ii.splice(_eventPayloads$ii2, 1);
											break b;
										}
									}
									current = flags.createElement(root);
									setInitialProperties(current, root, lanes);
									flags.head.appendChild(current);
									break;
								case "meta":
									if (ii = getHydratableHoistableCache("meta", "content", flags).get(root + (lanes.content || ""))) {
										for (_eventPayloads$ii2 = 0; _eventPayloads$ii2 < ii.length; _eventPayloads$ii2++) if (current = ii[_eventPayloads$ii2], current.getAttribute("content") === (null == lanes.content ? null : "" + lanes.content) && current.getAttribute("name") === (null == lanes.name ? null : lanes.name) && current.getAttribute("property") === (null == lanes.property ? null : lanes.property) && current.getAttribute("http-equiv") === (null == lanes.httpEquiv ? null : lanes.httpEquiv) && current.getAttribute("charset") === (null == lanes.charSet ? null : lanes.charSet)) {
											ii.splice(_eventPayloads$ii2, 1);
											break b;
										}
									}
									current = flags.createElement(root);
									setInitialProperties(current, root, lanes);
									flags.head.appendChild(current);
									break;
								default: throw Error(formatProdErrorMessage(468, root));
							}
							current[internalInstanceKey] = finishedWork;
							markNodeAsHoistable(current);
							root = current;
						}
						finishedWork.stateNode = root;
					}
					else offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode);
					else finishedWork.stateNode = acquireResource(ii, lanes, finishedWork.memoizedProps);
					else flags !== lanes ? (null === flags ? (root = current.stateNode, null === root || offscreenSubtreeWasHidden || root.parentNode.removeChild(root)) : flags.count--, null === lanes ? offscreenSubtreeIsHidden || mountHoistable(ii, finishedWork.type, finishedWork.stateNode) : acquireResource(ii, lanes, finishedWork.memoizedProps)) : null === lanes && null !== finishedWork.stateNode && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
					break;
				case 27:
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
					null !== current && flags & 4 && commitHostUpdate(finishedWork, finishedWork.memoizedProps, current.memoizedProps);
					break;
				case 5:
					ii = offscreenDirectParentIsHidden;
					offscreenDirectParentIsHidden = !1;
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					offscreenDirectParentIsHidden = ii;
					commitReconciliationEffects(finishedWork);
					flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
					if (finishedWork.flags & 32) {
						root = finishedWork.stateNode;
						try {
							setTextContent(root, ""), viewTransitionMutationContext = !0;
						} catch (error) {
							captureCommitPhaseError(finishedWork, finishedWork.return, error);
						}
					}
					flags & 4 && null != finishedWork.stateNode && (root = finishedWork.memoizedProps, commitHostUpdate(finishedWork, root, null !== current ? current.memoizedProps : root));
					flags & 1024 && (needsFormReset = !0);
					break;
				case 6:
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					if (flags & 4) {
						if (null === finishedWork.stateNode) throw Error(formatProdErrorMessage(162));
						root = finishedWork.memoizedProps;
						lanes = finishedWork.stateNode;
						try {
							lanes.nodeValue = root, viewTransitionMutationContext = !0;
						} catch (error) {
							captureCommitPhaseError(finishedWork, finishedWork.return, error);
						}
					}
					break;
				case 3:
					viewTransitionMutationContext = !1;
					tagCaches = null;
					ii = currentHoistableRoot;
					currentHoistableRoot = getHoistableRoot(root.containerInfo);
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					currentHoistableRoot = ii;
					commitReconciliationEffects(finishedWork);
					if (flags & 4 && null !== current && current.memoizedState.isDehydrated) try {
						retryIfBlockedOn(root.containerInfo);
					} catch (error) {
						captureCommitPhaseError(finishedWork, finishedWork.return, error);
					}
					needsFormReset && (needsFormReset = !1, recursivelyResetForms(finishedWork));
					viewTransitionMutationContext = !1;
					break;
				case 4:
					flags = offscreenDirectParentIsHidden;
					offscreenDirectParentIsHidden = offscreenSubtreeIsHidden;
					current = pushMutationContext();
					ii = currentHoistableRoot;
					currentHoistableRoot = getHoistableRoot(finishedWork.stateNode.containerInfo);
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					currentHoistableRoot = ii;
					viewTransitionMutationContext && inUpdateViewTransition && (rootViewTransitionAffected = !0);
					viewTransitionMutationContext = current;
					offscreenDirectParentIsHidden = flags;
					break;
				case 12:
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					break;
				case 31:
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					flags & 4 && (root = finishedWork.updateQueue, null !== root && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root)));
					break;
				case 13:
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
					flags & 4 && (root = finishedWork.updateQueue, null !== root && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root)));
					break;
				case 22:
					ii = null !== finishedWork.memoizedState;
					_eventPayloads$ii2 = null !== current && null !== current.memoizedState;
					var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden, prevOffscreenDirectParentIsHidden$166 = offscreenDirectParentIsHidden;
					offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || ii;
					offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166 || ii;
					offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || _eventPayloads$ii2;
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
					offscreenDirectParentIsHidden = prevOffscreenDirectParentIsHidden$166;
					offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
					commitReconciliationEffects(finishedWork);
					flags & 8192 && (root = finishedWork.stateNode, root._visibility = ii ? root._visibility & -2 : root._visibility | 1, !ii || null === current || _eventPayloads$ii2 || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || (root = _eventPayloads$ii2 || offscreenSubtreeWasHidden, lanes = offscreenSubtreeIsHidden, current = offscreenSubtreeWasHidden, offscreenSubtreeIsHidden = ii || offscreenSubtreeIsHidden, offscreenSubtreeWasHidden = root, recursivelyTraverseDisappearLayoutEffects(finishedWork, 2), offscreenSubtreeIsHidden = lanes, offscreenSubtreeWasHidden = current), !ii && offscreenDirectParentIsHidden || hideOrUnhideAllChildren(finishedWork, ii));
					flags & 4 && (root = finishedWork.updateQueue, null !== root && (lanes = root.retryQueue, null !== lanes && (root.retryQueue = null, attachSuspenseRetryListeners(finishedWork, lanes))));
					break;
				case 19:
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					flags & 4 && (root = finishedWork.updateQueue, null !== root && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, root)));
					break;
				case 30:
					flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
					flags = pushMutationContext();
					ii = inUpdateViewTransition;
					_eventPayloads$ii2 = (lanes & 335544064) === lanes;
					prevOffscreenSubtreeIsHidden = finishedWork.memoizedProps;
					inUpdateViewTransition = _eventPayloads$ii2 && "none" !== getViewTransitionClassName(prevOffscreenSubtreeIsHidden.default, prevOffscreenSubtreeIsHidden.update);
					recursivelyTraverseMutationEffects(root, finishedWork, lanes);
					commitReconciliationEffects(finishedWork);
					_eventPayloads$ii2 && null !== current && viewTransitionMutationContext && (finishedWork.flags |= 4);
					inUpdateViewTransition = ii;
					viewTransitionMutationContext = flags;
					break;
				case 21: break;
				case 7: flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return)), current && null !== current.stateNode && (current.stateNode._fragmentFiber = finishedWork);
				default: recursivelyTraverseMutationEffects(root, finishedWork, lanes), commitReconciliationEffects(finishedWork);
			}
		}
		function commitReconciliationEffects(finishedWork) {
			var flags = finishedWork.flags;
			if (flags & 2) {
				try {
					for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber;) {
						if (isHostParent(parentFiber)) {
							hostParentFiber = parentFiber;
							break;
						}
						parentFiber = parentFiber.return;
					}
					parentFiber = null;
					for (var parent = finishedWork.return; null !== parent;) {
						if (isFragmentInstanceParent(parent)) {
							var fragmentInstance = parent.stateNode;
							null === parentFiber ? parentFiber = [fragmentInstance] : parentFiber.push(fragmentInstance);
						}
						if (isFragmentInstanceHostBoundary(parent)) break;
						parent = parent.return;
					}
					var JSCompiler_inline_result = parentFiber;
					if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
					switch (hostParentFiber.tag) {
						case 27:
							var parent$jscomp$0 = hostParentFiber.stateNode;
							insertOrAppendPlacementNode(finishedWork, getHostSibling(finishedWork), parent$jscomp$0, JSCompiler_inline_result);
							break;
						case 5:
							var parent$149 = hostParentFiber.stateNode;
							hostParentFiber.flags & 32 && (setTextContent(parent$149, ""), hostParentFiber.flags &= -33);
							insertOrAppendPlacementNode(finishedWork, getHostSibling(finishedWork), parent$149, JSCompiler_inline_result);
							break;
						case 3:
						case 4:
							var parent$151 = hostParentFiber.stateNode.containerInfo;
							insertOrAppendPlacementNodeIntoContainer(finishedWork, getHostSibling(finishedWork), parent$151, JSCompiler_inline_result);
							break;
						default: throw Error(formatProdErrorMessage(161));
					}
				} catch (error) {
					captureCommitPhaseError(finishedWork, finishedWork.return, error);
				}
				finishedWork.flags &= -3;
			}
			flags & 4096 && (finishedWork.flags &= -4097);
		}
		function recursivelyResetForms(parentFiber) {
			if (parentFiber.subtreeFlags & 1024) for (parentFiber = parentFiber.child; null !== parentFiber;) {
				var fiber = parentFiber;
				recursivelyResetForms(fiber);
				5 === fiber.tag && fiber.flags & 1024 && (fiber = fiber.stateNode, _enabled = !0, fiber.reset(), _enabled = !1);
				parentFiber = parentFiber.sibling;
			}
		}
		function recursivelyTraverseAfterMutationEffects(root, parentFiber) {
			if (parentFiber.subtreeFlags & 9270) for (parentFiber = parentFiber.child; null !== parentFiber;) commitAfterMutationEffectsOnFiber(parentFiber, root), parentFiber = parentFiber.sibling;
			else measureNestedViewTransitions(parentFiber, !1);
		}
		function commitAfterMutationEffectsOnFiber(finishedWork, root) {
			var current = finishedWork.alternate;
			if (null === current) commitEnterViewTransitions(finishedWork, !1);
			else switch (finishedWork.tag) {
				case 3:
					rootViewTransitionNameCanceled = viewTransitionContextChanged = !1;
					pushViewTransitionCancelableScope();
					recursivelyTraverseAfterMutationEffects(root, finishedWork);
					if (!viewTransitionContextChanged && !rootViewTransitionAffected) {
						finishedWork = viewTransitionCancelableChildren;
						if (null !== finishedWork) for (var i = 0; i < finishedWork.length; i += 3) {
							current = finishedWork[i];
							var oldName = finishedWork[i + 1];
							restoreViewTransitionName(current, finishedWork[i + 2]);
							current = current.ownerDocument.documentElement;
							null !== current && current.animate({
								opacity: [0, 0],
								pointerEvents: ["none", "none"]
							}, {
								duration: 0,
								fill: "forwards",
								pseudoElement: "::view-transition-group(" + oldName + ")"
							});
						}
						finishedWork = root.containerInfo;
						finishedWork = 9 === finishedWork.nodeType ? finishedWork.documentElement : finishedWork.ownerDocument.documentElement;
						null !== finishedWork && "" === finishedWork.style.viewTransitionName && (finishedWork.style.viewTransitionName = "none", finishedWork.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(root)"
						}), finishedWork.animate({
							width: [0, 0],
							height: [0, 0]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition"
						}));
						rootViewTransitionNameCanceled = !0;
					}
					viewTransitionCancelableChildren = null;
					break;
				case 5:
					recursivelyTraverseAfterMutationEffects(root, finishedWork);
					break;
				case 4:
					i = viewTransitionContextChanged;
					viewTransitionContextChanged = !1;
					recursivelyTraverseAfterMutationEffects(root, finishedWork);
					viewTransitionContextChanged && (rootViewTransitionAffected = !0);
					viewTransitionContextChanged = i;
					break;
				case 22:
					null === finishedWork.memoizedState && (null !== current.memoizedState ? commitEnterViewTransitions(finishedWork, !1) : recursivelyTraverseAfterMutationEffects(root, finishedWork));
					break;
				case 30:
					i = viewTransitionContextChanged;
					oldName = pushViewTransitionCancelableScope();
					viewTransitionContextChanged = !1;
					recursivelyTraverseAfterMutationEffects(root, finishedWork);
					viewTransitionContextChanged && (finishedWork.flags |= 4);
					var props = finishedWork.memoizedProps, state = finishedWork.stateNode;
					root = getViewTransitionName(props, state);
					state = getViewTransitionName(current.memoizedProps, state);
					var className = getViewTransitionClassName(props.default, props.update);
					"none" === className ? root = !1 : (props = current.memoizedState, current.memoizedState = null, current = finishedWork.child, viewTransitionHostInstanceIdx = 0, root = measureViewTransitionHostInstancesRecursive(finishedWork, current, root, state, className, props, !0), viewTransitionHostInstanceIdx !== (null === props ? 0 : props.length) && (finishedWork.flags |= 32));
					0 !== (finishedWork.flags & 4) && root ? (scheduleViewTransitionEvent(finishedWork, finishedWork.memoizedProps.onUpdate), viewTransitionCancelableChildren = oldName) : null !== oldName && (oldName.push.apply(oldName, viewTransitionCancelableChildren), viewTransitionCancelableChildren = oldName);
					viewTransitionContextChanged = 0 !== (finishedWork.flags & 32) ? !0 : i;
					break;
				default: recursivelyTraverseAfterMutationEffects(root, finishedWork);
			}
		}
		function recursivelyTraverseLayoutEffects(root, parentFiber) {
			if (parentFiber.subtreeFlags & 8772) for (parentFiber = parentFiber.child; null !== parentFiber;) commitLayoutEffectOnFiber(root, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
		}
		function recursivelyTraverseDisappearLayoutEffects(parentFiber, layoutEffectTraversalFlags$jscomp$0) {
			for (parentFiber = parentFiber.child; null !== parentFiber;) {
				var finishedWork = parentFiber, layoutEffectTraversalFlags = layoutEffectTraversalFlags$jscomp$0;
				switch (finishedWork.tag) {
					case 0:
					case 11:
					case 14:
					case 15:
						commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
						recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
						break;
					case 1:
						safelyDetachRef(finishedWork, finishedWork.return);
						var instance = finishedWork.stateNode;
						"function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(finishedWork, finishedWork.return, instance);
						recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
						break;
					case 27: 0 !== (layoutEffectTraversalFlags & 2) && releaseSingletonInstance(finishedWork.stateNode, finishedWork.type, finishedWork.memoizedProps);
					case 5:
						safelyDetachRef(finishedWork, finishedWork.return);
						5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceDeletionEffects(finishedWork);
						recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
						break;
					case 6:
						commitFragmentInstanceDeletionEffects(finishedWork);
						break;
					case 26:
						safelyDetachRef(finishedWork, finishedWork.return);
						instance = finishedWork.stateNode;
						null !== finishedWork.memoizedState || null === instance || offscreenSubtreeWasHidden || instance.parentNode.removeChild(instance);
						recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
						break;
					case 22:
						null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
						break;
					case 30:
						safelyDetachRef(finishedWork, finishedWork.return);
						recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
						break;
					case 7: safelyDetachRef(finishedWork, finishedWork.return);
					default: recursivelyTraverseDisappearLayoutEffects(finishedWork, layoutEffectTraversalFlags);
				}
				parentFiber = parentFiber.sibling;
			}
		}
		function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, layoutEffectTraversalFlags) {
			layoutEffectTraversalFlags = 0 !== (parentFiber.subtreeFlags & 8772) ? layoutEffectTraversalFlags : layoutEffectTraversalFlags & -2;
			for (parentFiber = parentFiber.child; null !== parentFiber;) {
				var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags, includeWorkInProgressEffects = 0 !== (layoutEffectTraversalFlags & 1);
				switch (finishedWork.tag) {
					case 0:
					case 11:
					case 15:
						recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
						commitHookEffectListMount(4, finishedWork);
						break;
					case 1:
						recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
						current = finishedWork;
						finishedRoot = current.stateNode;
						if ("function" === typeof finishedRoot.componentDidMount) try {
							finishedRoot.componentDidMount();
						} catch (error) {
							captureCommitPhaseError(current, current.return, error);
						}
						current = finishedWork;
						finishedRoot = current.updateQueue;
						if (null !== finishedRoot) {
							var instance = current.stateNode;
							try {
								var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
								if (null !== hiddenCallbacks) for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++) callCallback(hiddenCallbacks[finishedRoot], instance);
							} catch (error) {
								captureCommitPhaseError(current, current.return, error);
							}
						}
						includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
						safelyAttachRef(finishedWork, finishedWork.return);
						break;
					case 27: 0 !== (layoutEffectTraversalFlags & 2) && commitHostSingletonAcquisition(finishedWork);
					case 5:
						5 !== finishedWork.tag && 27 !== finishedWork.tag || commitFragmentInstanceInsertionEffects(finishedWork);
						recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
						includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
						safelyAttachRef(finishedWork, finishedWork.return);
						break;
					case 6:
						commitFragmentInstanceInsertionEffects(finishedWork);
						break;
					case 26:
						instance = finishedWork.stateNode;
						null !== finishedWork.memoizedState || null === instance || offscreenSubtreeIsHidden || mountHoistable(getHoistableRoot(instance.ownerDocument), finishedWork.type, instance);
						recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
						includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
						safelyAttachRef(finishedWork, finishedWork.return);
						break;
					case 12:
						recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
						break;
					case 31:
						recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
						includeWorkInProgressEffects && flags & 4 && commitActivityHydrationCallbacks(finishedRoot, finishedWork);
						break;
					case 13:
						recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
						includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
						break;
					case 22:
						null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
						safelyAttachRef(finishedWork, finishedWork.return);
						break;
					case 30:
						recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
						safelyAttachRef(finishedWork, finishedWork.return);
						break;
					case 7: safelyAttachRef(finishedWork, finishedWork.return);
					default: recursivelyTraverseReappearLayoutEffects(finishedRoot, finishedWork, layoutEffectTraversalFlags);
				}
				parentFiber = parentFiber.sibling;
			}
		}
		function commitOffscreenPassiveMountEffects(current, finishedWork) {
			var previousCache = null;
			null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
			current = null;
			null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
			current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
		}
		function commitCachePassiveMountEffect(current, finishedWork) {
			current = null;
			null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
			finishedWork = finishedWork.memoizedState.cache;
			finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
		}
		function recursivelyTraversePassiveMountEffects(root, parentFiber, committedLanes, committedTransitions) {
			var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
			if (parentFiber.subtreeFlags & (isViewTransitionEligible ? 10262 : 10256)) for (parentFiber = parentFiber.child; null !== parentFiber;) commitPassiveMountOnFiber(root, parentFiber, committedLanes, committedTransitions), parentFiber = parentFiber.sibling;
			else isViewTransitionEligible && restoreNestedViewTransitions(parentFiber);
		}
		function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
			var isViewTransitionEligible = (committedLanes & 335544064) === committedLanes;
			isViewTransitionEligible && null === finishedWork.alternate && null !== finishedWork.return && null !== finishedWork.return.alternate && restoreEnterOrExitViewTransitions(finishedWork);
			var flags = finishedWork.flags;
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 15:
					recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					flags & 2048 && commitHookEffectListMount(9, finishedWork);
					break;
				case 1:
					recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					break;
				case 3:
					recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					isViewTransitionEligible && rootViewTransitionNameCanceled && (finishedRoot = finishedRoot.containerInfo, finishedRoot = 9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot, "root" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""), finishedRoot = finishedRoot.ownerDocument.documentElement, null !== finishedRoot && "none" === finishedRoot.style.viewTransitionName && (finishedRoot.style.viewTransitionName = ""));
					flags & 2048 && (flags = null, null !== finishedWork.alternate && (flags = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== flags && (finishedWork.refCount++, null != flags && releaseCache(flags)));
					break;
				case 12:
					if (flags & 2048) {
						recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
						flags = finishedWork.stateNode;
						try {
							var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
							"function" === typeof onPostCommit && onPostCommit(id, null === finishedWork.alternate ? "mount" : "update", flags.passiveEffectDuration, -0);
						} catch (error) {
							captureCommitPhaseError(finishedWork, finishedWork.return, error);
						}
					} else recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					break;
				case 31:
					recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					break;
				case 13:
					recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					break;
				case 23: break;
				case 22:
					_finishedWork$memoize2 = finishedWork.stateNode;
					id = finishedWork.alternate;
					null !== finishedWork.memoizedState ? (isViewTransitionEligible && null !== id && null === id.memoizedState && restoreEnterOrExitViewTransitions(id), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork)) : (isViewTransitionEligible && null !== id && null !== id.memoizedState && restoreEnterOrExitViewTransitions(finishedWork), _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, 0 !== (finishedWork.subtreeFlags & 10256) || !1)));
					flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
					break;
				case 24:
					recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
					break;
				case 30:
					isViewTransitionEligible && (flags = finishedWork.alternate, null !== flags && (restoreViewTransitionOnHostInstances(flags.child, !0), restoreViewTransitionOnHostInstances(finishedWork.child, !0)));
					recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
					break;
				default: recursivelyTraversePassiveMountEffects(finishedRoot, finishedWork, committedLanes, committedTransitions);
			}
		}
		function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
			includeWorkInProgressEffects = includeWorkInProgressEffects && (0 !== (parentFiber.subtreeFlags & 10256) || !1);
			for (parentFiber = parentFiber.child; null !== parentFiber;) {
				var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
				switch (finishedWork.tag) {
					case 0:
					case 11:
					case 15:
						recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
						commitHookEffectListMount(8, finishedWork);
						break;
					case 23: break;
					case 22:
						var instance = finishedWork.stateNode;
						null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects));
						includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
						break;
					case 24:
						recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
						includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
						break;
					default: recursivelyTraverseReconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects);
				}
				parentFiber = parentFiber.sibling;
			}
		}
		function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
			if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; null !== parentFiber;) {
				var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
				switch (finishedWork.tag) {
					case 22:
						recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
						flags & 2048 && commitOffscreenPassiveMountEffects(finishedWork.alternate, finishedWork);
						break;
					case 24:
						recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
						flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
						break;
					default: recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
				}
				parentFiber = parentFiber.sibling;
			}
		}
		var suspenseyCommitFlag = 8192;
		function recursivelyAccumulateSuspenseyCommit(parentFiber, committedLanes, suspendedState) {
			if (parentFiber.subtreeFlags & suspenseyCommitFlag) for (parentFiber = parentFiber.child; null !== parentFiber;) accumulateSuspenseyCommitOnFiber(parentFiber, committedLanes, suspendedState), parentFiber = parentFiber.sibling;
		}
		function accumulateSuspenseyCommitOnFiber(fiber, committedLanes, suspendedState) {
			switch (fiber.tag) {
				case 26:
					recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
					fiber.flags & suspenseyCommitFlag && (null !== fiber.memoizedState ? suspendResource(suspendedState, currentHoistableRoot, fiber.memoizedState, fiber.memoizedProps) : (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber)));
					break;
				case 5:
					recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
					fiber.flags & suspenseyCommitFlag && (fiber = fiber.stateNode, (committedLanes & 335544128) === committedLanes && suspendInstance(suspendedState, fiber));
					break;
				case 3:
				case 4:
					var previousHoistableRoot = currentHoistableRoot;
					currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
					recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
					currentHoistableRoot = previousHoistableRoot;
					break;
				case 22:
					null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState));
					break;
				case 30:
					if (0 !== (fiber.flags & suspenseyCommitFlag) && (previousHoistableRoot = fiber.memoizedProps.name, null != previousHoistableRoot && "auto" !== previousHoistableRoot)) {
						var state = fiber.stateNode;
						state.paired = null;
						null === appearingViewTransitions && (appearingViewTransitions = /* @__PURE__ */ new Map());
						appearingViewTransitions.set(previousHoistableRoot, state);
					}
					recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
					break;
				default: recursivelyAccumulateSuspenseyCommit(fiber, committedLanes, suspendedState);
			}
		}
		function detachAlternateSiblings(parentFiber) {
			var previousFiber = parentFiber.alternate;
			if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
				previousFiber.child = null;
				do
					previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
				while (null !== parentFiber);
			}
		}
		function recursivelyTraversePassiveUnmountEffects(parentFiber) {
			var deletions = parentFiber.deletions;
			if (0 !== (parentFiber.flags & 16)) {
				if (null !== deletions) for (var i = 0; i < deletions.length; i++) {
					var childToDelete = deletions[i];
					nextEffect = childToDelete;
					commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
				}
				detachAlternateSiblings(parentFiber);
			}
			if (parentFiber.subtreeFlags & 10256) for (parentFiber = parentFiber.child; null !== parentFiber;) commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
		}
		function commitPassiveUnmountOnFiber(finishedWork) {
			switch (finishedWork.tag) {
				case 0:
				case 11:
				case 15:
					recursivelyTraversePassiveUnmountEffects(finishedWork);
					finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
					break;
				case 3:
					recursivelyTraversePassiveUnmountEffects(finishedWork);
					break;
				case 12:
					recursivelyTraversePassiveUnmountEffects(finishedWork);
					break;
				case 22:
					var instance = finishedWork.stateNode;
					null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
					break;
				default: recursivelyTraversePassiveUnmountEffects(finishedWork);
			}
		}
		function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
			var deletions = parentFiber.deletions;
			if (0 !== (parentFiber.flags & 16)) {
				if (null !== deletions) for (var i = 0; i < deletions.length; i++) {
					var childToDelete = deletions[i];
					nextEffect = childToDelete;
					commitPassiveUnmountEffectsInsideOfDeletedTree_begin(childToDelete, parentFiber);
				}
				detachAlternateSiblings(parentFiber);
			}
			for (parentFiber = parentFiber.child; null !== parentFiber;) {
				deletions = parentFiber;
				switch (deletions.tag) {
					case 0:
					case 11:
					case 15:
						commitHookEffectListUnmount(8, deletions, deletions.return);
						recursivelyTraverseDisconnectPassiveEffects(deletions);
						break;
					case 22:
						i = deletions.stateNode;
						i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
						break;
					default: recursivelyTraverseDisconnectPassiveEffects(deletions);
				}
				parentFiber = parentFiber.sibling;
			}
		}
		function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
			for (; null !== nextEffect;) {
				var fiber = nextEffect;
				switch (fiber.tag) {
					case 0:
					case 11:
					case 15:
						commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
						break;
					case 23:
					case 22:
						if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
							var cache = fiber.memoizedState.cachePool.pool;
							null != cache && cache.refCount++;
						}
						break;
					case 24: releaseCache(fiber.memoizedState.cache);
				}
				cache = fiber.child;
				if (null !== cache) cache.return = fiber, nextEffect = cache;
				else a: for (fiber = deletedSubtreeRoot; null !== nextEffect;) {
					cache = nextEffect;
					var sibling = cache.sibling, returnFiber = cache.return;
					detachFiberAfterEffects(cache);
					if (cache === fiber) {
						nextEffect = null;
						break a;
					}
					if (null !== sibling) {
						sibling.return = returnFiber;
						nextEffect = sibling;
						break a;
					}
					nextEffect = returnFiber;
				}
			}
		}
		var DefaultAsyncDispatcher = {
			getCacheForType: function(resourceType) {
				var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
				void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
				return cacheForType;
			},
			cacheSignal: function() {
				return readContext(CacheContext).controller.signal;
			}
		};
		var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map;
		var executionContext = 0;
		var workInProgressRoot = null;
		var workInProgress = null;
		var workInProgressRootRenderLanes = 0;
		var workInProgressSuspendedReason = 0;
		var workInProgressThrownValue = null;
		var workInProgressRootDidSkipSuspendedSiblings = !1;
		var workInProgressRootIsPrerendering = !1;
		var workInProgressRootDidAttachPingListener = !1;
		var entangledRenderLanes = 0;
		var workInProgressRootExitStatus = 0;
		var workInProgressRootSkippedLanes = 0;
		var workInProgressRootInterleavedUpdatedLanes = 0;
		var workInProgressRootPingedLanes = 0;
		var workInProgressDeferredLane = 0;
		var workInProgressSuspendedRetryLanes = 0;
		var workInProgressRootConcurrentErrors = null;
		var workInProgressRootRecoverableErrors = null;
		var workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
		var globalMostRecentFallbackTime = 0;
		var globalMostRecentTransitionTime = 0;
		var workInProgressRootRenderTargetTime = Infinity;
		var workInProgressTransitions = null;
		var legacyErrorBoundariesThatAlreadyFailed = null;
		var pendingEffectsStatus = 0;
		var pendingEffectsRoot = null;
		var pendingFinishedWork = null;
		var pendingEffectsLanes = 0;
		var pendingEffectsRemainingLanes = 0;
		var pendingPassiveTransitions = null;
		var pendingRecoverableErrors = null;
		var pendingViewTransition = null;
		var pendingViewTransitionEvents = null;
		var pendingTransitionTypes = null;
		var nestedUpdateCount = 0;
		var rootWithNestedUpdates = null;
		function requestUpdateLane() {
			return 0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes ? workInProgressRootRenderLanes & -workInProgressRootRenderLanes : null !== ReactSharedInternals.T ? requestTransitionLane() : resolveUpdatePriority();
		}
		function requestDeferredLane() {
			if (0 === workInProgressDeferredLane) if (0 === (workInProgressRootRenderLanes & 536870912) || isHydrating) {
				var lane = nextTransitionDeferredLane;
				nextTransitionDeferredLane <<= 1;
				0 === (nextTransitionDeferredLane & 3932160) && (nextTransitionDeferredLane = 262144);
				workInProgressDeferredLane = lane;
			} else workInProgressDeferredLane = 536870912;
			lane = suspenseHandlerStackCursor.current;
			null !== lane && (lane.flags |= 32);
			return workInProgressDeferredLane;
		}
		function scheduleViewTransitionEvent(fiber, callback) {
			if (null != callback) {
				var state = fiber.stateNode, instance = state.ref;
				null === instance && (instance = state.ref = createViewTransitionInstance(getViewTransitionName(fiber.memoizedProps, state)));
				null === pendingViewTransitionEvents && (pendingViewTransitionEvents = []);
				pendingViewTransitionEvents.push(callback.bind(null, instance));
			}
		}
		function scheduleUpdateOnFiber(root, fiber, lane) {
			if (root === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root.cancelPendingCommit) prepareFreshStack(root, 0), markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
			markRootUpdated$1(root, lane);
			if (0 === (executionContext & 2) || root !== workInProgressRoot) root === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(root, workInProgressRootRenderLanes, workInProgressDeferredLane, !1)), ensureRootIsScheduled(root);
		}
		function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
			if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
			var shouldTimeSlice = !forceSync && 0 === (lanes & 127) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, !0), renderWasConcurrent = shouldTimeSlice;
			do {
				if (0 === exitStatus) {
					workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, !1);
					break;
				} else {
					forceSync = root$jscomp$0.current.alternate;
					if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
						exitStatus = renderRootSync(root$jscomp$0, lanes, !1);
						renderWasConcurrent = !1;
						continue;
					}
					if (2 === exitStatus) {
						renderWasConcurrent = lanes;
						if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent) var JSCompiler_inline_result = 0;
						else JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
						if (0 !== JSCompiler_inline_result) {
							lanes = JSCompiler_inline_result;
							a: {
								var root = root$jscomp$0;
								exitStatus = workInProgressRootConcurrentErrors;
								var wasRootDehydrated = root.current.memoizedState.isDehydrated;
								wasRootDehydrated && (prepareFreshStack(root, JSCompiler_inline_result).flags |= 256);
								JSCompiler_inline_result = renderRootSync(root, JSCompiler_inline_result, !1);
								if (2 !== JSCompiler_inline_result && 6 !== JSCompiler_inline_result) {
									if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
										root.errorRecoveryDisabledLanes |= renderWasConcurrent;
										workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
										exitStatus = 4;
										break a;
									}
									renderWasConcurrent = workInProgressRootRecoverableErrors;
									workInProgressRootRecoverableErrors = exitStatus;
									null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(workInProgressRootRecoverableErrors, renderWasConcurrent));
								}
								exitStatus = JSCompiler_inline_result;
							}
							renderWasConcurrent = !1;
							if (2 !== exitStatus) continue;
						}
					}
					if (1 === exitStatus) {
						prepareFreshStack(root$jscomp$0, 0);
						markRootSuspended(root$jscomp$0, lanes, 0, !0);
						break;
					}
					a: {
						shouldTimeSlice = root$jscomp$0;
						renderWasConcurrent = exitStatus;
						switch (renderWasConcurrent) {
							case 0:
							case 1: throw Error(formatProdErrorMessage(345));
							case 4: if ((lanes & 4194048) !== lanes && (lanes & 62914560) !== lanes) break;
							case 6:
								markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
								break a;
							case 2:
								workInProgressRootRecoverableErrors = null;
								break;
							case 3:
							case 5: break;
							default: throw Error(formatProdErrorMessage(329));
						}
						if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
							markRootSuspended(shouldTimeSlice, lanes, workInProgressDeferredLane, !workInProgressRootDidSkipSuspendedSiblings);
							if (0 !== getNextLanes(shouldTimeSlice, 0, !0)) break a;
							pendingEffectsLanes = lanes;
							shouldTimeSlice.timeoutHandle = scheduleTimeout(completeRootWhenReady.bind(null, shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, "Throttled", -0, 0), exitStatus);
							break a;
						}
						completeRootWhenReady(shouldTimeSlice, forceSync, workInProgressRootRecoverableErrors, workInProgressTransitions, workInProgressRootDidIncludeRecursiveRenderUpdate, lanes, workInProgressDeferredLane, workInProgressRootInterleavedUpdatedLanes, workInProgressSuspendedRetryLanes, workInProgressRootDidSkipSuspendedSiblings, renderWasConcurrent, null, -0, 0);
					}
				}
				break;
			} while (1);
			ensureRootIsScheduled(root$jscomp$0);
		}
		function completeRootWhenReady(root, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
			root.timeoutHandle = -1;
			var subtreeFlags = finishedWork.subtreeFlags, isViewTransitionEligible = (lanes & 335544064) === lanes;
			suspendedCommitReason = null;
			if (isViewTransitionEligible || subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408)) {
				if (suspendedCommitReason = {
					stylesheets: null,
					count: 0,
					imgCount: 0,
					imgBytes: 0,
					suspenseyImages: [],
					waitingForImages: !0,
					waitingForViewTransition: !1,
					unsuspend: noop$1
				}, appearingViewTransitions = null, accumulateSuspenseyCommitOnFiber(finishedWork, lanes, suspendedCommitReason), isViewTransitionEligible && (subtreeFlags = suspendedCommitReason, isViewTransitionEligible = root.containerInfo, isViewTransitionEligible = (9 === isViewTransitionEligible.nodeType ? isViewTransitionEligible : isViewTransitionEligible.ownerDocument).__reactViewTransition, null != isViewTransitionEligible && (subtreeFlags.count++, subtreeFlags.waitingForViewTransition = !0, subtreeFlags = onUnsuspend.bind(subtreeFlags), isViewTransitionEligible.finished.then(subtreeFlags, subtreeFlags))), subtreeFlags = (lanes & 62914560) === lanes ? globalMostRecentFallbackTime - now() : (lanes & 4194048) === lanes ? globalMostRecentTransitionTime - now() : 0, subtreeFlags = waitForCommitToBeReady(suspendedCommitReason, subtreeFlags), null !== subtreeFlags) {
					pendingEffectsLanes = lanes;
					root.cancelPendingCommit = subtreeFlags(completeRoot.bind(null, root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, null, completedRenderStartTime, completedRenderEndTime));
					markRootSuspended(root, lanes, spawnedLane, !didSkipSuspendedSiblings);
					return;
				}
			}
			completeRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason);
		}
		function isRenderConsistentWithExternalStores(finishedWork) {
			for (var node = finishedWork;;) {
				var tag = node.tag;
				if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag))) for (var i = 0; i < tag.length; i++) {
					var check = tag[i], getSnapshot = check.getSnapshot;
					check = check.value;
					try {
						if (!objectIs(getSnapshot(), check)) return !1;
					} catch (error) {
						return !1;
					}
				}
				tag = node.child;
				if (node.subtreeFlags & 16384 && null !== tag) tag.return = node, node = tag;
				else {
					if (node === finishedWork) break;
					for (; null === node.sibling;) {
						if (null === node.return || node.return === finishedWork) return !0;
						node = node.return;
					}
					node.sibling.return = node.return;
					node = node.sibling;
				}
			}
			return !0;
		}
		function markRootSuspended(root, suspendedLanes, spawnedLane, didAttemptEntireTree) {
			suspendedLanes = getEntangledLanes(root, suspendedLanes);
			suspendedLanes &= ~workInProgressRootPingedLanes;
			suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
			root.suspendedLanes |= suspendedLanes;
			root.pingedLanes &= ~suspendedLanes;
			didAttemptEntireTree && (root.warmLanes |= suspendedLanes);
			didAttemptEntireTree = root.expirationTimes;
			for (var lanes = suspendedLanes; 0 < lanes;) {
				var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
				didAttemptEntireTree[index$6] = -1;
				lanes &= ~lane;
			}
			0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, suspendedLanes);
		}
		function flushSyncWork$1() {
			return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0, !1), !1) : !0;
		}
		function resetWorkInProgressStack() {
			if (null !== workInProgress) {
				if (0 === workInProgressSuspendedReason) var interruptedWork = workInProgress.return;
				else interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
				for (; null !== interruptedWork;) unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
				workInProgress = null;
			}
		}
		function prepareFreshStack(root, lanes) {
			var timeoutHandle = root.timeoutHandle;
			-1 !== timeoutHandle && (root.timeoutHandle = -1, cancelTimeout(timeoutHandle));
			timeoutHandle = root.cancelPendingCommit;
			null !== timeoutHandle && (root.cancelPendingCommit = null, timeoutHandle());
			pendingEffectsLanes = 0;
			resetWorkInProgressStack();
			workInProgressRoot = root;
			workInProgress = timeoutHandle = createWorkInProgress(root.current, null);
			workInProgressRootRenderLanes = lanes;
			workInProgressSuspendedReason = 0;
			workInProgressThrownValue = null;
			workInProgressRootDidSkipSuspendedSiblings = !1;
			workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
			workInProgressRootDidAttachPingListener = !1;
			workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
			workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
			workInProgressRootDidIncludeRecursiveRenderUpdate = !1;
			entangledRenderLanes = getEntangledLanes(root, lanes);
			finishQueueingConcurrentUpdates();
			return timeoutHandle;
		}
		function handleThrow(root, thrownValue) {
			currentlyRenderingFiber = null;
			ReactSharedInternals.H = ContextOnlyDispatcher;
			thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
			workInProgressThrownValue = thrownValue;
			null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current)));
		}
		function shouldRemainOnPreviousScreen() {
			var handler = suspenseHandlerStackCursor.current;
			return null === handler ? !0 : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? !0 : !1 : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : !1;
		}
		function pushDispatcher() {
			var prevDispatcher = ReactSharedInternals.H;
			ReactSharedInternals.H = ContextOnlyDispatcher;
			return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
		}
		function pushAsyncDispatcher() {
			var prevAsyncDispatcher = ReactSharedInternals.A;
			ReactSharedInternals.A = DefaultAsyncDispatcher;
			return prevAsyncDispatcher;
		}
		function renderDidSuspendDelayIfPossible() {
			workInProgressRootExitStatus = 4;
			workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = !0);
			0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(workInProgressRoot, workInProgressRootRenderLanes, workInProgressDeferredLane, !1);
		}
		function renderRootSync(root, lanes, shouldYieldForPrerendering) {
			var prevExecutionContext = executionContext;
			executionContext |= 2;
			var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
			if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes) workInProgressTransitions = null, prepareFreshStack(root, lanes);
			lanes = !1;
			var exitStatus = workInProgressRootExitStatus;
			a: do
				try {
					if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
						var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
						switch (workInProgressSuspendedReason) {
							case 8:
								resetWorkInProgressStack();
								exitStatus = 6;
								break a;
							case 3:
							case 2:
							case 9:
							case 6:
								null === suspenseHandlerStackCursor.current && (lanes = !0);
								var reason = workInProgressSuspendedReason;
								workInProgressSuspendedReason = 0;
								workInProgressThrownValue = null;
								throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
								if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
									exitStatus = 0;
									break a;
								}
								break;
							default: reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
						}
					}
					workLoopSync();
					exitStatus = workInProgressRootExitStatus;
					break;
				} catch (thrownValue$184) {
					handleThrow(root, thrownValue$184);
				}
			while (1);
			lanes && root.shellSuspendCounter++;
			lastContextDependency = currentlyRenderingFiber$1 = null;
			executionContext = prevExecutionContext;
			ReactSharedInternals.H = prevDispatcher;
			ReactSharedInternals.A = prevAsyncDispatcher;
			null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
			return exitStatus;
		}
		function workLoopSync() {
			for (; null !== workInProgress;) performUnitOfWork(workInProgress);
		}
		function renderRootConcurrent(root, lanes) {
			var prevExecutionContext = executionContext;
			executionContext |= 2;
			var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
			workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
			a: do
				try {
					if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
						lanes = workInProgress;
						var thrownValue = workInProgressThrownValue;
						b: switch (workInProgressSuspendedReason) {
							case 1:
								workInProgressSuspendedReason = 0;
								workInProgressThrownValue = null;
								throwAndUnwindWorkLoop(root, lanes, thrownValue, 1);
								break;
							case 2:
							case 9:
								if (isThenableResolved(thrownValue)) {
									workInProgressSuspendedReason = 0;
									workInProgressThrownValue = null;
									replaySuspendedUnitOfWork(lanes);
									break;
								}
								lanes = function() {
									2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root || (workInProgressSuspendedReason = 7);
									ensureRootIsScheduled(root);
								};
								thrownValue.then(lanes, lanes);
								break a;
							case 3:
								workInProgressSuspendedReason = 7;
								break a;
							case 4:
								workInProgressSuspendedReason = 5;
								break a;
							case 7:
								isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, lanes, thrownValue, 7));
								break;
							case 5:
								var resource = null;
								switch (workInProgress.tag) {
									case 26: resource = workInProgress.memoizedState;
									case 5:
									case 27:
										var hostFiber = workInProgress;
										if (resource ? preloadResource(resource) : hostFiber.stateNode.complete) {
											workInProgressSuspendedReason = 0;
											workInProgressThrownValue = null;
											var sibling = hostFiber.sibling;
											if (null !== sibling) workInProgress = sibling;
											else {
												var returnFiber = hostFiber.return;
												null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
											}
											break b;
										}
								}
								workInProgressSuspendedReason = 0;
								workInProgressThrownValue = null;
								throwAndUnwindWorkLoop(root, lanes, thrownValue, 5);
								break;
							case 6:
								workInProgressSuspendedReason = 0;
								workInProgressThrownValue = null;
								throwAndUnwindWorkLoop(root, lanes, thrownValue, 6);
								break;
							case 8:
								resetWorkInProgressStack();
								workInProgressRootExitStatus = 6;
								break a;
							default: throw Error(formatProdErrorMessage(462));
						}
					}
					workLoopConcurrentByScheduler();
					break;
				} catch (thrownValue$186) {
					handleThrow(root, thrownValue$186);
				}
			while (1);
			lastContextDependency = currentlyRenderingFiber$1 = null;
			ReactSharedInternals.H = prevDispatcher;
			ReactSharedInternals.A = prevAsyncDispatcher;
			executionContext = prevExecutionContext;
			if (null !== workInProgress) return 0;
			workInProgressRoot = null;
			workInProgressRootRenderLanes = 0;
			finishQueueingConcurrentUpdates();
			return workInProgressRootExitStatus;
		}
		function workLoopConcurrentByScheduler() {
			for (; null !== workInProgress && !shouldYield();) performUnitOfWork(workInProgress);
		}
		function performUnitOfWork(unitOfWork) {
			var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
			unitOfWork.memoizedProps = unitOfWork.pendingProps;
			null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
		}
		function replaySuspendedUnitOfWork(unitOfWork) {
			var next = unitOfWork;
			var current = next.alternate;
			switch (next.tag) {
				case 15:
				case 0:
					next = replayFunctionComponent(current, next, next.pendingProps, next.type, void 0, workInProgressRootRenderLanes);
					break;
				case 11:
					next = replayFunctionComponent(current, next, next.pendingProps, next.type.render, next.ref, workInProgressRootRenderLanes);
					break;
				case 5:
					resetHooksOnUnwind(next);
					var fiber = next;
					fiber === hydrationParentFiber && (isHydrating ? (popToNextHostParent(fiber), 5 === fiber.tag && null != fiber.stateNode && (nextHydratableInstance = fiber.stateNode)) : (popToNextHostParent(fiber), isHydrating = !0));
				default: unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
			}
			unitOfWork.memoizedProps = unitOfWork.pendingProps;
			null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
		}
		function throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, suspendedReason) {
			lastContextDependency = currentlyRenderingFiber$1 = null;
			resetHooksOnUnwind(unitOfWork);
			thenableState$1 = null;
			thenableIndexCounter$1 = 0;
			var returnFiber = unitOfWork.return;
			try {
				if (throwException(root, returnFiber, unitOfWork, thrownValue, workInProgressRootRenderLanes)) {
					workInProgressRootExitStatus = 1;
					logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
					workInProgress = null;
					return;
				}
			} catch (error) {
				if (null !== returnFiber) throw workInProgress = returnFiber, error;
				workInProgressRootExitStatus = 1;
				logUncaughtError(root, createCapturedValueAtFiber(thrownValue, root.current));
				workInProgress = null;
				return;
			}
			if (unitOfWork.flags & 32768) {
				if (isHydrating || 1 === suspendedReason) root = !0;
				else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912)) root = !1;
				else if (workInProgressRootDidSkipSuspendedSiblings = root = !0, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason) suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
				unwindUnitOfWork(unitOfWork, root);
			} else completeUnitOfWork(unitOfWork);
		}
		function completeUnitOfWork(unitOfWork) {
			var completedWork = unitOfWork;
			do {
				if (0 !== (completedWork.flags & 32768)) {
					unwindUnitOfWork(completedWork, workInProgressRootDidSkipSuspendedSiblings);
					return;
				}
				unitOfWork = completedWork.return;
				var next = completeWork(completedWork.alternate, completedWork, entangledRenderLanes);
				if (null !== next) {
					workInProgress = next;
					return;
				}
				completedWork = completedWork.sibling;
				if (null !== completedWork) {
					workInProgress = completedWork;
					return;
				}
				workInProgress = completedWork = unitOfWork;
			} while (null !== completedWork);
			0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
		}
		function unwindUnitOfWork(unitOfWork, skipSiblings) {
			do {
				var next = unwindWork(unitOfWork.alternate, unitOfWork);
				if (null !== next) {
					next.flags &= 32767;
					workInProgress = next;
					return;
				}
				next = unitOfWork.return;
				null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
				if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
					workInProgress = unitOfWork;
					return;
				}
				workInProgress = unitOfWork = next;
			} while (null !== unitOfWork);
			workInProgressRootExitStatus = 6;
			workInProgress = null;
		}
		function completeRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedState) {
			root.cancelPendingCommit = null;
			do
				flushPendingEffects();
			while (0 !== pendingEffectsStatus);
			if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
			if (null !== finishedWork) {
				if (finishedWork === root.current) throw Error(formatProdErrorMessage(177));
				root === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
				pendingFinishedWork = finishedWork;
				pendingEffectsRoot = root;
				pendingEffectsLanes = lanes;
				pendingPassiveTransitions = transitions;
				pendingRecoverableErrors = recoverableErrors;
				commitRoot(root, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState);
			}
		}
		function commitRoot(root, finishedWork, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedState) {
			var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
			pendingEffectsRemainingLanes = remainingLanes;
			remainingLanes |= concurrentlyUpdatedLanes;
			markRootFinished(root, lanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes);
			pendingViewTransitionEvents = null;
			(lanes & 335544064) === lanes ? (pendingTransitionTypes = claimQueuedTransitionTypes(root), spawnedLane = 10262) : (pendingTransitionTypes = null, spawnedLane = 10256);
			0 !== (finishedWork.subtreeFlags & spawnedLane) || 0 !== (finishedWork.flags & spawnedLane) ? (root.callbackNode = null, root.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
				flushPassiveEffects();
				return null;
			})) : (root.callbackNode = null, root.callbackPriority = 0);
			shouldStartViewTransition = !1;
			spawnedLane = 0 !== (finishedWork.flags & 13878);
			if (0 !== (finishedWork.subtreeFlags & 13878) || spawnedLane) {
				spawnedLane = ReactSharedInternals.T;
				ReactSharedInternals.T = null;
				updatedLanes = ReactDOMSharedInternals.p;
				ReactDOMSharedInternals.p = 2;
				suspendedRetryLanes = executionContext;
				executionContext |= 4;
				try {
					commitBeforeMutationEffects(root, finishedWork, lanes);
				} finally {
					executionContext = suspendedRetryLanes, ReactDOMSharedInternals.p = updatedLanes, ReactSharedInternals.T = spawnedLane;
				}
			}
			pendingEffectsStatus = 1;
			shouldStartViewTransition ? pendingViewTransition = startViewTransition(suspendedState, root.containerInfo, pendingTransitionTypes, flushMutationEffects, flushLayoutEffects, flushAfterMutationEffects, flushSpawnedWork, flushPassiveEffects, reportViewTransitionError, null, null) : (flushMutationEffects(), flushLayoutEffects(), flushSpawnedWork());
		}
		function reportViewTransitionError(error) {
			if (0 !== pendingEffectsStatus) {
				var onRecoverableError = pendingEffectsRoot.onRecoverableError;
				onRecoverableError(error, { componentStack: null });
			}
		}
		function flushAfterMutationEffects() {
			3 === pendingEffectsStatus && (pendingEffectsStatus = 0, commitAfterMutationEffectsOnFiber(pendingFinishedWork, pendingEffectsRoot), pendingEffectsStatus = 4);
		}
		function flushMutationEffects() {
			if (1 === pendingEffectsStatus) {
				pendingEffectsStatus = 0;
				var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
				if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
					rootMutationHasEffect = ReactSharedInternals.T;
					ReactSharedInternals.T = null;
					var previousPriority = ReactDOMSharedInternals.p;
					ReactDOMSharedInternals.p = 2;
					var prevExecutionContext = executionContext;
					executionContext |= 4;
					try {
						inUpdateViewTransition = rootViewTransitionAffected = !1;
						commitMutationEffectsOnFiber(finishedWork, root, lanes);
						lanes = selectionInformation;
						var curFocusedElem = getActiveElementDeep(root.containerInfo), priorFocusedElem = lanes.focusedElem, priorSelectionRange = lanes.selectionRange;
						if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(priorFocusedElem.ownerDocument.documentElement, priorFocusedElem)) {
							if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
								var start = priorSelectionRange.start, end = priorSelectionRange.end;
								void 0 === end && (end = start);
								if ("selectionStart" in priorFocusedElem) priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(end, priorFocusedElem.value.length);
								else {
									var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
									if (win.getSelection) {
										var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(priorSelectionRange.start, length), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
										!selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
										var startMarker = getNodeForCharacterOffset(priorFocusedElem, start$jscomp$0), endMarker = getNodeForCharacterOffset(priorFocusedElem, end$jscomp$0);
										if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
											var range = doc.createRange();
											range.setStart(startMarker.node, startMarker.offset);
											selection.removeAllRanges();
											start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
										}
									}
								}
							}
							doc = [];
							for (selection = priorFocusedElem; selection = selection.parentNode;) 1 === selection.nodeType && doc.push({
								element: selection,
								left: selection.scrollLeft,
								top: selection.scrollTop
							});
							"function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
							for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
								var info = doc[priorFocusedElem];
								info.element.scrollLeft = info.left;
								info.element.scrollTop = info.top;
							}
						}
						_enabled = !!eventsEnabled;
						selectionInformation = eventsEnabled = null;
					} finally {
						executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
					}
				}
				root.current = finishedWork;
				pendingEffectsStatus = 2;
			}
		}
		function flushLayoutEffects() {
			if (2 === pendingEffectsStatus) {
				pendingEffectsStatus = 0;
				var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
				if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
					rootHasLayoutEffect = ReactSharedInternals.T;
					ReactSharedInternals.T = null;
					var previousPriority = ReactDOMSharedInternals.p;
					ReactDOMSharedInternals.p = 2;
					var prevExecutionContext = executionContext;
					executionContext |= 4;
					try {
						commitLayoutEffectOnFiber(root, finishedWork.alternate, finishedWork);
					} finally {
						executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
					}
				}
				pendingEffectsStatus = 3;
			}
		}
		function flushSpawnedWork() {
			if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
				pendingEffectsStatus = 0;
				var committedViewTransition = pendingViewTransition;
				pendingViewTransition = null;
				requestPaint();
				var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors, passiveSubtreeMask = (lanes & 335544064) === lanes ? 10262 : 10256;
				0 !== (finishedWork.subtreeFlags & passiveSubtreeMask) || 0 !== (finishedWork.flags & passiveSubtreeMask) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root, root.pendingLanes));
				passiveSubtreeMask = root.pendingLanes;
				0 === passiveSubtreeMask && (legacyErrorBoundariesThatAlreadyFailed = null);
				lanesToEventPriority(lanes);
				finishedWork = finishedWork.stateNode;
				if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot) try {
					injectedHook.onCommitFiberRoot(rendererID, finishedWork, void 0, 128 === (finishedWork.current.flags & 128));
				} catch (err) {}
				if (null !== recoverableErrors) {
					finishedWork = ReactSharedInternals.T;
					passiveSubtreeMask = ReactDOMSharedInternals.p;
					ReactDOMSharedInternals.p = 2;
					ReactSharedInternals.T = null;
					try {
						for (var onRecoverableError = root.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
							var recoverableError = recoverableErrors[i];
							onRecoverableError(recoverableError.value, { componentStack: recoverableError.stack });
						}
					} finally {
						ReactSharedInternals.T = finishedWork, ReactDOMSharedInternals.p = passiveSubtreeMask;
					}
				}
				recoverableErrors = pendingViewTransitionEvents;
				onRecoverableError = pendingTransitionTypes;
				pendingTransitionTypes = null;
				if (null !== recoverableErrors && (pendingViewTransitionEvents = null, null === onRecoverableError && (onRecoverableError = []), null !== committedViewTransition)) for (recoverableError = 0; recoverableError < recoverableErrors.length; recoverableError++) finishedWork = (0, recoverableErrors[recoverableError])(onRecoverableError), void 0 !== finishedWork && committedViewTransition.finished.finally(finishedWork);
				0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
				ensureRootIsScheduled(root);
				passiveSubtreeMask = root.pendingLanes;
				0 !== (lanes & 261930) && 0 !== (passiveSubtreeMask & 42) ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : (nestedUpdateCount = 0, rootWithNestedUpdates = null);
				flushSyncWorkAcrossRoots_impl(0, !1);
			}
		}
		function releaseRootPooledCache(root, remainingLanes) {
			0 === (root.pooledCacheLanes &= remainingLanes) && (remainingLanes = root.pooledCache, null != remainingLanes && (root.pooledCache = null, releaseCache(remainingLanes)));
		}
		function flushPendingEffects() {
			null !== pendingViewTransition && (pendingViewTransition.skipTransition(), pendingViewTransition = null);
			flushMutationEffects();
			flushLayoutEffects();
			flushSpawnedWork();
			return flushPassiveEffects();
		}
		function flushPassiveEffects() {
			if (5 !== pendingEffectsStatus) return !1;
			var root = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
			pendingEffectsRemainingLanes = 0;
			var renderPriority = lanesToEventPriority(pendingEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
			try {
				ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
				ReactSharedInternals.T = null;
				renderPriority = pendingPassiveTransitions;
				pendingPassiveTransitions = null;
				var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
				pendingEffectsStatus = 0;
				pendingFinishedWork = pendingEffectsRoot = null;
				pendingEffectsLanes = 0;
				if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(331));
				var prevExecutionContext = executionContext;
				executionContext |= 4;
				commitPassiveUnmountOnFiber(root$jscomp$0.current);
				commitPassiveMountOnFiber(root$jscomp$0, root$jscomp$0.current, lanes, renderPriority);
				executionContext = prevExecutionContext;
				flushSyncWorkAcrossRoots_impl(0, !1);
				if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot) try {
					injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
				} catch (err) {}
				return !0;
			} finally {
				ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root, remainingLanes);
			}
		}
		function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
			sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
			sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
			rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
			null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
		}
		function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
			if (3 === sourceFiber.tag) captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
			else for (; null !== nearestMountedAncestor;) {
				if (3 === nearestMountedAncestor.tag) {
					captureCommitPhaseErrorOnRoot(nearestMountedAncestor, sourceFiber, error);
					break;
				} else if (1 === nearestMountedAncestor.tag) {
					var instance = nearestMountedAncestor.stateNode;
					if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
						sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
						error = createClassErrorUpdate(2);
						instance = enqueueUpdate(nearestMountedAncestor, error, 2);
						null !== instance && (initializeClassErrorUpdate(error, instance, nearestMountedAncestor, sourceFiber), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
						break;
					}
				}
				nearestMountedAncestor = nearestMountedAncestor.return;
			}
		}
		function attachPingListener(root, wakeable, lanes) {
			var pingCache = root.pingCache;
			if (null === pingCache) {
				pingCache = root.pingCache = new PossiblyWeakMap();
				var threadIDs = /* @__PURE__ */ new Set();
				pingCache.set(wakeable, threadIDs);
			} else threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
			threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = !0, threadIDs.add(lanes), root = pingSuspendedRoot.bind(null, root, wakeable, lanes), wakeable.then(root, root));
		}
		function pingSuspendedRoot(root, wakeable, pingedLanes) {
			var pingCache = root.pingCache;
			null !== pingCache && pingCache.delete(wakeable);
			root.pingedLanes |= root.suspendedLanes & pingedLanes;
			root.warmLanes &= ~pingedLanes;
			workInProgressRoot === root && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) ? prepareFreshStack(root, 0) : workInProgressRootPingedLanes |= pingedLanes : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
			ensureRootIsScheduled(root);
		}
		function retryTimedOutBoundary(boundaryFiber, retryLane) {
			0 === retryLane && (retryLane = claimNextRetryLane());
			boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
			null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
		}
		function retryDehydratedSuspenseBoundary(boundaryFiber) {
			var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
			null !== suspenseState && (retryLane = suspenseState.retryLane);
			retryTimedOutBoundary(boundaryFiber, retryLane);
		}
		function resolveRetryWakeable(boundaryFiber, wakeable) {
			var retryLane = 0;
			switch (boundaryFiber.tag) {
				case 31:
				case 13:
					var retryCache = boundaryFiber.stateNode;
					var suspenseState = boundaryFiber.memoizedState;
					null !== suspenseState && (retryLane = suspenseState.retryLane);
					break;
				case 19:
					retryCache = boundaryFiber.stateNode;
					break;
				case 22:
					retryCache = boundaryFiber.stateNode._retryCache;
					break;
				default: throw Error(formatProdErrorMessage(314));
			}
			null !== retryCache && retryCache.delete(wakeable);
			retryTimedOutBoundary(boundaryFiber, retryLane);
		}
		function scheduleCallback$1(priorityLevel, callback) {
			return scheduleCallback$3(priorityLevel, callback);
		}
		var firstScheduledRoot = null;
		var lastScheduledRoot = null;
		var didScheduleMicrotask = !1;
		var mightHavePendingSyncWork = !1;
		var isFlushingWork = !1;
		var currentEventTransitionLane = 0;
		function ensureRootIsScheduled(root) {
			root !== lastScheduledRoot && null === root.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root : lastScheduledRoot = lastScheduledRoot.next = root);
			mightHavePendingSyncWork = !0;
			didScheduleMicrotask || (didScheduleMicrotask = !0, scheduleImmediateRootScheduleTask());
		}
		function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
			if (!isFlushingWork && mightHavePendingSyncWork) {
				isFlushingWork = !0;
				do {
					var didPerformSomeWork = !1;
					for (var root$190 = firstScheduledRoot; null !== root$190;) {
						if (!onlyLegacy) if (0 !== syncTransitionLanes) {
							var pendingLanes = root$190.pendingLanes;
							if (0 === pendingLanes) var JSCompiler_inline_result = 0;
							else {
								var suspendedLanes = root$190.suspendedLanes, pingedLanes = root$190.pingedLanes;
								JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
								JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
								JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
							}
							0 !== JSCompiler_inline_result && (didPerformSomeWork = !0, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
						} else JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(root$190, root$190 === workInProgressRoot ? JSCompiler_inline_result : 0, null !== root$190.cancelPendingCommit || -1 !== root$190.timeoutHandle), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$190, JSCompiler_inline_result) || (didPerformSomeWork = !0, performSyncWorkOnRoot(root$190, JSCompiler_inline_result));
						root$190 = root$190.next;
					}
				} while (didPerformSomeWork);
				isFlushingWork = !1;
			}
		}
		function processRootScheduleInImmediateTask() {
			processRootScheduleInMicrotask();
		}
		function processRootScheduleInMicrotask() {
			mightHavePendingSyncWork = didScheduleMicrotask = !1;
			var syncTransitionLanes = 0;
			0 !== currentEventTransitionLane && shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane);
			for (var currentTime = now(), prev = null, root = firstScheduledRoot; null !== root;) {
				var next = root.next, nextLanes = scheduleTaskForRootDuringMicrotask(root, currentTime);
				if (0 === nextLanes) root.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
				else if (prev = root, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3)) mightHavePendingSyncWork = !0;
				root = next;
			}
			0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus || flushSyncWorkAcrossRoots_impl(syncTransitionLanes, !1);
			0 !== currentEventTransitionLane && (currentEventTransitionLane = 0);
		}
		function scheduleTaskForRootDuringMicrotask(root, currentTime) {
			for (var suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes, expirationTimes = root.expirationTimes, lanes = root.pendingLanes & -62914561; 0 < lanes;) {
				var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
				if (-1 === expirationTime) {
					if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes)) expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
				} else expirationTime <= currentTime && (root.expiredLanes |= lane);
				lanes &= ~lane;
			}
			currentTime = workInProgressRoot;
			suspendedLanes = workInProgressRootRenderLanes;
			suspendedLanes = getNextLanes(root, root === currentTime ? suspendedLanes : 0, null !== root.cancelPendingCommit || -1 !== root.timeoutHandle);
			pingedLanes = root.callbackNode;
			if (0 === suspendedLanes || root === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root.cancelPendingCommit) return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root.callbackNode = null, root.callbackPriority = 0;
			if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root, suspendedLanes)) {
				currentTime = suspendedLanes & -suspendedLanes;
				if (currentTime === root.callbackPriority) return currentTime;
				null !== pingedLanes && cancelCallback$1(pingedLanes);
				switch (lanesToEventPriority(suspendedLanes)) {
					case 2:
					case 8:
						suspendedLanes = UserBlockingPriority;
						break;
					case 32:
						suspendedLanes = NormalPriority$1;
						break;
					case 268435456:
						suspendedLanes = IdlePriority;
						break;
					default: suspendedLanes = NormalPriority$1;
				}
				pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root);
				suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
				root.callbackPriority = currentTime;
				root.callbackNode = suspendedLanes;
				return currentTime;
			}
			null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
			root.callbackPriority = 2;
			root.callbackNode = null;
			return 2;
		}
		function performWorkOnRootViaSchedulerTask(root, didTimeout) {
			if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus) return root.callbackNode = null, root.callbackPriority = 0, null;
			var originalCallbackNode = root.callbackNode;
			if (flushPendingEffects() && root.callbackNode !== originalCallbackNode) return null;
			var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
			workInProgressRootRenderLanes$jscomp$0 = getNextLanes(root, root === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0, null !== root.cancelPendingCommit || -1 !== root.timeoutHandle);
			if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
			performWorkOnRoot(root, workInProgressRootRenderLanes$jscomp$0, didTimeout);
			scheduleTaskForRootDuringMicrotask(root, now());
			return null != root.callbackNode && root.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root) : null;
		}
		function performSyncWorkOnRoot(root, lanes) {
			if (flushPendingEffects()) return null;
			performWorkOnRoot(root, lanes, !0);
		}
		function scheduleImmediateRootScheduleTask() {
			scheduleMicrotask(function() {
				0 !== (executionContext & 6) ? scheduleCallback$3(ImmediatePriority, processRootScheduleInImmediateTask) : processRootScheduleInMicrotask();
			});
		}
		function requestTransitionLane() {
			if (0 === currentEventTransitionLane) {
				var actionScopeLane = currentEntangledLane;
				0 === actionScopeLane && (actionScopeLane = nextTransitionUpdateLane, nextTransitionUpdateLane <<= 1, 0 === (nextTransitionUpdateLane & 261888) && (nextTransitionUpdateLane = 256));
				currentEventTransitionLane = actionScopeLane;
			}
			return currentEventTransitionLane;
		}
		function coerceFormActionProp(actionProp) {
			return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL(actionProp);
		}
		function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
			if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
				var action = coerceFormActionProp((nativeEventTarget[internalPropsKey] || null).action), submitter = nativeEvent.submitter;
				submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
				var event = new SyntheticEvent("action", "action", null, nativeEvent, nativeEventTarget);
				dispatchQueue.push({
					event,
					listeners: [{
						instance: null,
						listener: function() {
							if (nativeEvent.defaultPrevented) {
								if (0 !== currentEventTransitionLane) {
									var formData = new FormData(nativeEventTarget, submitter);
									startHostTransition(maybeTargetInst, {
										pending: !0,
										data: formData,
										method: nativeEventTarget.method,
										action
									}, null, formData);
								}
							} else "function" === typeof action && (event.preventDefault(), formData = new FormData(nativeEventTarget, submitter), startHostTransition(maybeTargetInst, {
								pending: !0,
								data: formData,
								method: nativeEventTarget.method,
								action
							}, action, formData));
						},
						currentTarget: nativeEventTarget
					}]
				});
			}
		}
		for (var i$jscomp$inline_1667 = 0; i$jscomp$inline_1667 < simpleEventPluginEvents.length; i$jscomp$inline_1667++) {
			var eventName$jscomp$inline_1668 = simpleEventPluginEvents[i$jscomp$inline_1667];
			registerSimpleEvent(eventName$jscomp$inline_1668.toLowerCase(), "on" + (eventName$jscomp$inline_1668[0].toUpperCase() + eventName$jscomp$inline_1668.slice(1)));
		}
		registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
		registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
		registerSimpleEvent(ANIMATION_START, "onAnimationStart");
		registerSimpleEvent("dblclick", "onDoubleClick");
		registerSimpleEvent("focusin", "onFocus");
		registerSimpleEvent("focusout", "onBlur");
		registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
		registerSimpleEvent(TRANSITION_START, "onTransitionStart");
		registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
		registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
		registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
		registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
		registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
		registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
		registerTwoPhaseEvent("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
		registerTwoPhaseEvent("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
		registerTwoPhaseEvent("onBeforeInput", [
			"compositionend",
			"keypress",
			"textInput",
			"paste"
		]);
		registerTwoPhaseEvent("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
		registerTwoPhaseEvent("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
		registerTwoPhaseEvent("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
		var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
		var nonDelegatedEvents = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes));
		function processDispatchQueue(dispatchQueue, eventSystemFlags) {
			eventSystemFlags = 0 !== (eventSystemFlags & 4);
			for (var i = 0; i < dispatchQueue.length; i++) {
				var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
				_dispatchQueue$i = _dispatchQueue$i.listeners;
				a: {
					var previousInstance = void 0;
					if (eventSystemFlags) for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
						var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
						_dispatchListeners$i = _dispatchListeners$i.listener;
						if (instance !== previousInstance && event.isPropagationStopped()) break a;
						previousInstance = _dispatchListeners$i;
						event.currentTarget = currentTarget;
						try {
							previousInstance(event);
						} catch (error) {
							reportGlobalError(error);
						}
						event.currentTarget = null;
						previousInstance = instance;
					}
					else for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
						_dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
						instance = _dispatchListeners$i.instance;
						currentTarget = _dispatchListeners$i.currentTarget;
						_dispatchListeners$i = _dispatchListeners$i.listener;
						if (instance !== previousInstance && event.isPropagationStopped()) break a;
						previousInstance = _dispatchListeners$i;
						event.currentTarget = currentTarget;
						try {
							previousInstance(event);
						} catch (error) {
							reportGlobalError(error);
						}
						event.currentTarget = null;
						previousInstance = instance;
					}
				}
			}
		}
		function listenToNonDelegatedEvent(domEventName, targetElement) {
			var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
			void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
			var listenerSetKey = domEventName + "__bubble";
			JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, !1), JSCompiler_inline_result.add(listenerSetKey));
		}
		function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
			var eventSystemFlags = 0;
			isCapturePhaseListener && (eventSystemFlags |= 4);
			addTrappedEventListener(target, domEventName, eventSystemFlags, isCapturePhaseListener);
		}
		var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
		function listenToAllSupportedEvents(rootContainerElement) {
			if (!rootContainerElement[listeningMarker]) {
				rootContainerElement[listeningMarker] = !0;
				allNativeEvents.forEach(function(domEventName) {
					"selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, !1, rootContainerElement), listenToNativeEvent(domEventName, !0, rootContainerElement));
				});
				var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
				null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = !0, listenToNativeEvent("selectionchange", !1, ownerDocument));
			}
		}
		function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
			switch (getEventPriority(domEventName)) {
				case 2:
					var listenerWrapper = dispatchDiscreteEvent;
					break;
				case 8:
					listenerWrapper = dispatchContinuousEvent;
					break;
				default: listenerWrapper = dispatchEvent;
			}
			eventSystemFlags = listenerWrapper.bind(null, domEventName, eventSystemFlags, targetContainer);
			listenerWrapper = void 0;
			!passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = !0);
			isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
				capture: !0,
				passive: listenerWrapper
			}) : targetContainer.addEventListener(domEventName, eventSystemFlags, !0) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, { passive: listenerWrapper }) : targetContainer.addEventListener(domEventName, eventSystemFlags, !1);
		}
		function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
			var ancestorInst = targetInst$jscomp$0;
			if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0) a: for (;;) {
				if (null === targetInst$jscomp$0) return;
				var nodeTag = targetInst$jscomp$0.tag;
				if (3 === nodeTag || 4 === nodeTag) {
					var container = targetInst$jscomp$0.stateNode.containerInfo;
					if (container === targetContainer) break;
					if (4 === nodeTag) for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag;) {
						var grandTag = nodeTag.tag;
						if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer) return;
						nodeTag = nodeTag.return;
					}
					for (; null !== container;) {
						nodeTag = getClosestInstanceFromNode(container);
						if (null === nodeTag) return;
						grandTag = nodeTag.tag;
						if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
							targetInst$jscomp$0 = ancestorInst = nodeTag;
							continue a;
						}
						container = container.parentNode;
					}
				}
				targetInst$jscomp$0 = targetInst$jscomp$0.return;
			}
			batchedUpdates$1(function() {
				var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
				a: {
					var reactName = topLevelEventsToReactNames.get(domEventName);
					if (void 0 !== reactName) {
						var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
						switch (domEventName) {
							case "keypress": if (0 === getEventCharCode(nativeEvent)) break a;
							case "keydown":
							case "keyup":
								SyntheticEventCtor = SyntheticKeyboardEvent;
								break;
							case "focusin":
								reactEventType = "focus";
								SyntheticEventCtor = SyntheticFocusEvent;
								break;
							case "focusout":
								reactEventType = "blur";
								SyntheticEventCtor = SyntheticFocusEvent;
								break;
							case "beforeblur":
							case "afterblur":
								SyntheticEventCtor = SyntheticFocusEvent;
								break;
							case "click": if (2 === nativeEvent.button) break a;
							case "auxclick":
							case "dblclick":
							case "mousedown":
							case "mousemove":
							case "mouseup":
							case "mouseout":
							case "mouseover":
							case "contextmenu":
								SyntheticEventCtor = SyntheticMouseEvent;
								break;
							case "drag":
							case "dragend":
							case "dragenter":
							case "dragexit":
							case "dragleave":
							case "dragover":
							case "dragstart":
							case "drop":
								SyntheticEventCtor = SyntheticDragEvent;
								break;
							case "touchcancel":
							case "touchend":
							case "touchmove":
							case "touchstart":
								SyntheticEventCtor = SyntheticTouchEvent;
								break;
							case ANIMATION_END:
							case ANIMATION_ITERATION:
							case ANIMATION_START:
								SyntheticEventCtor = SyntheticAnimationEvent;
								break;
							case TRANSITION_END:
								SyntheticEventCtor = SyntheticTransitionEvent;
								break;
							case "scroll":
							case "scrollend":
								SyntheticEventCtor = SyntheticUIEvent;
								break;
							case "wheel":
								SyntheticEventCtor = SyntheticWheelEvent;
								break;
							case "copy":
							case "cut":
							case "paste":
								SyntheticEventCtor = SyntheticClipboardEvent;
								break;
							case "gotpointercapture":
							case "lostpointercapture":
							case "pointercancel":
							case "pointerdown":
							case "pointermove":
							case "pointerout":
							case "pointerover":
							case "pointerup":
								SyntheticEventCtor = SyntheticPointerEvent;
								break;
							case "submit":
								SyntheticEventCtor = SyntheticSubmitEvent;
								break;
							case "toggle":
							case "beforetoggle": SyntheticEventCtor = SyntheticToggleEvent;
						}
						var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
						inCapturePhase = [];
						for (var instance = targetInst, lastHostComponent; null !== instance;) {
							var _instance = instance;
							lastHostComponent = _instance.stateNode;
							_instance = _instance.tag;
							5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(createDispatchListener(instance, _instance, lastHostComponent)));
							if (accumulateTargetOnly) break;
							instance = instance.return;
						}
						0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(reactName, reactEventType, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
							event: reactName,
							listeners: inCapturePhase
						}));
					}
				}
				if (0 === (eventSystemFlags & 7)) {
					a: {
						SyntheticEventCtor = "mouseover" === domEventName || "pointerover" === domEventName;
						reactName = "mouseout" === domEventName || "pointerout" === domEventName;
						if (SyntheticEventCtor && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey])) break a;
						if (reactName || SyntheticEventCtor) {
							reactEventType = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (SyntheticEventCtor = nativeEventTarget.ownerDocument) ? SyntheticEventCtor.defaultView || SyntheticEventCtor.parentWindow : window;
							if (reactName) {
								if (SyntheticEventCtor = nativeEvent.relatedTarget || nativeEvent.toElement, reactName = targetInst, SyntheticEventCtor = SyntheticEventCtor ? getClosestInstanceFromNode(SyntheticEventCtor) : null, null !== SyntheticEventCtor && (accumulateTargetOnly = getNearestMountedFiber(SyntheticEventCtor), inCapturePhase = SyntheticEventCtor.tag, SyntheticEventCtor !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase)) SyntheticEventCtor = null;
							} else reactName = null, SyntheticEventCtor = targetInst;
							if (reactName !== SyntheticEventCtor) {
								inCapturePhase = SyntheticMouseEvent;
								_instance = "onMouseLeave";
								reactEventName = "onMouseEnter";
								instance = "mouse";
								if ("pointerout" === domEventName || "pointerover" === domEventName) inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
								accumulateTargetOnly = null == reactName ? reactEventType : getNodeFromInstance(reactName);
								lastHostComponent = null == SyntheticEventCtor ? reactEventType : getNodeFromInstance(SyntheticEventCtor);
								reactEventType = new inCapturePhase(_instance, instance + "leave", reactName, nativeEvent, nativeEventTarget);
								reactEventType.target = accumulateTargetOnly;
								reactEventType.relatedTarget = lastHostComponent;
								_instance = null;
								getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(reactEventName, instance + "enter", SyntheticEventCtor, nativeEvent, nativeEventTarget), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
								accumulateTargetOnly = _instance;
								inCapturePhase = reactName && SyntheticEventCtor ? getLowestCommonAncestor(reactName, SyntheticEventCtor, getParent) : null;
								null !== reactName && accumulateEnterLeaveListenersForEvent(dispatchQueue, reactEventType, reactName, inCapturePhase, !1);
								null !== SyntheticEventCtor && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(dispatchQueue, accumulateTargetOnly, SyntheticEventCtor, inCapturePhase, !0);
							}
						}
					}
					a: {
						reactName = targetInst ? getNodeFromInstance(targetInst) : window;
						SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
						if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type) var getTargetInstFunc = getTargetInstForChangeEvent;
						else if (isTextInputElement(reactName)) if (isInputEventSupported) getTargetInstFunc = getTargetInstForInputOrChangeEvent;
						else {
							getTargetInstFunc = getTargetInstForInputEventPolyfill;
							var handleEventFunc = handleEventsForInputEventPolyfill;
						}
						else SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
						if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
							createAndAccumulateChangeEvent(dispatchQueue, getTargetInstFunc, nativeEvent, nativeEventTarget);
							break a;
						}
						handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
					}
					handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
					switch (domEventName) {
						case "focusin":
							if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable) activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
							break;
						case "focusout":
							lastSelection = activeElementInst = activeElement = null;
							break;
						case "mousedown":
							mouseDown = !0;
							break;
						case "contextmenu":
						case "mouseup":
						case "dragend":
							mouseDown = !1;
							constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
							break;
						case "selectionchange": if (skipSelectionChangeEvent) break;
						case "keydown":
						case "keyup": constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
					}
					var fallbackData;
					if (canUseCompositionEvent) b: {
						switch (domEventName) {
							case "compositionstart":
								var eventType = "onCompositionStart";
								break b;
							case "compositionend":
								eventType = "onCompositionEnd";
								break b;
							case "compositionupdate":
								eventType = "onCompositionUpdate";
								break b;
						}
						eventType = void 0;
					}
					else isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
					eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = !0)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(eventType, domEventName, null, nativeEvent, nativeEventTarget), dispatchQueue.push({
						event: eventType,
						listeners: handleEventFunc
					}), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
					if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent)) eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent("onBeforeInput", "beforeinput", null, nativeEvent, nativeEventTarget), dispatchQueue.push({
						event: handleEventFunc,
						listeners: eventType
					}), handleEventFunc.data = fallbackData);
					extractEvents$1(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget);
				}
				processDispatchQueue(dispatchQueue, eventSystemFlags);
			});
		}
		function createDispatchListener(instance, listener, currentTarget) {
			return {
				instance,
				listener,
				currentTarget
			};
		}
		function accumulateTwoPhaseListeners(targetFiber, reactName) {
			for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber;) {
				var _instance2 = targetFiber, stateNode = _instance2.stateNode;
				_instance2 = _instance2.tag;
				5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(createDispatchListener(targetFiber, _instance2, stateNode)), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(createDispatchListener(targetFiber, _instance2, stateNode)));
				if (3 === targetFiber.tag) return listeners;
				targetFiber = targetFiber.return;
			}
			return [];
		}
		function getParent(inst) {
			if (null === inst) return null;
			do
				inst = inst.return;
			while (inst && 5 !== inst.tag && 27 !== inst.tag);
			return inst ? inst : null;
		}
		function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
			for (var registrationName = event._reactName, listeners = []; null !== target && target !== common;) {
				var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
				_instance3 = _instance3.tag;
				if (null !== alternate && alternate === common) break;
				5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(createDispatchListener(target, stateNode, alternate))) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(createDispatchListener(target, stateNode, alternate))));
				target = target.return;
			}
			0 !== listeners.length && dispatchQueue.push({
				event,
				listeners
			});
		}
		var NORMALIZE_NEWLINES_REGEX = /\r\n?/g;
		var NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
		function normalizeMarkupForTextOrAttribute(markup) {
			return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
		}
		function checkForUnmatchedText(serverText, clientText) {
			clientText = normalizeMarkupForTextOrAttribute(clientText);
			return normalizeMarkupForTextOrAttribute(serverText) === clientText ? !0 : !1;
		}
		function setProp(domElement, tag, key, value, props, prevValue) {
			switch (key) {
				case "children":
					if ("string" === typeof value) "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value);
					else if ("number" === typeof value || "bigint" === typeof value) "body" !== tag && setTextContent(domElement, "" + value);
					else return;
					break;
				case "className":
					setValueForKnownAttribute(domElement, "class", value);
					break;
				case "tabIndex":
					setValueForKnownAttribute(domElement, "tabindex", value);
					break;
				case "dir":
				case "role":
				case "viewBox":
				case "width":
				case "height":
					setValueForKnownAttribute(domElement, key, value);
					break;
				case "style":
					setValueForStyles(domElement, value, prevValue);
					return;
				case "data": if ("object" !== tag) {
					setValueForKnownAttribute(domElement, "data", value);
					break;
				}
				case "src":
				case "href":
					if ("" === value && ("a" !== tag || "href" !== key)) {
						domElement.removeAttribute(key);
						break;
					}
					if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
						domElement.removeAttribute(key);
						break;
					}
					value = sanitizeURL(value);
					domElement.setAttribute(key, value);
					break;
				case "action":
				case "formAction":
					if ("function" === typeof value) {
						domElement.setAttribute(key, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
						break;
					} else "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(domElement, tag, "formEncType", props.formEncType, props, null), setProp(domElement, tag, "formMethod", props.formMethod, props, null), setProp(domElement, tag, "formTarget", props.formTarget, props, null)) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
					if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
						domElement.removeAttribute(key);
						break;
					}
					value = sanitizeURL(value);
					domElement.setAttribute(key, value);
					break;
				case "onClick":
					null != value && (domElement.onclick = noop$1);
					return;
				case "onScroll":
					null != value && listenToNonDelegatedEvent("scroll", domElement);
					return;
				case "onScrollEnd":
					null != value && listenToNonDelegatedEvent("scrollend", domElement);
					return;
				case "dangerouslySetInnerHTML":
					if (null != value) {
						if ("object" !== typeof value || !("__html" in value)) throw Error(formatProdErrorMessage(61));
						key = value.__html;
						if (null != key) {
							if (null != props.children) throw Error(formatProdErrorMessage(60));
							(null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
						}
					}
					break;
				case "multiple":
					domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
					break;
				case "muted":
					domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
					break;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "defaultValue":
				case "defaultChecked":
				case "innerHTML":
				case "ref": break;
				case "autoFocus": break;
				case "xlinkHref":
					if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
						domElement.removeAttribute("xlink:href");
						break;
					}
					key = sanitizeURL(value);
					domElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", key);
					break;
				case "contentEditable":
				case "spellCheck":
				case "draggable":
				case "value":
				case "autoReverse":
				case "externalResourcesRequired":
				case "focusable":
				case "preserveAlpha":
					null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
					break;
				case "inert":
				case "allowFullScreen":
				case "async":
				case "autoPlay":
				case "controls":
				case "credentialless":
				case "default":
				case "defer":
				case "disabled":
				case "disablePictureInPicture":
				case "disableRemotePlayback":
				case "formNoValidate":
				case "hidden":
				case "loop":
				case "noModule":
				case "noValidate":
				case "open":
				case "playsInline":
				case "readOnly":
				case "required":
				case "reversed":
				case "scoped":
				case "seamless":
				case "itemScope":
					value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
					break;
				case "capture":
				case "download":
					!0 === value ? domElement.setAttribute(key, "") : !1 !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
					break;
				case "cols":
				case "rows":
				case "size":
				case "span":
					null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
					break;
				case "rowSpan":
				case "start":
					null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
					break;
				case "popover":
					listenToNonDelegatedEvent("beforetoggle", domElement);
					listenToNonDelegatedEvent("toggle", domElement);
					setValueForAttribute(domElement, "popover", value);
					break;
				case "xlinkActuate":
					setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:actuate", value);
					break;
				case "xlinkArcrole":
					setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:arcrole", value);
					break;
				case "xlinkRole":
					setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:role", value);
					break;
				case "xlinkShow":
					setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:show", value);
					break;
				case "xlinkTitle":
					setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:title", value);
					break;
				case "xlinkType":
					setValueForNamespacedAttribute(domElement, "http://www.w3.org/1999/xlink", "xlink:type", value);
					break;
				case "xmlBase":
					setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:base", value);
					break;
				case "xmlLang":
					setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:lang", value);
					break;
				case "xmlSpace":
					setValueForNamespacedAttribute(domElement, "http://www.w3.org/XML/1998/namespace", "xml:space", value);
					break;
				case "is":
					setValueForAttribute(domElement, "is", value);
					break;
				case "innerText":
				case "textContent": return;
				default: if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1]) key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
				else return;
			}
			viewTransitionMutationContext = !0;
		}
		function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
			switch (key) {
				case "style":
					setValueForStyles(domElement, value, prevValue);
					return;
				case "dangerouslySetInnerHTML":
					if (null != value) {
						if ("object" !== typeof value || !("__html" in value)) throw Error(formatProdErrorMessage(61));
						key = value.__html;
						if (null != key) {
							if (null != props.children) throw Error(formatProdErrorMessage(60));
							(null != prevValue ? prevValue.__html : void 0) !== key && (domElement.innerHTML = key);
						}
					}
					break;
				case "children":
					if ("string" === typeof value) setTextContent(domElement, value);
					else if ("number" === typeof value || "bigint" === typeof value) setTextContent(domElement, "" + value);
					else return;
					break;
				case "onScroll":
					null != value && listenToNonDelegatedEvent("scroll", domElement);
					return;
				case "onScrollEnd":
					null != value && listenToNonDelegatedEvent("scrollend", domElement);
					return;
				case "onClick":
					null != value && (domElement.onclick = noop$1);
					return;
				case "suppressContentEditableWarning":
				case "suppressHydrationWarning":
				case "innerHTML":
				case "ref": return;
				case "innerText":
				case "textContent": return;
				default:
					if (!registrationNameDependencies.hasOwnProperty(key)) a: {
						if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), prevValue = key.slice(2, props ? key.length - 7 : void 0), tag = domElement[internalPropsKey] || null, tag = null != tag ? tag[key] : null, "function" === typeof tag && domElement.removeEventListener(prevValue, tag, props), "function" === typeof value)) {
							"function" !== typeof tag && null !== tag && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
							domElement.addEventListener(prevValue, value, props);
							break a;
						}
						viewTransitionMutationContext = !0;
						key in domElement ? domElement[key] = value : !0 === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
					}
					return;
			}
			viewTransitionMutationContext = !0;
		}
		function setInitialProperties(domElement, tag, props) {
			switch (tag) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "img":
					listenToNonDelegatedEvent("error", domElement);
					listenToNonDelegatedEvent("load", domElement);
					var hasSrc = !1, hasSrcSet = !1, propKey;
					for (propKey in props) if (props.hasOwnProperty(propKey)) {
						var propValue = props[propKey];
						if (null != propValue) switch (propKey) {
							case "src":
								hasSrc = !0;
								break;
							case "srcSet":
								hasSrcSet = !0;
								break;
							case "children":
							case "dangerouslySetInnerHTML": throw Error(formatProdErrorMessage(137, tag));
							default: setProp(domElement, tag, propKey, propValue, props, null);
						}
					}
					hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
					hasSrc && setProp(domElement, tag, "src", props.src, props, null);
					return;
				case "input":
					listenToNonDelegatedEvent("invalid", domElement);
					var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
					for (hasSrc in props) if (props.hasOwnProperty(hasSrc)) {
						var propValue$204 = props[hasSrc];
						if (null != propValue$204) switch (hasSrc) {
							case "name":
								hasSrcSet = propValue$204;
								break;
							case "type":
								propValue = propValue$204;
								break;
							case "checked":
								checked = propValue$204;
								break;
							case "defaultChecked":
								defaultChecked = propValue$204;
								break;
							case "value":
								propKey = propValue$204;
								break;
							case "defaultValue":
								defaultValue = propValue$204;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (null != propValue$204) throw Error(formatProdErrorMessage(137, tag));
								break;
							default: setProp(domElement, tag, hasSrc, propValue$204, props, null);
						}
					}
					initInput(domElement, propKey, defaultValue, checked, defaultChecked, propValue, hasSrcSet, !1);
					return;
				case "select":
					listenToNonDelegatedEvent("invalid", domElement);
					hasSrc = propValue = propKey = null;
					for (hasSrcSet in props) if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue)) switch (hasSrcSet) {
						case "value":
							propKey = defaultValue;
							break;
						case "defaultValue":
							propValue = defaultValue;
							break;
						case "multiple": hasSrc = defaultValue;
						default: setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
					}
					tag = propKey;
					props = propValue;
					domElement.multiple = !!hasSrc;
					null != tag ? updateOptions(domElement, !!hasSrc, tag, !1) : null != props && updateOptions(domElement, !!hasSrc, props, !0);
					return;
				case "textarea":
					listenToNonDelegatedEvent("invalid", domElement);
					propKey = hasSrcSet = hasSrc = null;
					for (propValue in props) if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue)) switch (propValue) {
						case "value":
							hasSrc = defaultValue;
							break;
						case "defaultValue":
							hasSrcSet = defaultValue;
							break;
						case "children":
							propKey = defaultValue;
							break;
						case "dangerouslySetInnerHTML":
							if (null != defaultValue) throw Error(formatProdErrorMessage(91));
							break;
						default: setProp(domElement, tag, propValue, defaultValue, props, null);
					}
					initTextarea(domElement, hasSrc, hasSrcSet, propKey);
					return;
				case "option":
					for (checked in props) if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc)) switch (checked) {
						case "selected":
							domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
							break;
						default: setProp(domElement, tag, checked, hasSrc, props, null);
					}
					return;
				case "dialog":
					listenToNonDelegatedEvent("beforetoggle", domElement);
					listenToNonDelegatedEvent("toggle", domElement);
					listenToNonDelegatedEvent("cancel", domElement);
					listenToNonDelegatedEvent("close", domElement);
					break;
				case "iframe":
				case "object":
					listenToNonDelegatedEvent("load", domElement);
					break;
				case "video":
				case "audio":
					for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++) listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
					break;
				case "image":
					listenToNonDelegatedEvent("error", domElement);
					listenToNonDelegatedEvent("load", domElement);
					break;
				case "details":
					listenToNonDelegatedEvent("toggle", domElement);
					break;
				case "embed":
				case "source":
				case "link": listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
				case "area":
				case "base":
				case "br":
				case "col":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "track":
				case "wbr":
				case "menuitem":
					for (defaultChecked in props) if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc)) switch (defaultChecked) {
						case "children":
						case "dangerouslySetInnerHTML": throw Error(formatProdErrorMessage(137, tag));
						default: setProp(domElement, tag, defaultChecked, hasSrc, props, null);
					}
					return;
				default: if (isCustomElement(tag)) {
					for (propValue$204 in props) props.hasOwnProperty(propValue$204) && (hasSrc = props[propValue$204], void 0 !== hasSrc && setPropOnCustomElement(domElement, tag, propValue$204, hasSrc, props, void 0));
					return;
				}
			}
			for (defaultValue in props) props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
		}
		var emptyProps = {};
		function updateProperties(domElement, tag, lastProps, nextProps) {
			switch (tag) {
				case "div":
				case "span":
				case "svg":
				case "path":
				case "a":
				case "g":
				case "p":
				case "li": break;
				case "input":
					var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
					for (propKey in lastProps) {
						var lastProp = lastProps[propKey];
						if (lastProps.hasOwnProperty(propKey) && null != lastProp) switch (propKey) {
							case "checked": break;
							case "value": break;
							case "defaultValue": lastDefaultValue = lastProp;
							default: nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
						}
					}
					for (var propKey$221 in nextProps) {
						var propKey = nextProps[propKey$221];
						lastProp = lastProps[propKey$221];
						if (nextProps.hasOwnProperty(propKey$221) && (null != propKey || null != lastProp)) switch (propKey$221) {
							case "type":
								propKey !== lastProp && (viewTransitionMutationContext = !0);
								type = propKey;
								break;
							case "name":
								propKey !== lastProp && (viewTransitionMutationContext = !0);
								name = propKey;
								break;
							case "checked":
								propKey !== lastProp && (viewTransitionMutationContext = !0);
								checked = propKey;
								break;
							case "defaultChecked":
								propKey !== lastProp && (viewTransitionMutationContext = !0);
								defaultChecked = propKey;
								break;
							case "value":
								propKey !== lastProp && (viewTransitionMutationContext = !0);
								value = propKey;
								break;
							case "defaultValue":
								propKey !== lastProp && (viewTransitionMutationContext = !0);
								defaultValue = propKey;
								break;
							case "children":
							case "dangerouslySetInnerHTML":
								if (null != propKey) throw Error(formatProdErrorMessage(137, tag));
								break;
							default: propKey !== lastProp && setProp(domElement, tag, propKey$221, propKey, nextProps, lastProp);
						}
					}
					updateInput(domElement, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name);
					return;
				case "select":
					propKey = value = defaultValue = propKey$221 = null;
					for (type in lastProps) if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue) switch (type) {
						case "value": break;
						case "multiple": propKey = lastDefaultValue;
						default: nextProps.hasOwnProperty(type) || setProp(domElement, tag, type, null, nextProps, lastDefaultValue);
					}
					for (name in nextProps) if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue)) switch (name) {
						case "value":
							type !== lastDefaultValue && (viewTransitionMutationContext = !0);
							propKey$221 = type;
							break;
						case "defaultValue":
							type !== lastDefaultValue && (viewTransitionMutationContext = !0);
							defaultValue = type;
							break;
						case "multiple": type !== lastDefaultValue && (viewTransitionMutationContext = !0), value = type;
						default: type !== lastDefaultValue && setProp(domElement, tag, name, type, nextProps, lastDefaultValue);
					}
					tag = defaultValue;
					lastProps = value;
					nextProps = propKey;
					null != propKey$221 ? updateOptions(domElement, !!lastProps, propKey$221, !1) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, !0) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", !1));
					return;
				case "textarea":
					propKey = propKey$221 = null;
					for (defaultValue in lastProps) if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue)) switch (defaultValue) {
						case "value": break;
						case "children": break;
						default: setProp(domElement, tag, defaultValue, null, nextProps, name);
					}
					for (value in nextProps) if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type)) switch (value) {
						case "value":
							name !== type && (viewTransitionMutationContext = !0);
							propKey$221 = name;
							break;
						case "defaultValue":
							name !== type && (viewTransitionMutationContext = !0);
							propKey = name;
							break;
						case "children": break;
						case "dangerouslySetInnerHTML":
							if (null != name) throw Error(formatProdErrorMessage(91));
							break;
						default: name !== type && setProp(domElement, tag, value, name, nextProps, type);
					}
					updateTextarea(domElement, propKey$221, propKey);
					return;
				case "option":
					for (var propKey$237 in lastProps) if (propKey$221 = lastProps[propKey$237], lastProps.hasOwnProperty(propKey$237) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$237)) switch (propKey$237) {
						case "selected":
							domElement.selected = !1;
							break;
						default: setProp(domElement, tag, propKey$237, null, nextProps, propKey$221);
					}
					for (lastDefaultValue in nextProps) if (propKey$221 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$221 !== propKey && (null != propKey$221 || null != propKey)) switch (lastDefaultValue) {
						case "selected":
							propKey$221 !== propKey && (viewTransitionMutationContext = !0);
							domElement.selected = propKey$221 && "function" !== typeof propKey$221 && "symbol" !== typeof propKey$221;
							break;
						default: setProp(domElement, tag, lastDefaultValue, propKey$221, nextProps, propKey);
					}
					return;
				case "img":
				case "link":
				case "area":
				case "base":
				case "br":
				case "col":
				case "embed":
				case "hr":
				case "keygen":
				case "meta":
				case "param":
				case "source":
				case "track":
				case "wbr":
				case "menuitem":
					for (var propKey$242 in lastProps) propKey$221 = lastProps[propKey$242], lastProps.hasOwnProperty(propKey$242) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$242) && setProp(domElement, tag, propKey$242, null, nextProps, propKey$221);
					for (checked in nextProps) if (propKey$221 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$221 !== propKey && (null != propKey$221 || null != propKey)) switch (checked) {
						case "children":
						case "dangerouslySetInnerHTML":
							if (null != propKey$221) throw Error(formatProdErrorMessage(137, tag));
							break;
						default: setProp(domElement, tag, checked, propKey$221, nextProps, propKey);
					}
					return;
				default: if (isCustomElement(tag)) {
					for (var propKey$247 in lastProps) propKey$221 = lastProps[propKey$247], lastProps.hasOwnProperty(propKey$247) && void 0 !== propKey$221 && !nextProps.hasOwnProperty(propKey$247) && setPropOnCustomElement(domElement, tag, propKey$247, void 0, nextProps, propKey$221);
					for (defaultChecked in nextProps) propKey$221 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$221 === propKey || void 0 === propKey$221 && void 0 === propKey || setPropOnCustomElement(domElement, tag, defaultChecked, propKey$221, nextProps, propKey);
					return;
				}
			}
			for (var propKey$252 in lastProps) propKey$221 = lastProps[propKey$252], lastProps.hasOwnProperty(propKey$252) && null != propKey$221 && !nextProps.hasOwnProperty(propKey$252) && setProp(domElement, tag, propKey$252, null, nextProps, propKey$221);
			for (lastProp in nextProps) propKey$221 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$221 === propKey || null == propKey$221 && null == propKey || setProp(domElement, tag, lastProp, propKey$221, nextProps, propKey);
		}
		function isLikelyStaticResource(initiatorType) {
			switch (initiatorType) {
				case "css":
				case "script":
				case "font":
				case "img":
				case "image":
				case "input":
				case "link": return !0;
				default: return !1;
			}
		}
		function estimateBandwidth() {
			if ("function" === typeof performance.getEntriesByType) {
				for (var count = 0, bits = 0, resourceEntries = performance.getEntriesByType("resource"), i = 0; i < resourceEntries.length; i++) {
					var entry = resourceEntries[i], transferSize = entry.transferSize, initiatorType = entry.initiatorType, duration = entry.duration;
					if (transferSize && duration && isLikelyStaticResource(initiatorType)) {
						initiatorType = 0;
						duration = entry.responseEnd;
						for (i += 1; i < resourceEntries.length; i++) {
							var overlapEntry = resourceEntries[i], overlapStartTime = overlapEntry.startTime;
							if (overlapStartTime > duration) break;
							var overlapTransferSize = overlapEntry.transferSize, overlapInitiatorType = overlapEntry.initiatorType;
							overlapTransferSize && isLikelyStaticResource(overlapInitiatorType) && (overlapEntry = overlapEntry.responseEnd, initiatorType += overlapTransferSize * (overlapEntry < duration ? 1 : (duration - overlapStartTime) / (overlapEntry - overlapStartTime)));
						}
						--i;
						bits += 8 * (transferSize + initiatorType) / (entry.duration / 1e3);
						count++;
						if (10 < count) break;
					}
				}
				if (0 < count) return bits / count / 1e6;
			}
			return navigator.connection && (count = navigator.connection.downlink, "number" === typeof count) ? count : 5;
		}
		var eventsEnabled = null;
		var selectionInformation = null;
		function getOwnerDocumentFromRootContainer(rootContainerElement) {
			return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
		}
		function getOwnHostContext(namespaceURI) {
			switch (namespaceURI) {
				case "http://www.w3.org/2000/svg": return 1;
				case "http://www.w3.org/1998/Math/MathML": return 2;
				default: return 0;
			}
		}
		function getChildHostContextProd(parentNamespace, type) {
			if (0 === parentNamespace) switch (type) {
				case "svg": return 1;
				case "math": return 2;
				default: return 0;
			}
			return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
		}
		function createHoistableInstance(type, props, rootContainerInstance, internalInstanceHandle) {
			rootContainerInstance = getOwnerDocumentFromRootContainer(rootContainerInstance).createElement(type);
			rootContainerInstance[internalInstanceKey] = internalInstanceHandle;
			rootContainerInstance[internalPropsKey] = props;
			setInitialProperties(rootContainerInstance, type, props);
			markNodeAsHoistable(rootContainerInstance);
			return rootContainerInstance;
		}
		function shouldSetTextContent(type, props) {
			return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
		}
		var currentPopstateTransitionEvent = null;
		function shouldAttemptEagerTransition() {
			var event = window.event;
			if (event && "popstate" === event.type) {
				if (event === currentPopstateTransitionEvent) return !1;
				currentPopstateTransitionEvent = event;
				return !0;
			}
			currentPopstateTransitionEvent = null;
			return !1;
		}
		var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0;
		var cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
		var localPromise = "function" === typeof Promise ? Promise : void 0;
		var localRequestAnimationFrame = "function" === typeof requestAnimationFrame ? requestAnimationFrame : scheduleTimeout;
		var scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
			return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
		} : scheduleTimeout;
		function handleErrorInNextTick(error) {
			setTimeout(function() {
				throw error;
			});
		}
		function isSingletonScope(type) {
			return "head" === type;
		}
		function clearHydrationBoundary(parentInstance, hydrationInstance) {
			var node = hydrationInstance, depth = 0;
			do {
				var nextNode = node.nextSibling;
				parentInstance.removeChild(node);
				if (nextNode && 8 === nextNode.nodeType) if (node = nextNode.data, "/$" === node || "/&" === node) {
					if (0 === depth) {
						parentInstance.removeChild(nextNode);
						retryIfBlockedOn(hydrationInstance);
						return;
					}
					depth--;
				} else if ("$" === node || "$?" === node || "$~" === node || "$!" === node || "&" === node) depth++;
				else if ("html" === node) clearSingletonPreambleContribution(parentInstance.ownerDocument.documentElement);
				else if ("head" === node) {
					node = parentInstance.ownerDocument.head;
					clearSingletonPreambleContribution(node);
					for (var node$jscomp$0 = node.firstChild; node$jscomp$0;) {
						var nextNode$jscomp$0 = node$jscomp$0.nextSibling, nodeName = node$jscomp$0.nodeName;
						node$jscomp$0[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node$jscomp$0.rel.toLowerCase() || node.removeChild(node$jscomp$0);
						node$jscomp$0 = nextNode$jscomp$0;
					}
				} else "body" === node && clearSingletonPreambleContribution(parentInstance.ownerDocument.body);
				node = nextNode;
			} while (node);
			retryIfBlockedOn(hydrationInstance);
		}
		function hideOrUnhideDehydratedBoundary(suspenseInstance, isHidden) {
			var node = suspenseInstance;
			suspenseInstance = 0;
			do {
				var nextNode = node.nextSibling;
				1 === node.nodeType ? isHidden ? (node._stashedDisplay = node.style.display, node.style.display = "none") : (node.style.display = node._stashedDisplay || "", "" === node.getAttribute("style") && node.removeAttribute("style")) : 3 === node.nodeType && (isHidden ? (node._stashedText = node.nodeValue, node.nodeValue = "") : node.nodeValue = node._stashedText || "");
				if (nextNode && 8 === nextNode.nodeType) if (node = nextNode.data, "/$" === node) if (0 === suspenseInstance) break;
				else suspenseInstance--;
				else "$" !== node && "$?" !== node && "$~" !== node && "$!" !== node || suspenseInstance++;
				node = nextNode;
			} while (node);
		}
		function applyViewTransitionName(instance, name, className) {
			name = CSS.escape(name) !== name ? "r-" + btoa(name).replace(/=/g, "") : name;
			instance.style.viewTransitionName = name;
			null != className && (instance.style.viewTransitionClass = className);
			className = getComputedStyle(instance);
			if ("inline" === className.display) {
				name = instance.getClientRects();
				if (1 === name.length) var JSCompiler_inline_result = 1;
				else for (var i = JSCompiler_inline_result = 0; i < name.length; i++) {
					var rect = name[i];
					0 < rect.width && 0 < rect.height && JSCompiler_inline_result++;
				}
				1 === JSCompiler_inline_result && (instance = instance.style, instance.display = 1 === name.length ? "inline-block" : "block", instance.marginTop = "-" + className.paddingTop, instance.marginBottom = "-" + className.paddingBottom);
			}
		}
		function restoreViewTransitionName(instance, props) {
			instance = instance.style;
			props = props.style;
			var viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionName") ? props.viewTransitionName : props.hasOwnProperty("view-transition-name") ? props["view-transition-name"] : null : null;
			instance.viewTransitionName = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
			viewTransitionName = null != props ? props.hasOwnProperty("viewTransitionClass") ? props.viewTransitionClass : props.hasOwnProperty("view-transition-class") ? props["view-transition-class"] : null : null;
			instance.viewTransitionClass = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : ("" + viewTransitionName).trim();
			"inline-block" === instance.display && (null == props ? instance.display = instance.margin = "" : (viewTransitionName = props.display, instance.display = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, viewTransitionName = props.margin, null != viewTransitionName ? instance.margin = viewTransitionName : (viewTransitionName = props.hasOwnProperty("marginTop") ? props.marginTop : props["margin-top"], instance.marginTop = null == viewTransitionName || "boolean" === typeof viewTransitionName ? "" : viewTransitionName, props = props.hasOwnProperty("marginBottom") ? props.marginBottom : props["margin-bottom"], instance.marginBottom = null == props || "boolean" === typeof props ? "" : props)));
		}
		function createMeasurement(rect, computedStyle, element) {
			element = element.ownerDocument.defaultView;
			return {
				rect,
				abs: "absolute" === computedStyle.position || "fixed" === computedStyle.position,
				clip: "none" !== computedStyle.clipPath || "visible" !== computedStyle.overflow || "none" !== computedStyle.filter || "none" !== computedStyle.mask || "none" !== computedStyle.mask || "0px" !== computedStyle.borderRadius,
				view: 0 <= rect.bottom && 0 <= rect.right && rect.top <= element.innerHeight && rect.left <= element.innerWidth
			};
		}
		function measureInstance(instance) {
			return createMeasurement(instance.getBoundingClientRect(), getComputedStyle(instance), instance);
		}
		function measureClonedInstance(instance) {
			var measuredRect = instance.getBoundingClientRect();
			measuredRect = new DOMRect(measuredRect.x + 2e4, measuredRect.y + 2e4, measuredRect.width, measuredRect.height);
			var computedStyle = getComputedStyle(instance);
			return createMeasurement(measuredRect, computedStyle, instance);
		}
		function forceLayout(ownerDocument) {
			return ownerDocument.documentElement.clientHeight;
		}
		function waitForImageToLoad(resolve) {
			this.addEventListener("load", resolve);
			this.addEventListener("error", resolve);
		}
		function startViewTransition(suspendedState, rootContainer, transitionTypes, mutationCallback, layoutCallback, afterMutationCallback, spawnedWorkCallback, passiveCallback, errorCallback) {
			var ownerDocument = 9 === rootContainer.nodeType ? rootContainer : rootContainer.ownerDocument;
			try {
				var transition = ownerDocument.startViewTransition({
					update: function() {
						var ownerWindow = ownerDocument.defaultView, pendingNavigation = ownerWindow.navigation && ownerWindow.navigation.transition, previousFontLoadingStatus = ownerDocument.fonts.status;
						mutationCallback();
						var blockingPromises = [];
						"loaded" === previousFontLoadingStatus && (forceLayout(ownerDocument), "loading" === ownerDocument.fonts.status && blockingPromises.push(ownerDocument.fonts.ready));
						previousFontLoadingStatus = blockingPromises.length;
						if (null !== suspendedState) for (var suspenseyImages = suspendedState.suspenseyImages, imgBytes = 0, i = 0; i < suspenseyImages.length; i++) {
							var suspenseyImage = suspenseyImages[i];
							if (!suspenseyImage.complete) {
								var rect = suspenseyImage.getBoundingClientRect();
								if (0 < rect.bottom && 0 < rect.right && rect.top < ownerWindow.innerHeight && rect.left < ownerWindow.innerWidth) {
									imgBytes += estimateImageBytes(suspenseyImage);
									if (imgBytes > estimatedBytesWithinLimit) {
										blockingPromises.length = previousFontLoadingStatus;
										break;
									}
									suspenseyImage = new Promise(waitForImageToLoad.bind(suspenseyImage));
									blockingPromises.push(suspenseyImage);
								}
							}
						}
						if (0 < blockingPromises.length) return ownerWindow = Promise.race([Promise.all(blockingPromises), new Promise(function(resolve) {
							return setTimeout(resolve, 500);
						})]).then(layoutCallback, layoutCallback), (pendingNavigation ? Promise.allSettled([pendingNavigation.finished, ownerWindow]) : ownerWindow).then(afterMutationCallback, afterMutationCallback);
						layoutCallback();
						if (pendingNavigation) return pendingNavigation.finished.then(afterMutationCallback, afterMutationCallback);
						afterMutationCallback();
					},
					types: transitionTypes
				});
				ownerDocument.__reactViewTransition = transition;
				var viewTransitionAnimations = [];
				transition.ready.then(function() {
					for (var animations = ownerDocument.documentElement.getAnimations({ subtree: !0 }), i = 0; i < animations.length; i++) {
						var animation = animations[i], effect = animation.effect, pseudoElement = effect.pseudoElement;
						if (null != pseudoElement && pseudoElement.startsWith("::view-transition")) {
							viewTransitionAnimations.push(animation);
							animation = effect.getKeyframes();
							for (var height = pseudoElement = void 0, unchangedDimensions = !0, j = 0; j < animation.length; j++) {
								var keyframe = animation[j], w = keyframe.width;
								if (void 0 === pseudoElement) pseudoElement = w;
								else if (pseudoElement !== w) {
									unchangedDimensions = !1;
									break;
								}
								w = keyframe.height;
								if (void 0 === height) height = w;
								else if (height !== w) {
									unchangedDimensions = !1;
									break;
								}
								delete keyframe.width;
								delete keyframe.height;
								"none" === keyframe.transform && delete keyframe.transform;
							}
							unchangedDimensions && void 0 !== pseudoElement && void 0 !== height && (effect.setKeyframes(animation), unchangedDimensions = getComputedStyle(effect.target, effect.pseudoElement), unchangedDimensions.width !== pseudoElement || unchangedDimensions.height !== height) && (unchangedDimensions = animation[0], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, unchangedDimensions = animation[animation.length - 1], unchangedDimensions.width = pseudoElement, unchangedDimensions.height = height, effect.setKeyframes(animation));
						}
					}
					spawnedWorkCallback();
				}, function(error) {
					ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
					try {
						if ("object" === typeof error && null !== error) switch (error.name) {
							case "InvalidStateError": if ("View transition was skipped because document visibility state is hidden." === error.message || "Skipping view transition because document visibility state has become hidden." === error.message || "Skipping view transition because viewport size changed." === error.message || "Transition was aborted because of invalid state" === error.message) error = null;
						}
						null !== error && errorCallback(error);
					} finally {
						mutationCallback(), layoutCallback(), spawnedWorkCallback();
					}
				});
				transition.finished.finally(function() {
					for (var i = 0; i < viewTransitionAnimations.length; i++) viewTransitionAnimations[i].cancel();
					ownerDocument.__reactViewTransition === transition && (ownerDocument.__reactViewTransition = null);
					passiveCallback();
				});
				return transition;
			} catch (x) {
				return mutationCallback(), layoutCallback(), spawnedWorkCallback(), null;
			}
		}
		function ViewTransitionPseudoElement(pseudo, name) {
			this._scope = document.documentElement;
			this._selector = "::view-transition-" + pseudo + "(" + name + ")";
		}
		ViewTransitionPseudoElement.prototype.animate = function(keyframes, options) {
			options = "number" === typeof options ? { duration: options } : assign({}, options);
			options.pseudoElement = this._selector;
			return this._scope.animate(keyframes, options);
		};
		ViewTransitionPseudoElement.prototype.getAnimations = function() {
			for (var scope = this._scope, selector = this._selector, animations = scope.getAnimations({ subtree: !0 }), result = [], i = 0; i < animations.length; i++) {
				var effect = animations[i].effect;
				null !== effect && effect.target === scope && effect.pseudoElement === selector && result.push(animations[i]);
			}
			return result;
		};
		ViewTransitionPseudoElement.prototype.getComputedStyle = function() {
			return getComputedStyle(this._scope, this._selector);
		};
		function createViewTransitionInstance(name) {
			return {
				name,
				group: new ViewTransitionPseudoElement("group", name),
				imagePair: new ViewTransitionPseudoElement("image-pair", name),
				old: new ViewTransitionPseudoElement("old", name),
				new: new ViewTransitionPseudoElement("new", name)
			};
		}
		function FragmentInstance(fragmentFiber) {
			this._fragmentFiber = fragmentFiber;
			this._observers = this._eventListeners = null;
		}
		FragmentInstance.prototype.addEventListener = function(type, listener, optionsOrUseCapture) {
			var signal = null, cleanup = null;
			if (null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && (signal = optionsOrUseCapture.signal || null, null !== signal && signal.aborted)) return;
			null === this._eventListeners && (this._eventListeners = []);
			var listeners = this._eventListeners;
			if (-1 === indexOfEventListener(listeners, type, listener, optionsOrUseCapture)) {
				var fragmentInstance = this, attachedListener = listener;
				null != optionsOrUseCapture && "boolean" !== typeof optionsOrUseCapture && !0 === optionsOrUseCapture.once && (attachedListener = function(event) {
					fragmentInstance.removeEventListener(type, listener, optionsOrUseCapture);
					"function" === typeof listener ? listener.call(this, event) : listener.handleEvent(event);
				});
				null !== signal && (cleanup = fragmentInstance.removeEventListener.bind(fragmentInstance, type, listener, optionsOrUseCapture), signal.addEventListener("abort", cleanup, { once: !0 }), cleanup = signal.removeEventListener.bind(signal, "abort", cleanup));
				signal = getAttachOptions(optionsOrUseCapture);
				listeners.push({
					type,
					listener,
					optionsOrUseCapture,
					attachedListener,
					cleanup
				});
				traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, addEventListenerToChild, type, attachedListener, signal);
			}
			this._eventListeners = listeners;
		};
		function addEventListenerToChild(child, type, listener, optionsOrUseCapture) {
			getInstanceFromHostFiber(child).addEventListener(type, listener, optionsOrUseCapture);
			return !1;
		}
		FragmentInstance.prototype.removeEventListener = function(type, listener, optionsOrUseCapture) {
			var listeners = this._eventListeners;
			if (null !== listeners && (listener = indexOfEventListener(listeners, type, listener, optionsOrUseCapture), -1 !== listener)) {
				var _listeners$index = listeners[listener];
				optionsOrUseCapture = _listeners$index.attachedListener;
				var cleanup = _listeners$index.cleanup;
				_listeners$index = getAttachOptions(_listeners$index.optionsOrUseCapture);
				traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, removeEventListenerFromChild, type, optionsOrUseCapture, _listeners$index);
				listeners.splice(listener, 1);
				null !== cleanup && cleanup();
			}
		};
		function removeEventListenerFromChild(child, type, listener, optionsOrUseCapture) {
			getInstanceFromHostFiber(child).removeEventListener(type, listener, optionsOrUseCapture);
			return !1;
		}
		function getAttachOptions(opts) {
			return null != opts && "boolean" !== typeof opts && (!0 === opts.once || opts.signal instanceof AbortSignal) ? {
				capture: opts.capture,
				passive: opts.passive
			} : opts;
		}
		function normalizeListenerOptions(opts) {
			return null == opts ? "c=0" : "boolean" === typeof opts ? "c=" + (opts ? "1" : "0") : "c=" + (opts.capture ? "1" : "0");
		}
		function indexOfEventListener(eventListeners, type, listener, optionsOrUseCapture) {
			if (0 === eventListeners.length) return -1;
			optionsOrUseCapture = normalizeListenerOptions(optionsOrUseCapture);
			for (var i = 0; i < eventListeners.length; i++) {
				var item = eventListeners[i];
				if (item.type === type && item.listener === listener && normalizeListenerOptions(item.optionsOrUseCapture) === optionsOrUseCapture) return i;
			}
			return -1;
		}
		FragmentInstance.prototype.dispatchEvent = function(event) {
			var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
			if (null === parentHostFiber) return !0;
			parentHostFiber = getInstanceFromHostFiber(parentHostFiber);
			var eventListeners = this._eventListeners;
			if (null !== eventListeners && 0 < eventListeners.length || !event.bubbles) {
				var temp = 9 === parentHostFiber.nodeType ? parentHostFiber.createComment("") : document.createTextNode("");
				if (eventListeners) for (var i = 0; i < eventListeners.length; i++) {
					var _eventListeners$i = eventListeners[i];
					temp.addEventListener(_eventListeners$i.type, _eventListeners$i.attachedListener, getAttachOptions(_eventListeners$i.optionsOrUseCapture));
				}
				parentHostFiber.appendChild(temp);
				event = temp.dispatchEvent(event);
				if (eventListeners) for (i = 0; i < eventListeners.length; i++) _eventListeners$i = eventListeners[i], temp.removeEventListener(_eventListeners$i.type, _eventListeners$i.attachedListener, getAttachOptions(_eventListeners$i.optionsOrUseCapture));
				parentHostFiber.removeChild(temp);
				return event;
			}
			return parentHostFiber.dispatchEvent(event);
		};
		FragmentInstance.prototype.focus = function(focusOptions) {
			traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !0, setFocusOnFiberIfFocusable, focusOptions, void 0, void 0);
		};
		function setFocusOnFiberIfFocusable(fiber, focusOptions) {
			if (6 === fiber.tag) return !1;
			fiber = getInstanceFromHostFiber(fiber);
			return setFocusIfFocusable(fiber, focusOptions);
		}
		FragmentInstance.prototype.focusLast = function(focusOptions) {
			var children = [];
			traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !0, collectChildren, children, void 0, void 0);
			for (var i = children.length - 1; 0 <= i && !setFocusOnFiberIfFocusable(children[i], focusOptions); i--);
		};
		function collectChildren(child, collection) {
			collection.push(child);
			return !1;
		}
		FragmentInstance.prototype.blur = function() {
			var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
			null !== parentHostFiber && (parentHostFiber = getInstanceFromHostFiber(parentHostFiber), parentHostFiber = getOwnerDocumentFromRootContainer(parentHostFiber).activeElement, null !== parentHostFiber && traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, blurActiveElementWithinFragment, parentHostFiber, void 0, void 0));
		};
		function blurActiveElementWithinFragment(child, activeElement) {
			if (6 === child.tag) return !1;
			child = getInstanceFromHostFiber(child);
			return child === activeElement || child.contains(activeElement) ? (activeElement.blur(), !0) : !1;
		}
		FragmentInstance.prototype.observeUsing = function(observer) {
			null === this._observers && (this._observers = /* @__PURE__ */ new Set());
			this._observers.add(observer);
			traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, observeChild, observer, void 0, void 0);
		};
		function observeChild(child, observer) {
			if (6 === child.tag) return !1;
			child = getInstanceFromHostFiber(child);
			observer.observe(child);
			return !1;
		}
		FragmentInstance.prototype.unobserveUsing = function(observer) {
			var observers = this._observers;
			if (null !== observers && observers.has(observer)) {
				observers.delete(observer);
				traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, unobserveChild, observer, void 0, void 0);
				for (var i = observers = 0; i < pendingIntersectionUnobserves.length; i++) {
					var pending = pendingIntersectionUnobserves[i];
					pending.fragmentInstance === this && pending.observer === observer ? observer.unobserve(pending.instance) : pendingIntersectionUnobserves[observers++] = pending;
				}
				pendingIntersectionUnobserves.length = observers;
			}
		};
		function unobserveChild(child, observer) {
			if (6 === child.tag) return !1;
			child = getInstanceFromHostFiber(child);
			observer.unobserve(child);
			return !1;
		}
		var pendingIntersectionUnobserves = [];
		var intersectionUnobserveScheduled = !1;
		function schedulePendingIntersectionUnobserve(fragmentInstance, observer, instance) {
			pendingIntersectionUnobserves.push({
				fragmentInstance,
				observer,
				instance
			});
			intersectionUnobserveScheduled || (intersectionUnobserveScheduled = !0, requestPostPaintCallback(function() {
				intersectionUnobserveScheduled = !1;
				var pending = pendingIntersectionUnobserves;
				pendingIntersectionUnobserves = [];
				for (var i = 0; i < pending.length; i++) {
					var item = pending[i];
					item.observer.unobserve(item.instance);
				}
			}));
		}
		FragmentInstance.prototype.getClientRects = function() {
			var rects = [];
			traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, collectClientRects, rects, void 0, void 0);
			return rects;
		};
		function collectClientRects(child, rects) {
			if (6 === child.tag) {
				child = child.stateNode;
				var range = child.ownerDocument.createRange();
				range.selectNodeContents(child);
				rects.push.apply(rects, range.getClientRects());
			} else child = getInstanceFromHostFiber(child), rects.push.apply(rects, child.getClientRects());
			return !1;
		}
		FragmentInstance.prototype.getRootNode = function(getRootNodeOptions) {
			var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
			return null === parentHostFiber ? this : getInstanceFromHostFiber(parentHostFiber).getRootNode(getRootNodeOptions);
		};
		FragmentInstance.prototype.compareDocumentPosition = function(otherNode) {
			var parentHostFiber = getFragmentParentInstanceOrContainerFiber(this._fragmentFiber);
			if (null === parentHostFiber) return Node.DOCUMENT_POSITION_DISCONNECTED;
			var children = [];
			traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, collectChildren, children, void 0, void 0);
			var parentHostInstance = getInstanceFromHostFiber(parentHostFiber);
			if (0 === children.length) {
				children = parentHostInstance;
				if (fiberIsPortaledIntoHost(this._fragmentFiber)) {
					a: {
						for (parentHostFiber = this._fragmentFiber.return; null !== parentHostFiber;) {
							if (4 === parentHostFiber.tag) {
								parentHostFiber = parentHostFiber.stateNode.containerInfo;
								break a;
							}
							if (3 === parentHostFiber.tag || 5 === parentHostFiber.tag || 27 === parentHostFiber.tag) break;
							parentHostFiber = parentHostFiber.return;
						}
						parentHostFiber = null;
					}
					null != parentHostFiber && (children = parentHostFiber);
				}
				parentHostFiber = this._fragmentFiber;
				var result = parentHostInstance = children.compareDocumentPosition(otherNode);
				children === otherNode ? result = Node.DOCUMENT_POSITION_CONTAINS : parentHostInstance & Node.DOCUMENT_POSITION_CONTAINED_BY && (children = getFragmentInstanceOrTextInstanceSiblings(parentHostFiber)[1], null === children ? result = Node.DOCUMENT_POSITION_PRECEDING : (otherNode = getInstanceFromHostFiber(children).compareDocumentPosition(otherNode), result = 0 === otherNode || otherNode & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING));
				return result |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
			}
			parentHostFiber = getInstanceFromHostFiber(children[0]);
			result = getInstanceFromHostFiber(children[children.length - 1]);
			var parentHostInstanceFromDOM = fiberIsPortaledIntoHost(this._fragmentFiber) ? parentHostFiber.parentElement : parentHostInstance;
			if (null == parentHostInstanceFromDOM) return Node.DOCUMENT_POSITION_DISCONNECTED;
			parentHostInstance = parentHostInstanceFromDOM.compareDocumentPosition(parentHostFiber) & Node.DOCUMENT_POSITION_CONTAINED_BY;
			parentHostInstanceFromDOM = parentHostInstanceFromDOM.compareDocumentPosition(result) & Node.DOCUMENT_POSITION_CONTAINED_BY;
			var firstResult = parentHostFiber.compareDocumentPosition(otherNode), lastResult = result.compareDocumentPosition(otherNode), otherNodeIsWithinFirstOrLastChild = firstResult & Node.DOCUMENT_POSITION_CONTAINED_BY || lastResult & Node.DOCUMENT_POSITION_CONTAINED_BY;
			lastResult = parentHostInstance && parentHostInstanceFromDOM && firstResult & Node.DOCUMENT_POSITION_FOLLOWING && lastResult & Node.DOCUMENT_POSITION_PRECEDING;
			parentHostFiber = parentHostInstance && parentHostFiber === otherNode || parentHostInstanceFromDOM && result === otherNode || otherNodeIsWithinFirstOrLastChild || lastResult ? Node.DOCUMENT_POSITION_CONTAINED_BY : !parentHostInstance && parentHostFiber === otherNode || !parentHostInstanceFromDOM && result === otherNode ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : firstResult;
			return parentHostFiber & Node.DOCUMENT_POSITION_DISCONNECTED || parentHostFiber & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || validateDocumentPositionWithFiberTree(parentHostFiber, this._fragmentFiber, children[0], children[children.length - 1], otherNode) ? parentHostFiber : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		};
		function validateDocumentPositionWithFiberTree(documentPosition, fragmentFiber, precedingBoundaryFiber, followingBoundaryFiber, otherNode) {
			var otherFiber = getClosestInstanceFromNode(otherNode);
			if (documentPosition & Node.DOCUMENT_POSITION_CONTAINED_BY) {
				if (precedingBoundaryFiber = !!otherFiber) a: {
					for (; null !== otherFiber;) {
						if (7 === otherFiber.tag && (otherFiber === fragmentFiber || otherFiber.alternate === fragmentFiber)) {
							precedingBoundaryFiber = !0;
							break a;
						}
						otherFiber = otherFiber.return;
					}
					precedingBoundaryFiber = !1;
				}
				return precedingBoundaryFiber;
			}
			if (documentPosition & Node.DOCUMENT_POSITION_CONTAINS) {
				if (null === otherFiber) return otherFiber = otherNode.ownerDocument, otherNode === otherFiber || otherNode === otherFiber.documentElement || otherNode === otherFiber.body;
				a: {
					otherFiber = fragmentFiber;
					for (fragmentFiber = getFragmentParentInstanceOrContainerFiber(fragmentFiber); null !== otherFiber;) {
						if (!(5 !== otherFiber.tag && 3 !== otherFiber.tag && 27 !== otherFiber.tag || otherFiber !== fragmentFiber && otherFiber.alternate !== fragmentFiber)) {
							otherFiber = !0;
							break a;
						}
						otherFiber = otherFiber.return;
					}
					otherFiber = !1;
				}
				return otherFiber;
			}
			return documentPosition & Node.DOCUMENT_POSITION_PRECEDING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === precedingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(precedingBoundaryFiber, otherFiber, getParentForFragmentAncestors), null === fragmentFiber ? fragmentFiber = !1 : (traverseVisibleInstancesAndTextInstances(fragmentFiber, !0, isFiberPrecedingCheck, otherFiber, precedingBoundaryFiber), otherFiber = searchTarget, searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? ((fragmentFiber = !!otherFiber) && !(fragmentFiber = otherFiber === followingBoundaryFiber) && (fragmentFiber = getLowestCommonAncestor(followingBoundaryFiber, otherFiber, getParentForFragmentAncestors), null === fragmentFiber ? fragmentFiber = !1 : (traverseVisibleInstancesAndTextInstances(fragmentFiber, !0, isFiberFollowingCheck, otherFiber, followingBoundaryFiber), otherFiber = searchTarget, searchBoundary = searchTarget = null, fragmentFiber = null !== otherFiber)), fragmentFiber) : !1;
		}
		function scrollTextNodeIntoView(textNode, resolvedAlignToTop) {
			var range = textNode.ownerDocument.createRange();
			range.selectNodeContents(textNode);
			textNode = range.getBoundingClientRect();
			window.scrollTo(window.scrollX + textNode.left, resolvedAlignToTop ? window.scrollY + textNode.top : window.scrollY + textNode.bottom - window.innerHeight);
		}
		FragmentInstance.prototype.scrollIntoView = function(alignToTop) {
			if ("object" === typeof alignToTop) throw Error(formatProdErrorMessage(566));
			var children = [];
			traverseVisibleInstancesAndTextInstances(this._fragmentFiber.child, !1, collectChildren, children, void 0, void 0);
			var resolvedAlignToTop = !1 !== alignToTop;
			if (0 === children.length) {
				var hostSiblings = getFragmentInstanceOrTextInstanceSiblings(this._fragmentFiber);
				hostSiblings = resolvedAlignToTop ? hostSiblings[1] || hostSiblings[0] || getFragmentParentInstanceOrContainerFiber(this._fragmentFiber) : hostSiblings[0] || hostSiblings[1];
				if (null === hostSiblings) return;
				if (6 === hostSiblings.tag) {
					alignToTop = getInstanceFromHostFiber(hostSiblings);
					scrollTextNodeIntoView(alignToTop, resolvedAlignToTop);
					return;
				}
				hostSiblings = getInstanceFromHostFiber(hostSiblings);
				if (9 !== hostSiblings.nodeType) {
					if (11 === hostSiblings.nodeType) {
						resolvedAlignToTop = "host" in hostSiblings ? hostSiblings.host : null;
						null !== resolvedAlignToTop && resolvedAlignToTop.scrollIntoView(alignToTop);
						return;
					}
					hostSiblings.scrollIntoView(alignToTop);
				}
			}
			for (hostSiblings = resolvedAlignToTop ? children.length - 1 : 0; hostSiblings !== (resolvedAlignToTop ? -1 : children.length);) {
				var child = children[hostSiblings];
				6 === child.tag ? (child = getInstanceFromHostFiber(child), scrollTextNodeIntoView(child, resolvedAlignToTop)) : getInstanceFromHostFiber(child).scrollIntoView(alignToTop);
				hostSiblings += resolvedAlignToTop ? -1 : 1;
			}
		};
		function addFragmentHandleToFiber(child, fragmentInstance) {
			child = getInstanceFromHostFiber(child);
			addFragmentHandleToInstance(child, fragmentInstance);
			return !1;
		}
		function addFragmentHandleToInstance(instance, fragmentInstance) {
			instance.reactFragments ??= /* @__PURE__ */ new Set();
			instance.reactFragments.add(fragmentInstance);
		}
		function commitNewChildToFragmentInstance(childInstance, fragmentInstance) {
			var eventListeners = fragmentInstance._eventListeners;
			if (null !== eventListeners) for (var i$jscomp$0 = 0; i$jscomp$0 < eventListeners.length; i$jscomp$0++) {
				var _eventListeners$i3 = eventListeners[i$jscomp$0];
				childInstance.addEventListener(_eventListeners$i3.type, _eventListeners$i3.attachedListener, getAttachOptions(_eventListeners$i3.optionsOrUseCapture));
			}
			3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
				for (var writeIdx = 0, i = 0; i < pendingIntersectionUnobserves.length; i++) {
					var pending = pendingIntersectionUnobserves[i];
					if (pending.fragmentInstance !== fragmentInstance || pending.observer !== observer || pending.instance !== childInstance) pendingIntersectionUnobserves[writeIdx++] = pending;
				}
				pendingIntersectionUnobserves.length = writeIdx;
				observer.observe(childInstance);
			}), addFragmentHandleToInstance(childInstance, fragmentInstance));
		}
		function deleteChildFromFragmentInstance(childInstance, fragmentInstance) {
			var eventListeners = fragmentInstance._eventListeners;
			if (null !== eventListeners) for (var i = 0; i < eventListeners.length; i++) {
				var _eventListeners$i4 = eventListeners[i];
				childInstance.removeEventListener(_eventListeners$i4.type, _eventListeners$i4.attachedListener, getAttachOptions(_eventListeners$i4.optionsOrUseCapture));
			}
			3 !== childInstance.nodeType && (eventListeners = fragmentInstance._observers, null !== eventListeners && eventListeners.forEach(function(observer) {
				"string" === typeof observer.rootMargin ? schedulePendingIntersectionUnobserve(fragmentInstance, observer, childInstance) : observer.unobserve(childInstance);
			}), null != childInstance.reactFragments && childInstance.reactFragments.delete(fragmentInstance));
		}
		function clearContainerSparingly(container) {
			var nextNode = container.firstChild;
			nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
			for (; nextNode;) {
				var node = nextNode;
				nextNode = nextNode.nextSibling;
				switch (node.nodeName) {
					case "HTML":
					case "HEAD":
					case "BODY":
						clearContainerSparingly(node);
						detachDeletedInstance(node);
						continue;
					case "SCRIPT":
					case "STYLE": continue;
					case "LINK": if ("stylesheet" === node.rel.toLowerCase()) continue;
				}
				container.removeChild(node);
			}
		}
		function canHydrateInstance(instance, type, props, inRootOrSingleton) {
			for (; 1 === instance.nodeType;) {
				var anyProps = props;
				if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
					if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type)) break;
				} else if (!inRootOrSingleton) if ("input" === type && "hidden" === instance.type) {
					var name = null == anyProps.name ? null : "" + anyProps.name;
					if ("hidden" === anyProps.type && instance.getAttribute("name") === name) return instance;
				} else return instance;
				else if (!instance[internalHoistableMarker]) switch (type) {
					case "meta":
						if (!instance.hasAttribute("itemprop")) break;
						return instance;
					case "link":
						name = instance.getAttribute("rel");
						if ("stylesheet" === name && instance.hasAttribute("data-precedence")) break;
						else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title)) break;
						return instance;
					case "style":
						if (instance.hasAttribute("data-precedence")) break;
						return instance;
					case "script":
						name = instance.getAttribute("src");
						if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop")) break;
						return instance;
					default: return instance;
				}
				instance = getNextHydratable(instance.nextSibling);
				if (null === instance) break;
			}
			return null;
		}
		function canHydrateTextInstance(instance, text, inRootOrSingleton) {
			if ("" === text) return null;
			for (; 3 !== instance.nodeType;) {
				if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton) return null;
				instance = getNextHydratable(instance.nextSibling);
				if (null === instance) return null;
			}
			return instance;
		}
		function canHydrateHydrationBoundary(instance, inRootOrSingleton) {
			for (; 8 !== instance.nodeType;) {
				if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton) return null;
				instance = getNextHydratable(instance.nextSibling);
				if (null === instance) return null;
			}
			return instance;
		}
		function isSuspenseInstancePending(instance) {
			return "$?" === instance.data || "$~" === instance.data;
		}
		function isSuspenseInstanceFallback(instance) {
			return "$!" === instance.data || "$?" === instance.data && "loading" !== instance.ownerDocument.readyState;
		}
		function registerSuspenseInstanceRetry(instance, callback) {
			var ownerDocument = instance.ownerDocument;
			if ("$~" === instance.data) instance._reactRetry = callback;
			else if ("$?" !== instance.data || "loading" !== ownerDocument.readyState) callback();
			else {
				var listener = function() {
					callback();
					ownerDocument.removeEventListener("DOMContentLoaded", listener);
				};
				ownerDocument.addEventListener("DOMContentLoaded", listener);
				instance._reactRetry = listener;
			}
		}
		function getNextHydratable(node) {
			for (; null != node; node = node.nextSibling) {
				var nodeType = node.nodeType;
				if (1 === nodeType || 3 === nodeType) break;
				if (8 === nodeType) {
					nodeType = node.data;
					if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "$~" === nodeType || "&" === nodeType || "F!" === nodeType || "F" === nodeType) break;
					if ("/$" === nodeType || "/&" === nodeType) return null;
				}
			}
			return node;
		}
		var previousHydratableOnEnteringScopedSingleton = null;
		function getNextHydratableInstanceAfterHydrationBoundary(hydrationInstance) {
			hydrationInstance = hydrationInstance.nextSibling;
			for (var depth = 0; hydrationInstance;) {
				if (8 === hydrationInstance.nodeType) {
					var data = hydrationInstance.data;
					if ("/$" === data || "/&" === data) {
						if (0 === depth) return getNextHydratable(hydrationInstance.nextSibling);
						depth--;
					} else "$" !== data && "$!" !== data && "$?" !== data && "$~" !== data && "&" !== data || depth++;
				}
				hydrationInstance = hydrationInstance.nextSibling;
			}
			return null;
		}
		function getParentHydrationBoundary(targetInstance) {
			targetInstance = targetInstance.previousSibling;
			for (var depth = 0; targetInstance;) {
				if (8 === targetInstance.nodeType) {
					var data = targetInstance.data;
					if ("$" === data || "$!" === data || "$?" === data || "$~" === data || "&" === data) {
						if (0 === depth) return targetInstance;
						depth--;
					} else "/$" !== data && "/&" !== data || depth++;
				}
				targetInstance = targetInstance.previousSibling;
			}
			return null;
		}
		function setFocusIfFocusable(node, focusOptions) {
			function handleFocus() {
				didFocus = !0;
			}
			if (node.ownerDocument.activeElement === node) return !0;
			var didFocus = !1;
			try {
				node.ownerDocument.addEventListener("focus", handleFocus, !0), (node.focus || HTMLElement.prototype.focus).call(node, focusOptions);
			} finally {
				node.ownerDocument.removeEventListener("focus", handleFocus, !0);
			}
			return didFocus;
		}
		function requestPostPaintCallback(callback) {
			localRequestAnimationFrame(function() {
				localRequestAnimationFrame(function(time) {
					return callback(time);
				});
			});
		}
		function resolveSingletonInstance(type, props, rootContainerInstance) {
			props = getOwnerDocumentFromRootContainer(rootContainerInstance);
			switch (type) {
				case "html":
					type = props.documentElement;
					if (!type) throw Error(formatProdErrorMessage(452));
					return type;
				case "head":
					type = props.head;
					if (!type) throw Error(formatProdErrorMessage(453));
					return type;
				case "body":
					type = props.body;
					if (!type) throw Error(formatProdErrorMessage(454));
					return type;
				default: throw Error(formatProdErrorMessage(451));
			}
		}
		function releaseSingletonInstance(instance, type, props) {
			for (var propKey in props) {
				var propValue = props[propKey];
				props.hasOwnProperty(propKey) && null != propValue && setProp(instance, type, propKey, null, emptyProps, propValue);
			}
			null != props.dangerouslySetInnerHTML && (instance.textContent = "");
			instance.onclick === noop$1 && (instance.onclick = null);
			detachDeletedInstance(instance);
		}
		function clearSingletonPreambleContribution(instance) {
			for (var attributes = instance.attributes; attributes.length;) instance.removeAttributeNode(attributes[0]);
			detachDeletedInstance(instance);
		}
		var preloadPropsMap = /* @__PURE__ */ new Map();
		var preconnectsSet = /* @__PURE__ */ new Set();
		function getHoistableRoot(container) {
			if ("function" === typeof container.getRootNode) {
				var rootNode = container.getRootNode();
				if (9 === rootNode.nodeType || 11 === rootNode.nodeType) return rootNode;
			}
			return 9 === container.nodeType ? container : container.ownerDocument;
		}
		var previousDispatcher = ReactDOMSharedInternals.d;
		ReactDOMSharedInternals.d = {
			f: flushSyncWork,
			r: requestFormReset,
			D: prefetchDNS,
			C: preconnect,
			L: preload,
			m: preloadModule,
			X: preinitScript,
			S: preinitStyle,
			M: preinitModuleScript
		};
		function flushSyncWork() {
			var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
			return previousWasRendering || wasRendering;
		}
		function requestFormReset(form) {
			var formInst = getInstanceFromNode(form);
			null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
		}
		var globalDocument = "undefined" === typeof document ? null : document;
		function preconnectAs(rel, href, crossOrigin) {
			var ownerDocument = globalDocument;
			if (ownerDocument && "string" === typeof href && href) {
				var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
				limitedEscapedHref = "link[rel=\"" + rel + "\"][href=\"" + limitedEscapedHref + "\"]";
				"string" === typeof crossOrigin && (limitedEscapedHref += "[crossorigin=\"" + crossOrigin + "\"]");
				preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = {
					rel,
					crossOrigin,
					href
				}, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
			}
		}
		function prefetchDNS(href) {
			previousDispatcher.D(href);
			preconnectAs("dns-prefetch", href, null);
		}
		function preconnect(href, crossOrigin) {
			previousDispatcher.C(href, crossOrigin);
			preconnectAs("preconnect", href, crossOrigin);
		}
		function preload(href, as, options) {
			previousDispatcher.L(href, as, options);
			var ownerDocument = globalDocument;
			if (ownerDocument && href && as) {
				var preloadSelector = "link[rel=\"preload\"][as=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(as) + "\"]";
				"image" === as ? options && options.imageSrcSet ? (preloadSelector += "[imagesrcset=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSrcSet) + "\"]", "string" === typeof options.imageSizes && (preloadSelector += "[imagesizes=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(options.imageSizes) + "\"]")) : preloadSelector += "[href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"]" : preloadSelector += "[href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"]";
				var key = preloadSelector;
				switch (as) {
					case "style":
						key = getStyleKey(href);
						break;
					case "script": key = getScriptKey(href);
				}
				if (!(preloadPropsMap.has(key) || (href = assign({
					rel: "preload",
					href: "image" === as && options && options.imageSrcSet ? void 0 : href,
					as
				}, options), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key))))) {
					var instance = ownerDocument.createElement("link");
					setInitialProperties(instance, "link", href);
					"style" === as && (instance[internalLoadPendingKey] = !0, instance.onload = instance.onerror = function() {
						clearPendingLoadOnNode(instance);
					});
					markNodeAsHoistable(instance);
					ownerDocument.head.appendChild(instance);
				}
			}
		}
		function preloadModule(href, options) {
			previousDispatcher.m(href, options);
			var ownerDocument = globalDocument;
			if (ownerDocument && href) {
				var as = options && "string" === typeof options.as ? options.as : "script", preloadSelector = "link[rel=\"modulepreload\"][as=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(as) + "\"][href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"]", key = preloadSelector;
				switch (as) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": key = getScriptKey(href);
				}
				if (!preloadPropsMap.has(key) && (href = assign({
					rel: "modulepreload",
					href
				}, options), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
					switch (as) {
						case "audioworklet":
						case "paintworklet":
						case "serviceworker":
						case "sharedworker":
						case "worker":
						case "script": if (ownerDocument.querySelector(getScriptSelectorFromKey(key))) return;
					}
					as = ownerDocument.createElement("link");
					setInitialProperties(as, "link", href);
					markNodeAsHoistable(as);
					ownerDocument.head.appendChild(as);
				}
			}
		}
		function preinitStyle(href, precedence, options) {
			previousDispatcher.S(href, precedence, options);
			var ownerDocument = globalDocument;
			if (ownerDocument && href) {
				var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
				precedence = precedence || "default";
				var resource = styles.get(key);
				if (!resource) {
					var state = {
						loading: 0,
						preload: null
					};
					if (resource = ownerDocument.querySelector(getStylesheetSelectorFromKey(key))) state.loading = 5;
					else {
						href = assign({
							rel: "stylesheet",
							href,
							"data-precedence": precedence
						}, options);
						(options = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options);
						var link = resource = ownerDocument.createElement("link");
						markNodeAsHoistable(link);
						setInitialProperties(link, "link", href);
						link._p = new Promise(function(resolve, reject) {
							link.onload = resolve;
							link.onerror = reject;
						});
						link.addEventListener("load", function() {
							state.loading |= 1;
						});
						link.addEventListener("error", function() {
							state.loading |= 2;
						});
						state.loading |= 4;
						insertStylesheet(resource, precedence, ownerDocument);
					}
					resource = {
						type: "stylesheet",
						instance: resource,
						count: 1,
						state
					};
					styles.set(key, resource);
				}
			}
		}
		function preinitScript(src, options) {
			previousDispatcher.X(src, options);
			var ownerDocument = globalDocument;
			if (ownerDocument && src) {
				var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
				resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({
					src,
					async: !0
				}, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
					type: "script",
					instance: resource,
					count: 1,
					state: null
				}, scripts.set(key, resource));
			}
		}
		function preinitModuleScript(src, options) {
			previousDispatcher.M(src, options);
			var ownerDocument = globalDocument;
			if (ownerDocument && src) {
				var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
				resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({
					src,
					async: !0,
					type: "module"
				}, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
					type: "script",
					instance: resource,
					count: 1,
					state: null
				}, scripts.set(key, resource));
			}
		}
		function getResource(type, currentProps, pendingProps, currentResource) {
			var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
			if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
			switch (type) {
				case "meta":
				case "title": return null;
				case "style": return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (pendingProps = getStyleKey(pendingProps.href), currentProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
					type: "style",
					instance: null,
					count: 0,
					state: null
				}, currentProps.set(pendingProps, currentResource)), currentResource) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				case "link":
					if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
						type = getStyleKey(pendingProps.href);
						var styles$268 = getResourcesFromRoot(JSCompiler_inline_result).hoistableStyles, resource$269 = styles$268.get(type);
						resource$269 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$269 = {
							type: "stylesheet",
							instance: null,
							count: 0,
							state: {
								loading: 0,
								preload: null
							}
						}, styles$268.set(type, resource$269), (styles$268 = JSCompiler_inline_result.querySelector(getStylesheetSelectorFromKey(type))) ? styles$268._p || (resource$269.instance = styles$268, resource$269.state.loading = 5) : (styles$268 = preloadPropsMap.get(type), styles$268 || (styles$268 = {
							rel: "preload",
							as: "style",
							href: pendingProps.href,
							crossOrigin: pendingProps.crossOrigin,
							integrity: pendingProps.integrity,
							media: pendingProps.media,
							hrefLang: pendingProps.hrefLang,
							referrerPolicy: pendingProps.referrerPolicy
						}, preloadPropsMap.set(type, styles$268)), preloadStylesheet(JSCompiler_inline_result, type, styles$268, resource$269.state)));
						if (currentProps && null === currentResource) throw Error(formatProdErrorMessage(528, ""));
						return resource$269;
					}
					if (currentProps && null !== currentResource) throw Error(formatProdErrorMessage(529, ""));
					return null;
				case "script": return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (pendingProps = getScriptKey(pendingProps), currentProps = getResourcesFromRoot(JSCompiler_inline_result).hoistableScripts, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
					type: "script",
					instance: null,
					count: 0,
					state: null
				}, currentProps.set(pendingProps, currentResource)), currentResource) : {
					type: "void",
					instance: null,
					count: 0,
					state: null
				};
				default: throw Error(formatProdErrorMessage(444, type));
			}
		}
		function getStyleKey(href) {
			return "href=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(href) + "\"";
		}
		function getStylesheetSelectorFromKey(key) {
			return "link[rel=\"stylesheet\"][" + key + "]";
		}
		function stylesheetPropsFromRawProps(rawProps) {
			return assign({}, rawProps, {
				"data-precedence": rawProps.precedence,
				precedence: null
			});
		}
		function preloadStylesheet(ownerDocument, key, preloadProps, state) {
			if (key = ownerDocument.querySelector("link[rel=\"preload\"][as=\"style\"][" + key + "]")) {
				if (!0 !== key[internalLoadPendingKey]) {
					state.loading = 1;
					return;
				}
			} else key = ownerDocument.createElement("link"), key[internalLoadPendingKey] = !0, key.onload = key.onerror = clearPendingLoadOnNode.bind(null, key), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key);
			state.preload = key;
			key.addEventListener("load", function() {
				return state.loading |= 1;
			});
			key.addEventListener("error", function() {
				return state.loading |= 2;
			});
		}
		function getScriptKey(src) {
			return "[src=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(src) + "\"]";
		}
		function getScriptSelectorFromKey(key) {
			return "script[async]" + key;
		}
		function acquireResource(hoistableRoot, resource, props) {
			resource.count++;
			if (null === resource.instance) switch (resource.type) {
				case "style":
					var instance = hoistableRoot.querySelector("style[data-href~=\"" + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + "\"]");
					if (instance) return resource.instance = instance, markNodeAsHoistable(instance), instance;
					var styleProps = assign({}, props, {
						"data-href": props.href,
						"data-precedence": props.precedence,
						href: null,
						precedence: null
					});
					instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement("style");
					markNodeAsHoistable(instance);
					setInitialProperties(instance, "style", styleProps);
					insertStylesheet(instance, props.precedence, hoistableRoot);
					return resource.instance = instance;
				case "stylesheet":
					styleProps = getStyleKey(props.href);
					var instance$274 = hoistableRoot.querySelector(getStylesheetSelectorFromKey(styleProps));
					if (instance$274) return resource.state.loading |= 4, resource.instance = instance$274, markNodeAsHoistable(instance$274), instance$274;
					instance = stylesheetPropsFromRawProps(props);
					(styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
					instance$274 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
					markNodeAsHoistable(instance$274);
					var linkInstance = instance$274;
					linkInstance._p = new Promise(function(resolve, reject) {
						linkInstance.onload = resolve;
						linkInstance.onerror = reject;
					});
					setInitialProperties(instance$274, "link", instance);
					resource.state.loading |= 4;
					insertStylesheet(instance$274, props.precedence, hoistableRoot);
					return resource.instance = instance$274;
				case "script":
					instance$274 = getScriptKey(props.src);
					if (styleProps = hoistableRoot.querySelector(getScriptSelectorFromKey(instance$274))) return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
					instance = props;
					if (styleProps = preloadPropsMap.get(instance$274)) instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
					hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
					styleProps = hoistableRoot.createElement("script");
					markNodeAsHoistable(styleProps);
					setInitialProperties(styleProps, "link", instance);
					hoistableRoot.head.appendChild(styleProps);
					return resource.instance = styleProps;
				case "void": return null;
				default: throw Error(formatProdErrorMessage(443, resource.type));
			}
			else "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
			return resource.instance;
		}
		function insertStylesheet(instance, precedence, root) {
			for (var nodes = root.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
				var node = nodes[i];
				if (node.dataset.precedence === precedence) prior = node;
				else if (prior !== last) break;
			}
			prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root.nodeType ? root.head : root, precedence.insertBefore(instance, precedence.firstChild));
		}
		function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
			stylesheetProps.crossOrigin ??= preloadProps.crossOrigin;
			stylesheetProps.referrerPolicy ??= preloadProps.referrerPolicy;
			stylesheetProps.title ??= preloadProps.title;
		}
		function adoptPreloadPropsForScript(scriptProps, preloadProps) {
			scriptProps.crossOrigin ??= preloadProps.crossOrigin;
			scriptProps.referrerPolicy ??= preloadProps.referrerPolicy;
			scriptProps.integrity ??= preloadProps.integrity;
		}
		var tagCaches = null;
		function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
			if (null === tagCaches) {
				var cache = /* @__PURE__ */ new Map();
				var caches = tagCaches = /* @__PURE__ */ new Map();
				caches.set(ownerDocument, cache);
			} else caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
			if (cache.has(type)) return cache;
			cache.set(type, null);
			ownerDocument = ownerDocument.getElementsByTagName(type);
			for (caches = 0; caches < ownerDocument.length; caches++) {
				var node = ownerDocument[caches];
				if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
					var nodeKey = node.getAttribute(keyAttribute) || "";
					nodeKey = type + nodeKey;
					var existing = cache.get(nodeKey);
					existing ? existing.push(node) : cache.set(nodeKey, [node]);
				}
			}
			return cache;
		}
		function mountHoistable(hoistableRoot, type, instance) {
			hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
			hoistableRoot.head.insertBefore(instance, "title" === type ? hoistableRoot.querySelector("head > title") : null);
		}
		function isHostHoistableType(type, props, hostContext) {
			if (1 === hostContext || null != props.itemProp) return !1;
			switch (type) {
				case "meta":
				case "title": return !0;
				case "style":
					if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href) break;
					return !0;
				case "link":
					if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError) break;
					switch (props.rel) {
						case "stylesheet": return type = props.disabled, "string" === typeof props.precedence && null == type;
						default: return !0;
					}
				case "script": if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src) return !0;
			}
			return !1;
		}
		function maySuspendCommit(type, props) {
			return "img" === type && null != props.src && "" !== props.src && null == props.onLoad && "lazy" !== props.loading;
		}
		function preloadResource(resource) {
			return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? !1 : !0;
		}
		function estimateImageBytes(instance) {
			return (instance.width || 100) * (instance.height || 100) * ("number" === typeof devicePixelRatio ? devicePixelRatio : 1) * .25;
		}
		function suspendInstance(state, instance) {
			"function" === typeof instance.decode && (state.imgCount++, instance.complete || (state.imgBytes += estimateImageBytes(instance), state.suspenseyImages.push(instance)), state = onUnsuspendImg.bind(state), instance.decode().then(state, state));
		}
		function suspendResource(state, hoistableRoot, resource, props) {
			if ("stylesheet" === resource.type && ("string" !== typeof props.media || !1 !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
				if (null === resource.instance) {
					var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(getStylesheetSelectorFromKey(key));
					if (instance) {
						hoistableRoot = instance._p;
						null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
						resource.state.loading |= 4;
						resource.instance = instance;
						markNodeAsHoistable(instance);
						return;
					}
					instance = hoistableRoot.ownerDocument || hoistableRoot;
					props = stylesheetPropsFromRawProps(props);
					(key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
					instance = instance.createElement("link");
					markNodeAsHoistable(instance);
					var linkInstance = instance;
					linkInstance._p = new Promise(function(resolve, reject) {
						linkInstance.onload = resolve;
						linkInstance.onerror = reject;
					});
					setInitialProperties(instance, "link", props);
					resource.instance = instance;
				}
				null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
				state.stylesheets.set(resource, hoistableRoot);
				(hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
			}
		}
		var estimatedBytesWithinLimit = 0;
		function waitForCommitToBeReady(state, timeoutOffset) {
			state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
			return 0 < state.count || 0 < state.imgCount ? function(commit) {
				var stylesheetTimer = setTimeout(function() {
					state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
					if (state.unsuspend) {
						var unsuspend = state.unsuspend;
						state.unsuspend = null;
						unsuspend();
					}
				}, 6e4 + timeoutOffset);
				0 < state.imgBytes && 0 === estimatedBytesWithinLimit && (estimatedBytesWithinLimit = 62500 * estimateBandwidth());
				var imgTimer = setTimeout(function() {
					state.waitingForImages = !1;
					if (0 === state.count && (state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets), state.unsuspend)) {
						var unsuspend = state.unsuspend;
						state.unsuspend = null;
						unsuspend();
					}
				}, (state.imgBytes > estimatedBytesWithinLimit ? 50 : 800) + timeoutOffset);
				state.unsuspend = commit;
				return function() {
					state.unsuspend = null;
					clearTimeout(stylesheetTimer);
					clearTimeout(imgTimer);
				};
			} : null;
		}
		function checkIfFullyUnsuspended(state) {
			if (0 === state.count && (0 === state.imgCount || !state.waitingForImages)) {
				if (state.stylesheets) insertSuspendedStylesheets(state, state.stylesheets);
				else if (state.unsuspend) {
					var unsuspend = state.unsuspend;
					state.unsuspend = null;
					unsuspend();
				}
			}
		}
		function onUnsuspend() {
			this.count--;
			checkIfFullyUnsuspended(this);
		}
		function onUnsuspendImg() {
			this.imgCount--;
			checkIfFullyUnsuspended(this);
		}
		var precedencesByRoot = null;
		function insertSuspendedStylesheets(state, resources) {
			state.stylesheets = null;
			null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
		}
		function insertStylesheetIntoRoot(root, resource) {
			if (!(resource.state.loading & 4)) {
				var precedences = precedencesByRoot.get(root);
				if (precedences) var last = precedences.get(null);
				else {
					precedences = /* @__PURE__ */ new Map();
					precedencesByRoot.set(root, precedences);
					for (var nodes = root.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < nodes.length; i++) {
						var node = nodes[i];
						if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media")) precedences.set(node.dataset.precedence, node), last = node;
					}
					last && precedences.set(null, last);
				}
				nodes = resource.instance;
				node = nodes.getAttribute("data-precedence");
				i = precedences.get(node) || last;
				i === last && precedences.set(null, nodes);
				precedences.set(node, nodes);
				this.count++;
				last = onUnsuspend.bind(this);
				nodes.addEventListener("load", last);
				nodes.addEventListener("error", last);
				i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root = 9 === root.nodeType ? root.head : root, root.insertBefore(nodes, root.firstChild));
				resource.state.loading |= 4;
			}
		}
		var HostTransitionContext = {
			$$typeof: REACT_CONTEXT_TYPE,
			Provider: null,
			Consumer: null,
			_currentValue: sharedNotPendingObject,
			_currentValue2: sharedNotPendingObject,
			_threadCount: 0
		};
		function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState) {
			this.tag = 1;
			this.containerInfo = containerInfo;
			this.pingCache = this.current = this.pendingChildren = null;
			this.timeoutHandle = -1;
			this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
			this.callbackPriority = 0;
			this.expirationTimes = createLaneMap(-1);
			this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
			this.entanglements = createLaneMap(0);
			this.hiddenUpdates = createLaneMap(null);
			this.identifierPrefix = identifierPrefix;
			this.onUncaughtError = onUncaughtError;
			this.onCaughtError = onCaughtError;
			this.onRecoverableError = onRecoverableError;
			this.pooledCache = null;
			this.pooledCacheLanes = 0;
			this.formState = formState;
			this.transitionTypes = null;
			this.incompleteTransitions = /* @__PURE__ */ new Map();
		}
		function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, formState, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator) {
			containerInfo = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, onDefaultTransitionIndicator, formState);
			tag = 1;
			!0 === isStrictMode && (tag |= 24);
			isStrictMode = createFiberImplClass(3, null, null, tag);
			containerInfo.current = isStrictMode;
			isStrictMode.stateNode = containerInfo;
			tag = createCache();
			tag.refCount++;
			containerInfo.pooledCache = tag;
			tag.refCount++;
			isStrictMode.memoizedState = {
				element: initialChildren,
				isDehydrated: hydrate,
				cache: tag
			};
			initializeUpdateQueue(isStrictMode);
			return containerInfo;
		}
		function getContextForSubtree(parentComponent) {
			if (!parentComponent) return emptyContextObject;
			parentComponent = emptyContextObject;
			return parentComponent;
		}
		function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
			parentComponent = getContextForSubtree(parentComponent);
			null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
			container = createUpdate(lane);
			container.payload = { element };
			callback = void 0 === callback ? null : callback;
			null !== callback && (container.callback = callback);
			element = enqueueUpdate(rootFiber, container, lane);
			null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
		}
		function markRetryLaneImpl(fiber, retryLane) {
			fiber = fiber.memoizedState;
			if (null !== fiber && null !== fiber.dehydrated) {
				var a = fiber.retryLane;
				fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
			}
		}
		function markRetryLaneIfNotHydrated(fiber, retryLane) {
			markRetryLaneImpl(fiber, retryLane);
			(fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
		}
		function attemptContinuousHydration(fiber) {
			if (13 === fiber.tag || 31 === fiber.tag) {
				var root = enqueueConcurrentRenderForLane(fiber, 67108864);
				null !== root && scheduleUpdateOnFiber(root, fiber, 67108864);
				markRetryLaneIfNotHydrated(fiber, 67108864);
			}
		}
		function attemptHydrationAtCurrentPriority(fiber) {
			if (13 === fiber.tag || 31 === fiber.tag) {
				var lane = requestUpdateLane();
				lane = getBumpedLaneForHydrationByLane(lane);
				var root = enqueueConcurrentRenderForLane(fiber, lane);
				null !== root && scheduleUpdateOnFiber(root, fiber, lane);
				markRetryLaneIfNotHydrated(fiber, lane);
			}
		}
		var _enabled = !0;
		function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
			var prevTransition = ReactSharedInternals.T;
			ReactSharedInternals.T = null;
			var previousPriority = ReactDOMSharedInternals.p;
			try {
				ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
			} finally {
				ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
			}
		}
		function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
			var prevTransition = ReactSharedInternals.T;
			ReactSharedInternals.T = null;
			var previousPriority = ReactDOMSharedInternals.p;
			try {
				ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
			} finally {
				ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
			}
		}
		function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
			if (_enabled) {
				var blockedOn = findInstanceBlockingEvent(nativeEvent);
				if (null === blockedOn) dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer), clearIfContinuousEvent(domEventName, nativeEvent);
				else if (queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)) nativeEvent.stopPropagation();
				else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
					for (; null !== blockedOn;) {
						var fiber = getInstanceFromNode(blockedOn);
						if (null !== fiber) switch (fiber.tag) {
							case 3:
								fiber = fiber.stateNode;
								if (fiber.current.memoizedState.isDehydrated) {
									var lanes = getHighestPriorityLanes(fiber.pendingLanes);
									if (0 !== lanes) {
										var root = fiber;
										root.pendingLanes |= 2;
										for (root.entangledLanes |= 2; lanes;) {
											var lane = 1 << 31 - clz32(lanes);
											root.entanglements[1] |= lane;
											lanes &= ~lane;
										}
										ensureRootIsScheduled(fiber);
										0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0, !1));
									}
								}
								break;
							case 31:
							case 13: root = enqueueConcurrentRenderForLane(fiber, 2), null !== root && scheduleUpdateOnFiber(root, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
						}
						fiber = findInstanceBlockingEvent(nativeEvent);
						null === fiber && dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, return_targetInst, targetContainer);
						if (fiber === blockedOn) break;
						blockedOn = fiber;
					}
					null !== blockedOn && nativeEvent.stopPropagation();
				} else dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, null, targetContainer);
			}
		}
		function findInstanceBlockingEvent(nativeEvent) {
			nativeEvent = getEventTarget(nativeEvent);
			return findInstanceBlockingTarget(nativeEvent);
		}
		var return_targetInst = null;
		function findInstanceBlockingTarget(targetNode) {
			return_targetInst = null;
			targetNode = getClosestInstanceFromNode(targetNode);
			if (null !== targetNode) {
				var nearestMounted = getNearestMountedFiber(targetNode);
				if (null === nearestMounted) targetNode = null;
				else {
					var tag = nearestMounted.tag;
					if (13 === tag) {
						targetNode = getSuspenseInstanceFromFiber(nearestMounted);
						if (null !== targetNode) return targetNode;
						targetNode = null;
					} else if (31 === tag) {
						targetNode = getActivityInstanceFromFiber(nearestMounted);
						if (null !== targetNode) return targetNode;
						targetNode = null;
					} else if (3 === tag) {
						if (nearestMounted.stateNode.current.memoizedState.isDehydrated) return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
						targetNode = null;
					} else nearestMounted !== targetNode && (targetNode = null);
				}
			}
			return_targetInst = targetNode;
			return null;
		}
		function getEventPriority(domEventName) {
			switch (domEventName) {
				case "beforetoggle":
				case "cancel":
				case "click":
				case "close":
				case "contextmenu":
				case "copy":
				case "cut":
				case "auxclick":
				case "dblclick":
				case "dragend":
				case "dragstart":
				case "drop":
				case "focusin":
				case "focusout":
				case "input":
				case "invalid":
				case "keydown":
				case "keypress":
				case "keyup":
				case "mousedown":
				case "mouseup":
				case "paste":
				case "pause":
				case "play":
				case "pointercancel":
				case "pointerdown":
				case "pointerup":
				case "ratechange":
				case "reset":
				case "seeked":
				case "submit":
				case "toggle":
				case "touchcancel":
				case "touchend":
				case "touchstart":
				case "volumechange":
				case "change":
				case "selectionchange":
				case "textInput":
				case "compositionstart":
				case "compositionend":
				case "compositionupdate":
				case "beforeblur":
				case "afterblur":
				case "beforeinput":
				case "blur":
				case "fullscreenchange":
				case "fullscreenerror":
				case "focus":
				case "hashchange":
				case "popstate":
				case "select":
				case "selectstart": return 2;
				case "drag":
				case "dragenter":
				case "dragexit":
				case "dragleave":
				case "dragover":
				case "mousemove":
				case "mouseout":
				case "mouseover":
				case "pointermove":
				case "pointerout":
				case "pointerover":
				case "resize":
				case "scroll":
				case "touchmove":
				case "wheel":
				case "mouseenter":
				case "mouseleave":
				case "pointerenter":
				case "pointerleave": return 8;
				case "message": switch (getCurrentPriorityLevel()) {
					case ImmediatePriority: return 2;
					case UserBlockingPriority: return 8;
					case NormalPriority$1:
					case LowPriority: return 32;
					case IdlePriority: return 268435456;
					default: return 32;
				}
				default: return 32;
			}
		}
		var hasScheduledReplayAttempt = !1;
		var queuedFocus = null;
		var queuedDrag = null;
		var queuedMouse = null;
		var queuedPointers = /* @__PURE__ */ new Map();
		var queuedPointerCaptures = /* @__PURE__ */ new Map();
		var queuedExplicitHydrationTargets = [];
		var discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
		function clearIfContinuousEvent(domEventName, nativeEvent) {
			switch (domEventName) {
				case "focusin":
				case "focusout":
					queuedFocus = null;
					break;
				case "dragenter":
				case "dragleave":
					queuedDrag = null;
					break;
				case "mouseover":
				case "mouseout":
					queuedMouse = null;
					break;
				case "pointerover":
				case "pointerout":
					queuedPointers.delete(nativeEvent.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture": queuedPointerCaptures.delete(nativeEvent.pointerId);
			}
		}
		function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
			if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent) return existingQueuedEvent = {
				blockedOn,
				domEventName,
				eventSystemFlags,
				nativeEvent,
				targetContainers: [targetContainer]
			}, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
			existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
			blockedOn = existingQueuedEvent.targetContainers;
			null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
			return existingQueuedEvent;
		}
		function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
			switch (domEventName) {
				case "focusin": return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(queuedFocus, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
				case "dragenter": return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(queuedDrag, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
				case "mouseover": return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(queuedMouse, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent), !0;
				case "pointerover":
					var pointerId = nativeEvent.pointerId;
					queuedPointers.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointers.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent));
					return !0;
				case "gotpointercapture": return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(pointerId, accumulateOrCreateContinuousQueuedReplayableEvent(queuedPointerCaptures.get(pointerId) || null, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent)), !0;
			}
			return !1;
		}
		function attemptExplicitHydrationTarget(queuedTarget) {
			var targetInst = getClosestInstanceFromNode(queuedTarget.target);
			if (null !== targetInst) {
				var nearestMounted = getNearestMountedFiber(targetInst);
				if (null !== nearestMounted) {
					if (targetInst = nearestMounted.tag, 13 === targetInst) {
						if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
							queuedTarget.blockedOn = targetInst;
							runWithPriority(queuedTarget.priority, function() {
								attemptHydrationAtCurrentPriority(nearestMounted);
							});
							return;
						}
					} else if (31 === targetInst) {
						if (targetInst = getActivityInstanceFromFiber(nearestMounted), null !== targetInst) {
							queuedTarget.blockedOn = targetInst;
							runWithPriority(queuedTarget.priority, function() {
								attemptHydrationAtCurrentPriority(nearestMounted);
							});
							return;
						}
					} else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
						queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
						return;
					}
				}
			}
			queuedTarget.blockedOn = null;
		}
		function attemptReplayContinuousQueuedEvent(queuedEvent) {
			if (null !== queuedEvent.blockedOn) return !1;
			for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length;) {
				var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
				if (null === nextBlockedOn) {
					nextBlockedOn = queuedEvent.nativeEvent;
					var nativeEventClone = new nextBlockedOn.constructor(nextBlockedOn.type, nextBlockedOn);
					currentReplayingEvent = nativeEventClone;
					nextBlockedOn.target.dispatchEvent(nativeEventClone);
					currentReplayingEvent = null;
				} else return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, !1;
				targetContainers.shift();
			}
			return !0;
		}
		function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
			attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
		}
		function replayUnblockedEvents() {
			hasScheduledReplayAttempt = !1;
			null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
			null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
			null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
			queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
			queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
		}
		function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
			queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = !0, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, replayUnblockedEvents)));
		}
		var lastScheduledReplayQueue = null;
		function scheduleReplayQueueIfNeeded(formReplayingQueue) {
			lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(Scheduler.unstable_NormalPriority, function() {
				lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
				for (var i = 0; i < formReplayingQueue.length; i += 3) {
					var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
					if ("function" !== typeof submitterOrAction) if (null === findInstanceBlockingTarget(submitterOrAction || form)) continue;
					else break;
					var formInst = getInstanceFromNode(form);
					null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(formInst, {
						pending: !0,
						data: formData,
						method: form.method,
						action: submitterOrAction
					}, submitterOrAction, formData));
				}
			}));
		}
		function retryIfBlockedOn(unblocked) {
			function unblock(queuedEvent) {
				return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
			}
			null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
			null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
			null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
			queuedPointers.forEach(unblock);
			queuedPointerCaptures.forEach(unblock);
			for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
				var queuedTarget = queuedExplicitHydrationTargets[i];
				queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
			}
			for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn);) attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
			i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
			if (null != i) for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
				var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
				if ("function" === typeof submitterOrAction) formProps || scheduleReplayQueueIfNeeded(i);
				else if (formProps) {
					var action = null;
					if (submitterOrAction && submitterOrAction.hasAttribute("formAction")) {
						if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null) action = formProps.formAction;
						else if (null !== findInstanceBlockingTarget(form)) continue;
					} else action = formProps.action;
					"function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
					scheduleReplayQueueIfNeeded(i);
				}
			}
		}
		function defaultOnDefaultTransitionIndicator() {
			function handleNavigate(event) {
				event.canIntercept && "react-transition" === event.info && event.intercept({
					handler: function() {
						return new Promise(function(resolve) {
							return pendingResolve = resolve;
						});
					},
					focusReset: "manual",
					scroll: "manual"
				});
			}
			function handleNavigateComplete() {
				null !== pendingResolve && (pendingResolve(), pendingResolve = null);
				isCancelled || setTimeout(startFakeNavigation, 20);
			}
			function startFakeNavigation() {
				if (!isCancelled && !navigation.transition) {
					var currentEntry = navigation.currentEntry;
					currentEntry && null != currentEntry.url && navigation.navigate(currentEntry.url, {
						state: currentEntry.getState(),
						info: "react-transition",
						history: "replace"
					});
				}
			}
			if ("object" === typeof navigation) {
				var isCancelled = !1, pendingResolve = null;
				navigation.addEventListener("navigate", handleNavigate);
				navigation.addEventListener("navigatesuccess", handleNavigateComplete);
				navigation.addEventListener("navigateerror", handleNavigateComplete);
				setTimeout(startFakeNavigation, 100);
				return function() {
					isCancelled = !0;
					navigation.removeEventListener("navigate", handleNavigate);
					navigation.removeEventListener("navigatesuccess", handleNavigateComplete);
					navigation.removeEventListener("navigateerror", handleNavigateComplete);
					null !== pendingResolve && (pendingResolve(), pendingResolve = null);
				};
			}
		}
		function ReactDOMRoot(internalRoot) {
			this._internalRoot = internalRoot;
		}
		ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
			var root = this._internalRoot;
			if (null === root) throw Error(formatProdErrorMessage(409));
			var current = root.current;
			updateContainerImpl(current, requestUpdateLane(), children, root, null, null);
		};
		ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
			var root = this._internalRoot;
			if (null !== root) {
				this._internalRoot = null;
				var container = root.containerInfo;
				updateContainerImpl(root.current, 2, null, root, null, null);
				flushSyncWork$1();
				container[internalContainerInstanceKey] = null;
			}
		};
		function ReactDOMHydrationRoot(internalRoot) {
			this._internalRoot = internalRoot;
		}
		ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
			if (target) {
				var updatePriority = resolveUpdatePriority();
				target = {
					blockedOn: null,
					target,
					priority: updatePriority
				};
				for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++);
				queuedExplicitHydrationTargets.splice(i, 0, target);
				0 === i && attemptExplicitHydrationTarget(target);
			}
		};
		var isomorphicReactPackageVersion$jscomp$inline_2043 = React.version;
		if ("19.3.0" !== isomorphicReactPackageVersion$jscomp$inline_2043) throw Error(formatProdErrorMessage(527, isomorphicReactPackageVersion$jscomp$inline_2043, "19.3.0"));
		ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
			var fiber = componentOrElement._reactInternals;
			if (void 0 === fiber) {
				if ("function" === typeof componentOrElement.render) throw Error(formatProdErrorMessage(188));
				componentOrElement = Object.keys(componentOrElement).join(",");
				throw Error(formatProdErrorMessage(268, componentOrElement));
			}
			componentOrElement = findCurrentFiberUsingSlowPath(fiber);
			componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
			componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
			return componentOrElement;
		};
		var internals$jscomp$inline_2586 = {
			bundleType: 0,
			version: "19.3.0",
			rendererPackageName: "react-dom",
			currentDispatcherRef: ReactSharedInternals,
			reconcilerVersion: "19.3.0"
		};
		if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
			var hook$jscomp$inline_2587 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
			if (!hook$jscomp$inline_2587.isDisabled && hook$jscomp$inline_2587.supportsFiber) try {
				rendererID = hook$jscomp$inline_2587.inject(internals$jscomp$inline_2586), injectedHook = hook$jscomp$inline_2587;
			} catch (err) {}
		}
		exports.createRoot = function(container, options) {
			if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
			var isStrictMode = !1, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError;
			null !== options && void 0 !== options && (!0 === options.unstable_strictMode && (isStrictMode = !0), void 0 !== options.identifierPrefix && (identifierPrefix = options.identifierPrefix), void 0 !== options.onUncaughtError && (onUncaughtError = options.onUncaughtError), void 0 !== options.onCaughtError && (onCaughtError = options.onCaughtError), void 0 !== options.onRecoverableError && (onRecoverableError = options.onRecoverableError));
			options = createFiberRoot(container, 1, !1, null, null, isStrictMode, identifierPrefix, null, onUncaughtError, onCaughtError, onRecoverableError, defaultOnDefaultTransitionIndicator);
			container[internalContainerInstanceKey] = options.current;
			listenToAllSupportedEvents(container);
			return new ReactDOMRoot(options);
		};
	}));
	//#endregion
	//#region node_modules/react-dom/client.js
	var require_client = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		function checkDCE() {
			if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
			} catch (err) {
				console.error(err);
			}
		}
		checkDCE();
		module.exports = require_react_dom_client_production();
	}));
	//#endregion
	//#region src/device-colour.mjs
	var import_react = require_react();
	var import_react_dom = require_react_dom();
	var import_client = require_client();
	var LIGHT_STORAGE_KEY = "gallery-echoes-light-v1";
	var finite = (value, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? value : fallback;
	var clamp$1 = (value, min, max) => Math.min(max, Math.max(min, value));
	function normalizeHex(value) {
		if (typeof value !== "string") return null;
		const hex = value.trim().replace(/^#/, "");
		if (/^[0-9a-f]{3}$/i.test(hex)) return "#" + [...hex.toLowerCase()].map((char) => char + char).join("");
		return /^[0-9a-f]{6}$/i.test(hex) ? "#" + hex.toLowerCase() : null;
	}
	function hexToRgb(value) {
		const hex = normalizeHex(value);
		if (!hex) throw new TypeError("A valid HEX colour is required.");
		return {
			r: parseInt(hex.slice(1, 3), 16),
			g: parseInt(hex.slice(3, 5), 16),
			b: parseInt(hex.slice(5, 7), 16)
		};
	}
	function rgbToHex({ r, g, b }) {
		return "#" + [
			r,
			g,
			b
		].map((value) => Math.round(clamp$1(finite(value), 0, 255)).toString(16).padStart(2, "0")).join("");
	}
	function hsvToHex({ h, s, v }) {
		const hue = (finite(h) % 360 + 360) % 360;
		const saturation = clamp$1(finite(s), 0, 100) / 100;
		const value = clamp$1(finite(v), 0, 100) / 100;
		const chroma = value * saturation;
		const secondary = chroma * (1 - Math.abs(hue / 60 % 2 - 1));
		const match = value - chroma;
		const channels = hue < 60 ? [
			chroma,
			secondary,
			0
		] : hue < 120 ? [
			secondary,
			chroma,
			0
		] : hue < 180 ? [
			0,
			chroma,
			secondary
		] : hue < 240 ? [
			0,
			secondary,
			chroma
		] : hue < 300 ? [
			secondary,
			0,
			chroma
		] : [
			chroma,
			0,
			secondary
		];
		return rgbToHex({
			r: (channels[0] + match) * 255,
			g: (channels[1] + match) * 255,
			b: (channels[2] + match) * 255
		});
	}
	function hexToHsv(value) {
		const { r, g, b } = hexToRgb(value);
		const red = r / 255, green = g / 255, blue = b / 255;
		const max = Math.max(red, green, blue), delta = max - Math.min(red, green, blue);
		let hue = 0;
		if (delta) hue = max === red ? (green - blue) / delta % 6 : max === green ? (blue - red) / delta + 2 : (red - green) / delta + 4;
		return {
			h: (hue * 60 + 360) % 360,
			s: max ? delta / max * 100 : 0,
			v: max * 100
		};
	}
	function mix(hex, base, amount) {
		const colour = hexToRgb(hex), background = hexToRgb(base);
		return rgbToHex(Object.fromEntries([
			"r",
			"g",
			"b"
		].map((channel) => [channel, colour[channel] * amount + background[channel] * (1 - amount)])));
	}
	function deriveLightPalette(value) {
		const hex = normalizeHex(value);
		if (!hex) throw new TypeError("A valid HEX colour is required.");
		const { r, g, b } = hexToRgb(hex);
		return {
			name: `Custom ${hex.toUpperCase()}`,
			color: hex,
			light: hex,
			soft: mix(hex, "#fcfaf5", .13),
			ink: mix(hex, "#27231f", .24),
			rgb: `${r}, ${g}, ${b}`
		};
	}
	function getLightOutput(value, brightness = 100, lightOn = true) {
		const colour = hexToRgb(value), intensity = lightOn ? clamp$1(finite(brightness, 100), 0, 100) / 100 : 0;
		const hex = rgbToHex(Object.fromEntries([
			"r",
			"g",
			"b"
		].map((channel) => [channel, colour[channel] * intensity])));
		return {
			...hexToRgb(hex),
			hex
		};
	}
	function normalizeLightSettings(value) {
		const settings = value && typeof value === "object" && !Array.isArray(value) ? value : {};
		return {
			customColour: normalizeHex(settings.customColour),
			brightness: clamp$1(finite(settings.brightness, 100), 0, 100),
			lightOn: typeof settings.lightOn === "boolean" ? settings.lightOn : true
		};
	}
	var ARDUINO_DEMO_FRAMES = Object.freeze([
		{
			label: "Red",
			hex: "#ff0000",
			lightOn: true
		},
		{
			label: "Green",
			hex: "#00ff00",
			lightOn: true
		},
		{
			label: "Blue",
			hex: "#0000ff",
			lightOn: true
		},
		{
			label: "Yellow",
			hex: "#ffff00",
			lightOn: true
		},
		{
			label: "Purple",
			hex: "#ff00ff",
			lightOn: true
		},
		{
			label: "Off",
			hex: "#ff00ff",
			lightOn: false
		}
	].map((frame) => Object.freeze(frame)));
	//#endregion
	//#region src/wifi-light.mjs
	var DEFAULT_DEVICE_URL = "http://192.168.4.1";
	function normalizeDeviceUrl(value) {
		if (typeof value !== "string" || !value.trim()) throw new Error("Enter the board address, for example http://192.168.4.1.");
		let url;
		try {
			url = new URL(value.trim().includes("://") ? value.trim() : `http://${value.trim()}`);
		} catch {
			throw new Error("Enter a valid local board address.");
		}
		if (url.protocol !== "http:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) throw new Error("Use a local HTTP address without a path, password or query.");
		const parts = url.hostname.split(".").map(Number);
		const ipv4 = /^\d+\.\d+\.\d+\.\d+$/.test(url.hostname) && parts.every((part) => Number.isInteger(part) && part >= 0 && part <= 255);
		if (!(url.hostname === "localhost" || ipv4 && (parts[0] === 127 || parts[0] === 10 || parts[0] === 192 && parts[1] === 168 || parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31))) throw new Error("Use the board’s private Wi-Fi IP address.");
		return url.origin;
	}
	function normalizeCommand(command) {
		const colour = normalizeHex(command?.colour);
		if (!colour || typeof command?.brightness !== "number" || !Number.isFinite(command.brightness) || command.brightness < 0 || command.brightness > 100 || typeof command?.lightOn !== "boolean") throw new Error("Invalid colour, brightness or light power.");
		return {
			colour,
			brightness: Math.round(command.brightness),
			lightOn: command.lightOn
		};
	}
	var keyOf = (command) => `${command.colour}/${command.brightness}/${command.lightOn}`;
	var integer = (value, max) => Number.isInteger(value) && value >= 0 && value <= max;
	var validRgb = (value) => value && [
		"r",
		"g",
		"b"
	].every((channel) => integer(value[channel], 255));
	var wireCommand = (command) => {
		const output = getLightOutput(command.colour, command.brightness, command.lightOn);
		const off = !output.r && !output.g && !output.b;
		return {
			output: {
				r: output.r,
				g: output.g,
				b: output.b
			},
			hex: output.hex.slice(1),
			action: off ? "off" : "set",
			acknowledgement: off ? "OFF" : "OK"
		};
	};
	var wireKey = (command) => {
		const wire = wireCommand(command);
		return `${wire.action}/${wire.hex}`;
	};
	function validateStatus(data) {
		if (data?.device !== "gallery-echoes-nano-esp32" || data?.protocol !== 2) throw new Error("This address is not running the Gallery Echoes Nano ESP32 firmware.");
		if (typeof data.firmware !== "string" || !data.firmware || data.firmware.length > 64 || !integer(data.revision, 4294967295) || !integer(data.seq, 2147483647) || !validRgb(data.output) || ![
			"boot",
			"set",
			"off"
		].includes(data.lastCommand)) throw new Error("The board returned an invalid status.");
		return {
			device: data.device,
			protocol: data.protocol,
			firmware: data.firmware,
			revision: data.revision,
			seq: data.seq,
			lastCommand: data.lastCommand,
			output: { ...data.output },
			mode: "status"
		};
	}
	function validateLegacyPage(html) {
		const markup = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
		const hasPicker = (markup.match(/<input\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi) || []).some((input) => {
			const attributes = /* @__PURE__ */ new Map();
			for (const match of input.slice(6, -1).matchAll(/\s+([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
				const name = match[1].toLowerCase();
				if (attributes.has(name) && ["id", "type"].includes(name)) return false;
				attributes.set(name, match[2] ?? match[3] ?? match[4] ?? "");
			}
			return attributes.get("id") === "picker" && attributes.get("type")?.toLowerCase() === "color";
		});
		if (!/<title>\s*Gallery Echoes\s*<\/title>/i.test(markup) || !hasPicker) throw new Error("This address does not show the existing Gallery Echoes colour controller.");
		return {
			device: "gallery-echoes-legacy",
			protocol: 0,
			mode: "legacy",
			verification: "page-identified"
		};
	}
	function cancelled() {
		const error = /* @__PURE__ */ new Error("Connection cancelled.");
		error.name = "AbortError";
		return error;
	}
	function createWifiLightController({ fetchImpl = globalThis.fetch, onChange = () => {}, timeoutMs = 3e3, throttleMs = 100, heartbeatMs = 5e3 } = {}) {
		const timeout = Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : 3e3;
		const throttle = Number.isFinite(throttleMs) && throttleMs >= 0 ? throttleMs : 100;
		const heartbeat = Number.isFinite(heartbeatMs) && heartbeatMs >= 0 ? heartbeatMs : 5e3;
		let snapshot = {
			status: "disconnected",
			endpoint: DEFAULT_DEVICE_URL,
			mode: null,
			device: null,
			lastApplied: null,
			lastSeenAt: null,
			error: null
		};
		let epoch = 0, active = false, ready = false, busy = false, disposed = false;
		let pending = null, sendTimer = null, heartbeatTimer = null, initialWaiter = null;
		let sequence = 0, lastStartedAt = -Infinity;
		const requests = /* @__PURE__ */ new Set();
		const current = (token) => !disposed && active && token === epoch;
		const publish = (changes) => {
			snapshot = {
				...snapshot,
				...changes
			};
			onChange(snapshot);
		};
		const clearSession = () => {
			epoch += 1;
			active = false;
			ready = false;
			busy = false;
			pending = null;
			clearTimeout(sendTimer);
			clearTimeout(heartbeatTimer);
			sendTimer = heartbeatTimer = null;
			for (const controller of requests) controller.abort();
			requests.clear();
			if (initialWaiter) {
				initialWaiter.reject(cancelled());
				initialWaiter = null;
			}
		};
		const fail = (token, error) => {
			if (!current(token)) return;
			const waiter = initialWaiter;
			initialWaiter = null;
			clearSession();
			publish({
				status: "error",
				error: error.message || "The board did not respond. Reconnect to try again."
			});
			waiter?.reject(error);
		};
		async function request(token, path, { parser = "status", allowNotFound = false, ...options } = {}) {
			if (!current(token)) throw cancelled();
			const controller = new AbortController();
			requests.add(controller);
			let deadline, onAbort;
			const abort = new Promise((_, reject) => {
				onAbort = () => reject(cancelled());
				controller.signal.addEventListener("abort", onAbort, { once: true });
			});
			const expiry = new Promise((_, reject) => {
				deadline = setTimeout(() => {
					reject(/* @__PURE__ */ new Error("The board timed out. Check its Wi-Fi and reconnect."));
					controller.abort();
				}, timeout);
			});
			try {
				const work = (async () => {
					if (typeof fetchImpl !== "function") throw new Error("This browser cannot send Wi-Fi requests.");
					const response = await fetchImpl(`${snapshot.endpoint}${path}`, {
						...options,
						signal: controller.signal,
						mode: "cors",
						credentials: "omit",
						cache: "no-store",
						redirect: "error"
					});
					if (allowNotFound && response.status === 404) return null;
					if (!response.ok) throw new Error(`The board rejected the request (HTTP ${response.status}).`);
					if (parser !== "status") {
						const text = await response.text();
						return parser === "page" ? validateLegacyPage(text) : text.trim();
					}
					let data;
					try {
						data = await response.json();
					} catch {
						throw new Error("The board did not return a valid JSON acknowledgement.");
					}
					return validateStatus(data);
				})();
				const data = await Promise.race([
					work,
					expiry,
					abort
				]);
				if (!current(token)) throw cancelled();
				return data;
			} catch (error) {
				if (error?.name === "TypeError") throw new Error("Board unreachable. Check Wi-Fi, the IP address and browser local network permission.");
				throw error;
			} finally {
				clearTimeout(deadline);
				controller.signal.removeEventListener("abort", onAbort);
				requests.delete(controller);
			}
		}
		function planHeartbeat(token) {
			clearTimeout(heartbeatTimer);
			if (!current(token) || !heartbeat) return;
			heartbeatTimer = setTimeout(async () => {
				heartbeatTimer = null;
				if (!current(token)) return;
				if (busy || pending) {
					planHeartbeat(token);
					return;
				}
				busy = true;
				try {
					const device = snapshot.mode === "legacy" ? await request(token, "/", { parser: "page" }) : await request(token, "/status");
					if (!current(token)) return;
					busy = false;
					publish({
						device,
						lastSeenAt: Date.now()
					});
					schedule(token);
					planHeartbeat(token);
				} catch (error) {
					fail(token, error);
				}
			}, heartbeat);
		}
		function schedule(token) {
			if (!current(token) || !ready || busy || sendTimer !== null || !pending) return;
			const knownWire = snapshot.mode === "status" && snapshot.device ? `${snapshot.device.lastCommand}/${rgbToHex(snapshot.device.output).slice(1)}` : snapshot.lastApplied ? wireKey(snapshot.lastApplied) : null;
			if (snapshot.lastApplied && wireKey(pending) === knownWire) {
				pending = null;
				publish({ status: "connected" });
				return;
			}
			sendTimer = setTimeout(() => {
				sendTimer = null;
				sendLatest(token);
			}, Math.max(0, throttle - (Date.now() - lastStartedAt)));
		}
		async function sendLatest(token) {
			if (!current(token) || busy || !pending) return;
			const command = pending;
			pending = null;
			busy = true;
			lastStartedAt = Date.now();
			const wire = wireCommand(command);
			sequence = sequence >= 2147483647 ? 1 : sequence + 1;
			const seq = sequence;
			publish({
				status: "sending",
				error: null
			});
			if (!current(token)) return;
			try {
				const acknowledgement = await request(token, wire.action === "off" ? `/off?seq=${seq}` : `/set?hex=${wire.hex}&seq=${seq}`, { parser: "text" });
				if (!current(token)) return;
				if (acknowledgement !== wire.acknowledgement) throw new Error(`The board did not acknowledge the request with ${wire.acknowledgement}.`);
				let device = snapshot.device;
				if (snapshot.mode === "status") {
					device = await request(token, "/status");
					if (!current(token)) return;
					if (device.seq !== seq || device.lastCommand !== wire.action || [
						"r",
						"g",
						"b"
					].some((channel) => device.output[channel] !== wire.output[channel])) throw new Error("The board status does not match the colour sent. Reconnect to try again.");
				}
				const confirmed = snapshot.mode === "status";
				const lastApplied = {
					...command,
					output: wire.output,
					seq,
					revision: confirmed ? device.revision : null,
					at: Date.now(),
					acknowledgement,
					verification: confirmed ? "state-confirmed" : "request-acknowledged",
					source: confirmed ? "status" : "text"
				};
				busy = false;
				if (pending && keyOf(pending) === keyOf(command)) pending = null;
				publish({
					status: pending ? "sending" : "connected",
					device,
					lastApplied,
					lastSeenAt: lastApplied.at
				});
				if (initialWaiter?.token === token) {
					initialWaiter.resolve(lastApplied);
					initialWaiter = null;
				}
				schedule(token);
				planHeartbeat(token);
			} catch (error) {
				fail(token, error);
			}
		}
		return {
			getSnapshot: () => snapshot,
			async connect(endpoint, command) {
				if (disposed) throw new Error("This connection has been closed.");
				clearSession();
				let address, initial;
				try {
					address = normalizeDeviceUrl(endpoint);
					initial = normalizeCommand(command);
				} catch (error) {
					publish({
						status: "error",
						mode: null,
						device: null,
						lastApplied: null,
						lastSeenAt: null,
						error: error.message
					});
					throw error;
				}
				active = true;
				ready = false;
				pending = initial;
				sequence = 0;
				lastStartedAt = -Infinity;
				const token = epoch;
				publish({
					status: "connecting",
					endpoint: address,
					mode: null,
					device: null,
					lastApplied: null,
					lastSeenAt: null,
					error: null
				});
				try {
					let device = await request(token, "/status", { allowNotFound: true });
					if (device === null) device = await request(token, "/", { parser: "page" });
					if (!current(token)) throw cancelled();
					ready = true;
					publish({
						device,
						mode: device.mode,
						lastSeenAt: Date.now()
					});
					if (!current(token)) throw cancelled();
					return await new Promise((resolve, reject) => {
						initialWaiter = {
							token,
							resolve,
							reject
						};
						schedule(token);
					});
				} catch (error) {
					fail(token, error);
					throw error;
				}
			},
			setLight(command) {
				if (!active || disposed) return false;
				pending = normalizeCommand(command);
				schedule(epoch);
				return true;
			},
			disconnect() {
				clearSession();
				if (!disposed) publish({
					status: "disconnected",
					mode: null,
					device: null,
					error: null
				});
			},
			dispose() {
				clearSession();
				disposed = true;
			}
		};
	}
	//#endregion
	//#region node_modules/react/cjs/react-jsx-runtime.production.js
	/**
	* @license React
	* react-jsx-runtime.production.js
	*
	* Copyright (c) Meta Platforms, Inc. and affiliates.
	*
	* This source code is licensed under the MIT license found in the
	* LICENSE file in the root directory of this source tree.
	*/
	var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
		var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
		var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
		function jsxProd(type, config, maybeKey) {
			var key = null;
			void 0 !== maybeKey && (key = "" + maybeKey);
			void 0 !== config.key && (key = "" + config.key);
			if ("key" in config) {
				maybeKey = {};
				for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
			} else maybeKey = config;
			config = maybeKey.ref;
			return {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				ref: void 0 !== config ? config : null,
				props: maybeKey
			};
		}
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.jsx = jsxProd;
		exports.jsxs = jsxProd;
	}));
	//#endregion
	//#region src/WristbandModel.jsx
	var import_jsx_runtime = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_react_jsx_runtime_production();
	})))();
	function WristbandModel() {
		const id = (0, import_react.useId)().replace(/[^a-zA-Z0-9_-]/g, "");
		const ref = (name) => `url(#${id}-${name})`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "wb-model",
			viewBox: "24 14 312 206",
			preserveAspectRatio: "xMidYMid meet",
			"aria-hidden": "true",
			focusable: "false",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: `${id}-top`,
						x1: "86",
						y1: "36",
						x2: "254",
						y2: "167",
						gradientUnits: "userSpaceOnUse",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#fffdf8" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: ".48",
								stopColor: "#f0e9de"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#e2d8c9"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: `${id}-front`,
						x1: "180",
						y1: "107",
						x2: "180",
						y2: "188",
						gradientUnits: "userSpaceOnUse",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#e9e0d2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: ".45",
								stopColor: "#d7cbb9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#c6b9a5"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: `${id}-inside`,
						x1: "180",
						y1: "59",
						x2: "180",
						y2: "107",
						gradientUnits: "userSpaceOnUse",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "#b6a995" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: ".55",
								stopColor: "#d9cebe"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#eee7dc"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: `${id}-rim`,
						x1: "180",
						y1: "37",
						x2: "180",
						y2: "166",
						gradientUnits: "userSpaceOnUse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							stopColor: "#ffffff",
							stopOpacity: ".95"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#fff9ec",
							stopOpacity: ".3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
						id: `${id}-shadow`,
						x: "-30%",
						y: "-100%",
						width: "160%",
						height: "300%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
						id: `${id}-light`,
						x: "-30%",
						y: "-150%",
						width: "160%",
						height: "400%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", { stdDeviation: "3" })
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "183",
					cy: "197",
					rx: "109",
					ry: "9",
					fill: "#6b5942",
					opacity: ".12",
					filter: ref("shadow")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: "rotate(-10 180 110)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M69 100 C69 77 119 60 180 60 C241 60 291 77 291 100 L286 112 C279 92 235 80 180 80 C125 80 81 92 74 112 Z",
							fill: ref("inside")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M44 100 C44 136 105 165 180 165 C255 165 316 136 316 100 L316 121 C316 157 255 186 180 186 C105 186 44 157 44 121 Z",
							fill: ref("front"),
							stroke: "#bfb19d",
							strokeOpacity: ".35",
							strokeWidth: ".7"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M316 100 C316 136 255 165 180 165 C105 165 44 136 44 100 C44 64 105 35 180 35 C255 35 316 64 316 100 Z M291 100 C291 77 241 60 180 60 C119 60 69 77 69 100 C69 124 119 144 180 144 C241 144 291 124 291 100 Z",
							fill: ref("top"),
							fillRule: "evenodd"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M45 100 C45 65 106 36 180 36 C254 36 315 65 315 100",
							fill: "none",
							stroke: ref("rim"),
							strokeWidth: "1.8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M70 100 C70 124 120 144 180 144 C240 144 290 124 290 100",
							fill: "none",
							stroke: "#fffdf7",
							strokeOpacity: ".75",
							strokeWidth: "1.2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M49 124 C61 157 113 182 180 182 C247 182 299 157 311 124",
							fill: "none",
							stroke: "#a89982",
							strokeOpacity: ".22",
							strokeWidth: "1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M278 57 L290 67 M293 70 L284 84",
							fill: "none",
							stroke: "#c7bba9",
							strokeOpacity: ".65",
							strokeWidth: "1",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: "83",
							y: "151",
							transform: "rotate(20 83 151)",
							fill: "#958772",
							fontFamily: "Georgia, serif",
							fontSize: "6.5",
							letterSpacing: ".5",
							children: "echoes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M120 168 Q180 186 240 168",
							fill: "none",
							stroke: "#b5a995",
							strokeWidth: "13",
							strokeLinecap: "round",
							opacity: ".55"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							className: "wb-model-led-glow",
							d: "M122 169 Q180 187 238 169",
							fill: "none",
							strokeWidth: "15",
							strokeLinecap: "round",
							filter: ref("light")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							className: "wb-model-led",
							d: "M122 169 Q180 187 238 169",
							fill: "none",
							strokeWidth: "8",
							strokeLinecap: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							className: "wb-model-led-highlight",
							d: "M125 167.5 Q180 184 235 167.5",
							fill: "none",
							strokeWidth: "1.2",
							strokeLinecap: "round"
						})
					]
				})
			]
		});
	}
	//#endregion
	//#region src/WristbandColourStudio.jsx
	var COMMON_COLOURS = [
		["Soft blue", "#91bdd8"],
		["Lavender", "#c1abe5"],
		["Peach", "#e8af90"],
		["Sage", "#b0c9a1"],
		["Red", "#ff0000"],
		["Green", "#00ff00"],
		["White", "#ffffff"],
		["Black", "#000000"]
	];
	var clamp = (value, min, max) => Math.max(min, Math.min(max, value));
	function WifiLightConnection() {
		const { wifiEndpoint, setWifiEndpoint, wifiConnection, wifiConnected, connectBoard, disconnectBoard } = useWristband();
		const [addressError, setAddressError] = (0, import_react.useState)("");
		const [connectionError, setConnectionError] = (0, import_react.useState)("");
		const ids = (0, import_react.useId)();
		const connecting = wifiConnection.status === "connecting" || ["sending", "connected"].includes(wifiConnection.status) && !wifiConnected;
		const stateLabel = wifiConnected ? wifiConnection.status === "sending" ? "Sending…" : "Connected" : connecting ? "Connecting…" : wifiConnection.status === "error" ? "Connection stopped" : "Disconnected";
		const last = wifiConnection.lastApplied;
		const stateConfirmed = last?.verification === "state-confirmed";
		const acknowledgementLabel = stateConfirmed ? "Last confirmed" : "Last acknowledged request";
		const confirmedHex = last ? "#" + [
			last.output.r,
			last.output.g,
			last.output.b
		].map((value) => value.toString(16).padStart(2, "0")).join("").toUpperCase() : "";
		const confirmedTime = last ? new Date(last.at) : null;
		const error = wifiConnection.error || connectionError;
		const message = wifiConnected ? stateConfirmed ? "Board linked. Firmware state confirms the last command; colour changes send automatically." : "Board linked. Colour requests receive OK/OFF replies. Physical light output is not verified." : connecting ? "Waiting for the board. Your screen preview stays available." : wifiConnection.status === "error" ? "Preview only. Sending has stopped. Reconnect to try again." : last ? "Preview only. Disconnected; sending has stopped." : "Preview only. Join the board Wi-Fi, then connect when its compatible firmware is ready.";
		const connect = async (event) => {
			event.preventDefault();
			if (connecting || wifiConnected) return;
			let endpoint;
			try {
				endpoint = normalizeDeviceUrl(wifiEndpoint);
			} catch (reason) {
				setAddressError(reason.message);
				return;
			}
			setAddressError("");
			setConnectionError("");
			try {
				await connectBoard(endpoint);
			} catch (reason) {
				setConnectionError(reason.message || "The board did not respond. Check its Wi-Fi and reconnect.");
			}
		};
		const disconnect = () => {
			setConnectionError("");
			setAddressError("");
			disconnectBoard();
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "wb-wifi-connection",
			"data-connection-status": wifiConnection.status,
			"aria-labelledby": `${ids}-title`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wb-wifi-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ARDUINO NANO ESP32" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: `${ids}-title`,
						children: "Wi-Fi light control"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "wb-wifi-state",
						"data-linked": wifiConnected ? "true" : "false",
						children: stateLabel
					})]
				}),
				!wifiConnected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wb-wifi-setup",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Keep your existing ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "/set" }),
						" and ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "/off" }),
						" controls. For Go Live access, upload this project's compatible version by USB."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Join ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "GalleryEchoes" }),
						" in your system Wi-Fi.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No password" })
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The compatible version allows cross-origin requests from Go Live. This page cannot switch your system Wi-Fi." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "wb-wifi-form",
					onSubmit: connect,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: `${ids}-address`,
							children: "Board address"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: `${ids}-address`,
							type: "text",
							inputMode: "url",
							autoComplete: "off",
							spellCheck: false,
							value: wifiEndpoint,
							disabled: connecting || wifiConnected,
							"aria-invalid": !!addressError,
							"aria-describedby": `${ids}-address-help${addressError ? ` ${ids}-address-error` : ""}`,
							onChange: (event) => {
								setWifiEndpoint(event.target.value);
								setAddressError("");
								setConnectionError("");
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: `${ids}-address-help`,
							children: "Local HTTP address · default 192.168.4.1"
						}),
						addressError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wb-studio-error",
							id: `${ids}-address-error`,
							role: "alert",
							children: addressError
						}),
						wifiConnected || connecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "wb-wifi-disconnect",
							onClick: disconnect,
							children: connecting ? "Cancel connection" : "Disconnect"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "wb-wifi-connect",
							children: [wifiConnection.status === "error" ? "Reconnect" : "Connect to board", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "↗"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wb-wifi-message",
					role: "status",
					"aria-live": "polite",
					children: message
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wb-wifi-error",
					role: "alert",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "wb-wifi-confirmed",
					"data-verification": last?.verification || "none",
					children: last ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "wb-wifi-confirmed-swatch",
						style: { backgroundColor: confirmedHex },
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							acknowledgementLabel,
							" · ",
							confirmedHex
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								dateTime: confirmedTime.toISOString(),
								children: confirmedTime.toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
									second: "2-digit"
								})
							}),
							" · ",
							last.brightness,
							"% requested · ",
							last.lightOn ? "power requested on" : "power requested off"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							"Selected ",
							last.colour.toUpperCase(),
							" · ",
							stateConfirmed ? "firmware state reported" : `request acknowledged: ${last.acknowledgement || (last.lightOn ? "OK" : "OFF")}`
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: stateConfirmed ? "Reported firmware state; emitted light is not measured." : "OK/OFF acknowledges the request, not the measured light output." })
					] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No colour command has been acknowledged by a board." })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wb-wifi-footnote",
					children: "Disconnect stops new commands; it does not switch the board off. Screen colours and vibration previews remain available."
				})
			]
		});
	}
	function WristbandColourStudio() {
		const { activeColour, customColour, setCustomColour, brightness, setBrightness, lightOn, setLightOn, lightLabel, lightOutput, lightActive, feeling, setFeeling, quietMode, reducedMotion, demoRunning, demoStep, startColourDemo, stopColourDemo, wifiConnected, wifiConnection } = useWristband();
		const [hsv, setHsv] = (0, import_react.useState)(() => hexToHsv(activeColour));
		const [hexDraft, setHexDraft] = (0, import_react.useState)(activeColour.toUpperCase());
		const [hexError, setHexError] = (0, import_react.useState)("");
		const [dragging, setDragging] = (0, import_react.useState)(false);
		const hsvRef = (0, import_react.useRef)(hsv);
		const lastApplied = (0, import_react.useRef)(activeColour);
		const fieldRef = (0, import_react.useRef)(null);
		const pointerRef = (0, import_react.useRef)(null);
		const hexFocused = (0, import_react.useRef)(false);
		const ids = (0, import_react.useId)();
		hsvRef.current = hsv;
		(0, import_react.useEffect)(() => {
			if (activeColour !== lastApplied.current) {
				const next = hexToHsv(activeColour);
				setHsv((current) => ({
					...next,
					h: next.s === 0 ? current.h : next.h,
					s: next.v === 0 ? current.s : next.s
				}));
				lastApplied.current = activeColour;
			}
			if (!hexFocused.current) {
				setHexDraft(activeColour.toUpperCase());
				setHexError("");
			}
		}, [activeColour]);
		(0, import_react.useEffect)(() => () => {
			stopColourDemo(ids);
		}, [stopColourDemo, ids]);
		const applyHsv = (next) => {
			const bounded = {
				h: (next.h % 360 + 360) % 360,
				s: clamp(next.s, 0, 100),
				v: clamp(next.v, 0, 100)
			};
			const hex = hsvToHex(bounded);
			hsvRef.current = bounded;
			setHsv(bounded);
			lastApplied.current = hex;
			setCustomColour(hex);
			setHexError("");
			if (!hexFocused.current) setHexDraft(hex.toUpperCase());
		};
		const applyColour = (value) => {
			const hex = normalizeHex(value);
			if (!hex) return false;
			const next = hexToHsv(hex);
			const current = hsvRef.current;
			const preserved = {
				...next,
				h: next.s === 0 ? current.h : next.h,
				s: next.v === 0 ? current.s : next.s
			};
			hsvRef.current = preserved;
			setHsv(preserved);
			lastApplied.current = hex;
			setCustomColour(hex);
			setHexError("");
			return true;
		};
		const commitHex = () => {
			const hex = normalizeHex(hexDraft);
			if (!hex) {
				setHexError("Enter 3 or 6 hexadecimal digits, for example #91BDD8.");
				return;
			}
			applyColour(hex);
			setHexDraft(hex.toUpperCase());
		};
		const updateFromPointer = (event) => {
			const bounds = fieldRef.current?.getBoundingClientRect();
			if (!bounds || !bounds.width || !bounds.height) return;
			applyHsv({
				...hsvRef.current,
				s: clamp((event.clientX - bounds.left) / bounds.width * 100, 0, 100),
				v: clamp(100 - (event.clientY - bounds.top) / bounds.height * 100, 0, 100)
			});
		};
		const finishPointer = (event) => {
			if (pointerRef.current !== event.pointerId) return;
			pointerRef.current = null;
			setDragging(false);
			if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
		};
		const cycleBlocked = quietMode || reducedMotion;
		const blockedReason = quietMode ? "Quiet mode keeps automatic colour changes off. You can still adjust colours by hand." : reducedMotion ? "Reduced motion keeps automatic colour changes off. You can still adjust colours by hand." : "";
		const statusMessage = demoRunning ? `Arduino sequence running. One step each second. ${wifiConnected ? "Sending colours over Wi-Fi." : "Preview only."}` : !lightOn ? "Light off in preview. Your chosen colour is kept for next time." : !lightActive ? "No light output. Raise brightness or choose a lighter colour." : `${wifiConnected ? "Wi-Fi light controls active" : "Preview only"}. ${brightness}% brightness.`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "wb-colour-studio",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "wb-studio-preview",
					"aria-label": "Device light preview",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "wb-studio-preview-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), wifiConnected ? "Board linked" : "Preview only"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: demoRunning ? "Sequence running" : lightOn && lightActive ? "Light on" : "No light output" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandPreview, { interactive: false }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "wb-studio-output",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wb-studio-output-swatch",
								style: { backgroundColor: lightOutput.hex },
								"aria-hidden": "true"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: lightLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								"RGB ",
								lightOutput.r,
								", ",
								lightOutput.g,
								", ",
								lightOutput.b,
								" · ",
								wifiConnected ? wifiConnection.status === "sending" ? "sending to board" : "Wi-Fi controls active" : "screen preview"
							] })] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiLightConnection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "wb-studio-palette",
					"aria-labelledby": `${ids}-field-title`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "wb-studio-section-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: `${ids}-field-title`,
								children: "Colour field"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: activeColour.toUpperCase() })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `wb-studio-colour-field${dragging ? " is-dragging" : ""}`,
							ref: fieldRef,
							tabIndex: 0,
							role: "group",
							"aria-roledescription": "two-dimensional colour control",
							"aria-label": `Colour field. Saturation ${Math.round(hsv.s)} percent. Value ${Math.round(hsv.v)} percent.`,
							"aria-describedby": `${ids}-field-help`,
							style: { "--wb-studio-hue": hsvToHex({
								h: hsv.h,
								s: 100,
								v: 100
							}) },
							onPointerDown: (event) => {
								if (pointerRef.current !== null || event.pointerType === "mouse" && event.button !== 0) return;
								event.preventDefault();
								event.currentTarget.focus({ preventScroll: true });
								pointerRef.current = event.pointerId;
								event.currentTarget.setPointerCapture(event.pointerId);
								setDragging(true);
								updateFromPointer(event);
							},
							onPointerMove: (event) => {
								if (pointerRef.current === event.pointerId) {
									event.preventDefault();
									updateFromPointer(event);
								}
							},
							onPointerUp: finishPointer,
							onPointerCancel: finishPointer,
							onLostPointerCapture: (event) => {
								if (pointerRef.current === event.pointerId) {
									pointerRef.current = null;
									setDragging(false);
								}
							},
							onKeyDown: (event) => {
								if (![
									"ArrowLeft",
									"ArrowRight",
									"ArrowUp",
									"ArrowDown",
									"Home",
									"End"
								].includes(event.key)) return;
								event.preventDefault();
								const amount = event.shiftKey ? 10 : 1;
								const next = { ...hsvRef.current };
								if (event.key === "ArrowLeft") next.s -= amount;
								if (event.key === "ArrowRight") next.s += amount;
								if (event.key === "ArrowUp") next.v += amount;
								if (event.key === "ArrowDown") next.v -= amount;
								if (event.key === "Home") next.s = 0;
								if (event.key === "End") next.s = 100;
								applyHsv(next);
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wb-studio-field-thumb",
								style: {
									left: `${hsv.s}%`,
									top: `${100 - hsv.v}%`,
									backgroundColor: hsvToHex(hsv)
								},
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wb-studio-help",
							id: `${ids}-field-help`,
							children: "Drag to choose · ← → saturation · ↑ ↓ value · Shift for larger steps"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "wb-studio-range-label",
							htmlFor: `${ids}-hue`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", { children: [Math.round(hsv.h), "°"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "wb-studio-range wb-studio-hue-range",
							id: `${ids}-hue`,
							type: "range",
							min: "0",
							max: "359",
							step: "1",
							value: Math.min(359, Math.round(hsv.h)),
							"aria-valuetext": `${Math.round(hsv.h)} degrees hue`,
							onChange: (event) => applyHsv({
								...hsvRef.current,
								h: Number(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "wb-studio-inputs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "wb-studio-hex-form",
								onSubmit: (event) => {
									event.preventDefault();
									commitHex();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: `${ids}-hex`,
									children: "HEX colour"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: `${ids}-hex`,
									type: "text",
									value: hexDraft,
									maxLength: 7,
									autoComplete: "off",
									autoCapitalize: "characters",
									spellCheck: false,
									"aria-invalid": !!hexError,
									"aria-describedby": hexError ? `${ids}-hex-error` : void 0,
									onFocus: () => {
										hexFocused.current = true;
									},
									onBlur: () => {
										hexFocused.current = false;
										commitHex();
									},
									onChange: (event) => {
										const next = event.target.value;
										setHexDraft(next);
										setHexError("");
										if (/^#?[0-9a-f]{6}$/i.test(next.trim())) applyColour(next);
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									"aria-label": "Apply HEX colour",
									children: "↗"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "wb-studio-native-colour",
								htmlFor: `${ids}-native`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "System picker" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: `${ids}-native`,
									type: "color",
									value: activeColour,
									"aria-label": "Open system colour picker",
									onChange: (event) => {
										applyColour(event.target.value);
										setHexDraft(event.target.value.toUpperCase());
									}
								})]
							})]
						}),
						hexError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wb-studio-error",
							id: `${ids}-hex-error`,
							role: "alert",
							children: hexError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "wb-studio-fine-tune",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Fine-tune saturation and value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "wb-studio-range-label",
									htmlFor: `${ids}-saturation`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saturation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", { children: [Math.round(hsv.s), "%"] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "wb-studio-range",
									id: `${ids}-saturation`,
									type: "range",
									min: "0",
									max: "100",
									value: Math.round(hsv.s),
									onChange: (event) => applyHsv({
										...hsvRef.current,
										s: Number(event.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "wb-studio-range-label",
									htmlFor: `${ids}-value`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Colour value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", { children: [Math.round(hsv.v), "%"] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "wb-studio-range",
									id: `${ids}-value`,
									type: "range",
									min: "0",
									max: "100",
									value: Math.round(hsv.v),
									onChange: (event) => applyHsv({
										...hsvRef.current,
										v: Number(event.target.value)
									})
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "wb-studio-subtitle",
							children: "A few colours to begin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wb-studio-common-colours",
							role: "group",
							"aria-label": "Common light colours",
							children: COMMON_COLOURS.map(([name, hex]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": `${name}. ${hex.toUpperCase()}`,
								"aria-pressed": !demoRunning && customColour === hex,
								onClick: () => {
									applyColour(hex);
									setHexDraft(hex.toUpperCase());
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { backgroundColor: hex },
									"aria-hidden": "true",
									children: !demoRunning && customColour === hex ? "✓" : ""
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: name })]
							}, hex))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "wb-studio-light-controls",
					"aria-label": "Light output controls",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "wb-studio-power-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Light power" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: lightOn ? "Turn off without losing your colour." : "Your colour is kept while the light is off." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "wb-preference-switch",
								type: "button",
								role: "switch",
								"aria-label": "Light power",
								"aria-checked": lightOn,
								onClick: () => setLightOn((current) => !current),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "wb-studio-range-label",
							htmlFor: `${ids}-brightness`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Brightness" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", { children: [brightness, "%"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "wb-studio-range",
							id: `${ids}-brightness`,
							type: "range",
							min: "0",
							max: "100",
							step: "1",
							value: brightness,
							"aria-valuetext": `${brightness} percent brightness`,
							onChange: (event) => setBrightness(Number(event.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wb-studio-help",
							children: "Changing a colour turns this preview on. Brightness stays at your chosen level."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "wb-studio-reset",
							type: "button",
							onClick: () => setFeeling(feeling),
							children: ["Use my feeling colour ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: "↗"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "wb-studio-demo",
					"aria-labelledby": `${ids}-demo-title`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "wb-studio-section-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								id: `${ids}-demo-title`,
								children: "Arduino sequence"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "1 second per step" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wb-studio-demo-frames",
							"aria-label": "Red, green, blue, yellow, purple, then off",
							children: ARDUINO_DEMO_FRAMES.map((frame, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: demoRunning && demoStep?.index === index ? "is-current" : "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
									style: { backgroundColor: frame.lightOn ? frame.hex : "#d7d2c7" },
									"aria-hidden": "true"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: frame.label })]
							}, frame.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "wb-studio-demo-button",
							type: "button",
							disabled: !demoRunning && cycleBlocked,
							"aria-pressed": demoRunning,
							onClick: () => demoRunning ? stopColourDemo() : startColourDemo(ids),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								children: demoRunning ? "■" : "▷"
							}), demoRunning ? "Stop sequence" : "Start sequence"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wb-studio-help",
							children: blockedReason || "Red → green → blue → yellow → purple → off. Stop restores your light. Manual controls stop the sequence."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wb-studio-status",
					role: "status",
					"aria-live": "polite",
					children: statusMessage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "wb-studio-hardware-note",
					children: [
						wifiConnected ? wifiConnection.lastApplied?.verification === "state-confirmed" ? "Nano ESP32 linked over Wi-Fi. The card above reports the last firmware-confirmed state." : "Nano ESP32 linked over Wi-Fi. The card above shows the last OK/OFF request acknowledgement." : "Preview only until you explicitly connect your Nano ESP32 over Wi-Fi.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Vibration is a screen preview. Emitted LED light is not measured."
					]
				})
			]
		});
	}
	//#endregion
	//#region src/Wristband.jsx
	var PALETTE = {
		amber: {
			name: "Warm amber",
			color: "#bb9364",
			light: "#e6bb7b",
			soft: "#f2e7d4",
			ink: "#775734",
			rgb: "187, 147, 100"
		},
		blue: {
			name: "Quiet blue",
			color: "#7a9ab0",
			light: "#91bdd8",
			soft: "#e3edf2",
			ink: "#476a83",
			rgb: "122, 154, 176"
		},
		lavender: {
			name: "Soft lavender",
			color: "#a394bd",
			light: "#c1abe5",
			soft: "#eae4f1",
			ink: "#6d5b87",
			rgb: "163, 148, 189"
		},
		peach: {
			name: "Warm peach",
			color: "#c8957e",
			light: "#e8af90",
			soft: "#f2e2d9",
			ink: "#855a47",
			rgb: "200, 149, 126"
		},
		sage: {
			name: "Gentle sage",
			color: "#91a38a",
			light: "#b0c9a1",
			soft: "#e4eadf",
			ink: "#5c7456",
			rgb: "145, 163, 138"
		}
	};
	var FEELINGS$1 = [
		{
			label: "Calm",
			tone: "blue",
			description: "A quiet moment"
		},
		{
			label: "Curious",
			tone: "lavender",
			description: "An invitation to explore"
		},
		{
			label: "Nostalgic",
			tone: "peach",
			description: "A memory returning"
		},
		{
			label: "Other feeling",
			tone: "sage",
			description: "Room for your own feeling"
		}
	];
	var SIGNALS = {
		idle: {
			label: "Ready to explore",
			description: "A slow amber breath marks the beginning of your visit."
		},
		scanning: {
			label: "Finding an artwork",
			description: "A blue pulse follows the artwork scan."
		},
		connected: {
			label: "Your feeling, in light",
			description: "The light and the interface share your selected feeling."
		},
		saved: {
			label: "Moment acknowledged",
			description: "A gentle light pulse acknowledges this moment. Your feeling keeps its colour."
		}
	};
	var FEEDBACK_MESSAGES = {
		submitted: "Your echo has been added. Your feeling stays with you.",
		saved: "Your moment is ready to keep.",
		connected: "Your wristband light preview is ready.",
		preview: "A gentle light and vibration preview."
	};
	var PREFERENCES_KEY = "gallery-echoes-feedback-preferences-v1";
	var WIFI_ENDPOINT_KEY = "gallery-echoes-wifi-endpoint-v1";
	function readPreferences() {
		const defaults = {
			vibrationEnabled: true,
			quietMode: false
		};
		try {
			const saved = JSON.parse(window.localStorage.getItem(PREFERENCES_KEY) || "null");
			return {
				vibrationEnabled: typeof saved?.vibrationEnabled === "boolean" ? saved.vibrationEnabled : defaults.vibrationEnabled,
				quietMode: typeof saved?.quietMode === "boolean" ? saved.quietMode : defaults.quietMode
			};
		} catch {
			return defaults;
		}
	}
	function readLightSettings() {
		try {
			return normalizeLightSettings(JSON.parse(window.localStorage.getItem("gallery-echoes-light-v1") || "null"));
		} catch {
			return normalizeLightSettings(null);
		}
	}
	function readWifiEndpoint() {
		try {
			return normalizeDeviceUrl(window.localStorage.getItem(WIFI_ENDPOINT_KEY) || "http://192.168.4.1");
		} catch {
			return DEFAULT_DEVICE_URL;
		}
	}
	function initialWifiConnection() {
		return {
			status: "disconnected",
			endpoint: DEFAULT_DEVICE_URL,
			device: null,
			lastApplied: null,
			lastSeenAt: null,
			error: null
		};
	}
	var WristbandContext = (0, import_react.createContext)(null);
	var initialState = {
		mode: "personal",
		feeling: "Calm",
		signal: "idle",
		feelingChosen: false
	};
	function wristbandReducer(state, action) {
		const value = typeof action.value === "function" ? action.value(state[action.type]) : action.value;
		if (action.type === "mode" && ["personal", "team"].includes(value)) return state.mode === value ? state : {
			...state,
			mode: value
		};
		if (action.type === "feeling" && FEELINGS$1.some((item) => item.label === value)) return state.feeling === value && state.feelingChosen ? state : {
			...state,
			feeling: value,
			feelingChosen: true
		};
		if (action.type === "signal" && Object.hasOwn(SIGNALS, value)) return state.signal === value ? state : {
			...state,
			signal: value
		};
		return state;
	}
	function getTone({ mode, feeling, signal, feelingChosen }) {
		if (signal === "scanning") return "blue";
		if (signal === "idle") return "amber";
		if (mode === "team" && !feelingChosen) return "lavender";
		return FEELINGS$1.find((item) => item.label === feeling)?.tone || "amber";
	}
	function WristbandProvider({ children }) {
		const [state, dispatch] = (0, import_react.useReducer)(wristbandReducer, initialState);
		const [preferences, setPreferences] = (0, import_react.useState)(readPreferences);
		const [lightSettings, setLightSettings] = (0, import_react.useState)(readLightSettings);
		const [demoIndex, setDemoIndex] = (0, import_react.useState)(null);
		const [reducedMotion, setReducedMotion] = (0, import_react.useState)(false);
		const [feedback, setFeedback] = (0, import_react.useState)(null);
		const [wifiEndpoint, setWifiEndpoint] = (0, import_react.useState)(readWifiEndpoint);
		const [wifiConnection, setWifiConnection] = (0, import_react.useState)(initialWifiConnection);
		const [wifiSessionReady, setWifiSessionReady] = (0, import_react.useState)(false);
		const wifiControllerRef = (0, import_react.useRef)(null);
		const wifiAttemptRef = (0, import_react.useRef)(0);
		const lightCommandRef = (0, import_react.useRef)(null);
		const wifiEndpointRef = (0, import_react.useRef)(wifiEndpoint);
		const preferencesRef = (0, import_react.useRef)(preferences);
		const stateRef = (0, import_react.useRef)(state);
		const lightSettingsRef = (0, import_react.useRef)(lightSettings);
		const demoIndexRef = (0, import_react.useRef)(demoIndex);
		const demoOwnerRef = (0, import_react.useRef)(null);
		const demoTimer = (0, import_react.useRef)(null);
		const feedbackTimer = (0, import_react.useRef)(null);
		const feedbackId = (0, import_react.useRef)(0);
		preferencesRef.current = preferences;
		stateRef.current = state;
		lightSettingsRef.current = lightSettings;
		demoIndexRef.current = demoIndex;
		wifiEndpointRef.current = wifiEndpoint;
		(0, import_react.useEffect)(() => {
			let active = true;
			const controller = createWifiLightController({ onChange: (snapshot) => {
				if (!active) return;
				setWifiConnection(snapshot);
				if (["disconnected", "error"].includes(snapshot.status)) setWifiSessionReady(false);
			} });
			wifiControllerRef.current = controller;
			setWifiConnection(controller.getSnapshot());
			return () => {
				active = false;
				wifiAttemptRef.current += 1;
				wifiControllerRef.current = null;
				controller.dispose();
			};
		}, []);
		(0, import_react.useEffect)(() => {
			try {
				window.localStorage.setItem(WIFI_ENDPOINT_KEY, normalizeDeviceUrl(wifiEndpoint));
			} catch {}
		}, [wifiEndpoint]);
		const connectBoard = (0, import_react.useCallback)(async (address) => {
			const endpoint = normalizeDeviceUrl(address ?? wifiEndpointRef.current);
			const controller = wifiControllerRef.current;
			if (!controller) throw new Error("Board controls are still preparing. Please try again.");
			const attempt = ++wifiAttemptRef.current;
			setWifiEndpoint(endpoint);
			setWifiSessionReady(false);
			try {
				await controller.connect(endpoint, lightCommandRef.current);
				if (attempt !== wifiAttemptRef.current || controller !== wifiControllerRef.current) return false;
				if (!["connected", "sending"].includes(controller.getSnapshot().status)) return false;
				setWifiSessionReady(true);
				return true;
			} catch (error) {
				if (attempt !== wifiAttemptRef.current) return false;
				setWifiSessionReady(false);
				throw error;
			}
		}, []);
		const disconnectBoard = (0, import_react.useCallback)(() => {
			wifiAttemptRef.current += 1;
			setWifiSessionReady(false);
			wifiControllerRef.current?.disconnect();
		}, []);
		const stopColourDemo = (0, import_react.useCallback)((owner) => {
			if (owner !== void 0 && demoOwnerRef.current !== owner) return;
			clearInterval(demoTimer.current);
			demoIndexRef.current = null;
			demoOwnerRef.current = null;
			setDemoIndex(null);
		}, []);
		const setMode = (0, import_react.useCallback)((value) => dispatch({
			type: "mode",
			value
		}), []);
		const setFeeling = (0, import_react.useCallback)((value, { preserveCustom = false } = {}) => {
			const next = typeof value === "function" ? value(stateRef.current.feeling) : value;
			if (!FEELINGS$1.some((item) => item.label === next)) return;
			if (!preserveCustom) {
				stopColourDemo();
				setLightSettings((current) => current.customColour === null && current.lightOn ? current : {
					...current,
					customColour: null,
					lightOn: true
				});
			}
			dispatch({
				type: "feeling",
				value: next
			});
		}, [stopColourDemo]);
		const setSignal = (0, import_react.useCallback)((value) => dispatch({
			type: "signal",
			value
		}), []);
		const setCustomColour = (0, import_react.useCallback)((value) => {
			const next = typeof value === "function" ? value(lightSettingsRef.current.customColour) : value;
			const hex = next === null ? null : normalizeHex(next);
			if (next !== null && !hex) return;
			stopColourDemo();
			setLightSettings((current) => current.customColour === hex && (hex === null || current.lightOn) ? current : {
				...current,
				customColour: hex,
				lightOn: hex === null ? current.lightOn : true
			});
		}, [stopColourDemo]);
		const setBrightness = (0, import_react.useCallback)((value) => {
			const frame = demoIndexRef.current === null ? null : ARDUINO_DEMO_FRAMES[demoIndexRef.current];
			const next = Number(typeof value === "function" ? value(frame ? 100 : lightSettingsRef.current.brightness) : value);
			if (!Number.isFinite(next)) return;
			stopColourDemo();
			const brightness = Math.round(Math.max(0, Math.min(100, next)));
			setLightSettings((current) => ({
				...current,
				...frame ? {
					customColour: frame.hex,
					lightOn: frame.lightOn
				} : {},
				brightness
			}));
		}, [stopColourDemo]);
		const setLightOn = (0, import_react.useCallback)((value) => {
			const frame = demoIndexRef.current === null ? null : ARDUINO_DEMO_FRAMES[demoIndexRef.current];
			const next = Boolean(typeof value === "function" ? value(frame ? frame.lightOn : lightSettingsRef.current.lightOn) : value);
			stopColourDemo();
			setLightSettings((current) => ({
				...current,
				...frame ? {
					customColour: frame.hex,
					brightness: 100
				} : {},
				lightOn: next
			}));
		}, [stopColourDemo]);
		const startColourDemo = (0, import_react.useCallback)((owner = null) => {
			if (preferencesRef.current.quietMode || !motionAllowed()) return false;
			demoIndexRef.current = 0;
			demoOwnerRef.current = owner;
			setDemoIndex(0);
			return true;
		}, []);
		const setVibrationEnabled = (0, import_react.useCallback)((value) => setPreferences((current) => {
			const next = Boolean(typeof value === "function" ? value(current.vibrationEnabled) : value);
			return next === current.vibrationEnabled ? current : {
				...current,
				vibrationEnabled: next
			};
		}), []);
		const setQuietMode = (0, import_react.useCallback)((value) => setPreferences((current) => {
			const next = Boolean(typeof value === "function" ? value(current.quietMode) : value);
			return next === current.quietMode ? current : {
				...current,
				quietMode: next
			};
		}), []);
		const triggerFeedback = (0, import_react.useCallback)((type = "submitted", message) => {
			const current = preferencesRef.current;
			const next = {
				id: ++feedbackId.current,
				type,
				message: message || FEEDBACK_MESSAGES[type] || FEEDBACK_MESSAGES.submitted,
				simulatedVibration: current.vibrationEnabled && !current.quietMode
			};
			clearTimeout(feedbackTimer.current);
			setFeedback(next);
			feedbackTimer.current = setTimeout(() => setFeedback((latest) => latest?.id === next.id ? null : latest), 3200);
			return next;
		}, []);
		(0, import_react.useEffect)(() => {
			try {
				window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
			} catch {}
		}, [preferences]);
		(0, import_react.useEffect)(() => {
			try {
				window.localStorage.setItem(LIGHT_STORAGE_KEY, JSON.stringify(lightSettings));
			} catch {}
		}, [lightSettings]);
		(0, import_react.useEffect)(() => {
			if (typeof window === "undefined" || !window.matchMedia) return void 0;
			const media = window.matchMedia("(prefers-reduced-motion: reduce)");
			const update = () => {
				setReducedMotion(media.matches);
				if (media.matches) stopColourDemo();
			};
			update();
			media.addEventListener("change", update);
			return () => media.removeEventListener("change", update);
		}, [stopColourDemo]);
		const demoRunning = demoIndex !== null;
		(0, import_react.useEffect)(() => {
			if (!demoRunning) return void 0;
			if (preferences.quietMode || reducedMotion || !motionAllowed()) {
				stopColourDemo();
				return;
			}
			demoTimer.current = setInterval(() => setDemoIndex((current) => current === null ? null : (current + 1) % ARDUINO_DEMO_FRAMES.length), 1e3);
			return () => clearInterval(demoTimer.current);
		}, [
			demoRunning,
			preferences.quietMode,
			reducedMotion,
			stopColourDemo
		]);
		(0, import_react.useEffect)(() => () => clearTimeout(feedbackTimer.current), []);
		const tone = getTone(state);
		const demoFrame = demoRunning ? ARDUINO_DEMO_FRAMES[demoIndex] : null;
		const custom = demoFrame?.hex || lightSettings.customColour;
		const palette = (0, import_react.useMemo)(() => custom ? deriveLightPalette(custom) : PALETTE[tone], [custom, tone]);
		const brightness = demoFrame ? 100 : lightSettings.brightness;
		const lightOn = demoFrame ? demoFrame.lightOn : lightSettings.lightOn;
		const activeColour = custom || palette.light;
		const lightOutput = getLightOutput(activeColour, brightness, lightOn);
		const lightActive = Math.max(lightOutput.r, lightOutput.g, lightOutput.b) > 0;
		const isFeelingColour = state.feelingChosen && !["idle", "scanning"].includes(state.signal);
		const displayMode = custom ? "custom" : isFeelingColour ? "feeling" : "ambient";
		const colourLabel = demoFrame ? `Arduino sequence · ${demoFrame.label}` : custom ? palette.name : isFeelingColour ? `${state.feeling} · ${palette.name}` : palette.name;
		const lightLabel = !lightOn ? `Light off · ${colourLabel}` : !lightActive ? `No light output · ${colourLabel}` : `${colourLabel}${brightness < 100 ? ` · ${brightness}%` : ""}`;
		const wifiConnected = wifiSessionReady && ["connected", "sending"].includes(wifiConnection.status);
		lightCommandRef.current = {
			colour: activeColour,
			brightness,
			lightOn
		};
		(0, import_react.useEffect)(() => {
			if ([
				"connecting",
				"connected",
				"sending"
			].includes(wifiConnection.status)) wifiControllerRef.current?.setLight({
				colour: activeColour,
				brightness,
				lightOn
			});
		}, [
			activeColour,
			brightness,
			lightOn,
			wifiConnected,
			wifiConnection.status
		]);
		const value = (0, import_react.useMemo)(() => ({
			mode: state.mode,
			feeling: state.feeling,
			signal: state.signal,
			feelingChosen: state.feelingChosen,
			setMode,
			setFeeling,
			setSignal,
			...preferences,
			setVibrationEnabled,
			setQuietMode,
			feedbackPreferences: preferences,
			feedback,
			triggerFeedback,
			customColour: lightSettings.customColour,
			setCustomColour,
			brightness,
			setBrightness,
			lightOn,
			setLightOn,
			activeColour,
			lightLabel,
			displayMode,
			lightOutput,
			lightActive,
			reducedMotion,
			demoRunning,
			demoStep: demoFrame ? {
				index: demoIndex,
				...demoFrame
			} : null,
			startColourDemo,
			stopColourDemo,
			wifiEndpoint,
			setWifiEndpoint,
			wifiConnection,
			wifiConnected,
			connectBoard,
			disconnectBoard
		}), [
			state,
			setMode,
			setFeeling,
			setSignal,
			preferences,
			setVibrationEnabled,
			setQuietMode,
			feedback,
			triggerFeedback,
			lightSettings.customColour,
			setCustomColour,
			brightness,
			setBrightness,
			lightOn,
			setLightOn,
			activeColour,
			lightLabel,
			displayMode,
			lightOutput.r,
			lightOutput.g,
			lightOutput.b,
			lightOutput.hex,
			lightActive,
			reducedMotion,
			demoRunning,
			demoIndex,
			demoFrame,
			startColourDemo,
			stopColourDemo,
			wifiEndpoint,
			wifiConnection,
			wifiConnected,
			connectBoard,
			disconnectBoard
		]);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandContext.Provider, {
			value: {
				...value,
				tone,
				palette
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "echo-experience",
				"data-echo-tone": custom ? "custom" : tone,
				"data-echo-signal": state.signal,
				"data-echo-mode": state.mode,
				"data-echo-quiet": preferences.quietMode ? "true" : "false",
				"data-echo-vibration": preferences.vibrationEnabled ? "true" : "false",
				"data-echo-custom": custom ? "true" : "false",
				"data-echo-brightness": brightness,
				"data-echo-light-on": lightOn ? "true" : "false",
				"data-echo-light-active": lightActive ? "true" : "false",
				"data-echo-demo": demoRunning ? "running" : "stopped",
				"data-echo-wifi-status": wifiConnection.status,
				"data-echo-wifi-linked": wifiConnected ? "true" : "false",
				style: {
					"--echo-color": palette.color,
					"--echo-led": lightOutput.hex,
					"--echo-soft": palette.soft,
					"--echo-ink": palette.ink,
					"--echo-rgb": palette.rgb,
					"--echo-led-rgb": `${lightOutput.r}, ${lightOutput.g}, ${lightOutput.b}`,
					"--echo-light-intensity": Math.max(lightOutput.r, lightOutput.g, lightOutput.b) / 255
				},
				children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wb-announcement",
					role: "status",
					"aria-live": "polite",
					"aria-atomic": "true",
					children: feedback?.message || ""
				})]
			})
		});
	}
	function useWristband() {
		const context = (0, import_react.useContext)(WristbandContext);
		if (!context) throw new Error("useWristband must be used inside WristbandProvider.");
		const { tone, palette, ...api } = context;
		return api;
	}
	function useWristbandPresentation() {
		const context = (0, import_react.useContext)(WristbandContext);
		if (!context) throw new Error("Wristband components must be used inside WristbandProvider.");
		const palette = context.palette;
		const signal = SIGNALS[context.signal];
		const isTeamSync = context.mode === "team" && context.signal === "connected" && !context.feelingChosen && context.displayMode !== "custom";
		const controlled = context.displayMode === "custom" || !context.lightOn || !context.lightActive;
		const description = context.wifiConnected ? context.wifiConnection.lastApplied?.verification === "state-confirmed" ? "The board reports its last colour state. The wristband image remains a visual preview; emitted light is not measured." : "The board acknowledged the colour request with OK/OFF. The wristband image remains a visual preview; emitted light is not verified." : context.wifiConnection.status === "error" ? "The Wi-Fi link has stopped. Colours remain available as a screen preview. Reconnect from the colour studio to send again." : controlled ? "This light is previewed on screen. Manual colour changes turn the preview on and stop the sequence." : isTeamSync ? "Lavender connects your group. Choose a feeling to make the light your own." : signal.description;
		return {
			...context,
			palette,
			label: controlled ? context.lightLabel : isTeamSync ? "Together in light" : signal.label,
			description
		};
	}
	function WristbandPreview({ large = false, interactive = large }) {
		const { palette, signal, label, feedback, quietMode, vibrationEnabled, lightLabel, lightActive, wifiConnected } = useWristbandPresentation();
		const [acknowledgement, setAcknowledgement] = (0, import_react.useState)(0);
		const [hapticFeedback, setHapticFeedback] = (0, import_react.useState)(0);
		const acknowledgementSequence = (0, import_react.useRef)(0);
		const acknowledgementTimer = (0, import_react.useRef)(null);
		const hapticTimer = (0, import_react.useRef)(null);
		const previousSignal = (0, import_react.useRef)(null);
		const previousFeedbackId = (0, import_react.useRef)(0);
		(0, import_react.useEffect)(() => {
			const newFeedback = feedback?.id && feedback.id !== previousFeedbackId.current;
			const newAcknowledgement = newFeedback && [
				"submitted",
				"saved",
				"preview"
			].includes(feedback.type);
			const animate = !quietMode && lightActive && motionAllowed();
			if (!animate) {
				clearTimeout(acknowledgementTimer.current);
				setAcknowledgement(0);
			} else if (newAcknowledgement || signal === "saved" && previousSignal.current !== "saved") {
				clearTimeout(acknowledgementTimer.current);
				const id = ++acknowledgementSequence.current;
				setAcknowledgement(id);
				acknowledgementTimer.current = setTimeout(() => setAcknowledgement((current) => current === id ? 0 : current), 1600);
			}
			if (!animate || !vibrationEnabled) {
				clearTimeout(hapticTimer.current);
				setHapticFeedback(0);
			} else if (newFeedback && feedback.simulatedVibration) {
				clearTimeout(hapticTimer.current);
				setHapticFeedback(feedback.id);
				hapticTimer.current = setTimeout(() => setHapticFeedback(0), 500);
			}
			previousSignal.current = signal;
			if (feedback?.id) previousFeedbackId.current = feedback.id;
		}, [
			signal,
			feedback?.id,
			feedback?.type,
			feedback?.simulatedVibration,
			quietMode,
			vibrationEnabled,
			lightActive
		]);
		(0, import_react.useEffect)(() => () => {
			clearTimeout(acknowledgementTimer.current);
			clearTimeout(hapticTimer.current);
		}, []);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `wb-preview-group${large ? " wb-preview-group-large" : ""}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `wb-preview${large ? " wb-preview-large" : ""}`,
				"data-signal": signal,
				role: "img",
				"aria-label": `Wristband visual preview. ${palette.name}. ${label}. ${wifiConnected ? "Board linked over Wi-Fi." : "Preview only. No board connection."}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "wb-preview-halo",
						"aria-hidden": "true"
					}),
					acknowledgement > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "wb-feedback-wave",
						onAnimationEnd: () => setAcknowledgement(0),
						"aria-hidden": "true"
					}, acknowledgement),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "wb-band-motion",
						"data-haptic": hapticFeedback ? "true" : "false",
						onAnimationEnd: (event) => {
							if (event.target === event.currentTarget) setHapticFeedback(0);
						},
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandModel, {})
					}, `haptic-${hapticFeedback}`),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "wb-preview-colour",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), lightLabel]
					})
				]
			}), interactive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandFeelingRail, { compact: large })]
		});
	}
	function motionAllowed() {
		return typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}
	function WristbandFeelingRail({ compact = false }) {
		const { feeling, feelingChosen, setFeeling, setSignal, quietMode, displayMode } = useWristband();
		const feelingSelected = feelingChosen && displayMode === "feeling";
		const selectedIndex = Math.max(0, FEELINGS$1.findIndex((item) => item.label === feeling));
		const trackRef = (0, import_react.useRef)(null);
		const cardRefs = (0, import_react.useRef)([]);
		const dragRef = (0, import_react.useRef)(null);
		const settleTimer = (0, import_react.useRef)(null);
		const programmaticTimer = (0, import_react.useRef)(null);
		const programmaticScroll = (0, import_react.useRef)(false);
		const positioned = (0, import_react.useRef)(false);
		const suppressClick = (0, import_react.useRef)(false);
		const [dragging, setDragging] = (0, import_react.useState)(false);
		const headingId = (0, import_react.useId)();
		const instructionId = (0, import_react.useId)();
		const selectIndex = (0, import_react.useCallback)((index) => {
			const item = FEELINGS$1[Math.max(0, Math.min(FEELINGS$1.length - 1, index))];
			setFeeling(item.label);
			setSignal("connected");
		}, [setFeeling, setSignal]);
		const nearestIndex = () => {
			const track = trackRef.current;
			if (!track) return selectedIndex;
			const origin = cardRefs.current[0]?.offsetLeft || 0;
			return cardRefs.current.reduce((closest, card, index) => Math.abs(card.offsetLeft - origin - track.scrollLeft) < Math.abs(cardRefs.current[closest].offsetLeft - origin - track.scrollLeft) ? index : closest, 0);
		};
		const positionCard = (0, import_react.useCallback)((index, immediate = false) => {
			const track = trackRef.current;
			const card = cardRefs.current[index];
			if (!track || !card) return;
			const left = card.offsetLeft - (cardRefs.current[0]?.offsetLeft || 0);
			if (Math.abs(track.scrollLeft - left) < 1) return;
			programmaticScroll.current = true;
			clearTimeout(programmaticTimer.current);
			track.scrollTo({
				left,
				behavior: !immediate && !quietMode && motionAllowed() ? "smooth" : "auto"
			});
			programmaticTimer.current = setTimeout(() => {
				programmaticScroll.current = false;
			}, 650);
		}, [quietMode]);
		(0, import_react.useLayoutEffect)(() => {
			positionCard(selectedIndex, !positioned.current);
			positioned.current = true;
		}, [selectedIndex, positionCard]);
		(0, import_react.useEffect)(() => {
			let width = trackRef.current?.clientWidth;
			const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => {
				const nextWidth = trackRef.current?.clientWidth;
				if (nextWidth !== width) {
					width = nextWidth;
					positionCard(selectedIndex, true);
				}
			});
			if (trackRef.current) observer?.observe(trackRef.current);
			return () => observer?.disconnect();
		}, [selectedIndex, positionCard]);
		(0, import_react.useEffect)(() => () => {
			clearTimeout(settleTimer.current);
			clearTimeout(programmaticTimer.current);
		}, []);
		const interruptScroll = () => {
			if (programmaticScroll.current && trackRef.current) trackRef.current.scrollTo({
				left: trackRef.current.scrollLeft,
				behavior: "auto"
			});
			programmaticScroll.current = false;
			clearTimeout(programmaticTimer.current);
			clearTimeout(settleTimer.current);
		};
		const finishDrag = (event) => {
			const drag = dragRef.current;
			if (!drag) return;
			dragRef.current = null;
			setDragging(false);
			clearTimeout(settleTimer.current);
			if (drag.moved) {
				if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
				let next = nearestIndex();
				const distance = event.currentTarget.scrollLeft - drag.left;
				if (next === drag.index && Math.abs(distance) > Math.min(48, event.currentTarget.clientWidth * .18)) next = Math.max(0, Math.min(FEELINGS$1.length - 1, drag.index + Math.sign(distance)));
				selectIndex(next);
				positionCard(next);
			}
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: `wb-feeling-rail${compact ? " wb-feeling-rail-compact" : ""}`,
			"aria-labelledby": headingId,
			"aria-roledescription": "carousel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wb-rail-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: headingId,
						children: "Find your colour"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [String(selectedIndex + 1).padStart(2, "0"), " / 04"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `wb-rail-track${dragging ? " is-dragging" : ""}`,
					ref: trackRef,
					tabIndex: 0,
					role: "group",
					"aria-label": `Wristband feeling colours. ${feeling}. ${PALETTE[FEELINGS$1[selectedIndex].tone].name}.`,
					"aria-describedby": instructionId,
					onKeyDown: (event) => {
						if (![
							"ArrowLeft",
							"ArrowRight",
							"Home",
							"End"
						].includes(event.key)) return;
						event.preventDefault();
						event.currentTarget.focus({ preventScroll: true });
						selectIndex(event.key === "Home" ? 0 : event.key === "End" ? FEELINGS$1.length - 1 : selectedIndex + (event.key === "ArrowRight" ? 1 : -1));
					},
					onPointerDown: (event) => {
						interruptScroll();
						suppressClick.current = false;
						if (event.pointerType !== "mouse" || event.button !== 0) return;
						dragRef.current = {
							x: event.clientX,
							y: event.clientY,
							left: event.currentTarget.scrollLeft,
							index: nearestIndex(),
							moved: false
						};
					},
					onPointerMove: (event) => {
						const drag = dragRef.current;
						if (!drag) return;
						if (!event.buttons) {
							dragRef.current = null;
							setDragging(false);
							return;
						}
						const delta = event.clientX - drag.x;
						if (!drag.moved && (Math.abs(delta) < 6 || Math.abs(delta) < Math.abs(event.clientY - drag.y))) return;
						if (!drag.moved) {
							drag.moved = true;
							suppressClick.current = true;
							setDragging(true);
							event.currentTarget.setPointerCapture(event.pointerId);
						}
						event.preventDefault();
						event.currentTarget.scrollLeft = drag.left - delta;
					},
					onPointerUp: finishDrag,
					onPointerCancel: finishDrag,
					onLostPointerCapture: finishDrag,
					onPointerLeave: () => {
						if (dragRef.current && !dragRef.current.moved) dragRef.current = null;
					},
					onWheel: interruptScroll,
					onClickCapture: (event) => {
						if (suppressClick.current && event.detail > 0) {
							event.preventDefault();
							event.stopPropagation();
							suppressClick.current = false;
						}
					},
					onScroll: () => {
						clearTimeout(settleTimer.current);
						if (programmaticScroll.current || dragRef.current?.moved) return;
						settleTimer.current = setTimeout(() => {
							if (!programmaticScroll.current && !dragRef.current?.moved) selectIndex(nearestIndex());
						}, 180);
					},
					children: FEELINGS$1.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "wb-colour-card",
						ref: (node) => {
							cardRefs.current[index] = node;
						},
						tabIndex: index === selectedIndex ? 0 : -1,
						"aria-pressed": feelingSelected && index === selectedIndex,
						"aria-label": `${item.label}. ${PALETTE[item.tone].name}. ${item.description}.`,
						style: {
							"--wb-card-colour": PALETTE[item.tone].color,
							"--wb-card-soft": PALETTE[item.tone].soft,
							"--wb-card-ink": PALETTE[item.tone].ink
						},
						onClick: () => selectIndex(index),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wb-colour-orb",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "wb-colour-card-copy",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: PALETTE[item.tone].name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.description })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "wb-colour-card-check",
								"aria-hidden": "true",
								children: feelingSelected && index === selectedIndex ? "✓" : "+"
							})
						]
					}, item.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wb-rail-controls",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "wb-rail-arrow",
							type: "button",
							onClick: () => selectIndex(selectedIndex - 1),
							disabled: selectedIndex === 0,
							"aria-label": "Previous feeling colour",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 16 16",
								fill: "none",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "m9 4-4 4 4 4",
									stroke: "currentColor",
									strokeWidth: "1.3",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "wb-rail-dots",
							role: "group",
							"aria-label": "Choose a feeling colour",
							children: FEELINGS$1.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "wb-rail-dot",
								onClick: () => selectIndex(index),
								"aria-label": item.label,
								"aria-pressed": feelingSelected && index === selectedIndex,
								"data-current": index === selectedIndex ? "true" : "false",
								style: { "--wb-dot-colour": PALETTE[item.tone].color },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
							}, item.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "wb-rail-arrow",
							type: "button",
							onClick: () => selectIndex(selectedIndex + 1),
							disabled: selectedIndex === FEELINGS$1.length - 1,
							"aria-label": "Next feeling colour",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 16 16",
								fill: "none",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "m6 4 4 4-4 4",
									stroke: "currentColor",
									strokeWidth: "1.3",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "wb-rail-instruction",
					id: instructionId,
					children: "Swipe or drag to change your light · ← → keys"
				})
			]
		});
	}
	function WristbandFeedbackPreferences() {
		const { vibrationEnabled, setVibrationEnabled, quietMode, setQuietMode, triggerFeedback } = useWristband();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "wb-preferences",
			"aria-label": "Wristband feedback preferences",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wb-preferences-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "A quieter visit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saved on this device" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wb-preference-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Vibration preview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: quietMode ? "Muted while quiet mode is on" : "A gentle on-screen acknowledgement" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "switch",
						className: "wb-preference-switch",
						"aria-label": "Vibration preview",
						"aria-checked": vibrationEnabled,
						onClick: () => setVibrationEnabled((current) => !current),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "wb-preference-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Quiet mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Steady light. Muted vibration preview." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "switch",
						className: "wb-preference-switch",
						"aria-label": "Quiet mode",
						"aria-checked": quietMode,
						onClick: () => setQuietMode((current) => !current),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "wb-feedback-test",
					type: "button",
					onClick: () => triggerFeedback("preview", quietMode ? "Quiet mode is on. Your light stays steady." : "Feedback preview. A gentle pulse in your chosen colour."),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "⌁"
					}), "Try feedback preview"]
				})
			]
		});
	}
	function WristbandStatus({ compact = false, onOpenStudio }) {
		const { signal, palette, label, description, feedback, wifiConnected, wifiConnection } = useWristbandPresentation();
		const [open, setOpen] = (0, import_react.useState)(false);
		const [placement, setPlacement] = (0, import_react.useState)({});
		const containerRef = (0, import_react.useRef)(null);
		const triggerRef = (0, import_react.useRef)(null);
		const popoverRef = (0, import_react.useRef)(null);
		const panelId = (0, import_react.useId)();
		const titleId = (0, import_react.useId)();
		(0, import_react.useLayoutEffect)(() => {
			if (!open || !containerRef.current) return void 0;
			const container = containerRef.current;
			const phone = container.closest(".phone");
			const updatePlacement = () => {
				const anchor = container.getBoundingClientRect();
				const boundary = phone?.getBoundingClientRect() || {
					left: 0,
					right: window.innerWidth,
					bottom: window.innerHeight
				};
				const leftEdge = Math.max(12, boundary.left + 16);
				const rightEdge = Math.min(window.innerWidth - 12, boundary.right - 16);
				const width = Math.min(320, Math.max(0, rightEdge - leftEdge));
				const left = Math.max(leftEdge, Math.min(anchor.right - width, rightEdge - width)) - anchor.left;
				const viewportBoundary = container.closest(".route-viewport")?.getBoundingClientRect();
				const maxHeight = Math.max(180, Math.min(viewportBoundary?.bottom || boundary.bottom, window.innerHeight) - anchor.bottom - 24);
				const nextPlacement = {
					"--wb-popover-width": `${width}px`,
					"--wb-popover-left": `${left}px`,
					"--wb-popover-max-height": `${maxHeight}px`
				};
				setPlacement((current) => Object.keys(nextPlacement).every((key) => current[key] === nextPlacement[key]) ? current : nextPlacement);
			};
			updatePlacement();
			window.addEventListener("resize", updatePlacement);
			const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updatePlacement);
			if (phone) observer?.observe(phone);
			observer?.observe(container);
			return () => {
				window.removeEventListener("resize", updatePlacement);
				observer?.disconnect();
			};
		}, [open]);
		(0, import_react.useEffect)(() => {
			if (!open) return void 0;
			(popoverRef.current?.querySelector("button"))?.focus({ preventScroll: true });
			const onPointerDown = (event) => {
				if (!containerRef.current?.contains(event.target)) setOpen(false);
			};
			const onKeyDown = (event) => {
				if (event.key === "Escape") {
					event.preventDefault();
					setOpen(false);
					triggerRef.current?.focus({ preventScroll: true });
				}
			};
			document.addEventListener("pointerdown", onPointerDown);
			document.addEventListener("keydown", onKeyDown);
			return () => {
				document.removeEventListener("pointerdown", onPointerDown);
				document.removeEventListener("keydown", onKeyDown);
			};
		}, [open]);
		const close = () => {
			setOpen(false);
			triggerRef.current?.focus({ preventScroll: true });
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `wb-status${compact ? " wb-status-compact" : ""}`,
			ref: containerRef,
			onBlur: (event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "wb-status-trigger",
				type: "button",
				ref: triggerRef,
				"aria-expanded": open,
				"aria-controls": panelId,
				"aria-label": `Wristband preview: ${palette.name}. ${label}.`,
				onClick: () => setOpen((current) => !current),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "wb-status-light",
						"data-signal": signal,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "wb-status-text",
						children: compact ? "Wristband" : "Wristband preview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "wb-status-chevron",
						viewBox: "0 0 16 16",
						fill: "none",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "m4 6 4 4 4-4",
							stroke: "currentColor",
							strokeWidth: "1.3",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				]
			}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "wb-popover",
				id: panelId,
				ref: popoverRef,
				"aria-labelledby": titleId,
				style: placement,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "wb-popover-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "wb-eyebrow",
							children: "YOUR VISIT, IN LIGHT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: titleId,
							children: "Wristband preview"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "wb-close",
							onClick: close,
							"aria-label": "Close wristband preview",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								viewBox: "0 0 16 16",
								fill: "none",
								"aria-hidden": "true",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "m4 4 8 8m0-8-8 8",
									stroke: "currentColor",
									strokeWidth: "1.3",
									strokeLinecap: "round"
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandPreview, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "wb-light-caption",
						"aria-live": "polite",
						"aria-atomic": "true",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "wb-caption-dot",
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: palette.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wb-signal-description",
						children: feedback?.message || description
					}),
					onOpenStudio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "wb-open-studio",
						onClick: () => {
							setOpen(false);
							onOpenStudio();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Open colour studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Choose any light colour and brightness" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "↗"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandFeelingRail, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandFeedbackPreferences, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "wb-prototype-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "◌"
						}), wifiConnected ? "Board linked · Wi-Fi colour control" : wifiConnection.status === "error" ? "Preview only · Wi-Fi link stopped" : "Preview only · no board connection"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "wb-hardware-note",
						children: wifiConnected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Nano ESP32 is linked over Wi-Fi.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Colour requests are sent to the board. Vibration stays a screen preview."
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Connect your Nano ESP32 from the colour studio.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Until then, light and vibration remain screen previews."
						] })
					})
				]
			})]
		});
	}
	//#endregion
	//#region src/icons.jsx
	function Icon({ name, size = 20, ...props }) {
		const paths = {
			arrow: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 12h14M13 6l6 6-6 6" }) }),
			back: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 12H5m6-6-6 6 6 6" }) }),
			explore: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "9"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z" })] }),
			map: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15" }) }),
			collection: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "4",
				width: "16",
				height: "16",
				rx: "2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m4 15 5-5 5 5 3-3 3 3M15 8h.01" })] }),
			scan: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M8 9a6 6 0 0 1 8 0m-6 3a3 3 0 0 1 4 0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "15",
				r: ".6"
			})] }),
			check: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m5 12 4 4L19 6" }),
			download: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" }) }),
			heart: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" }),
			sketch: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m4 16-1 5 5-1L20 8l-4-4L4 16Zm9-9 4 4M3 21h18" }) }),
			thought: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 11.5a8.5 8.5 0 0 1-8.5 8.5H3l2-5a8.5 8.5 0 1 1 16-3.5Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 10h8m-8 4h5" })] }),
			users: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "9",
				cy: "8",
				r: "3"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 21v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 4v3" })] }),
			spark: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z" }),
			plus: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14M5 12h14" })
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: size,
			height: size,
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			...props,
			children: paths[name] || paths.arrow
		});
	}
	//#endregion
	//#region src/App.jsx
	var ASSET = new URL("./public/assets/", document.baseURI).href;
	var COLLECTION = [
		{
			title: "Exterior View of Saint-Lazare Station",
			artist: "Claude Monet",
			image: "collection-01.png",
			description: "Claude Monet captures the energy of modern Paris through steam, light, and the busy atmosphere surrounding Saint-Lazare station."
		},
		{
			title: "The Swing",
			artist: "Jean-Honoré Fragonard",
			image: "collection-02.png",
			description: "Jean-Honoré Fragonard creates a playful Rococo scene filled with romance, movement, soft colors, and a sense of hidden flirtation."
		},
		{
			title: "Ophelia",
			artist: "John Everett Millais",
			image: "collection-03.png",
			description: "John Everett Millais portrays Ophelia floating quietly among flowers, combining beautiful natural detail with a tragic and dreamlike mood."
		},
		{
			title: "Primavera",
			artist: "Sandro Botticelli",
			image: "collection-04.png",
			description: "Sandro Botticelli presents an elegant mythological scene celebrating spring, love, beauty, nature, and the idea of renewal."
		},
		{
			title: "Springtime",
			artist: "Pierre-Auguste Cot",
			image: "collection-05.png",
			description: "Pierre-Auguste Cot shows two young lovers sharing a tender moment on a swing, surrounded by a warm and peaceful forest setting."
		},
		{
			title: "The Kiss",
			artist: "Gustav Klimt",
			image: "collection-06.png",
			description: "Gustav Klimt depicts an intimate embrace surrounded by rich golden decoration, combining romance, symbolism, and luxurious decorative patterns."
		}
	];
	var UNVISITED = Array.from({ length: 6 }, (_, index) => ({
		number: index + 11,
		image: `unvisited-${index + 11}.png`
	}));
	var SKETCHES = [
		{
			name: "Mia",
			time: "8 min ago",
			likes: 12,
			image: "sketch-mia.png",
			crop: "mia"
		},
		{
			name: "Leo",
			time: "14 min ago",
			likes: 9,
			image: "sketch-leo.png",
			crop: "leo"
		},
		{
			name: "Anonymous",
			time: "20 min ago",
			likes: 6,
			image: "sketch-anonymous.png",
			crop: "anonymous"
		},
		{
			name: "Rina",
			time: "31 min ago",
			likes: 15,
			image: "sketch-rina.png",
			crop: "rina"
		}
	];
	var REFLECTIONS = [
		[
			"“The reflection feels more vivid than the sky.”",
			"Mia · 3 min ago",
			"lavender"
		],
		[
			"“The bridge almost disappears into the water.”",
			"Anonymous · 7 min ago",
			"aqua"
		],
		[
			"“I noticed the ripples before I saw the lilies.”",
			"Leo · 11 min ago",
			"mint"
		],
		[
			"“The light makes the whole scene feel temporary.”",
			"Rina · 18 min ago",
			"aqua"
		]
	];
	var MONET = {
		title: "Water Lilies and Bridge",
		artist: "Claude Monet",
		image: "water-lilies.png"
	};
	var ROUTES = [
		"welcome",
		"mode",
		"pairTeam",
		"teamConnected",
		"home",
		"proximity",
		"detail",
		"downloaded",
		"thought",
		"capture",
		"collective",
		"sharedSuccess",
		"saved",
		"collection",
		"collectionArt",
		"unvisited",
		"location",
		"map",
		"shared",
		"sketches",
		"shareSketch",
		"sketchShared",
		"mine",
		"device"
	];
	var FEELINGS = [
		[
			"Calm",
			"calm",
			"Blue"
		],
		[
			"Curious",
			"curious",
			"Lavender"
		],
		[
			"Nostalgic",
			"nostalgic",
			"Peach"
		],
		[
			"Other feeling",
			"other",
			"Sage"
		]
	];
	var ECHO_STORAGE = "gallery-echoes-colours-v1";
	var GUIDE_STORAGE = "gallery-echoes-guide-v1";
	function readEchoes() {
		try {
			const saved = JSON.parse(localStorage.getItem(ECHO_STORAGE) || "{}");
			return Object.fromEntries(Object.entries(saved).filter(([key, value]) => /^monet$|^collection-[0-5]$/.test(key) && value && FEELINGS.some(([label]) => label === value.feeling) && Number.isFinite(value.submittedAt)));
		} catch {
			return {};
		}
	}
	function rememberGuide() {
		try {
			localStorage.setItem(GUIDE_STORAGE, "seen");
		} catch {}
	}
	function guideWasSeen() {
		try {
			return localStorage.getItem(GUIDE_STORAGE) === "seen";
		} catch {
			return false;
		}
	}
	function echoArtwork(key) {
		return key?.startsWith("collection-") ? COLLECTION[Number(key.slice(-1))] || MONET : MONET;
	}
	function feelingColour(feeling) {
		return FEELINGS.find(([label]) => label === feeling)?.[2] || "Blue";
	}
	function feelingTone(feeling) {
		return FEELINGS.find(([label]) => label === feeling)?.[1] || "calm";
	}
	function sampleReflections(art) {
		return art.image === MONET.image ? REFLECTIONS : [[
			"“I kept returning to the light.”",
			"Visitor A · sample echo",
			"lavender"
		], [
			"“A small detail changed the way I saw it.”",
			"Visitor B · sample echo",
			"mint"
		]];
	}
	function downloadAsset(fileName, downloadName) {
		const anchor = document.createElement("a");
		anchor.href = ASSET + fileName;
		anchor.download = downloadName;
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
	}
	function Button({ children, onClick, light = false, icon = "arrow", className = "", ...props }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "button " + (light ? "button-light " : "button-dark ") + className,
			onClick,
			...props,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }), icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: icon,
				size: 18
			})]
		});
	}
	function Eyebrow({ children }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children
		});
	}
	function ModeAura() {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: "mode-aura",
			src: ASSET + "figma-mode-personal.svg",
			alt: ""
		});
	}
	function Header({ title, go, subtitle, eyebrow = "Gallery Echoes", back = true }) {
		const { mode } = useWristband();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeAura, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "topbar",
				children: [
					back ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-button",
						onClick: go.back,
						"aria-label": "Go back",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "back" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-monogram",
						"aria-label": "Gallery Echoes",
						children: "ge."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandStatus, {
						compact: true,
						onOpenStudio: () => go("device")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "mode-switch",
						onClick: () => go("mode"),
						children: [mode === "team" ? "Team" : "Personal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": "true",
							children: "⌄"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "screen-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: eyebrow }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						tabIndex: -1,
						children: title
					}),
					subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "intro",
						children: subtitle
					})
				]
			})
		] });
	}
	function BottomNav({ go, screen }) {
		const active = [
			"collection",
			"collectionArt",
			"mine"
		].includes(screen) ? "Collection" : [
			"map",
			"location",
			"unvisited"
		].includes(screen) ? "Map" : "Explore";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "bottom-nav",
			"aria-label": "Primary navigation",
			children: [
				[
					"Explore",
					"home",
					"explore"
				],
				[
					"Map",
					"map",
					"map"
				],
				[
					"Collection",
					"collection",
					"collection"
				]
			].map(([label, route, icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: active === label ? "active" : "",
				"aria-current": active === label ? "page" : void 0,
				onClick: () => go(route),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: icon }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
				]
			}, route))
		});
	}
	function Welcome({ go }) {
		const [guide, setGuide] = (0, import_react.useState)(false);
		const begin = () => guideWasSeen() ? go("mode") : setGuide(true);
		if (guide) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirstVisitGuide, { onDone: () => {
			rememberGuide();
			go("mode");
		} });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen welcome-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "welcome-shape welcome-left",
					src: ASSET + "figma-welcome-left.svg",
					alt: ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "welcome-shape welcome-top",
					src: ASSET + "figma-welcome-top.svg",
					alt: ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "welcome-shape welcome-bottom",
					src: ASSET + "figma-welcome-bottom.svg",
					alt: ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "welcome-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-monogram",
						children: "ge."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A GALLERY COMPANION" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "welcome-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Art is only the beginning." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							tabIndex: -1,
							children: [
								"Gallery",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Echoes." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fine-rule" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"See art. Share perspectives.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Leave your echo."
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "welcome-bottom-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Art connects us,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"in different ways."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: begin,
							children: "Begin your visit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-link welcome-guide-link",
							type: "button",
							onClick: () => setGuide(true),
							children: "How it works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Take your time. Make it yours." })
					]
				})
			]
		});
	}
	function FirstVisitGuide({ onDone }) {
		const [step, setStep] = (0, import_react.useState)(0);
		const heading = (0, import_react.useRef)(null);
		(0, import_react.useEffect)(() => {
			heading.current?.focus({ preventScroll: true });
		}, [step]);
		const title = [
			"An artwork. A moment.",
			"Your colour, in light.",
			"Your view comes first."
		][step];
		const copy = [
			"Bring your wristband near an artwork tag, then preview the encounter.",
			"Choose from four familiar colours. Swipe the wristband preview to see the light respond.",
			"Send your colour once, then discover other echoes. Looking again and leaving an echo are always optional."
		][step];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen guide-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "guide-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-monogram",
						children: "ge."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "text-link",
						type: "button",
						onClick: onDone,
						children: ["Skip guide ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "arrow",
							size: 14
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "guide-progress",
					"aria-label": "Visit guide steps",
					children: [
						"Discover",
						"Choose",
						"Connect"
					].map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: step === index ? "active" : "",
						"aria-current": step === index ? "step" : void 0,
						onClick: () => setStep(index),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", index + 1] }), label]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "guide-illustration",
					children: step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "guide-scan-art",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: ASSET + "water-lilies.png",
								alt: "A first encounter with Water Lilies and Bridge"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "scan",
								size: 27
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						]
					}) : step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandPreview, { large: true }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "guide-echo-art",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "guide-own-echo",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "spark",
									size: 28
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Your echo" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Then, a new perspective." })
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "guide-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: [
							"A little introduction · 0",
							step + 1,
							" / 03"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							tabIndex: -1,
							ref: heading,
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })
					]
				}, step),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spacer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => step < 2 ? setStep(step + 1) : onDone(),
					children: step < 2 ? "Next" : "Choose how to visit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: "Follow your curiosity. You can skip any artwork."
				})
			]
		});
	}
	function ChooseMode({ go }) {
		const { setMode, setSignal } = useWristband();
		const choose = (mode) => {
			setMode(mode);
			setSignal(mode === "team" ? "scanning" : "idle");
			go(mode === "team" ? "pairTeam" : "home");
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen mode-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Your visit,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "your way." })
					] }),
					subtitle: "A moment for yourself, or a perspective to share.",
					eyebrow: "Make yourself at home",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mode-options",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "mode-card personal-card",
						type: "button",
						onClick: () => choose("personal"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: ASSET + "figma-mode-personal.svg",
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mode-card-number",
								children: "01"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Personal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Follow your own curiosity." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "mode-card team-card",
						type: "button",
						onClick: () => choose("team"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: ASSET + "figma-team-symbol.svg",
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mode-card-number",
								children: "02"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Together" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "See more through each other." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "arrow" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: "You can switch modes at any time."
				})
			]
		});
	}
	function ScanScreen({ go, team = false }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen scan-screen " + (team ? "pairing-screen" : "proximity-screen"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "scan-photo",
					src: ASSET + (team ? "pair-team-bg.png" : "nfc-proximity-bg.png"),
					alt: team ? "Visitors connecting in the gallery" : "Inside the gallery"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scan-shade" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "icon-button scan-back",
					type: "button",
					onClick: go.back,
					"aria-label": "Cancel scan",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "back" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scan-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: team ? "A shared beginning" : "Discover something new" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							tabIndex: -1,
							children: team ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Bring your",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"wristbands together."
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"A little closer",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"to the artwork."
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: team ? "Let your lights find one another." : "Hold your wristband near the NFC tag." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scan-target",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandPreview, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "scan-orbit" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scan-footer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "live-caption",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								team ? "Finding your group" : "Ready to discover",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "animated-dots",
									children: "…"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => go(team ? "teamConnected" : "detail"),
							children: team ? "Preview team connection" : "Preview artwork scan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Interactive prototype · tap to simulate" })
					]
				})
			]
		});
	}
	function TeamConnected({ go }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen connected-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: "A shared perspective.",
					eyebrow: "Together mode",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "connected-art",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: ASSET + "figma-team-symbol.svg",
						alt: "Four pastel lights coming together"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "success-mark",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "check",
							size: 30
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "center-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "You're connected." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Your group is ready to explore.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Different eyes. A shared experience."
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spacer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => go("home"),
					children: "Start exploring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: "Team connection preview"
				})
			]
		});
	}
	function Home({ go, viewed, sketchCount }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen home-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Art, at",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "your pace." })
					] }),
					eyebrow: "Welcome to your visit",
					subtitle: "There is no right way to look. Just yours.",
					back: false,
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "nfc-card",
					type: "button",
					onClick: () => go("proximity"),
					"aria-label": "Scan an artwork",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nfc-art",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ASSET + "nfc-card.png",
							alt: ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "nfc-ripple" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "nfc-card-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "eyebrow",
								children: "NFC guide"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
								"Every artwork",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"has a story."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tap a tag. Follow a feeling." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "card-action",
								children: ["Scan an artwork ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "arrow",
									size: 18
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "studio-entry-card",
					type: "button",
					onClick: () => go("device"),
					"aria-label": "Open colour studio",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "studio-entry-light",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "spark",
								size: 19
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Your wristband light" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "A colour of your own." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Explore the colour studio" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "arrow",
							size: 17
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your visit today" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A little collection of moments" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "visit-stats",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "stat-card",
						onClick: () => go("collection"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "stat-icon lavender",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "collection" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: String(viewed).padStart(2, "0") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "artworks discovered" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "arrow",
								size: 16
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "stat-card",
						onClick: () => go("mine"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "stat-icon mint",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "sketch" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: String(sketchCount).padStart(2, "0") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"sketch",
								sketchCount === 1 ? "" : "es",
								" shared"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "arrow",
								size: 16
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "home-endnote",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), "Stay a little longer with what moves you."]
				})
			]
		});
	}
	function DeviceColourScreen({ go }) {
		const { wifiConnected, wifiConnection } = useWristband();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen device-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Your light,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "your colour." })
					] }),
					eyebrow: "Wristband colour studio",
					subtitle: "A small change in colour. A different atmosphere.",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "device-simulation-note",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: wifiConnected ? "Board linked" : "Preview only" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: wifiConnected ? "Nano ESP32 · Wi-Fi" : wifiConnection.status === "error" ? "Reconnect to send colours" : "Connect when your board is ready" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandColourStudio, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "device-visit-note",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "thought",
						size: 16
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your light is yours to explore. Changing it here keeps your artwork echoes as you left them." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					onClick: () => go("home"),
					children: "Return to my visit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "quiet-note device-hardware-note",
					children: [
						"Arduino Nano ESP32 · Wi-Fi LED control.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Upload once by USB, then connect over Wi-Fi."
					]
				})
			]
		});
	}
	function ArtworkDetail({ go, downloaded = false, echo, onSubmit }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen detail-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: "An encounter.",
					eyebrow: "Artwork 07 · Claude Monet",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "artwork-hero",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ASSET + "water-lilies.png",
							alt: "Water Lilies and Bridge by Claude Monet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "image-action",
							"aria-label": "Download artwork",
							onClick: () => {
								downloadAsset("water-lilies.png", "water-lilies-and-bridge.png");
								go("downloaded");
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "download",
								size: 18
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "07 / A moment by the water" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "artwork-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Water Lilies and Bridge" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "artist-name",
							children: "Claude Monet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "body-copy",
							children: "Pause with the water, the light, and the reflections. What stays with you?"
						})
					]
				}),
				downloaded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-success",
					role: "status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "check",
						size: 17
					}), "Artwork download started"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoComposer, {
					go,
					art: MONET,
					echo,
					onSubmit,
					compact: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "text-link optional-reflection-link",
					type: "button",
					onClick: () => go("thought"),
					children: ["Take a little more time ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "thought",
						size: 14
					})]
				})
			]
		});
	}
	function OtherEchoes({ go, art }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "other-echoes",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Another way of seeing." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Illustrative visitor echoes" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "echo-preview-list",
					children: sampleReflections(art).slice(0, 2).map(([quote, meta, colour]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "colour-dot " + colour }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: quote }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [meta.replace(/ · .*$/, ""), " · sample echo"] })] })] }, quote))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "text-link",
					type: "button",
					onClick: () => go("shared"),
					children: ["View sample reflections ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "arrow",
						size: 14
					})]
				}),
				art.image === MONET.image && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "text-link",
					type: "button",
					onClick: () => go("sketches"),
					children: ["Discover visitor sketches ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "sketch",
						size: 14
					})]
				})
			]
		});
	}
	function EchoComposer({ go, art, echo, onSubmit, compact = false }) {
		const { feeling, setFeeling, setSignal, feelingChosen, quietMode, customColour, demoRunning, lightOn } = useWristband();
		const [draft, setDraft] = (0, import_react.useState)(echo?.feeling || (feelingChosen ? feeling : ""));
		const [editing, setEditing] = (0, import_react.useState)(false);
		const feedbackRef = (0, import_react.useRef)(null), previousFeeling = (0, import_react.useRef)(feeling);
		(0, import_react.useEffect)(() => {
			if (feelingChosen) setDraft(feeling);
			if (previousFeeling.current !== feeling && echo && echo.feeling !== feeling) setEditing(true);
			previousFeeling.current = feeling;
		}, [
			feeling,
			feelingChosen,
			echo
		]);
		const choose = (next) => {
			setDraft(next);
			setFeeling(next);
			setSignal("connected");
		};
		const keepPrevious = () => {
			setDraft(echo.feeling);
			setFeeling(echo.feeling, { preserveCustom: true });
			setSignal("connected");
			setEditing(false);
		};
		const submit = () => {
			if (!draft) return;
			onSubmit(draft);
			setEditing(false);
			requestAnimationFrame(() => {
				feedbackRef.current?.focus({ preventScroll: true });
				feedbackRef.current?.scrollIntoView({
					block: "nearest",
					behavior: quietMode || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
				});
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "echo-composer" + (compact ? " compact" : ""),
			children: [
				(customColour || demoRunning || lightOn === false) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "echo-studio-note",
					children: "Your wristband has its own light setting. Choosing an echo colour returns it to your feeling."
				}),
				!echo || editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "echo-composer-heading",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Your first impression" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "A colour is enough." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Four familiar colours. No perfect shade to find." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "quick-colours",
						role: "group",
						"aria-label": "Choose your echo colour",
						children: FEELINGS.map(([label, className, colour]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "quick-colour " + className + (draft === label ? " selected" : ""),
							onClick: () => choose(label),
							"aria-pressed": draft === label,
							"aria-label": colour + " · " + label,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "quick-swatch",
									children: draft === label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "check",
										size: 15
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: colour }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: label === "Other feeling" ? "Something else" : label })
							]
						}, label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "quick-colour-feedback",
						"aria-live": "polite",
						children: draft ? feelingColour(draft) + " · " + draft + ". Your artwork echo colour." : "Tap a colour, or swipe your wristband preview."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: submit,
						disabled: !draft,
						icon: "spark",
						children: echo ? "Update my echo" : "Send my echo"
					}),
					editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-link",
						type: "button",
						onClick: keepPrevious,
						children: "Keep my previous echo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "quiet-note",
						children: "Your colour first. Other perspectives after."
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "echo-feedback " + feelingTone(echo.feeling),
						role: "status",
						tabIndex: -1,
						ref: feedbackRef,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "echo-feedback-check",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "check",
								size: 23
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Echo added" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
								"Your ",
								feelingColour(echo.feeling).toLowerCase(),
								" echo is here."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								echo.feeling,
								" · ",
								art.title
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Saved locally in this prototype." })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "text-link edit-echo-link",
						type: "button",
						onClick: () => setEditing(true),
						children: ["Change my colour ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "spark",
							size: 13
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtherEchoes, {
						go,
						art
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "echo-keepsakes",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => go("collective"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "download",
									size: 17
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Keep an abstract memory" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "arrow",
									size: 15
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => go("sharedSuccess"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "users",
									size: 17
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preview a collective visual" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "arrow",
									size: 15
								})
							]
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					onClick: () => go("home"),
					children: echo && !editing ? "Continue exploring" : "Skip for now"
				}),
				!echo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "text-link browse-without-echo",
					type: "button",
					onClick: () => go("shared", { browseWithoutEcho: true }),
					children: "Browse reflections without leaving an echo"
				})
			]
		});
	}
	function LookAgain({ art }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
			className: "look-again",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "explore",
					size: 16
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Look again ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Optional" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "+"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "reflection-image",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: ASSET + (art.image === MONET.image ? "reflection-art.png" : art.image),
					alt: "Take another look at " + art.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: "No need to find an answer. Notice one detail, or simply move on." })]
			})]
		});
	}
	function Thought({ go, art, echo, onSubmit }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen thought-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"What stayed",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "with you?" })
					] }),
					eyebrow: "A moment of reflection",
					subtitle: art.title,
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoComposer, {
					go,
					art,
					echo,
					onSubmit
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookAgain, { art })
			]
		});
	}
	function CaptureResponse({ go, art, echo, onSubmit }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen capture-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Give your feeling",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "a colour." })
					] }),
					eyebrow: "Leave your echo",
					subtitle: art.title + " · There are no wrong answers.",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoComposer, {
					go,
					art,
					echo,
					onSubmit
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookAgain, { art })
			]
		});
	}
	function CollectiveVisual({ go, shared = false, echo, art }) {
		const { feeling } = useWristband();
		const { triggerFeedback } = useWristband();
		const memoryFeeling = echo?.feeling || feeling;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen collective-screen" + (shared ? " shared-success-screen" : ""),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: shared ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"A feeling,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "shared." })
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Your own",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "little echo." })
					] }),
					eyebrow: shared ? "Our collective visual" : "An abstract memory",
					subtitle: shared ? "One perspective, woven into many." : "A colour. A feeling. A moment to keep.",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "memory-art",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "memory-aura" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ASSET + (shared ? "shared-visual.png" : "collective-visual.png"),
							alt: shared ? "Shared abstract visual preview" : "Abstract memory preview for " + memoryFeeling
						}),
						shared && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "memory-badge",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "users",
								size: 15
							}), "Shared echo"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "memory-caption",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "colour-dot" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: memoryFeeling }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: shared ? "A collective preview" : "Your perspective" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "quiet-note",
					children: [
						"Sample composition · ",
						art.title,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"The colour responds; the artwork image is a fixed preview."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spacer" }),
				shared ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => go("home"),
						children: "Continue exploring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						light: true,
						onClick: () => go("shared"),
						icon: "thought",
						children: "View sample reflections"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "quiet-note",
						children: "Prototype preview · no online submission."
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						downloadAsset("collective-visual.png", "gallery-echoes-memory.png");
						triggerFeedback("saved", "Your visual download has started.");
						go("saved");
					},
					icon: "download",
					children: "Save my visual"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					onClick: () => go("home"),
					children: "Continue exploring"
				})] })
			]
		});
	}
	function SavedPhotos({ go }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen saved-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: "A moment to keep.",
					eyebrow: "Your abstract memory",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "success-orbit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "success-mark",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "check",
							size: 30
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "center-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"Take your echo",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "with you." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Your visual download has started.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Keep it as a small reminder of your visit."
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spacer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => go("home"),
					children: "Continue exploring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					icon: "download",
					onClick: () => downloadAsset("collective-visual.png", "gallery-echoes-memory.png"),
					children: "Download again"
				})
			]
		});
	}
	function Collection({ go, viewed }) {
		const arts = viewed > 6 ? [...COLLECTION, MONET] : COLLECTION;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen collection-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"A visit worth",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "remembering." })
					] }),
					eyebrow: "My collection",
					subtitle: arts.length + " artworks. A collection of your encounters.",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "art-grid collection-grid",
					children: arts.map((art, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go(index === 6 ? "detail" : "collectionArt", { artwork: index === 6 ? 0 : index }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "art-thumb",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: ASSET + art.image,
									alt: art.title,
									loading: "lazy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: art.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: art.artist })
						]
					}, art.image))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					onClick: () => go("unvisited"),
					children: "Explore unvisited artworks"
				})
			]
		});
	}
	function CollectionArtwork({ go, index, echo, onSubmit }) {
		const art = COLLECTION[index] || COLLECTION[0];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen collection-art-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: "A closer look.",
					eyebrow: "Your collection · " + String(index + 1).padStart(2, "0"),
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
					className: "collection-art-image",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: ASSET + art.image,
						alt: art.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "artwork-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: art.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "artist-name",
							children: art.artist
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fine-rule" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "body-copy",
							children: art.description
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EchoComposer, {
					go,
					art,
					echo,
					onSubmit,
					compact: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "text-link optional-reflection-link",
					type: "button",
					onClick: () => go("thought"),
					children: ["Take a little more time ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "thought",
						size: 14
					})]
				})
			]
		});
	}
	function Unvisited({ go }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen unvisited-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Let curiosity",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "lead you." })
					] }),
					eyebrow: "Explore next",
					subtitle: "6 more artworks are waiting to meet you.",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "art-grid unvisited-grid",
					children: UNVISITED.map((art) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go("location", { location: art.number }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "art-thumb",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: ASSET + art.image,
									alt: "Artwork " + art.number,
									loading: "lazy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "map",
									size: 14
								}) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["Artwork ", art.number] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								"Gallery ",
								galleryFor(art.number),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									children: "↗"
								})
							] })
						]
					}, art.number))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: "Tap an artwork to find your way."
				})
			]
		});
	}
	var MARKERS = {
		11: [29, 67],
		12: [103, 123],
		13: [203, 69],
		14: [285, 123],
		15: [63, 277],
		16: [276, 290]
	};
	var OVERVIEW_MARKERS = {
		11: [58, 86],
		12: [112, 132],
		13: [226, 90],
		14: [274, 140],
		15: [72, 286],
		16: [252, 300]
	};
	var VIEWED_MARKERS = [
		[
			35,
			63,
			"blue"
		],
		[
			95,
			103,
			"grey"
		],
		[
			229,
			57,
			"lavender"
		],
		[
			287,
			103,
			"mint"
		],
		[
			41,
			257,
			"yellow"
		],
		[
			285,
			257,
			"pink"
		]
	];
	function MuseumMap({ selected, onSelect, overview = false, viewed = 6 }) {
		const positions = overview ? OVERVIEW_MARKERS : MARKERS;
		const position = (left, top) => ({
			left: left / 342 * 100 + "%",
			top: top / 385 * 100 + "%"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "museum-map" + (overview ? " overview-map" : ""),
			"aria-label": "Gallery floor plan",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "map-floor",
				children: [
					[
						1,
						2,
						3,
						4
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "gallery-room room-" + n,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["GALLERY ", n] })
					}, n)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "central-hall" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "top-corridor" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bottom-corridor" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "entrance-label",
						children: "ENTRANCE"
					}),
					overview && VIEWED_MARKERS.map(([left, top, colour], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "viewed-marker " + colour,
						style: position(left, top),
						onClick: () => onSelect(index + 1),
						"aria-label": "Viewed artwork " + (index + 1)
					}, index)),
					overview && viewed > 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "viewed-marker aqua",
						style: position(80, 320),
						onClick: () => onSelect(7),
						"aria-label": "Viewed artwork 7"
					}),
					Object.entries(positions).map(([number, [left, top]]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "map-marker" + (Number(number) === selected ? " selected" : ""),
						style: position(left, top),
						"aria-pressed": Number(number) === selected,
						onClick: () => onSelect(Number(number)),
						"aria-label": "Artwork " + number,
						children: overview ? "" : number
					}, number)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "you-halo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "you-label",
						children: "YOU"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "map-legend",
				children: [overview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-viewed" }), "Viewed"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-not-viewed" }), "Not viewed"] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-art" }), "Artwork"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-you" }), "You are here"] })]
			})]
		});
	}
	function galleryFor(location) {
		return location < 13 ? 1 : location < 15 ? 2 : location === 15 ? 3 : 4;
	}
	function ArtworkLocation({ go, location }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen location-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: "Find your next echo.",
					eyebrow: "Artwork location",
					subtitle: "Artwork " + location + " · Gallery " + galleryFor(location),
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MuseumMap, {
					selected: location,
					onSelect: (number) => go("location", { location: number })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "selected-art-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "stat-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "map" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Your destination" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Artwork ", location] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Gallery ",
							galleryFor(location),
							" · ",
							location % 2 ? "North" : "East",
							" wall"
						] })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					onClick: () => go("unvisited"),
					icon: "back",
					children: "Back to artworks"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: "Floor plan preview · position is illustrative."
				})
			]
		});
	}
	function MapOverview({ go, viewed }) {
		const open = (number) => number > 7 ? go("location", { location: number }) : number === 7 ? go("detail") : go("collectionArt", { artwork: number - 1 });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen map-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Find your",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "own path." })
					] }),
					eyebrow: "Gallery map · Level 1",
					subtitle: viewed + " discovered · 6 still to explore",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MuseumMap, {
					overview: true,
					viewed,
					onSelect: open
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => go("unvisited"),
					children: "Explore unvisited artworks"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					onClick: () => go("collection"),
					icon: "collection",
					children: "Viewed today"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: "Floor plan preview · position is illustrative."
				})
			]
		});
	}
	function SharedReflections({ go, art, echo, explicitBrowse = false }) {
		const [browseWithoutEcho, setBrowseWithoutEcho] = (0, import_react.useState)(explicitBrowse);
		const reveal = !!echo || browseWithoutEcho;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen reflections-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: reveal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Through",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "other eyes." })
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Your view,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "first." })
					] }),
					eyebrow: "Nearby footprints",
					subtitle: art.title,
					go
				}),
				reveal ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "reflection-list",
					children: sampleReflections(art).map(([quote, meta, colour], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reflection-meta",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "colour-dot " + colour }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [meta.replace(/ · .*$/, ""), " · sample echo"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: quote })] }, quote))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => go("capture"),
					icon: "thought",
					children: echo ? "Return to my echo" : "Leave a colour"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "perspective-first",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "stat-icon lavender",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "thought",
								size: 22
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"What does it say",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"to you?"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Give your first impression a colour before exploring another perspective." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => go("capture"),
							icon: "spark",
							children: "Leave my echo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-link",
							type: "button",
							onClick: () => setBrowseWithoutEcho(true),
							children: "View sample reflections without adding an echo"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					onClick: () => go("home"),
					children: "Continue exploring"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: reveal ? "Illustrative visitor reflections · no live community data." : "Sharing is always optional."
				})
			]
		});
	}
	function VisitorSketches({ go, sketches, liked, toggleLike }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen sketches-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"A different",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "kind of echo." })
					] }),
					eyebrow: "Visitor sketches",
					subtitle: sketches.length + " perspectives inspired by this view.",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sketch-grid",
					children: sketches.map((sketch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sketch-crop " + (sketch.preview ? "uploaded" : sketch.crop),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: sketch.preview || ASSET + sketch.image,
							alt: sketch.name + "'s sketch"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sketch-meta",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: sketch.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: sketch.time })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: liked[sketch.id] ? "liked" : "",
							onClick: () => toggleLike(sketch.id),
							"aria-pressed": !!liked[sketch.id],
							"aria-label": "Like " + sketch.name + "'s sketch",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "heart",
								size: 16
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sketch.likes + (liked[sketch.id] ? 1 : 0) })]
						})]
					})] }, sketch.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => go("shareSketch"),
					icon: "plus",
					children: "Share your sketch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: "Visitor gallery preview · saved for this visit."
				})
			]
		});
	}
	function ShareSketch({ go, onShare }) {
		const input = (0, import_react.useRef)(null);
		const [file, setFile] = (0, import_react.useState)(null), [preview, setPreview] = (0, import_react.useState)(""), [identity, setIdentity] = (0, import_react.useState)("profile"), [error, setError] = (0, import_react.useState)("");
		(0, import_react.useEffect)(() => () => {
			if (preview) URL.revokeObjectURL(preview);
		}, [preview]);
		const choose = (event) => {
			const next = event.target.files?.[0];
			if (!next) return;
			if (!next.type.startsWith("image/")) {
				setError("Please choose an image.");
				return;
			}
			if (next.size > 10485760) {
				setError("Please choose an image smaller than 10 MB.");
				return;
			}
			setFile(next);
			setPreview(URL.createObjectURL(next));
			setError("");
		};
		const submit = () => {
			if (!file) {
				setError("Add your drawing before sharing.");
				return;
			}
			onShare(file, identity);
			go("sketchShared");
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen share-sketch-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Leave a little",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "of yourself." })
					] }),
					eyebrow: "Share your sketch",
					subtitle: "A drawing. A detail. Your way of seeing.",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "upload-area" + (preview ? " has-preview" : ""),
					type: "button",
					onClick: () => input.current?.click(),
					"aria-label": preview ? "Change sketch image" : "Add a sketch image",
					children: preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: preview,
						alt: "Selected sketch preview"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "upload-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "plus",
								size: 28
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Bring your sketch here" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Choose a photo or drawing" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "upload-formats",
							children: "IMAGES · UP TO 10 MB"
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: input,
					hidden: true,
					type: "file",
					accept: "image/*",
					onChange: choose
				}),
				preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: "Tap the image to choose another."
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "upload-error",
					role: "alert",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-label",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "How would you like to appear?" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "identity-options",
					children: [["profile", "My profile"], ["anonymous", "Anonymous"]].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: identity === key ? "selected" : "",
						"aria-pressed": identity === key,
						onClick: () => setIdentity(key),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: identity === key ? "check" : "users",
							size: 16
						}), label]
					}, key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spacer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: submit,
					icon: "sketch",
					children: "Share sketch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: "Added locally to this prototype visit."
				})
			]
		});
	}
	function SketchCard({ sketch }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "shared-sketch-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "latest-sketch" + (sketch?.preview ? " uploaded" : ""),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: sketch?.preview || ASSET + "my-sketch.png",
					alt: "Your latest sketch"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: sketch?.name || "You" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: sketch?.time || "From this visit" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Light over water" })
			] })]
		});
	}
	function SketchShared({ go, sketch }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen sketch-shared-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: "A new perspective.",
					eyebrow: "Sketch shared",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "success-orbit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "success-mark",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "check",
							size: 30
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "center-copy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your echo belongs here." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Your sketch has joined this visit's gallery.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Thank you for sharing your way of seeing."
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SketchCard, { sketch }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spacer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => go("sketches"),
					children: "See visitor sketches"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					onClick: () => go("detail"),
					icon: "back",
					children: "Back to artwork"
				})
			]
		});
	}
	function MySketch({ go, sketch }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "screen my-sketch-screen",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
					title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"A trace of",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "your visit." })
					] }),
					eyebrow: "My sketch",
					subtitle: "Inspired by Water Lilies and Bridge.",
					go
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "my-sketch-image latest-sketch" + (sketch?.preview ? " uploaded" : ""),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: sketch?.preview || ASSET + "my-sketch.png",
						alt: "Your latest sketch"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "memory-caption",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "sketch",
						size: 17
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Light over water" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "quiet-note",
					children: sketch?.time || "Your sketch from this visit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spacer" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => go("sketches"),
					children: "View visitor sketches"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					light: true,
					onClick: () => go("shareSketch"),
					icon: "plus",
					children: "Add another sketch"
				})
			]
		});
	}
	function DesktopCompanion({ go }) {
		const { mode, signal, lightLabel, wifiConnected } = useWristband();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "desktop-companion",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "desktop-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "brand-monogram",
						children: "ge."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GALLERY ECHOES" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "desktop-editorial",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "See art. Share perspectives." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"Every visit",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"leaves ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "an echo." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"A quieter way to connect with art,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"yourself, and the people around you."
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "desktop-band-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "band-card-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Your wristband" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), signal === "scanning" ? "Discovering" : mode === "team" ? "Together mode" : "Personal mode"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandPreview, { large: true }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "band-card-bottom",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "colour-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: lightLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: wifiConnected ? "Board linked · Wi-Fi light control." : "Preview only · connect from the colour studio." })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "desktop-studio-entry",
							type: "button",
							onClick: () => go("device"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "spark",
									size: 15
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open colour studio" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "arrow",
									size: 15
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "desktop-footnote",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ART CONNECTS US, IN DIFFERENT WAYS." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Interactive prototype" })]
				})
			]
		});
	}
	function initialRoute() {
		const query = new URLSearchParams(window.location.search);
		const screen = ROUTES.includes(query.get("screen")) ? query.get("screen") : "welcome";
		const artwork = Math.max(0, Math.min(5, Math.floor(Number(query.get("artwork")) || 0)));
		const requestedEcho = query.get("echo");
		return {
			screen,
			artwork,
			echoArtwork: screen === "collectionArt" ? "collection-" + artwork : ["detail", "downloaded"].includes(screen) ? "monet" : /^monet$|^collection-[0-5]$/.test(requestedEcho || "") ? requestedEcho : "monet",
			browseWithoutEcho: false,
			location: Math.max(11, Math.min(16, Math.floor(Number(query.get("location")) || 11)))
		};
	}
	function GalleryApp() {
		const [route, setRoute] = (0, import_react.useState)(initialRoute), [viewed, setViewed] = (0, import_react.useState)(6), [uploads, setUploads] = (0, import_react.useState)([]), [liked, setLiked] = (0, import_react.useState)({});
		const [echoes, setEchoes] = (0, import_react.useState)(readEchoes);
		const { setSignal, setMode, setFeeling, triggerFeedback, quietMode } = useWristband();
		const viewport = (0, import_react.useRef)(null), routeRef = (0, import_react.useRef)(route), depth = (0, import_react.useRef)(0), transitionLayer = (0, import_react.useRef)(null), transitionTimer = (0, import_react.useRef)(null), objectURLs = (0, import_react.useRef)([]), quietRef = (0, import_react.useRef)(quietMode), echoesRef = (0, import_react.useRef)(echoes);
		const screen = route.screen;
		routeRef.current = route;
		quietRef.current = quietMode;
		echoesRef.current = echoes;
		const showRoute = (0, import_react.useCallback)((next) => {
			const layer = transitionLayer.current;
			clearTimeout(transitionTimer.current);
			layer?.replaceChildren();
			if (viewport.current && layer && !quietRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				const previous = viewport.current;
				const snapshot = previous.cloneNode(true);
				snapshot.className = "route-snapshot";
				snapshot.setAttribute("inert", "");
				snapshot.setAttribute("aria-hidden", "true");
				snapshot.style.top = previous.offsetTop + "px";
				snapshot.style.height = previous.clientHeight + "px";
				snapshot.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
				layer.appendChild(snapshot);
				snapshot.scrollTop = previous.scrollTop;
				transitionTimer.current = setTimeout(() => layer.replaceChildren(), 240);
			}
			(0, import_react_dom.flushSync)(() => setRoute(next));
		}, []);
		const go = (0, import_react.useCallback)((nextScreen, params = {}) => {
			if (!ROUTES.includes(nextScreen)) return;
			const current = routeRef.current, next = {
				...current,
				...params,
				screen: nextScreen
			};
			if (nextScreen === "collectionArt") next.echoArtwork = "collection-" + next.artwork;
			if (["detail", "downloaded"].includes(nextScreen)) next.echoArtwork = "monet";
			next.browseWithoutEcho = nextScreen === "shared" && params.browseWithoutEcho === true;
			if (nextScreen === current.screen && next.artwork === current.artwork && next.location === current.location && next.echoArtwork === current.echoArtwork && next.browseWithoutEcho === current.browseWithoutEcho) return;
			if (nextScreen === "detail" && current.screen === "proximity") setViewed(7);
			const url = new URL(window.location.href);
			url.searchParams.set("screen", nextScreen);
			url.searchParams.set("artwork", next.artwork);
			url.searchParams.set("location", next.location);
			url.searchParams.set("echo", next.echoArtwork);
			if (echoes[next.echoArtwork]) setFeeling(echoes[next.echoArtwork].feeling, { preserveCustom: true });
			depth.current += 1;
			window.history.pushState({
				route: next,
				echoDepth: depth.current
			}, "", url);
			showRoute(next);
		}, [
			showRoute,
			echoes,
			setFeeling
		]);
		go.back = () => {
			if (depth.current > 0) window.history.back();
			else go(screen === "mode" ? "welcome" : "home");
		};
		(0, import_react.useEffect)(() => {
			window.history.replaceState({
				route: routeRef.current,
				echoDepth: 0
			}, "", window.location.href);
			const pop = (event) => {
				depth.current = event.state?.echoDepth || 0;
				const next = event.state?.route || initialRoute();
				if (echoesRef.current[next.echoArtwork]) setFeeling(echoesRef.current[next.echoArtwork].feeling, { preserveCustom: true });
				showRoute(next);
			};
			window.addEventListener("popstate", pop);
			return () => window.removeEventListener("popstate", pop);
		}, [showRoute, setFeeling]);
		(0, import_react.useEffect)(() => {
			viewport.current?.scrollTo({ top: 0 });
			viewport.current?.querySelector("h1")?.focus({ preventScroll: true });
			document.title = (screen === "welcome" ? "See Art. Leave Your Echo." : screen === "home" ? "Your visit" : screen.replace(/([A-Z])/g, " $1")) + " · Gallery Echoes";
			if (["pairTeam", "teamConnected"].includes(screen)) setMode("team");
			if (["proximity", "pairTeam"].includes(screen)) setSignal("scanning");
			else if ([
				"saved",
				"downloaded",
				"sketchShared"
			].includes(screen)) setSignal("saved");
			else if (["welcome", "mode"].includes(screen)) setSignal("idle");
			else setSignal("connected");
		}, [
			screen,
			route.artwork,
			route.location,
			route.echoArtwork,
			setSignal,
			setMode
		]);
		(0, import_react.useEffect)(() => () => {
			clearTimeout(transitionTimer.current);
			objectURLs.current.forEach((url) => URL.revokeObjectURL(url));
		}, []);
		(0, import_react.useEffect)(() => {
			if (echoes[route.echoArtwork]) setFeeling(echoes[route.echoArtwork].feeling, { preserveCustom: true });
		}, [route.echoArtwork, setFeeling]);
		const art = echoArtwork(route.echoArtwork), echo = echoes[route.echoArtwork];
		const onSubmitEcho = (feeling) => {
			const next = {
				...echoes,
				[route.echoArtwork]: {
					feeling,
					submittedAt: Date.now()
				}
			};
			setEchoes(next);
			setFeeling(feeling);
			setSignal("connected");
			try {
				localStorage.setItem(ECHO_STORAGE, JSON.stringify(next));
			} catch {}
			triggerFeedback("submitted", "Your " + feelingColour(feeling).toLowerCase() + " echo has been added.");
		};
		const onShare = (file, identity) => {
			const preview = URL.createObjectURL(file);
			objectURLs.current.push(preview);
			setUploads((current) => [{
				id: "visit-" + Date.now(),
				name: identity === "anonymous" ? "Anonymous" : "You",
				time: "just now",
				likes: 0,
				preview
			}, ...current]);
		};
		const sketches = [...uploads, ...SKETCHES.map((item) => ({
			...item,
			id: item.crop
		}))];
		const screens = {
			welcome: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Welcome, { go }),
			mode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChooseMode, { go }),
			pairTeam: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanScreen, {
				go,
				team: true
			}),
			teamConnected: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamConnected, { go }),
			home: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Home, {
				go,
				viewed,
				sketchCount: 1 + uploads.length
			}),
			device: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceColourScreen, { go }),
			proximity: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanScreen, { go }),
			detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtworkDetail, {
				go,
				echo,
				onSubmit: onSubmitEcho
			}),
			downloaded: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtworkDetail, {
				go,
				downloaded: true,
				echo,
				onSubmit: onSubmitEcho
			}),
			thought: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thought, {
				go,
				art,
				echo,
				onSubmit: onSubmitEcho
			}),
			capture: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaptureResponse, {
				go,
				art,
				echo,
				onSubmit: onSubmitEcho
			}),
			collective: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectiveVisual, {
				go,
				art,
				echo
			}),
			sharedSuccess: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectiveVisual, {
				go,
				art,
				echo,
				shared: true
			}),
			saved: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedPhotos, { go }),
			collection: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection, {
				go,
				viewed
			}),
			collectionArt: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionArtwork, {
				go,
				index: route.artwork,
				echo,
				onSubmit: onSubmitEcho
			}),
			unvisited: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unvisited, { go }),
			location: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtworkLocation, {
				go,
				location: route.location
			}),
			map: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapOverview, {
				go,
				viewed
			}),
			shared: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedReflections, {
				go,
				art,
				echo,
				explicitBrowse: route.browseWithoutEcho
			}),
			sketches: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitorSketches, {
				go,
				sketches,
				liked,
				toggleLike: (id) => setLiked((current) => ({
					...current,
					[id]: !current[id]
				}))
			}),
			shareSketch: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareSketch, {
				go,
				onShare
			}),
			sketchShared: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SketchShared, {
				go,
				sketch: uploads[0]
			}),
			mine: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MySketch, {
				go,
				sketch: uploads[0]
			})
		};
		const immersive = [
			"welcome",
			"pairTeam",
			"proximity"
		].includes(screen);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "app-shell",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopCompanion, { go }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "phone" + (immersive ? " immersive" : ""),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "device-top",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "9:41" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "device-island" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "device-status",
								children: ["▮▮▮ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "▰" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "route-viewport",
						ref: viewport,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "route-stage",
							children: screens[screen]
						}, screen + route.artwork + route.location + route.echoArtwork + route.browseWithoutEcho)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "transition-layer",
						ref: transitionLayer,
						"aria-hidden": "true"
					}),
					!immersive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {
						go,
						screen
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "home-indicator",
						"aria-hidden": "true"
					})
				]
			})]
		});
	}
	function App() {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WristbandProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryApp, {}) });
	}
	//#endregion
	//#region src/main.jsx
	(0, import_client.createRoot)(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}) }));
	//#endregion
})();
