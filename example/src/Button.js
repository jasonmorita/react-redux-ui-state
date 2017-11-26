import React from "react";
import { uiState } from "react-redux-ui-state";

function Button({ setUiState, uiButtonFlag }) {
    return (
        <p>
            <button onClick={() => setUiState({ uiButtonFlag: !uiButtonFlag })}>
                Toggle `uiButtonFlag` ({uiButtonFlag.toString()})
            </button>
        </p>
    );
}

const uiStateConfig = {
    name: "Button",
    state: () => ({
        uiButtonFlag: true,
    }),
};

export default uiState(uiStateConfig)(Button);
