/**
 * @jest-environment jsdom
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import {uiState} from '../';

configure({adapter: new Adapter()});

describe('uiState hoc', () => {
    function _TestComponent({display, setUiState}) {
        return (
            <div>
                <span>Display: {display.toString()}</span>{' '}
                <button
                    data-testid="flip"
                    onClick={() => setUiState({display: true})}
                >
                    Flip the script
                </button>
            </div>
        );
    }

    _TestComponent.propTypes = {
        display: PropTypes.bool,
        setUiState: PropTypes.func
    };

    const uiStateConfig = {
        name: 'test-component',
        state: () => ({
            display: false
        })
    };

    const testComponent = uiState(uiStateConfig)(_TestComponent);

    it('should do render without exploding', () => {
        const component = (
            <Provider store={createStore(uiState)}>
                <testComponent />
            </Provider>
        );

        const renderedComponent = mount(component);
        const tree = toJson(renderedComponent);

        expect(tree).toMatchSnapshot();
    });
});
