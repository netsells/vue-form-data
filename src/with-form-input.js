import withPropProxy, { getPropEmitName } from '@netsells/vue-with-prop-proxy';

export default ({
    value = 'value',
    formData = 'formData',
    model = 'model',
    id = 'id',
} = {}) => ({
    mixins: [
        withPropProxy({
            name: value,
            via: formData,
        }),
    ],

    props: {
        [id]: {
            type: String,
            required: true,
        },
    },

    computed: {
        [model]: {
            get() {
                return (this[formData] || {})[model];
            },

            set(value) {
                this.$emit(getPropEmitName(value), {
                    ...(this[formData] || {}),
                    [this[id]]: value,
                });
            },
        },
    },
});
