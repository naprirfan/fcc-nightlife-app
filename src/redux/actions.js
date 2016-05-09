let actions = {
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

  doSearch : function(query) {
    return (dispatch) => {
      dispatch(actions.showSearchLoading())
      setTimeout(
        () => {
          console.log(query)
          dispatch(actions.hideSearchLoading())
        }
      , 2500)
    }
  },

}

export default actions
