import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../redux/actions'
import SearchForm from './SearchForm'
import SearchResultList from './SearchResultList'

class Body extends Component {

  render() {
    return (
		  <div>
      		<SearchForm search={this.props.search} actions={this.props.actions} />
      		<SearchResultList search={this.props.search} actions={this.props.actions} />
  		</div>
    )
  }

}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)
