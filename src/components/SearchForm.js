import React, { Component } from 'react'

class SearchForm extends Component {
	constructor(props, context) {
	    super(props, context)
	    this.state = {
	      inputText: ''
	    }
  	}

  	componentDidMount() {
  		if (window.isUserAuthed) {
  			var default_place = this._getCookie("default_place")
  			if (default_place != "") {
  				default_place = default_place.split(";")[0]
  				this.setState({inputText: default_place})
  				this.props.actions.doSearch(default_place)	
  			}
  		}
  	}

  	_getCookie(name) {
		var dc = document.cookie
	    var prefix = name + "="
	    var begin = dc.indexOf("; " + prefix)
	    if (begin == -1) {
	        begin = dc.indexOf(prefix)
	        if (begin != 0) return null
	    }
	    else
	    {
	        begin += 2
	        var end = document.cookie.indexOf(";", begin)
	        if (end == -1) {
	        end = dc.length
	        }
	    }
	    return unescape(dc.substring(begin + prefix.length, end))
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