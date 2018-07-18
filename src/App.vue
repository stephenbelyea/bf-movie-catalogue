<template>
  <div id="app">
    <header class="container">
      <h1 class="title">Movie Catalogue</h1>
    </header>
    <div class="container catalogue-actions">
      <search-catalogue
        :search-query="searchQuery"
        :disabled="isLoading || fullCatalogue.length === 0"
        @search="updateSearchQuery"
      ></search-catalogue>
      <add-movie
        :is-loading="isLoading"
        @add="addMovie"
      ></add-movie>
    </div>
    <main class="container catalogue-list">
      <catalogue-list
        :is-loading="isLoading"
        :catalogue="filteredCatalogue"
        @order="updateCatalogueOrder"
      ></catalogue-list>
      <div
        role="status"
        aria-live="polite"
        class="has-text-centered"
      >
        <template v-if="isLoading">
          Loading your catalogue...
        </template>
        <template v-else-if="searchStatus">
          {{ searchStatus }}
        </template>
        <template v-else>
          {{ showingFullCatalogueMsg }}
        </template>
        <template v-if="orderStatus">
          {{ orderStatus }}
        </template>
      </div>
    </main>
  </div>
</template>
<script>
  import SearchCatalogue from './components/SearchCatalogue';
  import AddMovie from './components/AddMovie';
  import CatalogueList from './components/CatalogueList';
  import searchUtils from './mixins/search.utils';
  import api from './services/api';

  export default {
    data() {
      return {
        isLoading: false,
        fullCatalogue: [],
        filteredCatalogue: [],
        searchQuery: '',
        searchStatus: '',
        orderStatus: '',
      };
    },
    components: {
      SearchCatalogue,
      AddMovie,
      CatalogueList,
    },
    mixins: [
      searchUtils,
    ],
    computed: {
      showingFullCatalogueMsg() {
        if (this.filteredCatalogue.length === 0) {
          return 'Your catalogue is empty. Bummer. ';
        }
        if (this.filteredCatalogue.length === 1) {
          return 'Showing your only movie. ';
        }
        return `Showing all ${this.filteredCatalogue.length} movies. `;
      },
    },
    methods: {
      updateSearchQuery(search) {
        this.searchQuery = search;
        if (this.searchQuery) {
          this.filteredCatalogue = this.searchCatalogue(this.fullCatalogue, this.searchQuery);
          this.searchStatus = `Found ${this.filteredCatalogue.length} movies for "${this.searchQuery}". `;
        } else {
          this.filteredCatalogue = this.fullCatalogue;
          this.searchStatus = '';
        }
      },
      updateCatalogueOrder(order) {
        this.filteredCatalogue = this.sortCatalogueByProp(
          this.filteredCatalogue,
          order.col,
          order.dir,
        );
        this.orderStatus = `Sorted by ${order.col} (${order.dir === 'asc' ? 'ascending' : 'descending'}). `;
      },
      onRequestError(error) {
        console.log('Error: ', error);
        this.isLoading = false;
      },
      fetchMovies() {
        this.isLoading = true;
        setTimeout(() => {
          api.getMovies()
            .then((response) => {
              this.fullCatalogue = response.data;
              this.isLoading = false;
            })
            .catch(this.onRequestError);
        }, 1500);
      },
      addMovie(movie) {
        this.isLoading = true;
        api.addMovie(movie)
          .then(() => {
            this.fetchMovies();
          })
          .catch(this.onRequestError);
      },
    },
    created() {
      this.fetchMovies();
    },
    watch: {
      fullCatalogue: function(catalogue) {
        this.filteredCatalogue = catalogue;
        this.searchQuery = '';
      },
    },
  }
</script>
<style>
  .catalogue-actions {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
  }
  [role=status] {
    font-size: .925rem;
  }
</style>
