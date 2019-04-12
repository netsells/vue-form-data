import { mount } from '@vue/test-utils';

import { withFormInput } from '~/index';

const computedProperty = Object.freeze({
    get: expect.any(Function),
    set: expect.any(Function),
});

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

        describe('props', () => {
            it('sets the default props', () => {
                const { props } = withFormInput();

                expect(props).toEqual({
                    id: {
                        type: String,
                        required: true,
                    },

                    value: {
                        type: Object,
                        required: true,
                    },
                });
            });

            it('sets the props values when overridden', () => {
                const { props } = withFormInput({
                    id: 'name',
                    value: 'data',
                });

                expect(props).toEqual({
                    name: {
                        type: String,
                        required: true,
                    },

                    data: {
                        type: Object,
                        required: true,
                    },
                });
            });
        });

        describe('computed', () => {
            fit('sets the default computed property names', () => {
                const { computed } = withFormInput();

                expect(computed).toEqual({
                    model: computedProperty,
                    // formData: computedProperty,
                });
            });
        });

        describe('when mixin used in a component', () => {
            const component = {
                template: `
                    <div>
                        <span class="model">{{ model }}</span>
                        <span class="formData">{{ formData }}</span>
                    </div>
                `,

                mixins: [withFormInput()],
            };

            describe('when mounted', () => {
                let wrapper;

                beforeEach(() => {
                    wrapper = mount(component, {
                        propsData: {
                            value: { foo: 'bar', 'a': 1 },
                            id: 'foo',
                        },
                    });
                });

                it('can render the model based on the components id', () => {
                    expect(wrapper.find('.model').text()).toBe('foo');
                });

                // it('can render the entire formData', () => {
                //     expect(wrapper.find('.formData').text()).toBe(JSON.stringify({ foo: 'bar', 'a': 1 }));
                // });
            });
        });
    });
});
