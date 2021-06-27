import { expectType } from 'tsd';

describe('SnakeToCamel', () => {
    it('lower-case.', () => {
        const key = {} as SnakeToCamel<'abc'>;

        expectType<'abc'>(key);
    });
    it('snake-case.', () => {
        const key = {} as SnakeToCamel<'abc_def'>;

        expectType<'abcDef'>(key);
    });
    it('snake-case of contains multiple `_`.', () => {
        const key = {} as SnakeToCamel<'abc_def_ghi'>;

        expectType<'abcDefGhi'>(key);
    });
});

describe('CamelCase', () => {
    it('key is converted to CamelCase.', () => {
        const obj = {} as CamelCase<{
            abc_def_ghi_jkl: 1,
        }>;

        expectType<{
            abcDefGhiJkl: number,
        }>(obj);
    });

    it('Return the value type as is.', () => {
        const obj = {} as CamelCase<{
            ab_cd: 1,
            ef_gh: 'a',
            ij_kl: true,
            mn_op: [1, 2, 3],
            qr_st: (x: number) => string,
            uv_wx: undefined,
        }>;

        expectType<{
            abCd: number,
            efGh: string,
            ijKl: boolean,
            mnOp: number[],
            qrSt: (x: number) => string,
            uvWx: undefined,
        }>(obj);
    });

    it('The object is converted recursively.', () => {
        const obj = {} as CamelCase<{
            ab_cd: {
                ab_cd: 1,
                ef_gh: 'a',
            },
        }>;

        expectType<{
            abCd: {
                abCd: 1,
                efGh: string,
            },
        }>(obj);
    });

    it('All arrays of objects will be converted.', () => {
        const obj = {} as CamelCase<{
            ab_cd: [
                {
                    ab_cd: 1,
                    ef_gh: 'a',
                },
                {
                    ab_cd: 2,
                    ef_gh: 'b',
                },
                {
                    ab_cd: 3,
                    ef_gh: 'c',
                },
            ],
        }>;

        expectType<{
            abCd: {
                abCd: number,
                efGh: string,
            }[],
        }>(obj);
    });

    it('All arrays will be converted even if the objects are different.', () => {
        const obj = {} as CamelCase<{
            ab_cd: [
                {
                    ab_cd: 1,
                    ef_gh: 'a',
                },
                {
                    ij_kl: 2,
                    mn_op: 'b',
                },
                {
                    qr_st: 3,
                    uv_wx: 'c',
                },
            ],
        }>;

        expectType<{
            abCd: ({
                abCd: number,
                efGh: string,
            } | {
                ijKl: number,
                mnOp: string,
            } | {
                qrSt: number,
                uvWx: string,
            })[],
        }>(obj);
    });
});