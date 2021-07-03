import { snakeCase } from './index';

describe('snakeCase', () => {
    it('key is converted to SnakeCase.', () => {
        const obj = snakeCase({
            abcDefGhiJkl: 1,
        });

        expect(obj).toEqual({
            abc_def_ghi_jkl: 1,
        });
    });

    it('Return the value type as is.', () => {
        const func = (x: number) => `${x}`;
        const obj = snakeCase({
            abCd: 1,
            efGh: 'a',
            ijKl: true,
            mnOp: [1, 2, 3],
            qrSt: func,
            uvWx: undefined,
        });

        expect(obj).toEqual({
            ab_cd: 1,
            ef_gh: 'a',
            ij_kl: true,
            mn_op: [1, 2, 3],
            qr_st: func,
            uv_wx: undefined,
        });
    });

    it('The object is converted recursively.', () => {
        const obj = snakeCase({
            abCd: {
                efGh: 1,
                ijKl: 'a',
            },
        });

        expect(obj).toEqual({
            ab_cd: {
                ef_gh: 1,
                ij_kl: 'a',
            },
        });
    });


    it('All arrays of objects will be converted.', () => {
        const obj = snakeCase({
            abCd: [
                {
                    abCd: 1,
                    ijKl: 'a',
                },
                {
                    abCd: 2,
                    ijKl: 'b',
                },
                {
                    abCd: 3,
                    ijKl: 'c',
                },
            ],
        });

        expect(obj).toEqual({
            ab_cd: [
                {
                    ab_cd: 1,
                    ij_kl: 'a',
                },
                {
                    ab_cd: 2,
                    ij_kl: 'b',
                },
                {
                    ab_cd: 3,
                    ij_kl: 'c',
                },
            ],
        });
    });

    it('All arrays will be converted even if the objects are different.', () => {
        const obj = snakeCase({
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
        });

        expect(obj).toEqual({
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
        });
    });
});