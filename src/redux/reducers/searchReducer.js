let searchReducer = function(search = {}, action) {
  switch (action.type) {
    case 'SHOW_SEARCH_LOADING':
      return Object.assign({}, search, {
        showLoading : true
      })
 	  case 'HIDE_SEARCH_LOADING':
      return Object.assign({}, search, {
        showLoading : false
      })
    case 'POPULATE_ITEMS':
      return Object.assign({}, search, {
        showLoading : false,
        data : action.data
      })
    default: 
      return search;
  }
}

export default searchReducer
