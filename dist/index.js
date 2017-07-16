'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.types = exports.uiState = exports.uiStateReducer = undefined;
exports.generateName = generateName;
exports.generateType = generateType;
exports.generateMaps = generateMaps;

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _hoc = require('./hoc');

var _hoc2 = _interopRequireDefault(_hoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.uiStateReducer = _reducer2.default;
exports.uiState = _hoc2.default;
var types = exports.types = {
    add: 'UI_STATE_ADD',
    set: 'UI_STATE_SET'
};

function generateName() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    return (name || 'component') + '_' + (0, _v2.default)();
}

function generateType(type, name) {
    return type + ':' + name;
}

// these are set as props on the HOC
function generateMaps(name) {
    return {
        dispatchToProps: function dispatchToProps(dispatch) {
            return {
                add: function add() {
                    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    return dispatch({
                        type: generateType(types.add, name),
                        payload: {
                            name: name,
                            state: state
                        }
                    });
                },
                set: function set() {
                    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    return dispatch({
                        type: generateType(types.set, name),
                        payload: {
                            name: name,
                            state: state
                        }
                    });
                }
            };
        },
        stateToProps: function stateToProps(state) {
            return {
                state: state.uiState
            };
        }
    };
}