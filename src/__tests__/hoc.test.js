import 'jsdom-global/register';
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { uiState } from '../';

configure({ adapter: new Adapter() });

describe('uiState hoc', () => {
    function testComponent({ display }) {
        console.log('testComponent'); // eslint-disable-line
        return (
            <div>
                Display: {display.toString()}
            </div>
        );
    }

    testComponent.propTypes = {
        display: PropTypes.bool,
    };

    const uiStateConfig = {
        name: 'test-component',
        state: () => ({
            display: false,
        }),
    };

    it('should do render without exploding', () => {
        const component = (
            <Provider store={createStore(uiState)}>
                <wrapped-test-component />
            </Provider>
        );

        const wrappedTestComponent = uiState(uiStateConfig)(testComponent);
        const renderedComponent = mount(component);
        const tree = toJson(renderedComponent);

        expect(tree).toMatchSnapshot();
        expect(wrappedTestComponent).toMatchSnapshot();
    });
});
