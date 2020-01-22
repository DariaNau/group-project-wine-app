const config = {
    APPLICATION_ID: 'U4CQ51CWWF',
    SEARCH_ONLY_API_KEY: 'ab00b914a80138bc9888ba615f0bf965',
  };
  ​
  $.get(
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic'
  ).then(res => {
    console.log(res.drinks);
    const client = algoliasearch(
      'U4CQ51CWWF',
      'ab00b914a80138bc9888ba615f0bf965'
    );
    const drinkArr = [];
    const index = client.initIndex('dev_DRINKS');
    const drinkObj = res.drinks;
    // console.log('typeof', typeof drinkObj);
    // console.log('keys', Object.keys(drinkObj));
    // console.log("drinkObj['0']", drinkObj['0']);
    Object.keys(drinkObj).forEach(key => {
      drinkArr.push(drinkObj[key]);
    });
    // console.log('drinkArr', drinkArr);
    // console.log('typeof drinkArr', typeof drinkArr);
    index.addObjects(drinkObj, (err, content) => {
      if (err) {
        console.error('err', err);
      }
      console.log(content);
    });
    index.setSettings(
      {
        searchableAttributes: ['strDrink']
      },
      (err, content) => {
        console.log(content);
      }
    );
    autocomplete('#userInput', { hint: false }, [
      {
        source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
        displayKey: 'my_attribute',
        templates: {
          suggestion: function(suggestion) {
            return suggestion._highlightResult.my_attribute.value;
          }
        }
      }
    ]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
      console.log(event, suggestion, dataset, context);
    });
  });