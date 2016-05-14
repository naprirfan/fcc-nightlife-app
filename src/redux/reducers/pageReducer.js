let pageReducer = function(page = "home", action) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.page
    default: 
      return page;
  }
}

export default pageReducer
