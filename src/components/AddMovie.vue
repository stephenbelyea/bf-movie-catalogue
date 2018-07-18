<template>
  <div class="add-movie">
    <button
      ref="button"
      type="button"
      class="button is-link"
      @click.prevent="toggleModal"
    >Add Movie</button>
    <transition name="modal">
      <div
        v-if="showModal"
        ref="modal"
        role="dialog"
        class="modal is-active has-text-left"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        tabindex="0"
      >
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <h2
              id="modal-title"
              class="title"
            >Add a Movie to Your Catalogue</h2>
          </header>
          <div class="modal-card-body">
            <p
              class="has-text-right"
              id="modal-description"
            >All fields are required</p>
            <form
              id="add-movie"
              @submit.prevent="attemptAddMovie"
            >
              <div class="field">
                <label for="title">Title</label>
                <input
                  type="text"
                  id="title"
                  class="input"
                  aria-required="true"
                  :disabled="isLoading"
                  v-model="movie.title"
                >
              </div>
              <div class="field">
                <label for="cast">Cast</label>
                <input
                  type="text"
                  id="cast"
                  class="input"
                  aria-required="true"
                  :disabled="isLoading"
                  v-model="movie.cast"
                >
              </div>
              <div class="field">
                <label for="genre">Genre(s)</label>
                <input
                  type="text"
                  id="genre"
                  class="input"
                  aria-required="true"
                  :disabled="isLoading"
                  v-model="movie.genre"
                >
              </div>
              <div class="field">
                <label for="year">Release Year</label>
                <input
                  type="text"
                  id="year"
                  class="input"
                  aria-required="true"
                  aria-describedby="year-error"
                  :aria-invalid="errors.year"
                  :disabled="isLoading"
                  v-model="movie.year"
                >
                <div 
                  role="alert"
                  aria-live="assertive"
                  id="year-error"
                >
                  <span 
                    v-if="errors.year"
                    class="field-error"
                  >Enter the movie's 4-digit year of release</span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-card-foot">
            <button
              type="submit"
              form="add-movie"
              class="button is-link"
              :disabled="isLoading || invalidMovie"
            >Save Movie</button>
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
          aria-label="Discard Movie"
          @click.prevent="toggleModal"
        ></button>
      </div>
    </transition>
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
        errors: {
          year: false,
        },
      };
    },
    computed: {
      invalidMovie() {
        for (let i = 0; i < Object.keys(this.movie).length; i++) {
          if (!this.movie[Object.keys(this.movie)[i]]) {
            return true;
          }
        }
        return false;
      },
    },
    methods: {
      toggleModal() {
        this.showModal = !this.showModal;
      },
      closeModalOnEscape(keyup) {
        if (keyup.key === 'Escape') {
          this.toggleModal();
        }
      },
      validateFields() {
        const { year } = this.movie;
        if (year.length !== 4 || !year.match(/^[0-9]+$/)) {
          this.errors.year = true;
          return false;
        }
        this.errors.year = false;
        return true;
      },
      attemptAddMovie() {
        if (this.isLoading || this.invalidMovie) return;

        if (!this.validateFields()) return;

        this.$emit('add', this.movie);
        this.toggleModal();
      },
    },
    watch: {
      showModal: function(value) {
        if (!value) {
          document.removeEventListener('keyup', this.closeModalOnEscape);
          this.$refs.button.focus();
          this.movie = {
            ...emptyMovie
          };
        } else {
          this.$nextTick(() => {
            document.addEventListener('keyup', this.closeModalOnEscape);
            this.$refs.modal.focus();
          })
        }
      },
    },
  }
</script>
<style scoped>
  .add-movie {
    flex: 1 0 10rem;
    padding-left: 2rem;
    margin-top: 1rem;
    text-align: right;
  }
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
  input[aria-invalid=true] {
    border-color: crimson;
    color: crimson;
  }
  input#year {
    width: auto;
  }
  .field-error {
    display: inline-block;
    margin-top: .25rem;
    color: crimson;
  }
  .field-error:before {
    content: "\00d7";
    display: inline-block;
    vertical-align: top;
    font-size: 2em;
    font-weight: bold;
    line-height: .55;
    margin-right: .5rem;
  }
  legend {
    text-align: right;
  }

  .modal-enter-active, 
  .modal-leave-active {
    transition: opacity 150ms;
  }
  .modal-enter, 
  .modal-leave-to {
    opacity: 0;
  }
  .modal-enter-active .modal-card, 
  .modal-leave-active .modal-card {
    transition: transform 250ms ease;
  }
  .modal-enter .modal-card, 
  .modal-leave-to .modal-card {
    transform: translateY(-5rem);
  }
</style>
