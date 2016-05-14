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

  setQuery: function(query){
    return {
      type: "SET_SEARCH_QUERY",
      query: query
    }
  },

  doSearch : function(query, page) {
    return (dispatch) => {
      dispatch(actions.showSearchLoading())
      dispatch(actions.setQuery(query))
      page = page || 1

      return fetch('/search/' + query + '/' + page)
        .then(response => response.json())
        .then(json => dispatch(actions.onReceiveSearchItems(json)))
    }
  },

  onReceiveSearchItems : function(json) {
    return {
      type : "POPULATE_SEARCH_ITEMS",
      data : json
    }
  },

  changePage: function(page) {
    return {
      type : "CHANGE_PAGE",
      page : page
    }
  },

  /*
    --------------
    LISTING RELATED
    --------------
  */
  markAsGoing: function(id) {
    return (dispatch) => {
      return fetch('/markAsGoing/' + id)
        .then(response => response.json())
        .then(json => dispatch(actions.onMarkAsGoingDone(json)))
    }
  },

  onMarkAsGoingDone: function(json) {
    return {
      type: "MARK_AS_GOING_DONE",
      data: json
    }
  },

  markAsNotGoing: function(id) {
    return (dispatch) => {
      return fetch('/markAsNotGoing/' + id)
        .then(response => response.json())
        .then(json => dispatch(actions.onMarkAsNotGoingDone(json)))
    }
  },

  onMarkAsNotGoingDone: function(json) {
    return {
      type: "MARK_AS_NOT_GOING_DONE",
      data: json
    }
  }
}

export default actions
