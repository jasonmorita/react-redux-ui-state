import identity from 'lodash/identity';
import { generateMaps, generateName, generateType, types } from '../';

jest.mock('uuid/v4', () => () => '110ec58a-a0f2-4ac4-8393-c866d813b8d1');

describe('ui state lib utils', () => {
    const name = generateName('action-test-component');
    const maps = generateMaps(name);

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
        expect(maps.dispatchToProps).toMatchSnapshot();
        expect(maps.stateToProps).toMatchSnapshot();
    });

    it('should dispatch the add action', () => {
        const mockDispatch = jest.fn(identity);
        const dispatchToProps = maps.dispatchToProps(mockDispatch);
        const add = dispatchToProps.add({ val1: true, val2: false });

        expect(add).toMatchSnapshot();
        expect(mockDispatch.mock.calls.length).toBe(1);
    });

    it('should dispatch the set action', () => {
        const mockDispatch = jest.fn(identity);
        const dispatchToProps = maps.dispatchToProps(mockDispatch);
        const add = dispatchToProps.set({ val1: false, val2: true });

        expect(add).toMatchSnapshot();
        expect(mockDispatch.mock.calls.length).toBe(1);
    });
});
