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
    ];
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
