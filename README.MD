# react-redux-ui-state
React higher order component to provide UI state for components.

## Problems this is trying reduce
- Reduce the need to reach for `setState` to save time for simple flags
- Reduce reducer boilerplate for properties like UI flags
- Reduce tediousness of instances of the same component needing the same flags

## How it works
- Create a config object with an optional name property and a function (which gets passed props) which returns a state object consisting of your initial state.
- Wrap your component in the HOC.
- An action gets dispatched like `UI_STATE_ADD:some-component_<uuid>`
- The initial state gets added to a `uiState` slice of the store with the name/state.
- Call `setUiState` with a new state object.
- An action gets dispatched like `UI_STATE_SET:some-component_<uuid>`

Simple update function, same as React's `setState`.

`setUiState` accepts an optional callback called with the updated state.

Simple to use:

```javascript
// rootReducer.js
import { combineReducers } from 'redux';
import { uiStateReducer } from 'react-redux-ui-state';

export default function createRootReducer (reducers) {
    return combineReducers({
        ...reducers,
        uiState: uiStateReducer,
    });
}

// someComponent.js
import React from 'react';
import { uiState } from 'react-redux-ui-state';

export function someComponent ({
    someUiFlag,
    somePassedThing,
    setUiState,
    uiStateName,
}) {
    return (
        <button onClick={() => setUiState({
                    someUiFlag: !someUiFlag
                },
                updatedState => console.log(updatedState),
            )}>
            Toggle flag for {uiStateName}
        </button>
    );
}

const uiStateConfig = {
    name: 'some-component',
    state: (props) => ({
        someUiFlag: false,
        somePassedThing: props.x ? props.x : null;
    }),
};

export default uiState(uiStateConfig)(someComponent);
```

This is a work in progress. There could well be performance issues when used "at scale". Feel free to open a PR.
