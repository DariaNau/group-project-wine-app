
const config = {
  APPLICATION_ID: '50O0R53X9V',
  SEARCH_ONLY_API_KEY: '6a43b8a3ff3ae7f3e0589a9218243b70'
};
const client = algoliasearch(config.APPLICATION_ID, config.SEARCH_ONLY_API_KEY);
const index = client.initIndex('PROJECT_1');
autocomplete('#userInput', { hint: true }, [
  {
    source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
    // Searchable attributes mist match display key
    displayKey: 'strDrink',
    templates: {
      suggestion: function (suggestion) {
        return suggestion._highlightResult.strDrink.value;
      }
    }
  }
]).on('autocomplete:selected', function (event, suggestion, dataset, context) {
  console.log(event, suggestion, dataset, context);
  console.log(dataset.strDrink);

});
