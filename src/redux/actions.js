import fetch from 'isomorphic-fetch'

let actions = {
  /*
    --------------
    SEARCH RELATED
    --------------
  */
  showSearchLoading : function() {
    return {
      type : "SHOW_SEARCH_LOADING"
    }
  },

  hideSearchLoading : function() {
    return {
      type : "HIDE_SEARCH_LOADING"
    }
  },

  doSearch : function(query, page) {
    return (dispatch) => {
      dispatch(actions.showSearchLoading())
      page = page || 1

      return fetch('/search/' + query + '/' + page)
        .then(response => response.json())
        .then(json => dispatch(actions.onReceiveItems(json)))
    }
  },

  onReceiveItems : function(json) {
    return {
      type : "POPULATE_ITEMS",
      data : json
    }
  },

  /*
    --------------
    USER RELATED
    --------------
  */



}

export default actions
