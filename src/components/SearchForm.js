import React, { Component } from 'react'

class SearchForm extends Component {
	constructor(props, context) {
	    super(props, context)
	    this.state = {
	      inputText: ''
	    }
  	}

  	_handleChange(event) {
	    this.setState({
	      inputText: event.target.value
	    })
  	}

	_handleSubmit(event) {
		event.preventDefault()
		this.props.actions.doSearch(this.state.inputText)
	}

	render() {
		let loading
		if (this.props.search.showLoading) {
			loading = (<div className="loading"></div>)
		}

		return (
			<div className="jumbotron">
		        <h1>Plans for Tonight?</h1>
		        <p>See which bars are hoppin' tonight and RSVP ahead of time!</p>
		        <form onSubmit={this._handleSubmit.bind(this)}>
		          <div className="input-group input-group-lg">
		            <input 
		            	type="text" 
		            	className="form-control" 
		            	placeholder="Where are you? (Powered by YellowAPI)" 
		            	value={this.state.inputText}
            			onChange={this._handleChange.bind(this)}
		            />
		            <span className="input-group-btn">
		              <button className="btn btn-brown" type="submit">Go!</button>
		            </span>
		          </div>
		        </form>
		        {loading}
	      	</div>	
		)
	}
}

export default SearchForm