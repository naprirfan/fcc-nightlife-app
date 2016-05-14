import React from 'react'
import { render } from 'react-dom'
import Body from './Body'
import Header from './Header'
import configureStore from '../redux/store'
import { Provider } from 'react-redux'

let initialState = {
  search : {
    showLoading : false
  },
  page : "home"
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
