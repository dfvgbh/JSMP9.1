<template>
  <li>
    <span v-bind:class="{ done: note.isDone }">{{ note.title }}</span>
    <br />
    {{ note.content }}
    <button @click="$emit('remove', note.id)">
      X
    </button>
    <button @click="$emit('done', note.id)">
      Done
    </button>
    <button
      v-if="note.isArchived"
      @click="$emit('rearchive', note.id)">
      Rearchive
    </button>
    <button
      v-else
      @click="$emit('archive', note.id)">
      Archive
    </button>
  </li>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
  .done {
    color: forestgreen;
  }
</style>
