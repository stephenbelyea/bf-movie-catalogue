<template>
  <div class="container" id="catalogue-list">
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>Title</th>
          <th>Cast</th>
          <th>Genre</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody v-if="catalogue.length > 0">
        <tr 
          v-for="movie in catalogue"
          :key="movie.id"
        >
          <td>{{ movie.title }}</td>
          <td>{{ movie.cast.join(', ') }}</td>
          <td>{{ movie.genre.join(', ') }}</td>
          <td>{{ movie.year }}</td>
        </tr>
      </tbody>
    </table>
  </div>
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

</style>
