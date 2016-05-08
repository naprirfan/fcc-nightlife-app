let searchReducer = function(search = {}, action) {
  switch (action.type) {
    case 'SHOW_SEARCH_LOADING':
      return {
        showLoading : true
      }
 	case 'HIDE_SEARCH_LOADING':
      return {
        showLoading : false
      }
    default: 
      return search;
  }
}

export default searchReducer
