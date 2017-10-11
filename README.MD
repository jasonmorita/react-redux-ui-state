# react-redux-ui-state
React higher order component to provide UI state for components.

## Problems this is trying reduce
- Reduce the need to reach for `setState` to save time for simple flags
- Reduce reducer boilerplate for properties like UI flags
- Reduce tediousness of instances of the same component needing the same flags

## How it works
- Create a config object with an optional name property and a function (which gets passed props) which returns a state object consisting of your initial state.
- Wrap your component in the HOC.
- An action gets dispatched like `UI_STATE_ADD:some-component_<uuid>` on `componentWillMount`
- The initial state gets added to a `uiState` slice of the store with the name/state.
- Call `setUiState` with a new state object.
- An action gets dispatched like `UI_STATE_SET:some-component_<uuid>`
- Component state gets removed from store on `componentWillUnmount`

In the event that `persist: true` is supplied to the config options, the name of the component's key within `uiState` will match the `name` param.

`setUiState`: Simple update function that accepts an object that will be shallow merged with current state. Accepts an optional callback called with the state change.

`resetUiState`: Function to reset component to initial state. Accepts an optional callback called with the initial state.

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
    resetUiState,
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

        <button
            onClick={() =>
                resetUiState(resetState => console.log(resetState))}
        >
            reset state
        </button>
    );
}

const uiStateConfig = {
    name: 'some-component',
    persist: true, // optional
    state: (props) => ({
        someUiFlag: false,
        somePassedThing: props.x ? props.x : null;
    }),
};

export default uiState(uiStateConfig)(someComponent);
```

This is a work in progress. There could well be performance issues when used "at scale". Feel free to open a PR.
