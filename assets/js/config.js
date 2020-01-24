const config = {
    APPLICATION_ID: '50O0R53X9V',
    SEARCH_ONLY_API_KEY: '6a43b8a3ff3ae7f3e0589a9218243b70',
    ADMIN_KEY: '21a6ef7c8d09025afc4e5ef3d3685135'
  };
  const client = algoliasearch(config.APPLICATION_ID, config.ADMIN_KEY);
  const index = client.initIndex('PROJECT_1');

  const drinks = 
      [
      {
        "strDrink": "Albarino"
      },
  
      {
        "strDrink": "Beaujolais"
      },
  
      {
        "strDrink": "Cabernet Sauvignon"
      },
  
      {
        "strDrink": "Cava"
      },

      {
        "strDrink": "Champagne"
      },
  
      {
        "strDrink": "Chardonnay"
      },
  
      {
        "strDrink": "Chenin Blanc"
      },
  
      {
        "strDrink": "Grenache"
      },
      
      {
        "strDrink": "Malbec"
      },
  
      {
        "strDrink": "Merlot"
      },
  
      {
        "strDrink": "Pinot Grigio"
      },
  
      {
        "strDrink": "Pinot Noir"
      },

      {
        "strDrink": "Sauvignon Blanc"
      },
  
      {
        "strDrink": "Zinfandel"
      }
    ]
  

  index.addObjects(drinks, (err, content) => {
      if (err) {
          console.log(err)
      }
      console.log(content)
  });
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
  });
//   $.get(
//     "wine-data.json"
//   ).then(res => {
//     console.log(res.drinks);
//     const client = algoliasearch(
//       'U4CQ51CWWF',
//       'ab00b914a80138bc9888ba615f0bf965'
//     );
//     const drinkArr = [];
//     const index = client.initIndex('dev_DRINKS');
//     const drinkObj = res.drinks;
//     // console.log('typeof', typeof drinkObj);
//     // console.log('keys', Object.keys(drinkObj));
//     // console.log("drinkObj['0']", drinkObj['0']);
//     Object.keys(drinkObj).forEach(key => {
//       drinkArr.push(drinkObj[key]);
//     });
//     // console.log('drinkArr', drinkArr);
//     // console.log('typeof drinkArr', typeof drinkArr);
//     index.addObjects(drinkObj, (err, content) => {
//       if (err) {
//         console.error('err', err);
//       }
//       console.log(content);
//     });
//     index.setSettings(
//       {
//         searchableAttributes: ['strDrink']
//       },
//       (err, content) => {
//         console.log(content);
//       }
//     );
//     autocomplete('#userInput', { hint: false }, [
//       {
//         source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
//         displayKey: 'my_attribute',
//         templates: {
//           suggestion: function(suggestion) {
//             return suggestion._highlightResult.my_attribute.value;
//           }
//         }
//       }
//     ]).on('autocomplete:selected', function(event, suggestion, dataset, context) {
//       console.log(event, suggestion, dataset, context);
//     });
//   });