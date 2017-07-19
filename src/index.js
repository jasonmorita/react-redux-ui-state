import uuidv4 from 'uuid/v4';

export uiStateReducer from './reducer';
export uiState from './hoc';

export const types = {
    add: 'UI_STATE_ADD',
    delete: 'UI_STATE_DELETE',
    reset: 'UI_STATE_RESET',
    set: 'UI_STATE_SET',
};

export function generateName(name = '') {
    return `${name || 'component'}_${uuidv4()}`;
}

export function generateType(type, name) {
    return `${type}:${name}`;
}

export function generateResetUiState(reset, name, state) {
    return function resetUiState(cb) {
        const resetState = reset(state, name);

        // optional callback
        if (cb) {
            return cb(resetState.payload.state);
        }

        return resetState.payload.state;
    };
}

export function generateSetUiState(set, name) {
    return function setUiState(state, cb) {
        const updatedState = set(state, name);

        // optional callback to match setState API
        if (cb) {
            return cb(updatedState.payload.state);
        }

        return updatedState.payload.state;
    };
}

// these are set as props on the HOC
export function dispatchToProps(dispatch) {
    return {
        add(state = {}, name) {
            return dispatch({
                type: generateType(types.add, name),
                payload: {
                    name,
                    state,
                },
            });
        },
        delete(name) {
            return dispatch({
                type: generateType(types.delete, name),
                payload: {
                    name,
                },
            });
        },
        reset(state = {}, name) {
            return dispatch({
                type: generateType(types.reset, name),
                payload: {
                    name,
                    state,
                },
            });
        },
        set(state = {}, name) {
            return dispatch({
                type: generateType(types.set, name),
                payload: {
                    name,
                    state,
                },
            });
        },
    };
}

export function stateToProps(state) {
    return {
        uiState: state.uiState,
    };
}
