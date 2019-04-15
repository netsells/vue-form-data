import { getIn, setIn } from 'lodash-redux-immutability';
import withPropProxy from '@netsells/vue-with-prop-proxy';

export default ({
    value = 'value',
    formData = 'formData',
    model = 'model',
    id = 'id',
} = {}) => ({
    props: {
        [id]: {
            type: String,
            required: true,
        },

        [value]: {
            type: Object,
            required: true,
        },
    },

    mixins: [
        withPropProxy({
            prop: value,
            via: formData,
        }),
    ],

    computed: {
        [model]: {
            /**
             * Get the model value based on the formData object and this inputs
             * ID
             *
             * @returns {any}
             */
            get() {
                return getIn(this[formData], this[id]);
            },

            /**
             * Set the model value by updating the formData object
             *
             * @param {any} value
             */
            set(value) {
                this[formData] = setIn(this[formData], this[id], value);
            },
        },
    },
});
