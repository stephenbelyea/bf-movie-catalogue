<template>
  <div id="app">
    <header class="container">
      <h1 class="title">Movie Catalogue</h1>
    </header>
    <div class="container catalogue-actions">
      <search-catalogue
        :is-loading="isLoading"
        :search-query="searchQuery"
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
      ></catalogue-list>
      <div 
        role="status"
        aria-live="polite"
        class="has-text-centered"
      >
        <template v-if="searchStatus">
          {{ searchStatus }}
        </template>
        <template v-else>
          {{ showingFullCatalogueMsg }}
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

  import catalogueData from './catalogue-data';

  export default {
    data() {
      return {
        isLoading: false,
        fullCatalogue: [],
        filteredCatalogue: [],
        searchQuery: '',
        searchStatus: '',
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
        return `Showing all ${this.filteredCatalogue.length} movies. `;
      },
    },
    methods: {
      commaStringToArray(string) {
        if (!string.includes(',')) return string;
        return string.replace(', ', ',').split(',');
      },
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
      addMovie(movie) {
        const catalogue = [
          ...this.fullCatalogue,
          {
            ...movie,
            cast: this.commaStringToArray(movie.cast),
            genre: this.commaStringToArray(movie.genre),
          }
        ];
        this.fullCatalogue = this.sortCatalogueByProp(catalogue, 'year');
        this.filteredCatalogue = this.fullCatalogue;
        this.searchQuery = '';
      },
    },
    created() {
      this.fullCatalogue = this.sortCatalogueByProp(catalogueData, 'year');
      this.filteredCatalogue = this.fullCatalogue;
    },
  }
</script>
<style>
  .container {
    padding: 1rem;
  }
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
