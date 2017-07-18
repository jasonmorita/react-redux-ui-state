import identity from 'lodash/identity';
import { dispatchToProps, generateName, generateType, stateToProps, types } from '../';

jest.mock('uuid/v4', () => () => '110ec58a-a0f2-4ac4-8393-c866d813b8d1');

describe('ui state lib utils', () => {
    const name = generateName('action-test-component');

    it('should make a consistent name', () => {
        expect(generateName('test-component-name')).toMatchSnapshot();
        expect(generateName()).toMatchSnapshot();
    });

    it('should keep consistent types', () => {
        expect(types).toMatchSnapshot();
    });

    it('should create correct types', () => {
        expect(generateType(types.add, name)).toMatchSnapshot();
        expect(generateType(types.set, name)).toMatchSnapshot();
    });

    it('should create a maps object', () => {
        expect(dispatchToProps).toMatchSnapshot();
        expect(stateToProps).toMatchSnapshot();
    });

    it('should dispatch the add action', () => {
        const mockDispatch = jest.fn(identity);
        const dispatch = dispatchToProps(mockDispatch);
        const add = dispatch.add({ val1: true, val2: false }, name);

        expect(add).toMatchSnapshot();
        expect(mockDispatch.mock.calls.length).toBe(1);
    });

    it('should dispatch the delete action', () => {
        const mockDispatch = jest.fn(identity);
        const dispatch = dispatchToProps(mockDispatch);
        const destroy = dispatch.delete(name);

        expect(destroy).toMatchSnapshot();
        expect(mockDispatch.mock.calls.length).toBe(1);
    });

    it('should dispatch the set action', () => {
        const mockDispatch = jest.fn(identity);
        const dispatch = dispatchToProps(mockDispatch);
        const add = dispatch.set({ val1: false, val2: true }, name);

        expect(add).toMatchSnapshot();
        expect(mockDispatch.mock.calls.length).toBe(1);
    });
});
