<template>
  <div>
    <notes
      :notes="notes"
      @reload="reloadNotes"
    />
  </div>
</template>

<script>
import { HTTP } from '../api';
import Notes from './Notes';

const getNotes = () =>
  HTTP.get('/notes')
    .then(({ data }) => data);

export default {
  components: {
    Notes
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
