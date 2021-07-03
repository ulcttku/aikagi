import { expectType } from 'tsd';

describe('CamelToSnake', () => {
    it('lower-case.', () => {
        const key = {} as CamelToSnake<'abc'>;

        expectType<'abc'>(key);
    });
    it('camel-case.', () => {
        const key = {} as CamelToSnake<'abcDef'>;

        expectType<'abc_def'>(key);
    });
    it('camel-case of contains multiple Capitals.', () => {
        const key = {} as CamelToSnake<'abcDefGhi'>;

        expectType<'abc_def_ghi'>(key);
    });
});

describe('SnakeCase', () => {
    it('key is converted to SnakeCase.', () => {
        const obj = {} as SnakeCase<{
            abcDefGhiJkl: 1,
        }>;

        expectType<{
            abc_def_ghi_jkl: number,
        }>(obj);
    });

    it('Return the value type as is.', () => {
        const obj = {} as SnakeCase<{
            abCd: 1,
            efGh: 'a',
            ijKl: true,
            mnOp: [1, 2, 3],
            qrSt: (x: number) => string,
            uvWx: undefined,
        }>;

        expectType<{
            ab_cd: number,
            ef_gh: string,
            ij_kl: boolean,
            mn_op: number[],
            qr_st: (x: number) => string,
            uv_wx: undefined,
        }>(obj);
    });

    it('The object is converted recursively.', () => {
        const obj = {} as SnakeCase<{
            abCd: {
                abCd: 1,
                efGh: 'a',
            },
        }>;

        expectType<{
            ab_cd: {
                ab_cd: 1,
                ef_gh: string,
            },
        }>(obj);
    });

    it('All arrays of objects will be converted.', () => {
        const obj = {} as SnakeCase<{
            abCd: [
                {
                    abCd: 1,
                    efGh: 'a',
                },
                {
                    abCd: 2,
                    efGh: 'b',
                },
                {
                    abCd: 3,
                    efGh: 'c',
                },
            ],
        }>;

        expectType<{
            ab_cd: {
                ab_cd: number,
                ef_gh: string,
            }[],
        }>(obj);
    });

    it('All arrays will be converted even if the objects are different.', () => {
        const obj = {} as SnakeCase<{
            abCd: [
                {
                    abCd: 1,
                    efGh: 'a',
                },
                {
                    ijKl: 2,
                    mnOp: 'b',
                },
                {
                    qrSt: 3,
                    uvWx: 'c',
                },
            ],
        }>;

        expectType<{
            ab_cd: ({
                ab_cd: number,
                ef_gh: string,
            } | {
                ij_kl: number,
                mn_op: string,
            } | {
                qr_st: number,
                uv_wx: string,
            })[],
        }>(obj);
    });
});