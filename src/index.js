import uuidv4 from 'uuid/v4';

export uiStateReducer from './reducer';
export uiState from './hoc';

export const types = {
    add: 'UI_STATE_ADD',
    set: 'UI_STATE_SET',
};

export function generateName(name = '') {
    return `${name || 'component'}_${uuidv4()}`;
}

export function generateType(type, name) {
    return `${type}:${name}`;
}

// these are set as props on the HOC
export function generateMaps(name) {
    return {
        dispatchToProps(dispatch) {
            return {
                add(state = {}) {
                    return dispatch({
                        type: generateType(types.add, name),
                        payload: {
                            name,
                            state,
                        },
                    });
                },
                set(state = {}) {
                    return dispatch({
                        type: generateType(types.set, name),
                        payload: {
                            name,
                            state,
                        },
                    });
                },
            };
        },
        stateToProps(state) {
            return {
                state: state.uiState,
            };
        },
    };
}
