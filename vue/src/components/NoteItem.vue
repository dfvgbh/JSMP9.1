<template>
  <li>
    {{ note.title }}
    <br />
    {{ note.content }}
    <button @click="$emit('remove', note.id)">
      X
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
