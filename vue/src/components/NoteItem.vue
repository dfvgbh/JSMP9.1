<template>
  <li class="wrapper"
      v-bind:class="{ done: note.isDone }">
    <span class="title">{{ note.title }}</span>
    <span>{{ note.content }}</span>
    <router-link
      class="link"
      :to="`note/${note.id}`">edit</router-link>
    <div class="buttons">
      <b-button
        @click="$emit('done', note.id)"
        variant="primary">
        Done
      </b-button>
      <b-button
        v-if="note.isArchived"
        @click="$emit('rearchive', note.id)"
        variant="primary">
        Rearchive
      </b-button>
      <b-button
        v-else
        @click="$emit('archive', note.id)"
        variant="primary">
        Archive
      </b-button>
      <b-button
        @click="$emit('remove', note.id)"
        variant="danger">
        Delete
      </b-button>
    </div>
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
  .wrapper {
    background-color: darkslateblue;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 10px;
    width: 270px;
    height: 200px;
    color: white;
    font-size: 18px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .done {
    background-color: forestgreen;
  }

  .buttons {
    margin-top: auto;
  }

  .link {
    color: lightskyblue;
    text-decoration: underline;
  }
</style>
