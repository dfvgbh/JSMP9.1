<template>
  <div class="container-fluid">
    <add-note
      class="col-6"
      @reload="reloadNotes"
    />
    <notes
      :notes="notes"
      @reload="reloadNotes"
    />
    <router-link to="archive">Archive</router-link>
  </div>
</template>

<script>
import { HTTP } from '../api';
import Notes from './Notes';
import AddNote from './AddNote';

const getNotes = () =>
  HTTP.get('/notes')
    .then(({ data }) => data);

export default {
  components: {
    Notes, AddNote
  },
  data () {
    return {
      notes: []
    };
  },
  beforeRouteEnter (to, from, next) {
    getNotes()
      .then(notes => next(vm => vm.setNotes(null, notes)))
      .catch(err => next(vm => vm.setNotes(err)));
  },
  methods: {
    setNotes (err, notes) {
      if (err) {
        this.error = err.toString();
      } else {
        this.notes = notes;
      }
    },
    reloadNotes () {
      getNotes()
        .then(notes => this.setNotes(null, notes))
        .catch(this.setNotes);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
