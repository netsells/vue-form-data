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
            it('sets the default computed property names', () => {
                const { computed } = withFormInput();

                expect(computed).toEqual({
                    model: computedProperty,
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

            let wrapper;

            describe('when mounted with deep id', () => {
                beforeEach(() => {
                    wrapper = mount(component, {
                        propsData: {
                            value: {
                                foo: {
                                    bar: [
                                        { test: 'wham' },
                                    ],
                                },
                                a: 1,
                            },
                            id: 'foo.bar[0].test',
                        },
                    });
                });

                it('can render the model based on the components id', () => {
                    expect(wrapper.find('.model').text()).toBe('wham');
                });

                describe('when setting the model', () => {
                    beforeEach(() => {
                        wrapper.vm.model = 'changed';
                    });

                    it('emits the form data value', () => {
                        expect(wrapper.emitted().input[0]).toEqual([{
                            foo: {
                                bar: [
                                    { test: 'changed' },
                                ],
                            },
                            a: 1,
                        }]);
                    });
                });
            });

            describe('when mounted', () => {
                beforeEach(() => {
                    wrapper = mount(component, {
                        propsData: {
                            value: { foo: 'bar', a: 1 },
                            id: 'foo',
                        },
                    });
                });

                it('can render the model based on the components id', () => {
                    expect(wrapper.find('.model').text()).toBe('bar');
                });

                it('can render the entire formData', () => {
                    expect(wrapper.find('.formData').text())
                        .toBe(JSON.stringify({ foo: 'bar', 'a': 1 }, null, 2));
                });

                describe('when setting the model', () => {
                    beforeEach(() => {
                        wrapper.vm.model = 'changed';
                    });

                    it('emits the form data value', () => {
                        expect(wrapper.emitted().input[0]).toEqual([{
                            foo: 'changed',
                            a: 1,
                        }]);
                    });
                });

                describe('when setting the formData', () => {
                    beforeEach(() => {
                        wrapper.vm.formData = { foo: 'bam' };
                    });

                    it('emits the form data value', () => {
                        expect(wrapper.emitted().input[0]).toEqual([{
                            foo: 'bam',
                        }]);
                    });
                });
            });
        });
    });
});
