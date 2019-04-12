import { withFormData } from '~/index';

describe('withFormData', () => {
    it('exists', () => {
        expect(withFormData).toBeTruthy();
    });

    it('is a function', () => {
        expect(withFormData).toEqual(expect.any(Function));
    });

    describe('when called', () => {
        it('it returns an object with a data function', () => {
            const mixin = withFormData();

            expect(mixin).toEqual({
                data: expect.any(Function),
            });

            expect(mixin.data()).toEqual({
                formData: {},
            });
        });

        describe('mixin data', () => {
            it('returns a form data with empty object when no arguments', () => {
                const mixin = withFormData();

                expect(mixin.data()).toEqual({
                    formData: {},
                });
            });

            it('returns a form data with filled object when defaults supplied', () => {
                const mixin = withFormData({
                    defaults: {
                        foo: 'bar',
                    },
                });

                expect(mixin.data()).toEqual({
                    formData: {
                        foo: 'bar',
                    },
                });
            });

            it('throws an error when defaults is not an object', () => {
                expect(() => {
                    withFormData({
                        defaults: 'foo',
                    });
                }).toThrow(new Error('Option `defaults` must be an object'));
            });

            it('returns a different formData key when formData passed', () => {
                const mixin = withFormData({ formData: 'foobar' });

                expect(mixin.data()).toEqual({
                    foobar: {},
                });
            });

            it('throws an error when formData is not a string', () => {
                expect(() => {
                    withFormData({
                        formData: 12,
                    });
                }).toThrow(new Error('Option `formData` must be a string'));
            });
        });
    });
});
