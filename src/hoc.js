import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dispatchToProps, generateName, generateSetUiState, stateToProps } from './';

export default config => WrappedComponent => {
    class uiState extends Component {
        constructor(props) {
            super(props);
            this.uiStateName = generateName(config.name);
            this.initState = config.state(this.props);
        }

        componentWillMount() {
            this.props.add(this.initState, this.uiStateName);
        }

        componentWillUnmount() {
            this.props.delete(this.uiStateName);
        }

        render() {
            const setUiState = generateSetUiState(this.props.set, this.uiStateName);
            const uiStateProps = {
                setUiState,
                setUIState: setUiState, // avoid case-sensitive typos
                uiStateName: this.uiStateName, // name of component's state slice
            };

            // wrapped component with its props, the state from HOC and uiStateProps
            return (
                <WrappedComponent
                    {...{
                        ...this.props,
                        ...(this.props.uiState[this.uiStateName] || this.initState),
                        ...uiStateProps,
                    }}
                />
            );
        }
    }

    uiState.propTypes = {
        add: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired,
        set: PropTypes.func.isRequired,
        uiState: PropTypes.object.isRequired,
    };

    // the HOC itself is wrapped in connect
    return connect(stateToProps, dispatchToProps)(uiState);
};
