<template>
  <div id="app">
    <catalogue-list
      :is-loading="isLoading"
      :catalogue="filteredCatalogue"
    ></catalogue-list>
  </div>
</template>
<script>
  import CatalogueList from './components/CatalogueList';

  import catalogueData from './catalogue-data';

  export default {
    data() {
      return {
        isLoading: false,
        fullCatalogue: [],
        filteredCatalogue: [],
      };
    },
    components: {
      CatalogueList
    },
    methods: {
      conformSortValue(value) {
        return (typeof value === 'string')
          ? value.toLowerCase()
          : value;
      },
      sortCatalogueByProp(prop, orderDir = 'asc') {
        return this.fullCatalogue.sort((a, b) => {
          const valA = this.conformSortValue(a[prop]);
          const valB = this.conformSortValue(b[prop]);
          if (
            (orderDir === 'asc' && valA > valB) ||
            (orderDir === 'desc' && valA < valB)
          ) {
            return 1;
          }
          if (
            (orderDir === 'asc' && valA < valB) ||
            (orderDir === 'desc' && valA > valB)
          ) {
            return -1;
          }
          return 0;
        });
      }
    },
    mounted() {
      this.fullCatalogue = catalogueData;
      this.filteredCatalogue = this.sortCatalogueByProp('year');
    }
  }
</script>
<style>

</style>
