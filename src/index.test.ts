import * as aikagi from './index';

describe('camelCase', () => {
    it('Work fine.', () => {
        const obj = aikagi.camelCase({
            abc_def: 1
        });

        expect(obj).toEqual({
            abcDef: 1,
        });
    });
});

describe('snakeCase', () => {
    it('Work fine.', () => {
        const obj = aikagi.snakeCase({
            abcDef: 1,
        });

        expect(obj).toEqual({
            abc_def: 1,
        });
    });
});