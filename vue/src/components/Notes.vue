<template>
  <div>
    <base-input-text
      v-model="searchText"
      placeholder="Search text"
    />
    <base-input-text
      v-model="newNoteText"
      placeholder="New note"
      @keydown.enter="addNote"
    />
    <ul v-if="notes.length">
      <note-item
        v-for="note in notes"
        :key="note.id"
        :note="note"
        v-if="filterNote(note)"
        @remove="removeNote"
        @done="markAsDone"
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

const removeNote = (id) =>
  HTTP.delete('/notes', {
    params: { id }
  });
const addNote = (title) => HTTP.post('/notes', { title });
const updateNote = (note) => HTTP.put('/notes', note);

const includes = (query, note) => {
  return note &&
    ((note.title && note.title.includes(query)) ||
    (note.content && note.content.includes(query)));
};

export default {
  components: {
    BaseInputText, NoteItem
  },
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      searchText: '',
      newNoteText: ''
    };
  },
  methods: {
    filterNote (note) {
      return !this.searchText || includes(this.searchText, note);
    },
    removeNote (id) {
      removeNote(id)
        .then(() => this.$emit('reload'));
    },
    addNote () {
      addNote(this.newNoteText)
        .then(() => this.$emit('reload'));
    },
    markAsDone (id) {
      updateNote({ id, isDone: true })
        .then(() => this.$emit('reload'));
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
