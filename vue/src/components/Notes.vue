<template>
  <div>
    <b-form-input
      class="col-6"
      v-model="searchText"
      placeholder="Search"
    ></b-form-input>
    <ul
      v-if="notes.length"
      class="list">
      <note-item
        v-for="note in notes"
        :key="note.id"
        :note="note"
        v-if="filterNote(note)"
        @remove="removeNote"
        @done="markAsDone"
        @archive="archiveNote"
        @rearchive="rearchiveNote"
      />
    </ul>
    <p v-else>
      Nothing left in the list. Add a new note in the input above.
    </p>
  </div>
</template>

<script>
import { HTTP } from '../api';
import NoteItem from './NoteItem';

const removeNote = (id) =>
  HTTP.delete('/notes', {
    params: { id }
  });
const updateNote = (note) => HTTP.put('/notes', note);

const includes = (query, note) => {
  return note &&
    ((note.title && note.title.includes(query)) ||
    (note.content && note.content.includes(query)));
};

export default {
  components: {
    NoteItem
  },
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      searchText: ''
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
    markAsDone (id) {
      updateNote({ id, isDone: true })
        .then(() => this.$emit('reload'));
    },
    archiveNote (id) {
      updateNote({ id, isArchived: true })
        .then(() => this.$emit('reload'));
    },
    rearchiveNote (id) {
      updateNote({ id, isArchived: false })
        .then(() => this.$emit('reload'));
    }
  }
};
</script>

<style lang="scss" scoped>
  .list {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
  }
</style>
