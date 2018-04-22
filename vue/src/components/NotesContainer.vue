<template>
  <div>
    <base-input-text
      v-model="searchText"
      placeholder="Search text"
    />
    <base-input-text
      v-model="newNoteText"
      placeholder="New note"
    />
    <ul v-if="notes.length">
      <note-item
        v-for="note in notes"
        :key="note.id"
        :note="note"
        v-if="filterNote(note)"
        @remove="removeNote"
      />
    </ul>
    <p v-else>
      Nothing left in the list. Add a new note in the input above.
    </p>
  </div>
</template>

<script>
import { HTTP } from '../api';
import BaseInputText from './BaseTextInput';
import NoteItem from './NoteItem';

const getNotes = () => {
  return HTTP.get('/notes')
    .then(({ data }) => data);
};

const removeNote = (id) => {
  return HTTP.delete('/notes', {
    params: { id }
  });
};

export default {
  components: {
    BaseInputText, NoteItem
  },
  data () {
    return {
      searchText: '',
      newNoteText: '',
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
    filterNote (note) {
      return !this.searchText ||
        note.title.includes(this.searchText) ||
        note.content.includes(this.searchText);
    },
    removeNote (id) {
      removeNote(id)
        .then(getNotes)
        .then(notes => this.setNotes(null, notes))
        .catch(this.setNotes);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
