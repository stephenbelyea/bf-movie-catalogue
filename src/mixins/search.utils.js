export default {
  computed: {
    searchableColumns() {
      return [
        'title',
        'cast',
        'genre',
        'year',
      ];
    },
  },
  methods: {
    conformOrderVal(value) {
      return (typeof value === 'string')
        ? value.toLowerCase()
        : value;
    },
    conformSearchVal(value) {
      return (typeof value !== 'string')
        ? value.toString().toLowerCase()
        : value.toLowerCase();
    },
    sortCatalogueByProp(catalogue, prop, orderDir = 'asc') {
      return catalogue.sort((a, b) => {
        const valA = this.conformOrderVal(a[prop]);
        const valB = this.conformOrderVal(b[prop]);
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
    },
    searchCatalogue(catalogue, search = '') {
      const searchQuery = this.conformSearchVal(search);
      return catalogue.filter((item) => {
        for (let i = 0; i < this.searchableColumns.length; i++) {
          const itemVal = this.conformSearchVal(item[this.searchableColumns[i]]);
          if (itemVal.includes(searchQuery)) return true;
        }
      });
    },
  },
}