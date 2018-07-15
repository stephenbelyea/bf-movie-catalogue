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
        aria-describedby=""
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
      isLoading: {
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
        if (!searchQuery && this.search) {
          this.search = '';
        }
      },
    },
  }
</script>
