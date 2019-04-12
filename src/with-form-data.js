export default ({
    formData = 'formData',
    defaults = {},
} = {}) => {
    if (typeof defaults !== 'object') {
        throw new Error('Option `defaults` must be an object');
    }

    if (typeof formData !== 'string') {
        throw new Error('Option `formData` must be a string');
    }

    return {
        data() {
            return {
                [formData]: defaults,
            };
        },
    };
};
