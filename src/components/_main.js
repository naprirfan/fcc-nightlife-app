import React from 'react'
import { render } from 'react-dom'
import Body from './Body'
import Header from './Header'
import configureStore from '../redux/store'
import { Provider } from 'react-redux'

let initialState = {
  todos: [{
    id: 0,
    completed: false,
    text: 'Initial todo for demo purposes'
  }],
  user : {
  	username: "naprirfan",
  	id : 25
  },
  search : {
    showLoading : false
  }
}

let store = configureStore(initialState)

render(
  <Provider store={store}>
    <div>
      <Header />
      <Body />
    </div>
  </Provider>,
  document.getElementById('app')
)
