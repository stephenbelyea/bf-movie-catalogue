<template>
  <div id="app">
    <div class="container catalogue-actions">
      <search-catalogue
        :is-loading="isLoading"
        @search="updateSearchQuery"
      ></search-catalogue>
    </div>
    <div class="container catalogue-list">
      <catalogue-list
        :is-loading="isLoading"
        :catalogue="filteredCatalogue"
      ></catalogue-list>
    </div>
    <div 
      id="status" 
      class="container has-text-centered"
      role="status"
      aria-live="polite"
    >
      <template v-if="searchStatus">
        {{ searchStatus }}
      </template>
      <template v-else>
        {{ showingFullCatalogueMsg }}
      </template>
    </div>
  </div>
</template>
<script>
  import SearchCatalogue from './components/SearchCatalogue';
  import CatalogueList from './components/CatalogueList';
  import searchUtils from './mixins/search.utils';

  import catalogueData from './catalogue-data';

  export default {
    data() {
      return {
        isLoading: false,
        fullCatalogue: [],
        filteredCatalogue: [],
        searchStatus: '',
      };
    },
    components: {
      SearchCatalogue,
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
      updateSearchQuery(search) {
        if (search) {
          this.filteredCatalogue = this.searchCatalogue(this.fullCatalogue, search);
          this.searchStatus = `Found ${this.filteredCatalogue.length} movies for "${search}". `;
        } else {
          this.filteredCatalogue = this.fullCatalogue;
          this.searchStatus = '';
        }
      },
    },
    created() {
      this.fullCatalogue = this.sortCatalogueByProp(catalogueData, 'year');
      this.filteredCatalogue = this.fullCatalogue;
    },
  }
</script>
<style>
  .catalogue-actions {
    display: flex;
  }
  #status {
    margin: 1rem 0;
    font-size: .925rem;
  }
</style>
