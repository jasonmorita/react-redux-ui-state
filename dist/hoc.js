'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (config) {
    return function (WrappedComponent) {
        var uiState = function (_Component) {
            _inherits(uiState, _Component);

            function uiState(props) {
                _classCallCheck(this, uiState);

                var _this = _possibleConstructorReturn(this, (uiState.__proto__ || Object.getPrototypeOf(uiState)).call(this, props));

                _this.uiStateName = typeof config.name === 'function' ? config.name(props) : (0, _.generateName)(config.name);
                _this.initState = config.state(_this.props);
                _this.config = config;
                return _this;
            }

            _createClass(uiState, [{
                key: 'componentWillMount',
                value: function componentWillMount() {
                    if (!this.config.persist || !this.props.uiState[this.uiStateName]) {
                        this.props.add(this.initState, this.uiStateName);
                    }
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    if (!this.config.persist) {
                        this.props.delete(this.uiStateName);
                    }
                }
            }, {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    var currentState = this.props.uiState[this.uiStateName];
                    var nextState = nextProps.uiState[this.uiStateName];

                    if (!(0, _isEqual2.default)(currentState, nextState)) {
                        return true;
                    }

                    currentState = (0, _omit2.default)(this.props, ['uiState']);
                    nextState = (0, _omit2.default)(nextProps, ['uiState']);

                    return !(0, _isEqual2.default)(currentState, nextState);
                }
            }, {
                key: 'render',
                value: function render() {
                    console.log('rerender::::', this.uiStateName);
                    var resetUiState = (0, _.generateResetUiState)(this.props.reset, this.uiStateName, this.initState);
                    var setUiState = (0, _.generateSetUiState)(this.props.set, this.uiStateName);
                    var uiStateProps = {
                        resetUiState: resetUiState,
                        resetUIState: resetUiState, // avoid case-sensitive typos
                        setUiState: setUiState,
                        setUIState: setUiState, // avoid case-sensitive typos
                        uiStateName: this.uiStateName // name of component's state slice
                    };

                    // wrapped component with its props, the state from HOC and uiStateProps
                    return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.props.uiState[this.uiStateName] || this.initState, uiStateProps));
                }
            }]);

            return uiState;
        }(_react.Component);

        uiState.propTypes = {
            add: _propTypes2.default.func.isRequired,
            delete: _propTypes2.default.func.isRequired,
            reset: _propTypes2.default.func.isRequired,
            set: _propTypes2.default.func.isRequired,
            uiState: _propTypes2.default.object.isRequired
        };

        // the HOC itself is wrapped in connect
        return (0, _reactRedux.connect)(_.stateToProps, _.dispatchToProps)(uiState);
    };
};