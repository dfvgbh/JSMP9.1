<template>
  <div class="container">
    <div class="form-group row">
      <label class="col-sm-3" for="exampleInputPassword1">Input</label>
      <input
        type="text"
        class="form-control col-sm-9"
        id="exampleInputPassword1"
        :value="value"
        v-on="listeners"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid $blue;
  }
</style>
