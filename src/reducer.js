import get from 'lodash/get';
import update from 'immutability-helper';
import { types, generateType } from './';

// this reducer handles all state changes for the uiState slice
export default function reducer(state = {}, action) {
    // add initial state
    if (action.type === generateType(types.add, get(action, 'payload.name'))) {
        return { ...state, [action.payload.name]: action.payload.state };
    }

    // shallow merge for state updates
    if (action.type === generateType(types.set, get(action, 'payload.name'))) {
        return update(
            state,
            // if store not created with combinedReducers, assume state is top-level
            state[action.payload.name]
                ? {
                    [action.payload.name]: { $merge: action.payload.state },
                }
                : { $merge: action.payload.state },
        );
    }

    return state;
}
