<template>
  <div class="add-movie">
    <button 
      type="button"
      class="button is-link"
      @click.prevent="toggleModal"
    >Add Movie</button>
    <div 
      class="modal"
      :class="{ 'is-active': showModal }"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <h2 class="title">Add a Movie to the Catalogue</h2>
        </header>
        <div class="modal-card-body">
          <form 
            id="add-movie"
            @submit.prevent="attemptAddMovie"
          >
            <fieldset>
              <div class="has-text-right">
                <legend>All fields are required</legend>
              </div>
              <div class="field">
                <label for="title">Title</label>
                <input 
                  type="text" 
                  id="title"
                  class="input"
                  aria-required="true"
                  v-model="movie.title"
                  :disabled="isLoading"
                >
              </div>
              <div class="field">
                <label for="cast">Cast</label>
                <input 
                  type="text" 
                  id="cast"
                  class="input"
                  aria-required="true"
                  aria-describedby="cast-description"
                  v-model="movie.cast"
                  :disabled="isLoading"
                >
                <span 
                  id="cast-description"
                  class="description"
                >
                  Use a comma to separate each actor's name
                </span>
              </div>
              <div class="field">
                <label for="genre">Genre(s)</label>
                <input 
                  type="text" 
                  id="genre"
                  class="input"
                  aria-required="true"
                  aria-describedby="genre-description"
                  v-model="movie.genre"
                  :disabled="isLoading"
                >
                <span 
                  id="genre-description"
                  class="description"
                >
                  Use a comma to separate each genre
                </span>
              </div>
              <div class="field">
                <label for="year">Year</label>
                <input 
                  type="text" 
                  id="year"
                  class="input"
                  aria-required="true"
                  v-model="movie.year"
                  :disabled="isLoading"
                >
              </div>
            </fieldset>
          </form>
        </div>
        <div class="modal-card-foot">
          <button 
            type="submit"
            form="add-movie"
            class="button is-link"
            :disabled="isLoading || invalidMovie"
          >Add Movie</button>
          <button 
            type="button"
            class="button is-danger is-outlined"
            @click.prevent="toggleModal"
          >Cancel</button>
        </div>
      </div>
      <button 
        type="button"
        class="modal-close is-large"
        aria-label="Cancel Add Movie"
        @click.prevent="toggleModal"
      ></button>
    </div>
  </div>
</template>
<script>
  const emptyMovie = {
    title: '',
    cast: '',
    genre: '',
    year: '',
  };

  export default {
    props: {
      isLoading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        showModal: false,
        movie: {
          ...emptyMovie,
        },
      };
    },
    computed: {
      invalidMovie() {
        for (let i = 0; i < Object.keys(this.movie).length; i++) {
          if (!this.movie[Object.keys(this.movie)[i]]) return true;
        }
        return false;
      },
    },
    methods: {
      toggleModal() {
        this.showModal = !this.showModal;
      },
      attemptAddMovie() {
        if (this.isLoading) return;
        if (this.invalidMovie) {
          // output error message
          return;
        }
        this.$emit('add', this.movie);
        this.toggleModal();
      },
    },
    watch: {
      showModal: function(show) {
        if (!show) {
          this.movie = {
            ...emptyMovie
          };
        }
      },
    },
  }
</script>
<style scoped>
  .title {
    font-size: 1.5rem;
  }
  .modal-card-foot {
    justify-content: space-between;
  }
  .button.is-link {
    order: 2;
  }
  .button.is-danger {
    order: 1;
  }
  .field {
    margin-bottom: 1.25rem;
  }
  legend, .description {
    font-size: .925rem;
    color: #666;
  }
  .description {
    display: inline-block;
    margin-top: .25rem;
  }
  legend {
    text-align: right;
  }
</style>
