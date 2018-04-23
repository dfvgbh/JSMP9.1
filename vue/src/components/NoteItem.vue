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
