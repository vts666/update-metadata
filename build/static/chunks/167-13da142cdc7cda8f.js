(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[167],{

/***/ 17187:
/***/ (function(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ 47843:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "sR": function() { return /* reexport */ WalletModalProvider; },
  "aD": function() { return /* reexport */ WalletMultiButton; },
  "hB": function() { return /* reexport */ useWalletModal; }
});

// UNUSED EXPORTS: WalletConnectButton, WalletDisconnectButton, WalletIcon, WalletModal, WalletModalButton, WalletModalContext

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/useWalletModal.js

var WalletModalContext = /*#__PURE__*/ (0,react.createContext)({});
function useWalletModal() {
    return (0,react.useContext)(WalletModalContext);
} //# sourceMappingURL=useWalletModal.js.map

// EXTERNAL MODULE: ./node_modules/@solana/wallet-adapter-react/lib/useWallet.js
var lib_useWallet = __webpack_require__(77257);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/Button.js

var Button_Button = function(props) {
    var justifyContent = props.endIcon || props.startIcon ? 'space-between' : 'center';
    return(/*#__PURE__*/ react.createElement("button", {
        className: "wallet-adapter-button ".concat(props.className || ''),
        disabled: props.disabled,
        onClick: props.onClick,
        style: Object.assign({
            justifyContent: justifyContent
        }, props.style),
        tabIndex: props.tabIndex || 0,
        type: "button"
    }, props.startIcon && /*#__PURE__*/ react.createElement("i", {
        className: "wallet-adapter-button-start-icon"
    }, props.startIcon), props.children, props.endIcon && /*#__PURE__*/ react.createElement("i", {
        className: "wallet-adapter-button-end-icon"
    }, props.endIcon)));
}; //# sourceMappingURL=Button.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletIcon.js

var __rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
var WalletIcon_WalletIcon = function(_a) {
    var wallet = _a.wallet, props = __rest(_a, [
        "wallet"
    ]);
    return wallet && /*#__PURE__*/ react.createElement("img", Object.assign({
        src: wallet.icon,
        alt: "".concat(wallet.name, " icon")
    }, props));
}; //# sourceMappingURL=WalletIcon.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletConnectButton.js




var WalletConnectButton_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
var WalletConnectButton = function(_a) {
    var children = _a.children, disabled = _a.disabled, onClick = _a.onClick, props = WalletConnectButton_rest(_a, [
        "children",
        "disabled",
        "onClick"
    ]);
    var ref = (0,lib_useWallet/* useWallet */.O)(), wallet = ref.wallet, connect = ref.connect, connecting = ref.connecting, connected = ref.connected;
    var handleClick = (0,react.useCallback)(function(event) {
        if (onClick) onClick(event);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        if (!event.defaultPrevented) connect().catch(function() {});
    }, [
        onClick,
        connect
    ]);
    var content = (0,react.useMemo)(function() {
        if (children) return children;
        if (connecting) return 'Connecting ...';
        if (connected) return 'Connected';
        if (wallet) return 'Connect';
        return 'Connect Wallet';
    }, [
        children,
        connecting,
        connected,
        wallet
    ]);
    return(/*#__PURE__*/ react.createElement(Button_Button, Object.assign({
        className: "wallet-adapter-button-trigger",
        disabled: disabled || !wallet || connecting || connected,
        startIcon: wallet ? /*#__PURE__*/ react.createElement(WalletIcon_WalletIcon, {
            wallet: wallet
        }) : undefined,
        onClick: handleClick
    }, props), content));
}; //# sourceMappingURL=WalletConnectButton.js.map

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(73935);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/Collapse.js

var Collapse = function(param) {
    var id = param.id, children = param.children, _expanded = param.expanded, expanded = _expanded === void 0 ? false : _expanded;
    var ref = (0,react.useRef)(null);
    var instant = (0,react.useRef)(true);
    var transition = 'height 250ms ease-out';
    var openCollapse = function() {
        var node = ref.current;
        if (!node) return;
        requestAnimationFrame(function() {
            node.style.height = node.scrollHeight + 'px';
        });
    };
    var closeCollapse = function() {
        var node = ref.current;
        if (!node) return;
        requestAnimationFrame(function() {
            node.style.height = node.offsetHeight + 'px';
            node.style.overflow = 'hidden';
            requestAnimationFrame(function() {
                node.style.height = '0';
            });
        });
    };
    (0,react.useLayoutEffect)(function() {
        if (expanded) {
            openCollapse();
        } else {
            closeCollapse();
        }
    }, [
        expanded
    ]);
    (0,react.useLayoutEffect)(function() {
        var handleComplete = function handleComplete() {
            if (!node) return;
            node.style.overflow = expanded ? 'initial' : 'hidden';
            if (expanded) {
                node.style.height = 'auto';
            }
        };
        var handleTransitionEnd = function handleTransitionEnd(event) {
            if (node && event.target === node && event.propertyName === 'height') {
                handleComplete();
            }
        };
        var node = ref.current;
        if (!node) return;
        if (instant.current) {
            handleComplete();
            instant.current = false;
        }
        node.addEventListener('transitionend', handleTransitionEnd);
        return function() {
            return node.removeEventListener('transitionend', handleTransitionEnd);
        };
    }, [
        expanded
    ]);
    return(/*#__PURE__*/ react.createElement("div", {
        children: children,
        className: "wallet-adapter-collapse",
        id: id,
        ref: ref,
        role: "region",
        style: {
            height: 0,
            transition: instant.current ? undefined : transition
        }
    }));
}; //# sourceMappingURL=Collapse.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletListItem.js



var WalletListItem = function(param) {
    var handleClick = param.handleClick, tabIndex = param.tabIndex, wallet = param.wallet;
    return(/*#__PURE__*/ react.createElement("li", null, /*#__PURE__*/ react.createElement(Button_Button, {
        onClick: handleClick,
        endIcon: /*#__PURE__*/ react.createElement(WalletIcon_WalletIcon, {
            wallet: wallet
        }),
        tabIndex: tabIndex
    }, wallet.name)));
}; //# sourceMappingURL=WalletListItem.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletModal.js







var WalletModal = function(param) {
    var _className = param.className, className = _className === void 0 ? '' : _className, logo = param.logo, _featuredWallets = param.featuredWallets, featuredWallets = _featuredWallets === void 0 ? 3 : _featuredWallets, _container = param.container, container = _container === void 0 ? 'body' : _container;
    var ref = (0,react.useRef)(null);
    var ref1 = (0,lib_useWallet/* useWallet */.O)(), wallets = ref1.wallets, select = ref1.select;
    var setVisible = useWalletModal().setVisible;
    var ref2 = (0,react.useState)(false), expanded = ref2[0], setExpanded = ref2[1];
    var ref3 = (0,react.useState)(false), fadeIn = ref3[0], setFadeIn = ref3[1];
    var ref4 = (0,react.useState)(null), portal = ref4[0], setPortal = ref4[1];
    var ref5 = (0,react.useMemo)(function() {
        return [
            wallets.slice(0, featuredWallets),
            wallets.slice(featuredWallets)
        ];
    }, [
        wallets,
        featuredWallets
    ]), featured = ref5[0], more = ref5[1];
    var hideModal = (0,react.useCallback)(function() {
        setFadeIn(false);
        setTimeout(function() {
            return setVisible(false);
        }, 150);
    }, [
        setFadeIn,
        setVisible
    ]);
    var handleClose = (0,react.useCallback)(function(event) {
        event.preventDefault();
        hideModal();
    }, [
        hideModal
    ]);
    var handleWalletClick = (0,react.useCallback)(function(event, walletName) {
        select(walletName);
        handleClose(event);
    }, [
        select,
        handleClose
    ]);
    var handleCollapseClick = (0,react.useCallback)(function() {
        return setExpanded(!expanded);
    }, [
        setExpanded,
        expanded
    ]);
    var handleTabKey = (0,react.useCallback)(function(event) {
        var node = ref.current;
        if (!node) return;
        // here we query all focusable elements
        var focusableElements = node.querySelectorAll('button');
        var firstElement = focusableElements[0];
        var lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey) {
            // if going backward by pressing tab and firstElement is active, shift focus to last focusable element
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            // if going forward by pressing tab and lastElement is active, shift focus to first focusable element
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }, [
        ref
    ]);
    (0,react.useLayoutEffect)(function() {
        var handleKeyDown = function(event) {
            if (event.key === 'Escape') {
                hideModal();
            } else if (event.key === 'Tab') {
                handleTabKey(event);
            }
        };
        // Get original overflow
        var overflow = window.getComputedStyle(document.body).overflow;
        // Hack to enable fade in animation after mount
        setTimeout(function() {
            return setFadeIn(true);
        }, 0);
        // Prevent scrolling on mount
        document.body.style.overflow = 'hidden';
        // Listen for keydown events
        window.addEventListener('keydown', handleKeyDown, false);
        return function() {
            // Re-enable scrolling when component unmounts
            document.body.style.overflow = overflow;
            window.removeEventListener('keydown', handleKeyDown, false);
        };
    }, [
        hideModal,
        handleTabKey
    ]);
    (0,react.useLayoutEffect)(function() {
        return setPortal(document.querySelector(container));
    }, [
        setPortal,
        container
    ]);
    return portal && /*#__PURE__*/ (0,react_dom.createPortal)(/*#__PURE__*/ react.createElement("div", {
        "aria-labelledby": "wallet-adapter-modal-title",
        "aria-modal": "true",
        className: "wallet-adapter-modal ".concat(fadeIn && 'wallet-adapter-modal-fade-in', " ").concat(className),
        ref: ref,
        role: "dialog"
    }, /*#__PURE__*/ react.createElement("div", {
        className: "wallet-adapter-modal-container"
    }, /*#__PURE__*/ react.createElement("div", {
        className: "wallet-adapter-modal-wrapper ".concat(!logo && 'wallet-adapter-modal-wrapper-no-logo')
    }, logo && /*#__PURE__*/ react.createElement("div", {
        className: "wallet-adapter-modal-logo-wrapper"
    }, typeof logo === 'string' ? /*#__PURE__*/ react.createElement("img", {
        alt: "logo",
        className: "wallet-adapter-modal-logo",
        src: logo
    }) : logo), /*#__PURE__*/ react.createElement("h1", {
        className: "wallet-adapter-modal-title",
        id: "wallet-adapter-modal-title"
    }, "Connect Wallet"), /*#__PURE__*/ react.createElement("button", {
        onClick: handleClose,
        className: "wallet-adapter-modal-button-close"
    }, /*#__PURE__*/ react.createElement("svg", {
        width: "14",
        height: "14"
    }, /*#__PURE__*/ react.createElement("path", {
        d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z"
    }))), /*#__PURE__*/ react.createElement("ul", {
        className: "wallet-adapter-modal-list"
    }, featured.map(function(wallet) {
        return(/*#__PURE__*/ react.createElement(WalletListItem, {
            key: wallet.name,
            handleClick: function(event) {
                return handleWalletClick(event, wallet.name);
            },
            wallet: wallet
        }));
    })), more.length ? /*#__PURE__*/ react.createElement(react.Fragment, null, /*#__PURE__*/ react.createElement(Collapse, {
        expanded: expanded,
        id: "wallet-adapter-modal-collapse"
    }, /*#__PURE__*/ react.createElement("ul", {
        className: "wallet-adapter-modal-list"
    }, more.map(function(wallet) {
        return(/*#__PURE__*/ react.createElement(WalletListItem, {
            key: wallet.name,
            handleClick: function(event) {
                return handleWalletClick(event, wallet.name);
            },
            tabIndex: expanded ? 0 : -1,
            wallet: wallet
        }));
    }))), /*#__PURE__*/ react.createElement(Button_Button, {
        "aria-controls": "wallet-adapter-modal-collapse",
        "aria-expanded": expanded,
        className: "wallet-adapter-modal-collapse-button ".concat(expanded && 'wallet-adapter-modal-collapse-button-active'),
        endIcon: /*#__PURE__*/ react.createElement("svg", {
            width: "11",
            height: "6",
            xmlns: "http://www.w3.org/2000/svg"
        }, /*#__PURE__*/ react.createElement("path", {
            d: "m5.938 5.73 4.28-4.126a.915.915 0 0 0 0-1.322 1 1 0 0 0-1.371 0L5.253 3.736 1.659.272a1 1 0 0 0-1.371 0A.93.93 0 0 0 0 .932c0 .246.1.48.288.662l4.28 4.125a.99.99 0 0 0 1.37.01z"
        })),
        onClick: handleCollapseClick
    }, expanded ? 'Less' : 'More', " options")) : null)), /*#__PURE__*/ react.createElement("div", {
        className: "wallet-adapter-modal-overlay",
        onMouseDown: handleClose
    })), portal);
}; //# sourceMappingURL=WalletModal.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletModalButton.js



var WalletModalButton_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
var WalletModalButton = function(_a) {
    var _children = _a.children, children = _children === void 0 ? 'Select Wallet' : _children, onClick = _a.onClick, props = WalletModalButton_rest(_a, [
        "children",
        "onClick"
    ]);
    var ref = useWalletModal(), visible = ref.visible, setVisible = ref.setVisible;
    var handleClick = (0,react.useCallback)(function(event) {
        if (onClick) onClick(event);
        if (!event.defaultPrevented) setVisible(!visible);
    }, [
        onClick,
        setVisible,
        visible
    ]);
    return(/*#__PURE__*/ react.createElement(Button_Button, Object.assign({
        className: "wallet-adapter-button-trigger",
        onClick: handleClick
    }, props), children));
}; //# sourceMappingURL=WalletModalButton.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletModalProvider.js



var WalletModalProvider_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
var WalletModalProvider = function(_a) {
    var children = _a.children, props = WalletModalProvider_rest(_a, [
        "children"
    ]);
    var ref = (0,react.useState)(false), visible = ref[0], setVisible = ref[1];
    return(/*#__PURE__*/ react.createElement(WalletModalContext.Provider, {
        value: {
            visible: visible,
            setVisible: setVisible
        }
    }, children, visible && /*#__PURE__*/ react.createElement(WalletModal, Object.assign({}, props))));
}; //# sourceMappingURL=WalletModalProvider.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletDisconnectButton.js




var WalletDisconnectButton_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
var WalletDisconnectButton = function(_a) {
    var children = _a.children, disabled = _a.disabled, onClick = _a.onClick, props = WalletDisconnectButton_rest(_a, [
        "children",
        "disabled",
        "onClick"
    ]);
    var ref = useWallet(), wallet = ref.wallet, disconnect = ref.disconnect, disconnecting = ref.disconnecting;
    var handleClick = useCallback(function(event) {
        if (onClick) onClick(event);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        if (!event.defaultPrevented) disconnect().catch(function() {});
    }, [
        onClick,
        disconnect
    ]);
    var content = useMemo(function() {
        if (children) return children;
        if (disconnecting) return 'Disconnecting ...';
        if (wallet) return 'Disconnect';
        return 'Disconnect Wallet';
    }, [
        children,
        disconnecting,
        wallet
    ]);
    return(/*#__PURE__*/ React.createElement(Button, Object.assign({
        className: "wallet-adapter-button-trigger",
        disabled: disabled || !wallet,
        startIcon: wallet ? /*#__PURE__*/ React.createElement(WalletIcon, {
            wallet: wallet
        }) : undefined,
        onClick: handleClick
    }, props), content));
}; //# sourceMappingURL=WalletDisconnectButton.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/regenerator-runtime/runtime.js
var runtime = __webpack_require__(34051);
var runtime_default = /*#__PURE__*/__webpack_require__.n(runtime);
;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/WalletMultiButton.js








function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    var adopt = function adopt(value) {
        return _instanceof(value, P) ? value : new P(function(resolve) {
            resolve(value);
        });
    };
    return new (P || (P = Promise))(function(resolve, reject) {
        var fulfilled = function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        var rejected = function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        };
        var step = function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        };
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var WalletMultiButton_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};
var WalletMultiButton = function(_a) {
    var children = _a.children, props = WalletMultiButton_rest(_a, [
        "children"
    ]);
    var ref = (0,lib_useWallet/* useWallet */.O)(), publicKey = ref.publicKey, wallet = ref.wallet, disconnect = ref.disconnect;
    var setVisible = useWalletModal().setVisible;
    var ref1 = (0,react.useState)(false), copied = ref1[0], setCopied = ref1[1];
    var ref2 = (0,react.useState)(false), active = ref2[0], setActive = ref2[1];
    var ref3 = (0,react.useRef)(null);
    var base58 = (0,react.useMemo)(function() {
        return publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58();
    }, [
        publicKey
    ]);
    var content = (0,react.useMemo)(function() {
        if (children) return children;
        if (!wallet || !base58) return null;
        return base58.slice(0, 4) + '..' + base58.slice(-4);
    }, [
        children,
        wallet,
        base58
    ]);
    var copyAddress = (0,react.useCallback)(function() {
        return __awaiter(void 0, void 0, void 0, runtime_default().mark(function _callee() {
            return runtime_default().wrap(function _callee$(_ctx) {
                while(1)switch(_ctx.prev = _ctx.next){
                    case 0:
                        if (!base58) {
                            _ctx.next = 5;
                            break;
                        }
                        _ctx.next = 3;
                        return navigator.clipboard.writeText(base58);
                    case 3:
                        setCopied(true);
                        setTimeout(function() {
                            return setCopied(false);
                        }, 400);
                    case 5:
                    case "end":
                        return _ctx.stop();
                }
            }, _callee);
        }));
    }, [
        base58
    ]);
    var openDropdown = (0,react.useCallback)(function() {
        return setActive(true);
    }, [
        setActive
    ]);
    var closeDropdown = (0,react.useCallback)(function() {
        return setActive(false);
    }, [
        setActive
    ]);
    var openModal = (0,react.useCallback)(function() {
        setVisible(true);
        closeDropdown();
    }, [
        setVisible,
        closeDropdown
    ]);
    (0,react.useEffect)(function() {
        var listener = function(event) {
            var node = ref3.current;
            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target)) return;
            closeDropdown();
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return function() {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [
        ref3,
        closeDropdown
    ]);
    if (!wallet) return(/*#__PURE__*/ react.createElement(WalletModalButton, Object.assign({}, props), children));
    if (!base58) return(/*#__PURE__*/ react.createElement(WalletConnectButton, Object.assign({}, props), children));
    return(/*#__PURE__*/ react.createElement("div", {
        className: "wallet-adapter-dropdown"
    }, /*#__PURE__*/ react.createElement(Button_Button, Object.assign({
        "aria-expanded": active,
        className: "wallet-adapter-button-trigger",
        style: Object.assign({
            pointerEvents: active ? 'none' : 'auto'
        }, props.style),
        onClick: openDropdown,
        startIcon: /*#__PURE__*/ react.createElement(WalletIcon_WalletIcon, {
            wallet: wallet
        })
    }, props), content), /*#__PURE__*/ react.createElement("ul", {
        "aria-label": "dropdown-list",
        className: "wallet-adapter-dropdown-list ".concat(active && 'wallet-adapter-dropdown-list-active'),
        ref: ref3,
        role: "menu"
    }, /*#__PURE__*/ react.createElement("li", {
        onClick: copyAddress,
        className: "wallet-adapter-dropdown-list-item",
        role: "menuitem"
    }, copied ? 'Copied' : 'Copy address'), /*#__PURE__*/ react.createElement("li", {
        onClick: openModal,
        className: "wallet-adapter-dropdown-list-item",
        role: "menuitem"
    }, "Connect a different wallet"), /*#__PURE__*/ react.createElement("li", {
        onClick: disconnect,
        className: "wallet-adapter-dropdown-list-item",
        role: "menuitem"
    }, "Disconnect"))));
}; //# sourceMappingURL=WalletMultiButton.js.map

;// CONCATENATED MODULE: ./node_modules/@solana/wallet-adapter-react-ui/lib/index.js







 //# sourceMappingURL=index.js.map


/***/ }),

/***/ 77257:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z": function() { return /* binding */ WalletContext; },
/* harmony export */   "O": function() { return /* binding */ useWallet; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);

var WalletContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
function useWallet() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(WalletContext);
} //# sourceMappingURL=useWallet.js.map


/***/ }),

/***/ 34155:
/***/ (function(module) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })

}]);