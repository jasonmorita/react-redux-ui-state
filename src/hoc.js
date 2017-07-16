import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateMaps, generateName } from './';

export default config => WrappedComponent => {
    const uiStateName = generateName(config.name);
    const maps = generateMaps(uiStateName);

    class uiState extends Component {
        constructor(props) {
            super(props);
            this.state = config.state(this.props);
        }

        // this is essentially a "run-once"
        componentWillMount() {
            this.props.add(this.state);
        }

        render() {
            const setUiState = (state, cb) => {
                // we are using setState internally to take advantage of React
                return this.setState(state, () => {
                    this.props.set(state);

                    // optional callback to match setState API
                    if (cb) {
                        cb();
                    }
                });
            };

            // these get passed to the child as props
            const uiStateProps = {
                setUiState,
                setUIState: setUiState, // avoid case-sensitive typos
                uiStateName, // the generated name for this component's state slice
            };

            // wrapped component with its props, the state from HOC and uiStateProps
            return <WrappedComponent {...{ ...this.props, ...this.state, ...uiStateProps }} />;
        }
    }

    uiState.propTypes = {
        add: PropTypes.func.isRequired,
        set: PropTypes.func.isRequired,
    };

    // the HOC itself is wrapped in connect
    return connect(maps.stateToProps, maps.dispatchToProps)(uiState);
};
