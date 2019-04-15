[![npm version](https://badge.fury.io/js/%40netsells%2Fvue-form-data.svg)](https://badge.fury.io/js/%40netsells%2Fvue-form-data)
[![Build Status](https://travis-ci.org/netsells/vue-form-data.svg?branch=master)](https://travis-ci.org/netsells/vue-form-data)
[![codecov](https://codecov.io/gh/netsells/vue-form-data/branch/master/graph/badge.svg)](https://codecov.io/gh/netsells/vue-form-data)
[![Mutation testing badge](https://badge.stryker-mutator.io/github.com/netsells/vue-form-data/master)](https://stryker-mutator.github.io)

# Vue Form Data

Mixins to handle form data in a form and input components for you. This package
makes it much easier to treat a form as a single object, and allows custom input
components access to other form fields.

## Installation

```yarn add @netsells/vue-form-data```

## Usage

This package exposes 2 mixins: `withFormData` and `withFormInput`. Both are
functions which return a mixin object, and can be passed options.

### withFormData

This is a basic mixin which creates a formData state.

```javascript
import { withFormData } from '@netsells/vue-form-data';

{
    mixins: [
        withFormData()
    ],

    mounted() {
        console.log('Form data:', this.formData); // {}
    },
}
```

Options you can pass are:

- `formData` - change the formData name
- `defaults` - change the default formData

```javascript
import { withFormData } from '@netsells/vue-form-data';

{
    mixins: [
        withFormData({
            formData: 'data',
            defaults: { foo: 'bar' },
        })
    ],

    mounted() {
        console.log('Form data:', this.data); // { foo: 'bar' }
    },
}
```

### withFormInput

This mixin adds the required props `value` and `id`. `value` must be set to the
`formData` from the form using `v-model`. `id` is the name of the field in the
`formData`, and optionally can be used for the id attribute on the input
element.

It also adds a `model` and `formData` computed property. These handle the emit
events for you. Changing `model` will update the value of the matching key in
`formData`. Changing `formData` will change the entire object, and is useful for
child inputs.

```html
<template>
    <label>
      {{ label }}

      <input :id="id" v-model="model" />
    </label>
</template>
```

```javascript
import { withFormInput } from '@netsells/vue-form-data';

export default {
    mixins: [
        withFormInput(),
    ],

    props: ['label'],
}
```

`withFormInput` can also take options to change the names of props and computed
properties.

- `id` - set the name of the prop used to key the field in `formData`
- `value` - set the name of the prop used for the formData
  - If not set to `value`, you will need to use the sync modifier instead of `v-model`: `:myprop.sync="formData"`
- `formData` - set the name of the `formData` computed property
- `model` - set the name of the `model` computed property
