<template>
  <div class="wrapper">
    <b-form @submit="onSubmit" @reset="onCancel" class="clearfix form">
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
        <b-button type="submit" variant="primary">Save</b-button>
        <b-button type="reset" variant="danger">Cancel</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { HTTP } from '../api';

const getNote = (id) =>
  HTTP.get(`/notes/${id}`)
    .then(({ data }) => data);

const updateNote = (note) => HTTP.put('/notes', note);

export default {
  data () {
    return {
      form: {
        title: '',
        content: ''
      }
    };
  },
  beforeRouteEnter (to, from, next) {
    getNote(to.params.id)
      .then(note => next(vm => Object.assign(vm.form, note)));
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      updateNote({
        ...this.$route.params,
        ...this.form
      })
        .then(() => this.$router.go(-1));
    },
    onCancel (evt) {
      evt.preventDefault();
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
  .wrapper {
    background-color: rgba(0, 0, 0, .8);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .form {
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: #fff;
    padding: 25px;
    border-radius: 5px;
  }
</style>
