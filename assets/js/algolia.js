
const config = {
  APPLICATION_ID: 'U4CQ51CWWF',
  SEARCH_ONLY_API_KEY: 'ab00b914a80138bc9888ba615f0bf965',
  ADMIN_KEY: 'ab879f50e3b79a3d028cce9301959e3b'
};
const client = algoliasearch(config.APPLICATION_ID, config.ADMIN_KEY);
const index = client.initIndex('PROJECT_1');
autocomplete('#userInput', { hint: true }, [
  {
    source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
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
