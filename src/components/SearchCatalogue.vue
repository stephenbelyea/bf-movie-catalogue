<template>
  <div class="search-catalogue">
    <div class="field">
      <label for="search">
        Search Catalogue
      </label>
      <input
        type="text"
        id="search"
        class="input"
        v-model="search"
        :placeholder="description"
        :disabled="disabled"
        aria-describedby="search-description"
      >
      <span
        id="search-description"
        class="visually-hidden"
      >{{ description }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      searchQuery: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        search: ''
      };
    },
    computed: {
      description() {
        return 'Start typing a title, actor, genre, or year';
      },
    },
    watch: {
      search: function(value) {
        this.$emit('search', value);
      },
      searchQuery: function(value) {
        if (!value && this.search) {
          this.search = '';
        }
      },
    },
  }
</script>
<style>
  .search-catalogue {
    flex: 1 1 20rem;
  }
  .input::-webkit-input-placeholder {
    color: #777;
  }
  .input::-moz-placeholder {
    color: #222;
  }
</style>
