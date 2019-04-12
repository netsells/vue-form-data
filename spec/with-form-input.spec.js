import { withFormInput } from '~/index';

describe('withFormInput', () => {
    it('exists', () => {
        expect(withFormInput).toBeTruthy();
    });

    it('is a function', () => {
        expect(withFormInput).toEqual(expect.any(Function));
    });

    describe('when called', () => {
        it('it returns a mixin', () => {
            const mixin = withFormInput();

            expect(mixin).toEqual({
                mixins: expect.any(Array),
                props: expect.any(Object),
                computed: expect.any(Object),
            });
        });
    });
});
