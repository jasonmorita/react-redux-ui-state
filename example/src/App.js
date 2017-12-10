import React from 'react';
import { uiState } from 'react-redux-ui-state';
import logo from './logo.svg';
import './App.css';
import Button from './Button';
import Text from './Text';

function App({ setUiState, uiAppFlag }) {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
                <button onClick={() => setUiState({ uiAppFlag: !uiAppFlag })}>
                    Toggle `uiAppFlag` ( {uiAppFlag.toString()})
                </button>
            </p>
            <Button />
            <Button />
            <Text />
            <Text />
        </div>
    );
}

const uiStateConfig = {
    name: 'AppMain',
    state: () => ({
        uiAppFlag: true,
    }),
};

export default uiState(uiStateConfig)(App);
