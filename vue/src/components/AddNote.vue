<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group label="Title:"
                    label-for="titleInput">
        <b-form-input id="titleInput"
                      type="text"
                      v-model="form.title"
                      required
                      placeholder="Title email">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Content:"
                    label-for="ContentInput">
        <b-form-input id="ContentInput"
                      type="text"
                      v-model="form.content"
                      required
                      placeholder="Enter content">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Add note</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { HTTP } from '../api';

const addNote = (data) => HTTP.post('/notes', data);

export default {
  data () {
    return {
      form: {
        title: '',
        content: ''
      },
      show: true
    };
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      addNote(this.form)
        .then(() => this.$emit('reload'));
    },
    onReset (evt) {
      evt.preventDefault();
      /* Reset our form values */
      this.form.title = '';
      this.form.content = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    }
  }
};
</script>
