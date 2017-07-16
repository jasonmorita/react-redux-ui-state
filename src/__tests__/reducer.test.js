import { generateName, uiStateReducer } from '../';

jest.mock('uuid/v4', () => () => '110ec58a-a0f2-4ac4-8393-c866d813b8d1');

describe('uiStateReducer', () => {
    const name = generateName('action-test-component');
    const initialState = {
        [name]: {},
    };

    it('should add component intitial state', () => {
        const addAction = {
            payload: {
                name,
                state: {
                    val1: false,
                    val2: true,
                },
            },
            type: `UI_STATE_ADD:${name}`,
        };

        const state = uiStateReducer(initialState, addAction);

        expect(state).toMatchSnapshot();
    });

    it('should update component state', () => {
        const setAction = {
            payload: {
                name,
                state: {
                    val1: true,
                    val2: false,
                    val3: 'what',
                },
            },
            type: `UI_STATE_SET:${name}`,
        };

        const state = uiStateReducer({}, setAction);

        expect(state).toMatchSnapshot();
    });
});
