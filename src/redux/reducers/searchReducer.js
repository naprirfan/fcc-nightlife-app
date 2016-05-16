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
    case 'SET_SEARCH_QUERY':
      return Object.assign({}, search, {
        query: action.query
      })
    case 'POPULATE_SEARCH_ITEMS':
      return Object.assign({}, search, {
        showLoading : false,
        data : action.data
      })
    case 'MARK_AS_GOING_DONE':
      return Object.assign({}, search, action.data)
    case 'MARK_AS_NOT_GOING_DONE':
      return Object.assign({}, search, action.data)
    default: 
      return search;
  }
}

export default searchReducer
