import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import {
    dispatchToProps,
    generateName,
    generateResetUiState,
    generateSetUiState,
    stateToProps
} from './';

export default config => WrappedComponent => {
    class uiState extends Component {
        constructor(props) {
            super(props);
            this.uiStateName =
                typeof config.name === 'function'
                    ? config.name(props)
                    : generateName(config.name);
            this.initState = config.state(this.props);
            this.config = config;
        }

        componentWillMount() {
            if (!this.config.persist || !this.props.uiState[this.uiStateName]) {
                this.props.add(this.initState, this.uiStateName);
            }
        }

        componentWillUnmount() {
            if (!this.config.persist) {
                this.props.delete(this.uiStateName);
            }
        }

        shouldComponentUpdate(nextProps) {
            // First be sure that the uiState slice is not equal
            let currentState = this.props.uiState[this.uiStateName];
            let nextState = nextProps.uiState[this.uiStateName];

            if (!isEqual(currentState, nextState)) {
                return true;
            }

            // If uiState slice is equal, check the rest of the props
            currentState = omit(this.props, ['uiState']);
            nextState = omit(nextProps, ['uiState']);

            return !isEqual(currentState, nextState);
        }

        render() {
            const resetUiState = generateResetUiState(
                this.props.reset,
                this.uiStateName,
                this.initState
            );
            const setUiState = generateSetUiState(
                this.props.set,
                this.uiStateName
            );
            const uiStateProps = {
                resetUiState,
                resetUIState: resetUiState, // avoid case-sensitive typos
                setUiState,
                setUIState: setUiState, // avoid case-sensitive typos
                uiStateName: this.uiStateName // name of component's state slice
            };

            // wrapped component with its props, the state from HOC and uiStateProps
            return (
                <WrappedComponent
                    {...{
                        ...this.props,
                        ...(this.props.uiState[this.uiStateName] ||
                            this.initState),
                        ...uiStateProps
                    }}
                />
            );
        }
    }

    uiState.propTypes = {
        add: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        set: PropTypes.func.isRequired,
        uiState: PropTypes.object.isRequired
    };

    // the HOC itself is wrapped in connect
    return connect(stateToProps, dispatchToProps)(uiState);
};
