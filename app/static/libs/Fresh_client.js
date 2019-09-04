/* eslint-disable */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CustomIparamAPI = undefined;

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _consumer = require('../lib/consumer');

    var _data_bind = require('../lib/data_bind');

    var dataBind = _interopRequireWildcard(_data_bind);

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var INVALID_FUNCTION = 'Function does not exist: ';
    var OK_MESSAGE = 'ok';
    var VALIDATE = 'validate';
    var FUNCTION = 'function';

    var CustomIparamAPI = exports.CustomIparamAPI = function (_Consumer) {
      _inherits(CustomIparamAPI, _Consumer);

      function CustomIparamAPI(instanceId, channel) {
        _classCallCheck(this, CustomIparamAPI);

        var _this = _possibleConstructorReturn(this, (CustomIparamAPI.__proto__ || Object.getPrototypeOf(CustomIparamAPI)).call(this, channel));

        _this.instanceId = instanceId;
        _this.service = 'CustomIparamAPI';
        _this.timeout = 3000;
        return _this;
      }

      _createClass(CustomIparamAPI, [{
        key: 'process',
        value: function process(data) {
          try {
            if (data.method === VALIDATE || _typeof(window[data.method]) === FUNCTION) {
              var result = this[data.method](data);

              return { respData: result };
            }
            return this.invalidFunctionError(data.method);
          } catch (error) {
            return { error: { message: error.message || JSON.stringify(error) } };
          }
        }
      }, {
        key: 'invalidFunctionError',
        value: function invalidFunctionError(method) {
          return { error: '' + INVALID_FUNCTION + method };
        }

        // getConfigs method is used to update saved configs in UI.

      }, {
        key: 'getConfigs',
        value: function getConfigs(data) {
          if (data.options.configs && Object.keys(data.options.configs).length > 0) {
            window[data.method](data.options.configs);
          }
          if (data.options.isInstall && data.options.productConfigs) {
            this.getProductConfigs(data.options.productConfigs);
          }
          return { message: OK_MESSAGE };
        }

        // getConfigs method is used to update product related configs in UI.

      }, {
        key: 'getProductConfigs',
        value: function getProductConfigs(productConfigs) {
          dataBind.default.twoWayBind(productConfigs);
          // Change the method bindDom in data_bind.js to support new fields.
          // Supports only input field now.
          productConfigs.bindDom(window.document.body);
        }

        // postConfigs will return the configs to save.

      }, {
        key: 'postConfigs',
        value: function postConfigs(data) {
          return { configs: window[data.method]() };
        }
      }, {
        key: 'validate',
        value: function validate(data) {
          var isValid = _typeof(window[data.method]) === FUNCTION ? window[data.method]() : true;

          return { isValid: isValid };
        }

        /*
        handleResponse gets request from parent for custom installation page and
        post back the response to the parent.
        */

      }, {
        key: 'handleResponse',
        value: function handleResponse(response) {
          var payload = _extends({}, this.process(response), {
            instanceId: this.instanceId,
            uniqId: response.uniqId,
            service: this.service,
            method: response.method
          });

          this.postMessage(payload);
        }
      }]);

      return CustomIparamAPI;
    }(_consumer.Consumer);

  },{"../lib/consumer":10,"../lib/data_bind":11}],2:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DataAPI = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _consumer = require('../lib/consumer');

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var DataAPI = exports.DataAPI = function (_Consumer) {
      _inherits(DataAPI, _Consumer);

      function DataAPI(instanceId, channel) {
        _classCallCheck(this, DataAPI);

        var _this = _possibleConstructorReturn(this, (DataAPI.__proto__ || Object.getPrototypeOf(DataAPI)).call(this, channel));
        //Post parent sent to parent for any configurations later


        _this.instanceId = instanceId;
        _this.service = 'DataAPI';
        _this.timeout = 5000;
        return _this;
      }

      _createClass(DataAPI, [{
        key: 'get',
        value: function get(attribute) {
          return this.handleRequest('get', {
            attribute: attribute
          });
        }
      }]);

      return DataAPI;
    }(_consumer.Consumer);

  },{"../lib/consumer":10}],3:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DatastoreAPI = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _consumer = require('../lib/consumer');

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var MANDATORY_ATTR_MISS = 'Mandatory attributes (key or value) is missing';
    var MANDATORY_ATTR_MISS_STATUS = 400;

    var DatastoreAPI = exports.DatastoreAPI = function (_Consumer) {
      _inherits(DatastoreAPI, _Consumer);

      function DatastoreAPI(instanceId, channel) {
        _classCallCheck(this, DatastoreAPI);

        var _this = _possibleConstructorReturn(this, (DatastoreAPI.__proto__ || Object.getPrototypeOf(DatastoreAPI)).call(this, channel));

        _this.instanceId = instanceId;
        _this.service = 'DataStoreAPI';
        _this.timeout = 15000;
        return _this;
      }

      _createClass(DatastoreAPI, [{
        key: 'set',
        value: function set(key, data) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

          if (key === undefined || data === undefined) {
            return Promise.reject({ 'message': MANDATORY_ATTR_MISS, status: MANDATORY_ATTR_MISS_STATUS });
          }
          return this.handleRequest('store', {
            'dbKey': key,
            data: data,
            options: options
          });
        }
      }, {
        key: 'get',
        value: function get(key) {
          return this.handleRequest('fetch', {
            'dbKey': key
          });
        }
      }, {
        key: 'update',
        value: function update(key, type, attributes) {
          if (key === undefined || type === undefined || attributes === undefined) {
            return Promise.reject({ 'message': MANDATORY_ATTR_MISS, status: MANDATORY_ATTR_MISS_STATUS });
          }
          return this.handleRequest('update', {
            'dbKey': key,
            type: type,
            attributes: attributes
          });
        }
      }, {
        key: 'delete',
        value: function _delete(key) {
          return this.handleRequest('delete', {
            'dbKey': key
          });
        }
      }]);

      return DatastoreAPI;
    }(_consumer.Consumer);

  },{"../lib/consumer":10}],4:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EventAPI = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _consumer = require('../lib/consumer');

    var _helper = require('../lib/helper');

    var h = _interopRequireWildcard(_helper);

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    /**
     *  EventAPI doesn't have to extend the Consumer class as they don't share anything.
     *  Will have to discuss this.
     */
    var ERROR_STATUS = 500;
    var APP_EVENTS_INDEX = 4;

    var EventAPI = exports.EventAPI = function (_Consumer) {
      _inherits(EventAPI, _Consumer);

      function EventAPI(instanceId, channel) {
        _classCallCheck(this, EventAPI);

        var _this = _possibleConstructorReturn(this, (EventAPI.__proto__ || Object.getPrototypeOf(EventAPI)).call(this, channel));

        _this.instanceId = instanceId;
        _this.service = 'EventAPI';
        _this.pendingEvents = {
          'app.activated': null,
          'app.deactivated': null
        };

        var addEventListener = document.addEventListener;

        /**
         *  Over-rides the default addEventListener method. The over-ridden method, apart attaching,
         *  the listener also ensures that any buffered events are immediately triggered to the app.
         */
        document.addEventListener = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          addEventListener.apply(document, args);

          var event = args[0];

          if (_this.pendingEvents.hasOwnProperty(event)) {
            var eventBody = _this.pendingEvents[event];

            delete _this.pendingEvents[event];

            if (eventBody) {
              _this.handleResponse(eventBody);
            }
          }
        };
        return _this;
      }

      _createClass(EventAPI, [{
        key: 'on',
        value: function on(event, callback, options) {
          // App lifecycle events
          if (event.substr(0, APP_EVENTS_INDEX) === 'app.') {
            document.addEventListener(event, callback);
          }
          // all other events
          else {
            this.handleRequest('on', { event: event, intercept: options ? options.intercept : false });
            document.addEventListener(event, callback);
          }
        }
      }, {
        key: 'off',
        value: function off(event, callback, options) {
          // App lifecycle events
          if (event.substr(0, APP_EVENTS_INDEX) === 'app.') {
            document.removeEventListener(event, callback);
          }
          // all other events
          else {
            this.handleRequest('off', { event: event, intercept: options ? options.intercept : false });
            document.removeEventListener(event, callback);
          }
        }

        /**
         *  This message sends the request payload to parent
         *  @param {string} method - the method to be called in this service
         *  @param {string} options - the params to be passed on to the parent
         */

      }, {
        key: 'handleRequest',
        value: function handleRequest(method, options) {
          var payload = {
            instanceId: this.instanceId,
            uniqId: h.default.generateID(),
            service: this.service,
            method: method,
            options: options
          };

          this.postMessage(payload);
        }
      }, {
        key: 'handleResponse',
        value: function handleResponse(response) {
          var _this2 = this;

          var event = document.createEvent('Event');

          /**
           *  If the current app event is yet to have listeners attached to it, ensure that
           *  it is buffered until the listener is attached. If multiple event payloads
           *  are sent over, the latest event alone is buffered and later triggered when the
           *  listener is finally attached.
           */
          if (this.pendingEvents.hasOwnProperty(response.event)) {
            this.pendingEvents[response.event] = response;
            return;
          }

          // Allow stopping events
          event.initEvent(response.event, true, true);
          // Inject data for the handler
          event.data = response.data;
          event.helper = {
            getData: function getData() {
              return event.data;
            },
            fail: function fail(msg) {
              event.preventDefault();
              event.failMessage = msg;
              event.helper.done();
            },
            getFailMessage: function getFailMessage() {
              return event.failMessage;
            },
            done: function done() {
              if (response.isIntercept) {
                _this2.postResponse(response, event);
              }
            }
          };
          // The receivers of the events can cancel the event by calling event.preventDefault()
          document.dispatchEvent(event);
        }
      }, {
        key: 'postResponse',
        value: function postResponse(response, error) {
          var payload = {
            instanceId: this.instanceId,
            uniqId: response.uniqId,
            service: this.service,
            method: 'intercept'
          };

          if (error.defaultPrevented) {
            payload.error = { status: ERROR_STATUS, message: error.helper.getFailMessage() };
          }

          this.postMessage(payload);
        }
      }]);

      return EventAPI;
    }(_consumer.Consumer);

  },{"../lib/consumer":10,"../lib/helper":12}],5:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.InstanceAPI = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _consumer = require('../lib/consumer');

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var MANDATORY_ATTR_MISS = 'Mandatory attribute (message) is missing';
    var INVALID_DATA_TYPE = 'Attribute receiver should be a string or a array of string';
    var MANDATORY_ATTR_MISS_STATUS = 400;

    var InstanceAPI = exports.InstanceAPI = function (_Consumer) {
      _inherits(InstanceAPI, _Consumer);

      function InstanceAPI(instanceId, channel) {
        _classCallCheck(this, InstanceAPI);

        var _this = _possibleConstructorReturn(this, (InstanceAPI.__proto__ || Object.getPrototypeOf(InstanceAPI)).call(this, channel));

        _this.instanceId = instanceId;
        _this.service = 'InstanceAPI';
        _this.timeout = 3000;
        return _this;
      }

      _createClass(InstanceAPI, [{
        key: 'resize',
        value: function resize(options) {
          return this.handleRequest('resize', options);
        }
      }, {
        key: 'get',
        value: function get() {
          return this.handleRequest('get');
        }
      }, {
        key: 'context',
        value: function context() {
          return this.handleRequest('context');
        }
      }, {
        key: 'close',
        value: function close() {
          return this.handleRequest('close');
        }
      }, {
        key: 'send',
        value: function send(options) {
          //eslint-disable-line complexity
          if (!options || !options.message) {
            return Promise.reject({ response: MANDATORY_ATTR_MISS, status: MANDATORY_ATTR_MISS_STATUS });
          }

          if (options.receiver && typeof options.receiver !== 'string' && !Array.isArray(options.receiver)) {
            return Promise.reject({ response: INVALID_DATA_TYPE, status: MANDATORY_ATTR_MISS_STATUS });
          }

          return this.handleRequest('send', options);
        }
      }, {
        key: 'receive',
        value: function receive(callback) {
          document.addEventListener(this.service + '.message', callback);
        }
      }]);

      return InstanceAPI;
    }(_consumer.Consumer);

  },{"../lib/consumer":10}],6:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.InterfaceAPI = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _consumer = require('../lib/consumer');

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var InterfaceAPI = exports.InterfaceAPI = function (_Consumer) {
      _inherits(InterfaceAPI, _Consumer);

      function InterfaceAPI(instanceId, channel) {
        _classCallCheck(this, InterfaceAPI);

        var _this = _possibleConstructorReturn(this, (InterfaceAPI.__proto__ || Object.getPrototypeOf(InterfaceAPI)).call(this, channel));
        //Post parent sent to parent for any configurations later


        _this.instanceId = instanceId;
        _this.service = 'InterfaceAPI';
        _this.timeout = 15000;
        return _this;
      }

      _createClass(InterfaceAPI, [{
        key: 'trigger',
        value: function trigger(method, options) {
          return this.handleRequest(method, options);
        }
      }]);

      return InterfaceAPI;
    }(_consumer.Consumer);

  },{"../lib/consumer":10}],7:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.IparamAPI = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _consumer = require('../lib/consumer');

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var IparamAPI = exports.IparamAPI = function (_Consumer) {
      _inherits(IparamAPI, _Consumer);

      function IparamAPI(instanceId, channel) {
        _classCallCheck(this, IparamAPI);

        var _this = _possibleConstructorReturn(this, (IparamAPI.__proto__ || Object.getPrototypeOf(IparamAPI)).call(this, channel));

        _this.instanceId = instanceId;
        _this.service = 'IparamAPI';
        _this.timeout = 3000;
        return _this;
      }

      _createClass(IparamAPI, [{
        key: 'get',
        value: function get(attribute) {
          return this.handleRequest('get', {
            attribute: attribute
          });
        }
      }]);

      return IparamAPI;
    }(_consumer.Consumer);

  },{"../lib/consumer":10}],8:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RequestAPI = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _consumer = require('../lib/consumer');

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var RequestAPI = exports.RequestAPI = function (_Consumer) {
      _inherits(RequestAPI, _Consumer);

      function RequestAPI(instanceId, channel) {
        _classCallCheck(this, RequestAPI);

        var _this = _possibleConstructorReturn(this, (RequestAPI.__proto__ || Object.getPrototypeOf(RequestAPI)).call(this, channel));
        //Post parent sent to parent for any configurations later


        _this.instanceId = instanceId;
        _this.service = 'RequestAPI';
        _this.timeout = 15000;
        return _this;
      }

      _createClass(RequestAPI, [{
        key: 'get',
        value: function get(url, options) {
          options = options || {};
          options.url = url;

          return this.handleRequest('get', options);
        }
      }, {
        key: 'post',
        value: function post(url, options) {
          options = options || {};
          options.url = url;

          return this.handleRequest('post', options);
        }
      }, {
        key: 'put',
        value: function put(url, options) {
          options = options || {};
          options.url = url;

          return this.handleRequest('put', options);
        }
      }, {
        key: 'delete',
        value: function _delete(url, options) {
          options = options || {};
          options.url = url;

          return this.handleRequest('delete', options);
        }
      }, {
        key: 'patch',
        value: function patch(url, options) {
          options = options || {};
          options.url = url;

          return this.handleRequest('patch', options);
        }
      }, {
        key: 'invoke',
        value: function invoke(methodName, methodParams) {
          var options = {
            methodName: methodName,
            methodParams: methodParams,
            feature: 'backend'
          };

          return this.handleRequest('invoke', options);
        }
      }]);

      return RequestAPI;
    }(_consumer.Consumer);

  },{"../lib/consumer":10}],9:[function(require,module,exports){
    'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    var _data_api = require('./api/data_api');

    var _request_api = require('./api/request_api');

    var _iparam_api = require('./api/iparam_api');

    var _event_api = require('./api/event_api');

    var _datastore_api = require('./api/datastore_api');

    var _interface_api = require('./api/interface_api');

    var _instance_api = require('./api/instance_api');

    var _custom_iparam_api = require('./api/custom_iparam_api');

    require('es6-promise/auto');

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function applyDynamicCSS() {
      var product = new URL(document.location).searchParams.get('product');

      if (product) {
        var style = document.createElement('link');

        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.href = 'https://static.freshdev.io/fdk/2.0/assets/' + product + '.css';
        document.head.insertAdjacentElement('afterbegin', style);
      }
    }

    var DEFAULT_SERVICES = {
      DataAPI: { key: 'data', obj: _data_api.DataAPI },
      RequestAPI: { key: 'request', obj: _request_api.RequestAPI },
      IparamAPI: { key: 'iparams', obj: _iparam_api.IparamAPI },
      EventAPI: { key: 'events', obj: _event_api.EventAPI },
      DataStoreAPI: { key: 'db', obj: _datastore_api.DatastoreAPI },
      InterfaceAPI: { key: 'interface', obj: _interface_api.InterfaceAPI },
      InstanceAPI: { key: 'instance', obj: _instance_api.InstanceAPI }
    };

    var SERVICES = _extends({}, DEFAULT_SERVICES, {
      CustomIparamAPI: {
        obj: _custom_iparam_api.CustomIparamAPI
      }
    });

    /**
     *  Client SDK
     */

    var FrshClient = function () {
      /**
       *  Constructor intializes the handshake and then returns a Promise that will
       *  be resolved once the Parent responds to the handshake with the port details.
       *  Returning a Promise ensures that all services are properly intialized before
       *  the client accepts any serivce requests. This prevents retry failures as seen before.
       *
       *  The developer can also get multiple client object by `thenning` the promise multiple
       *  times.
       *
       *  TODO: Will the constructor ever reject? Donno.
       */
      function FrshClient() {
        var _this = this;

        _classCallCheck(this, FrshClient);

        this.HANDSHAKE_SIGN = 'iframe:handshake';
        //Hash for all services and handlers, used for data back from parent
        this.services = {};

        return new Promise(function (resolve) {
          window.onmessage = function (message) {
            if (message.data.type === _this.HANDSHAKE_SIGN) {
              //One port for each app.
              _this.channel = message.ports[0];
              _this.instanceId = message.data.instanceId;

              _this.channel.postMessage({ type: 'iframe:loaded', 'height': document.body.scrollHeight });
              //Initialize services
              _this.initServices(message.data.services);

              //Message handler for the channel
              _this.channel.onmessage = function (appMsg) {
                if (typeof appMsg.data === 'string') {
                  appMsg = JSON.parse(appMsg.data);
                } else {
                  appMsg = appMsg.data;
                }
                /**
                 *  Check the `service` in the message to find out which service this response corresponds to.
                 *  If the service is not a part of this app (which should NEVER happen), silently log the message(?)
                 *  and move on.
                 */
                if (_this.services[appMsg.service]) {
                  _this.services[appMsg.service].handleResponse(appMsg);
                } else {
                  console.error('Response received from parent for unrecognized service.', appMsg);
                }
              };

              resolve(_this);
            }
          };
        });
      }

      _createClass(FrshClient, [{
        key: 'initServices',
        value: function initServices(services) {
          //Register data services
          if (!services) {
            services = Object.keys(DEFAULT_SERVICES);
          }
          var self = this;

          services.map(function (service) {
            var key = SERVICES[service].key;
            var obj = new SERVICES[service].obj(self.instanceId, self.channel); // eslint-disable-line new-cap

            if (key) {
              self[key] = obj;
            }
            self.services[service] = obj;
            return self.services;
          });
        }
      }]);

      return FrshClient;
    }();

    /**
     *  Globally expose the sdk object.
     */


    window.frsh_init = function () {
      // eslint-disable-line new-cap
      var instance = new FrshClient();

      return function () {
        return instance;
      };
    }();

    /**
     *  Apply the CSS based on the product.
     */
    applyDynamicCSS();

    /**
     *  Inorder to remain consistent with V1, we have renamed the initializer function
     *  to `app.initialized`. `frsh_init` is also kept for backward compatibility.
     */
    window.app = {
      initialized: window.frsh_init // eslint-disable-line new-cap
    };

  },{"./api/custom_iparam_api":1,"./api/data_api":2,"./api/datastore_api":3,"./api/event_api":4,"./api/instance_api":5,"./api/interface_api":6,"./api/iparam_api":7,"./api/request_api":8,"es6-promise/auto":13}],10:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Consumer = undefined;

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    var _helper = require('./helper');

    var h = _interopRequireWildcard(_helper);

    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Consumer = exports.Consumer = function () {
      /**
       *  The default constructor to initialize class
       *  Store the port details for later use
       *  @params {MessageChannel} appPort - The port through which communication will happen
       */
      function Consumer(channel) {
        _classCallCheck(this, Consumer);

        this.channel = channel;
        //Object to store hash of all request made to parent
        this.requests = {};
      }

      _createClass(Consumer, [{
        key: 'gc',
        value: function gc(id) {
          var _this = this;

          setTimeout(function () {
            /**
             *  If the callbacks for the `id` still exists after the given timeout, reject it mercylessly and
             *  delete the stored callbacks. The timeout can be designed differently for different services based on
             *  the services' complexity. (DataAPI -> small timeout, RequestAPI, DBAPI -> much longer)
             */
            if (_this.requests[id]) {
              _this.requests[id].reject({ message: 'Request timed out!' });
              delete _this.requests[id];
            }
          }, this.timeout);
        }

        /**
         *  The recepient of the data back from the parent
         *  @params {object} response
         *
         *  {
     *     uniqId:    <string>,  -- (mandatory)
     *     service:   <string>,  -- (mandatory)
     *     respData:  <JSON>,    -- (optional, either this or error)
     *     error:     <JSON>     -- (optional, either this or respData)
     *  }
         */

      }, {
        key: 'handleResponse',
        value: function handleResponse(response) {
          if (this.requests[response.uniqId]) {
            /**
             *  Check if the response is a success or failure case and resolve/reject accordingly.
             */
            if (response.respData) {
              this.requests[response.uniqId].resolve(response.respData);
            } else {
              this.requests[response.uniqId].reject(response.error);
            }

            /**
             *  Once the promise has been resolved/rejected, delete the callbacks from the `requests` object to
             *  ensure that it doesn't lead to memory leaks.
             */
            delete this.requests[response.uniqId];
          } else if (this.service === 'InstanceAPI' && response.event === 'message') {
            var e = document.createEvent('Event');

            // Allow stopping events
            e.initEvent(this.service + '.' + response.event, true, true);
            // Inject data for the handler
            e.data = response.data;
            e.helper = function () {
              return {
                getData: function getData() {
                  return e.data;
                }
              };
            }(e);
            document.dispatchEvent(e);
          } else {
            console.error(this.service + ' - Received unexpected response from Parent', response);
          }
        }

        /**
         *  This message sends the request payload to parent
         *  @param {string} method - the method to be called in this service
         *  @param {string} options - the params to be passed on to the parent
         */

      }, {
        key: 'handleRequest',
        value: function handleRequest(method, options) {
          var _this2 = this;

          /**
           *  This `handleRequest` is common for all request-based services. The payload that the child sends has been
           *  standardized to,
           *
           *    {
       *      uniqId:  <string>,   (mandatory)
       *      service: <string>,   (mandatory)
       *      method:  <string>,   (mandatory)
       *      options: <JSON>      (mandatory)
       *    }
           *
           *  instanceId will soon be deprecated.
           */
          var payload = {
            instanceId: this.instanceId,
            uniqId: h.default.generateID(),
            service: this.service,
            method: method,
            options: options
          };

          return new Promise(function (resolve, reject) {
            _this2.requests[payload.uniqId] = {
              resolve: resolve,
              reject: reject
            };

            /**
             *  GC will ensure that Promises made are resolved/rejected within pre-defined time period.
             *  Consider the case where the child makes a request to the parent, but for some reason, never receives
             *  the response from the parent due to some issue in the parent. In such cases, the promise for that
             *  particular request is pre-maturely rejected.
             */
            _this2.gc(payload.uniqId);
            _this2.postMessage(payload);
          });
        }
      }, {
        key: 'postMessage',
        value: function postMessage(payload) {
          return this.channel.postMessage(payload);
        }
      }]);

      return Consumer;
    }();

  },{"./helper":12}],11:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /* eslint-disable */

    /**
     * Simple and small two-way data binding between DOM and data.
     * Used in Custom Iparam API to getProductConfigs(ex: api_key) and bind it to the DOM
     */

    /**
     * @param {object} scope - Object that all bound data will be attached to.
     */
    function twoWayBind(scope) {
      // a list of all bindings used in the DOM
      // @example
      // { 'person.name': [<input type="text" data-bind="person.name"/>] }
      var bindings = {};

      // each bindings old value to be compared for changes
      // @example
      // { 'person.name': 'John' }
      var oldValues = {};

      /**
       * Get the object of a binding.
       *
       * @param {string} path - Path to the bound object.
       * @returns {object}
       */
      function getBoundObject(path) {
        path = path.split('.');
        var binding = scope;

        for (var i = 0; i < path.length - 1; i++) {
          if (typeof binding[path[i]] === 'undefined') return;

          binding = binding[path[i]];
        }

        return binding;
      }

      /**
       * Get the property of a binding.
       *
       * @param {string} path - Path to the bound object.
       * @returns {string}
       */
      function getBoundProperty(path) {
        return path.substring(path.lastIndexOf('.') + 1);
      }

      /**
       * Get the value of a binding.
       *
       * @param {string} path - Path to the bound object.
       * @returns {*}
       */
      function getBoundValue(path) {
        var object = getBoundObject(path);
        var property = getBoundProperty(path);

        return object ? object[property] : undefined;
      }

      /**
       * Dirty check all bindings and update the DOM if any bindings have changed.
       */
      function updateBindings() {
        // if any binding changes, loop over all bindings again to see if the changed made
        // any changes to other bindings. Similar to Angular.js dirty checking method.
        var changed = true;

        while (changed) {
          changed = false;

          // loop through all bindings and check their old value compared to their current value
          for (var prop in bindings) {
            if (!bindings.hasOwnProperty(prop)) continue;

            var value = getBoundValue(prop);

            if (typeof value === 'function') {
              // a toString function must be called with it's associated object
              // i.e. value = obj.toString; value = value(); doesn't work
              value = value.call(getBoundObject(prop));
            }

            // value has changed, update all DOM
            if (value !== oldValues[prop]) {
              changed = true;
              oldValues[prop] = value;

              bindings[prop].forEach(function (node) {
                if (node.nodeName === 'INPUT') {
                  node.value = typeof value !== 'undefined' ? value : '';
                } else {
                  node.innerHTML = value;
                }
              });
            }
          }
        }
      }

      /**
       * Bind DOM nodes to their data. Can be used on DOM created after the page has loaded.
       * @param {Node} node - Node to scan for bindings.
       */
      function bindDom(node) {
        var nodes = node.querySelectorAll('[data-bind]');

        for (var i = 0, node; node = nodes[i]; i++) {
          // set up initial values
          var path = node.getAttribute('data-bind');
          var value = getBoundValue(path);

          if (typeof value === 'function') {
            // a toString function must be called with it's associated object
            // i.e. value = obj.toString; value = value(); doesn't work
            value = value.call(getBoundObject(path));
          }

          if (node.nodeName === 'INPUT') {
            node.value = typeof value !== 'undefined' ? value : '';
            node.dispatchEvent(new Event('change'));
          } else {
            node.innerHTML = value;
          }

          // set old values for dirty checking
          oldValues[path] = value;

          // add the binds to the list
          bindings[path] = bindings[path] || [];

          if (bindings[path].indexOf(node) === -1) {
            bindings[path].push(node);
          }
        }
      }

      // scan DOM once all scripts have run and bind DOM to data
      // this allows scripts to inject DOM onto the page and still be bound
      document.addEventListener('DOMContentLoaded', function () {
        // bind DOM to data
        bindDom(document);

        // active DOM bindings on input change
        document.addEventListener('change', function (e) {
          var target = e.target;

          // update the associated binding
          if (target.hasAttribute('data-bind')) {
            var path = target.getAttribute('data-bind');
            var object = getBoundObject(path);
            var property = getBoundProperty(path);

            try {
              object[property] = JSON.parse(target.value);
            } catch (e) {
              object[property] = target.value;
            }

            updateBindings();
          }
        });
      });

      // attach functions for external use
      scope.getBoundObject = getBoundObject;
      scope.getBoundProperty = getBoundProperty;
      scope.getBoundValue = getBoundValue;
      scope.updateBindings = updateBindings;
      scope.bindDom = bindDom;
    }

    exports.default = {
      twoWayBind: twoWayBind
    };

  },{}],12:[function(require,module,exports){
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function decode(s) {
      return decodeURIComponent((s || '').replace(/\+/g, ' '));
    }

    function queryParameters(queryString) {
      //eslint-disable-line complexity
      var result = {},
        keyValuePairs,
        keyAndValue,
        key,
        value;

      queryString = queryString || (document.location.search || '').slice(1);

      if (queryString.length === 0) {
        return result;
      }

      keyValuePairs = queryString.split('&');

      for (var i = 0; i < keyValuePairs.length; i++) {
        keyAndValue = keyValuePairs[i].split('=');
        key = decode(keyAndValue[0]);
        value = decode(keyAndValue[1]) || '';
        result[key] = value;
      }

      return result;
    }

    function generateID(random) {
      random = random || Math.random();

      return Date.now() + ':' + random;
    }

    exports.default = {
      queryParameters: queryParameters,
      generateID: generateID
    };

  },{}],13:[function(require,module,exports){
// This file can be required in Browserify and Node.js for automatic polyfill
// To use it:  require('es6-promise/auto');
    'use strict';
    module.exports = require('./').polyfill();

  },{"./":14}],14:[function(require,module,exports){
    (function (process,global){
      /*!
       * @overview es6-promise - a tiny implementation of Promises/A+.
       * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
       * @license   Licensed under MIT license
       *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
       * @version   v4.2.4+314e4831
       */

      (function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
          typeof define === 'function' && define.amd ? define(factory) :
            (global.ES6Promise = factory());
      }(this, (function () { 'use strict';

        function objectOrFunction(x) {
          var type = typeof x;
          return x !== null && (type === 'object' || type === 'function');
        }

        function isFunction(x) {
          return typeof x === 'function';
        }



        var _isArray = void 0;
        if (Array.isArray) {
          _isArray = Array.isArray;
        } else {
          _isArray = function (x) {
            return Object.prototype.toString.call(x) === '[object Array]';
          };
        }

        var isArray = _isArray;

        var len = 0;
        var vertxNext = void 0;
        var customSchedulerFn = void 0;

        var asap = function asap(callback, arg) {
          queue[len] = callback;
          queue[len + 1] = arg;
          len += 2;
          if (len === 2) {
            // If len is 2, that means that we need to schedule an async flush.
            // If additional callbacks are queued before the queue is flushed, they
            // will be processed by this flush that we are scheduling.
            if (customSchedulerFn) {
              customSchedulerFn(flush);
            } else {
              scheduleFlush();
            }
          }
        };

        function setScheduler(scheduleFn) {
          customSchedulerFn = scheduleFn;
        }

        function setAsap(asapFn) {
          asap = asapFn;
        }

        var browserWindow = typeof window !== 'undefined' ? window : undefined;
        var browserGlobal = browserWindow || {};
        var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
        var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
        var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
        function useNextTick() {
          // node version 0.10.x displays a deprecation warning when nextTick is used recursively
          // see https://github.com/cujojs/when/issues/410 for details
          return function () {
            return process.nextTick(flush);
          };
        }

// vertx
        function useVertxTimer() {
          if (typeof vertxNext !== 'undefined') {
            return function () {
              vertxNext(flush);
            };
          }

          return useSetTimeout();
        }

        function useMutationObserver() {
          var iterations = 0;
          var observer = new BrowserMutationObserver(flush);
          var node = document.createTextNode('');
          observer.observe(node, { characterData: true });

          return function () {
            node.data = iterations = ++iterations % 2;
          };
        }

// web worker
        function useMessageChannel() {
          var channel = new MessageChannel();
          channel.port1.onmessage = flush;
          return function () {
            return channel.port2.postMessage(0);
          };
        }

        function useSetTimeout() {
          // Store setTimeout reference so es6-promise will be unaffected by
          // other code modifying setTimeout (like sinon.useFakeTimers())
          var globalSetTimeout = setTimeout;
          return function () {
            return globalSetTimeout(flush, 1);
          };
        }

        var queue = new Array(1000);
        function flush() {
          for (var i = 0; i < len; i += 2) {
            var callback = queue[i];
            var arg = queue[i + 1];

            callback(arg);

            queue[i] = undefined;
            queue[i + 1] = undefined;
          }

          len = 0;
        }

        function attemptVertx() {
          try {
            var vertx = Function('return this')().require('vertx');
            vertxNext = vertx.runOnLoop || vertx.runOnContext;
            return useVertxTimer();
          } catch (e) {
            return useSetTimeout();
          }
        }

        var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
        if (isNode) {
          scheduleFlush = useNextTick();
        } else if (BrowserMutationObserver) {
          scheduleFlush = useMutationObserver();
        } else if (isWorker) {
          scheduleFlush = useMessageChannel();
        } else if (browserWindow === undefined && typeof require === 'function') {
          scheduleFlush = attemptVertx();
        } else {
          scheduleFlush = useSetTimeout();
        }

        function then(onFulfillment, onRejection) {
          var parent = this;

          var child = new this.constructor(noop);

          if (child[PROMISE_ID] === undefined) {
            makePromise(child);
          }

          var _state = parent._state;


          if (_state) {
            var callback = arguments[_state - 1];
            asap(function () {
              return invokeCallback(_state, child, callback, parent._result);
            });
          } else {
            subscribe(parent, child, onFulfillment, onRejection);
          }

          return child;
        }

        /**
         `Promise.resolve` returns a promise that will become resolved with the
         passed `value`. It is shorthand for the following:

         ```javascript
         let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

         promise.then(function(value){
    // value === 1
  });
         ```

         Instead of writing the above, your code now simply becomes the following:

         ```javascript
         let promise = Promise.resolve(1);

         promise.then(function(value){
    // value === 1
  });
         ```

         @method resolve
         @static
         @param {Any} value value that the returned promise will be resolved with
         Useful for tooling.
         @return {Promise} a promise that will become fulfilled with the given
         `value`
         */
        function resolve$1(object) {
          /*jshint validthis:true */
          var Constructor = this;

          if (object && typeof object === 'object' && object.constructor === Constructor) {
            return object;
          }

          var promise = new Constructor(noop);
          resolve(promise, object);
          return promise;
        }

        var PROMISE_ID = Math.random().toString(36).substring(2);

        function noop() {}

        var PENDING = void 0;
        var FULFILLED = 1;
        var REJECTED = 2;

        var TRY_CATCH_ERROR = { error: null };

        function selfFulfillment() {
          return new TypeError("You cannot resolve a promise with itself");
        }

        function cannotReturnOwn() {
          return new TypeError('A promises callback cannot return that same promise.');
        }

        function getThen(promise) {
          try {
            return promise.then;
          } catch (error) {
            TRY_CATCH_ERROR.error = error;
            return TRY_CATCH_ERROR;
          }
        }

        function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
          try {
            then$$1.call(value, fulfillmentHandler, rejectionHandler);
          } catch (e) {
            return e;
          }
        }

        function handleForeignThenable(promise, thenable, then$$1) {
          asap(function (promise) {
            var sealed = false;
            var error = tryThen(then$$1, thenable, function (value) {
              if (sealed) {
                return;
              }
              sealed = true;
              if (thenable !== value) {
                resolve(promise, value);
              } else {
                fulfill(promise, value);
              }
            }, function (reason) {
              if (sealed) {
                return;
              }
              sealed = true;

              reject(promise, reason);
            }, 'Settle: ' + (promise._label || ' unknown promise'));

            if (!sealed && error) {
              sealed = true;
              reject(promise, error);
            }
          }, promise);
        }

        function handleOwnThenable(promise, thenable) {
          if (thenable._state === FULFILLED) {
            fulfill(promise, thenable._result);
          } else if (thenable._state === REJECTED) {
            reject(promise, thenable._result);
          } else {
            subscribe(thenable, undefined, function (value) {
              return resolve(promise, value);
            }, function (reason) {
              return reject(promise, reason);
            });
          }
        }

        function handleMaybeThenable(promise, maybeThenable, then$$1) {
          if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
            handleOwnThenable(promise, maybeThenable);
          } else {
            if (then$$1 === TRY_CATCH_ERROR) {
              reject(promise, TRY_CATCH_ERROR.error);
              TRY_CATCH_ERROR.error = null;
            } else if (then$$1 === undefined) {
              fulfill(promise, maybeThenable);
            } else if (isFunction(then$$1)) {
              handleForeignThenable(promise, maybeThenable, then$$1);
            } else {
              fulfill(promise, maybeThenable);
            }
          }
        }

        function resolve(promise, value) {
          if (promise === value) {
            reject(promise, selfFulfillment());
          } else if (objectOrFunction(value)) {
            handleMaybeThenable(promise, value, getThen(value));
          } else {
            fulfill(promise, value);
          }
        }

        function publishRejection(promise) {
          if (promise._onerror) {
            promise._onerror(promise._result);
          }

          publish(promise);
        }

        function fulfill(promise, value) {
          if (promise._state !== PENDING) {
            return;
          }

          promise._result = value;
          promise._state = FULFILLED;

          if (promise._subscribers.length !== 0) {
            asap(publish, promise);
          }
        }

        function reject(promise, reason) {
          if (promise._state !== PENDING) {
            return;
          }
          promise._state = REJECTED;
          promise._result = reason;

          asap(publishRejection, promise);
        }

        function subscribe(parent, child, onFulfillment, onRejection) {
          var _subscribers = parent._subscribers;
          var length = _subscribers.length;


          parent._onerror = null;

          _subscribers[length] = child;
          _subscribers[length + FULFILLED] = onFulfillment;
          _subscribers[length + REJECTED] = onRejection;

          if (length === 0 && parent._state) {
            asap(publish, parent);
          }
        }

        function publish(promise) {
          var subscribers = promise._subscribers;
          var settled = promise._state;

          if (subscribers.length === 0) {
            return;
          }

          var child = void 0,
            callback = void 0,
            detail = promise._result;

          for (var i = 0; i < subscribers.length; i += 3) {
            child = subscribers[i];
            callback = subscribers[i + settled];

            if (child) {
              invokeCallback(settled, child, callback, detail);
            } else {
              callback(detail);
            }
          }

          promise._subscribers.length = 0;
        }

        function tryCatch(callback, detail) {
          try {
            return callback(detail);
          } catch (e) {
            TRY_CATCH_ERROR.error = e;
            return TRY_CATCH_ERROR;
          }
        }

        function invokeCallback(settled, promise, callback, detail) {
          var hasCallback = isFunction(callback),
            value = void 0,
            error = void 0,
            succeeded = void 0,
            failed = void 0;

          if (hasCallback) {
            value = tryCatch(callback, detail);

            if (value === TRY_CATCH_ERROR) {
              failed = true;
              error = value.error;
              value.error = null;
            } else {
              succeeded = true;
            }

            if (promise === value) {
              reject(promise, cannotReturnOwn());
              return;
            }
          } else {
            value = detail;
            succeeded = true;
          }

          if (promise._state !== PENDING) {
            // noop
          } else if (hasCallback && succeeded) {
            resolve(promise, value);
          } else if (failed) {
            reject(promise, error);
          } else if (settled === FULFILLED) {
            fulfill(promise, value);
          } else if (settled === REJECTED) {
            reject(promise, value);
          }
        }

        function initializePromise(promise, resolver) {
          try {
            resolver(function resolvePromise(value) {
              resolve(promise, value);
            }, function rejectPromise(reason) {
              reject(promise, reason);
            });
          } catch (e) {
            reject(promise, e);
          }
        }

        var id = 0;
        function nextId() {
          return id++;
        }

        function makePromise(promise) {
          promise[PROMISE_ID] = id++;
          promise._state = undefined;
          promise._result = undefined;
          promise._subscribers = [];
        }

        function validationError() {
          return new Error('Array Methods must be provided an Array');
        }

        var Enumerator = function () {
          function Enumerator(Constructor, input) {
            this._instanceConstructor = Constructor;
            this.promise = new Constructor(noop);

            if (!this.promise[PROMISE_ID]) {
              makePromise(this.promise);
            }

            if (isArray(input)) {
              this.length = input.length;
              this._remaining = input.length;

              this._result = new Array(this.length);

              if (this.length === 0) {
                fulfill(this.promise, this._result);
              } else {
                this.length = this.length || 0;
                this._enumerate(input);
                if (this._remaining === 0) {
                  fulfill(this.promise, this._result);
                }
              }
            } else {
              reject(this.promise, validationError());
            }
          }

          Enumerator.prototype._enumerate = function _enumerate(input) {
            for (var i = 0; this._state === PENDING && i < input.length; i++) {
              this._eachEntry(input[i], i);
            }
          };

          Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
            var c = this._instanceConstructor;
            var resolve$$1 = c.resolve;


            if (resolve$$1 === resolve$1) {
              var _then = getThen(entry);

              if (_then === then && entry._state !== PENDING) {
                this._settledAt(entry._state, i, entry._result);
              } else if (typeof _then !== 'function') {
                this._remaining--;
                this._result[i] = entry;
              } else if (c === Promise$1) {
                var promise = new c(noop);
                handleMaybeThenable(promise, entry, _then);
                this._willSettleAt(promise, i);
              } else {
                this._willSettleAt(new c(function (resolve$$1) {
                  return resolve$$1(entry);
                }), i);
              }
            } else {
              this._willSettleAt(resolve$$1(entry), i);
            }
          };

          Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
            var promise = this.promise;


            if (promise._state === PENDING) {
              this._remaining--;

              if (state === REJECTED) {
                reject(promise, value);
              } else {
                this._result[i] = value;
              }
            }

            if (this._remaining === 0) {
              fulfill(promise, this._result);
            }
          };

          Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
            var enumerator = this;

            subscribe(promise, undefined, function (value) {
              return enumerator._settledAt(FULFILLED, i, value);
            }, function (reason) {
              return enumerator._settledAt(REJECTED, i, reason);
            });
          };

          return Enumerator;
        }();

        /**
         `Promise.all` accepts an array of promises, and returns a new promise which
         is fulfilled with an array of fulfillment values for the passed promises, or
         rejected with the reason of the first passed promise to be rejected. It casts all
         elements of the passed iterable to promises as it runs this algorithm.

         Example:

         ```javascript
         let promise1 = resolve(1);
         let promise2 = resolve(2);
         let promise3 = resolve(3);
         let promises = [ promise1, promise2, promise3 ];

         Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
         ```

         If any of the `promises` given to `all` are rejected, the first promise
         that is rejected will be given as an argument to the returned promises's
         rejection handler. For example:

         Example:

         ```javascript
         let promise1 = resolve(1);
         let promise2 = reject(new Error("2"));
         let promise3 = reject(new Error("3"));
         let promises = [ promise1, promise2, promise3 ];

         Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
         ```

         @method all
         @static
         @param {Array} entries array of promises
         @param {String} label optional string for labeling the promise.
         Useful for tooling.
         @return {Promise} promise that is fulfilled when all `promises` have been
         fulfilled, or rejected if any of them become rejected.
         @static
         */
        function all(entries) {
          return new Enumerator(this, entries).promise;
        }

        /**
         `Promise.race` returns a new promise which is settled in the same way as the
         first passed promise to settle.

         Example:

         ```javascript
         let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

         let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

         Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
         ```

         `Promise.race` is deterministic in that only the state of the first
         settled promise matters. For example, even if other promises given to the
         `promises` array argument are resolved, but the first settled promise has
         become rejected before the other promises became fulfilled, the returned
         promise will become rejected:

         ```javascript
         let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

         let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

         Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
         ```

         An example real-world use case is implementing timeouts:

         ```javascript
         Promise.race([ajax('foo.json'), timeout(5000)])
         ```

         @method race
         @static
         @param {Array} promises array of promises to observe
         Useful for tooling.
         @return {Promise} a promise which settles in the same way as the first passed
         promise to settle.
         */
        function race(entries) {
          /*jshint validthis:true */
          var Constructor = this;

          if (!isArray(entries)) {
            return new Constructor(function (_, reject) {
              return reject(new TypeError('You must pass an array to race.'));
            });
          } else {
            return new Constructor(function (resolve, reject) {
              var length = entries.length;
              for (var i = 0; i < length; i++) {
                Constructor.resolve(entries[i]).then(resolve, reject);
              }
            });
          }
        }

        /**
         `Promise.reject` returns a promise rejected with the passed `reason`.
         It is shorthand for the following:

         ```javascript
         let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

         promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
         ```

         Instead of writing the above, your code now simply becomes the following:

         ```javascript
         let promise = Promise.reject(new Error('WHOOPS'));

         promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
         ```

         @method reject
         @static
         @param {Any} reason value that the returned promise will be rejected with.
         Useful for tooling.
         @return {Promise} a promise rejected with the given `reason`.
         */
        function reject$1(reason) {
          /*jshint validthis:true */
          var Constructor = this;
          var promise = new Constructor(noop);
          reject(promise, reason);
          return promise;
        }

        function needsResolver() {
          throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
        }

        function needsNew() {
          throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        }

        /**
         Promise objects represent the eventual result of an asynchronous operation. The
         primary way of interacting with a promise is through its `then` method, which
         registers callbacks to receive either a promise's eventual value or the reason
         why the promise cannot be fulfilled.

         Terminology
         -----------

         - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
         - `thenable` is an object or function that defines a `then` method.
         - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
         - `exception` is a value that is thrown using the throw statement.
         - `reason` is a value that indicates why a promise was rejected.
         - `settled` the final resting state of a promise, fulfilled or rejected.

         A promise can be in one of three states: pending, fulfilled, or rejected.

         Promises that are fulfilled have a fulfillment value and are in the fulfilled
         state.  Promises that are rejected have a rejection reason and are in the
         rejected state.  A fulfillment value is never a thenable.

         Promises can also be said to *resolve* a value.  If this value is also a
         promise, then the original promise's settled state will match the value's
         settled state.  So a promise that *resolves* a promise that rejects will
         itself reject, and a promise that *resolves* a promise that fulfills will
         itself fulfill.


         Basic Usage:
         ------------

         ```js
         let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

         promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
         ```

         Advanced Usage:
         ---------------

         Promises shine when abstracting away asynchronous interactions such as
         `XMLHttpRequest`s.

         ```js
         function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

         getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
         ```

         Unlike callbacks, promises are great composable primitives.

         ```js
         Promise.all([
         getJSON('/posts'),
         getJSON('/comments')
         ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
         ```

         @class Promise
         @param {Function} resolver
         Useful for tooling.
         @constructor
         */

        var Promise$1 = function () {
          function Promise(resolver) {
            this[PROMISE_ID] = nextId();
            this._result = this._state = undefined;
            this._subscribers = [];

            if (noop !== resolver) {
              typeof resolver !== 'function' && needsResolver();
              this instanceof Promise ? initializePromise(this, resolver) : needsNew();
            }
          }

          /**
           The primary way of interacting with a promise is through its `then` method,
           which registers callbacks to receive either a promise's eventual value or the
           reason why the promise cannot be fulfilled.
           ```js
           findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
           ```
           Chaining
           --------
           The return value of `then` is itself a promise.  This second, 'downstream'
           promise is resolved with the return value of the first promise's fulfillment
           or rejection handler, or rejected if the handler throws an exception.
           ```js
           findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
           findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
           ```
           If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
           ```js
           findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
           ```
           Assimilation
           ------------
           Sometimes the value you want to propagate to a downstream promise can only be
           retrieved asynchronously. This can be achieved by returning a promise in the
           fulfillment or rejection handler. The downstream promise will then be pending
           until the returned promise is settled. This is called *assimilation*.
           ```js
           findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
           ```
           If the assimliated promise rejects, then the downstream promise will also reject.
           ```js
           findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
           ```
           Simple Example
           --------------
           Synchronous Example
           ```javascript
           let result;
           try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
           ```
           Errback Example
           ```js
           findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
           ```
           Promise Example;
           ```javascript
           findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
           ```
           Advanced Example
           --------------
           Synchronous Example
           ```javascript
           let author, books;
           try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
           ```
           Errback Example
           ```js
           function foundBooks(books) {
   }
           function failure(reason) {
   }
           findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
           ```
           Promise Example;
           ```javascript
           findAuthor().
           then(findBooksByAuthor).
           then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
           ```
           @method then
           @param {Function} onFulfilled
           @param {Function} onRejected
           Useful for tooling.
           @return {Promise}
           */

          /**
           `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
           as the catch block of a try/catch statement.
           ```js
           function findAuthor(){
  throw new Error('couldn't find that author');
  }
           // synchronous
           try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
           // async with promises
           findAuthor().catch(function(reason){
  // something went wrong
  });
           ```
           @method catch
           @param {Function} onRejection
           Useful for tooling.
           @return {Promise}
           */


          Promise.prototype.catch = function _catch(onRejection) {
            return this.then(null, onRejection);
          };

          /**
           `finally` will be invoked regardless of the promise's fate just as native
           try/catch/finally behaves

           Synchronous example:

           ```js
           findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }

           try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
           ```

           Asynchronous example:

           ```js
           findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
           ```

           @method finally
           @param {Function} callback
           @return {Promise}
           */


          Promise.prototype.finally = function _finally(callback) {
            var promise = this;
            var constructor = promise.constructor;

            return promise.then(function (value) {
              return constructor.resolve(callback()).then(function () {
                return value;
              });
            }, function (reason) {
              return constructor.resolve(callback()).then(function () {
                throw reason;
              });
            });
          };

          return Promise;
        }();

        Promise$1.prototype.then = then;
        Promise$1.all = all;
        Promise$1.race = race;
        Promise$1.resolve = resolve$1;
        Promise$1.reject = reject$1;
        Promise$1._setScheduler = setScheduler;
        Promise$1._setAsap = setAsap;
        Promise$1._asap = asap;

        /*global self*/
        function polyfill() {
          var local = void 0;

          if (typeof global !== 'undefined') {
            local = global;
          } else if (typeof self !== 'undefined') {
            local = self;
          } else {
            try {
              local = Function('return this')();
            } catch (e) {
              throw new Error('polyfill failed because global object is unavailable in this environment');
            }
          }

          var P = local.Promise;

          if (P) {
            var promiseToString = null;
            try {
              promiseToString = Object.prototype.toString.call(P.resolve());
            } catch (e) {
              // silently ignored
            }

            if (promiseToString === '[object Promise]' && !P.cast) {
              return;
            }
          }

          local.Promise = Promise$1;
        }

// Strange compat..
        Promise$1.polyfill = polyfill;
        Promise$1.Promise = Promise$1;

        return Promise$1;

      })));





    }).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  },{"_process":15}],15:[function(require,module,exports){
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

  },{}]},{},[9]);
