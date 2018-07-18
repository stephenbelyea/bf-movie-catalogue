<template>
  <table class="table is-striped is-fullwidth">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Cast</th>
        <th scope="col">Genre</th>
        <th scope="col">Year</th>
      </tr>
    </thead>
    <transition name="tbody">
      <tbody v-if="catalogue.length > 0">
        <tr 
          v-for="movie in catalogue"
          :key="movie.id"
        >
          <td>{{ movie.title }}</td>
          <td>{{ movie.cast }}</td>
          <td>{{ movie.genre }}</td>
          <td>{{ movie.year }}</td>
        </tr>
      </tbody>
    </transition>
  </table>
</template>
<script>
  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: false,
      },
      catalogue: {
        type: Array,
        required: true,
      },
    },
  }
</script>
<style>
  .tbody-enter-active, 
  .tbody-leave-active {
    transition: opacity 150ms, 
                max-height 150ms;
  }
  .tbody-enter, 
  .tbody-leave-to {
    opacity: 0;
    max-height: 0;
  }
</style>

