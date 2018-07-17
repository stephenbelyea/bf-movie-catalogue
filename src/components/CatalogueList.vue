<template>
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
        <td>{{ movie.cast }}</td>
        <td>{{ movie.genre }}</td>
        <td>{{ movie.year }}</td>
      </tr>
    </tbody>
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
