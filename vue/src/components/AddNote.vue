<template>
  <div class="wrapper">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="clearfix">
      <b-form-group label="Title:"
                    label-for="titleInput">
        <b-form-input id="titleInput"
                      type="text"
                      v-model="form.title"
                      required
                      placeholder="Title">
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
      <div class="float-right">
        <b-button type="submit" variant="primary">Add note</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
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
      this.form.title = '';
      this.form.content = '';
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => { this.show = true; });
    }
  }
};
</script>

<style lang="scss" scoped>
  .wrapper {
    background-color: violet;
    margin: 12px 0;
    padding: 20px 10px;
  }
</style>
