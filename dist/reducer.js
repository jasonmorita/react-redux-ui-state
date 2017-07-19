'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// this reducer handles all state changes for the uiState slice
function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    // add initial state
    if (action.type === (0, _.generateType)(_.types.add, (0, _get2.default)(action, 'payload.name'))) {
        return _extends({}, state, _defineProperty({}, action.payload.name, action.payload.state));
    }

    // delete state
    if (action.type === (0, _.generateType)(_.types.delete, (0, _get2.default)(action, 'payload.name'))) {
        var tempState = _extends({}, state);
        delete tempState[action.payload.name];
        return tempState;
    }

    // reset to initial state
    if (action.type === (0, _.generateType)(_.types.reset, (0, _get2.default)(action, 'payload.name'))) {
        return _extends({}, state, _defineProperty({}, action.payload.name, action.payload.state));
    }

    // shallow merge for state updates
    if (action.type === (0, _.generateType)(_.types.set, (0, _get2.default)(action, 'payload.name'))) {
        return (0, _immutabilityHelper2.default)(state,
        // if store not created with combinedReducers, assume state is top-level
        state[action.payload.name] ? _defineProperty({}, action.payload.name, { $merge: action.payload.state }) : { $merge: action.payload.state });
    }

    return state;
}