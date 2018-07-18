<template>
  <table class="table is-striped is-fullwidth">
    <thead>
      <tr>
        <th scope="col">
          Title
          <button
            class="button is-small set-order"
            :class="{ 'is-active': order.col === 'title' }"
            @click.prevent="setOrderByColumn('title')"
          >
            <span class="visually-hidden">order by title</span>
            <span 
              aria-hidden="true"
              class="arrows"
              :class="{
                'is-asc' : order.dir === 'asc',
                'is-desc' : order.dir === 'desc',
              }" 
            ></span>
          </button>
        </th>
        <th scope="col">Cast</th>
        <th scope="col">Genre</th>
        <th scope="col">
          Year
          <button
            class="button is-small set-order"
            :class="{ 'is-active': order.col === 'year' }"
            @click.prevent="setOrderByColumn('year')"
          >
            <span class="visually-hidden">order by year</span>
            <span 
              aria-hidden="true"
              class="arrows"
              :class="{
                'is-asc' : order.dir === 'asc',
                'is-desc' : order.dir === 'desc',
              }" 
            ></span>
          </button>
        </th>
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
    data() {
      return {
        order: {
          col: '',
          dir: 'asc',
        },
      };
    },
    methods: {
      setOrderByColumn(col) {
        if (this.order.col === col) {
          this.order.dir = (this.order.dir === 'asc')
            ? 'desc'
            : 'asc';
        } else {
          this.order.col = col;
          this.order.dir = 'asc';
        }
        this.$emit('order', this.order);
      },
    },
  }
</script>
<style>
  .set-order {
    padding: 0 .25rem;
    margin-top: -.15rem;
    margin-left: .75rem;
  }
  .set-order .arrows {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.25em;
    margin-left: .15rem;
    transform: rotate(90deg);
  }
  .set-order .arrows:before,
  .set-order .arrows:after {
    display: inline-block;
    margin: 0 .05em;
  }
  .set-order .arrows:before {
    content: "\2039";
  }
  .set-order .arrows:after {
    content: "\203A";
  }
  .set-order.is-active .arrows.is-asc:after,
  .set-order.is-active .arrows.is-desc:before {
    opacity: 0;
  }


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

