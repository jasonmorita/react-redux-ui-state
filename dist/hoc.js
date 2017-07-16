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

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (config) {
    return function (WrappedComponent) {
        var uiStateName = (0, _.generateName)(config.name);
        var maps = (0, _.generateMaps)(uiStateName);

        var uiState = function (_Component) {
            _inherits(uiState, _Component);

            function uiState(props) {
                _classCallCheck(this, uiState);

                var _this = _possibleConstructorReturn(this, (uiState.__proto__ || Object.getPrototypeOf(uiState)).call(this, props));

                _this.state = config.state(_this.props);
                return _this;
            }

            // this is essentially a "run-once"


            _createClass(uiState, [{
                key: 'componentWillMount',
                value: function componentWillMount() {
                    this.props.add(this.state);
                }
            }, {
                key: 'render',
                value: function render() {
                    var _this2 = this;

                    var setUiState = function setUiState(state, cb) {
                        // we are using setState internally to take advantage of React
                        return _this2.setState(state, function () {
                            _this2.props.set(state);

                            // optional callback to match setState API
                            if (cb) {
                                cb();
                            }
                        });
                    };

                    // these get passed to the child as props
                    var uiStateProps = {
                        setUiState: setUiState,
                        setUIState: setUiState, // avoid case-sensitive typos
                        uiStateName: uiStateName // the generated name for this component's state slice
                    };

                    // wrapped component with its props, the state from HOC and uiStateProps
                    return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, uiStateProps));
                }
            }]);

            return uiState;
        }(_react.Component);

        uiState.propTypes = {
            add: _propTypes2.default.func.isRequired,
            set: _propTypes2.default.func.isRequired
        };

        // the HOC itself is wrapped in connect
        return (0, _reactRedux.connect)(maps.stateToProps, maps.dispatchToProps)(uiState);
    };
};