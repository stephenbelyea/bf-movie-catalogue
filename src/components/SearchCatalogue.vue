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
    },
  }
</script>
