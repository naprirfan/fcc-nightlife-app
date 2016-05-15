import React, { Component } from 'react'

class SearchResultItem extends Component {
	constructor(props, context) {
	    super(props, context)
	    this.state = {
	      going_count: 0,//todo : change with props
	      am_i_going: false,
	      listing_id: this.props.data.id
	    }
  	}

	_handleGoing() {
		//User authed
		if (window.isUserAuthed) {
			if (this.state.am_i_going) {
				return
			}
			this.setState({going_count: (this.state.going_count + 1), am_i_going: true})
			this.props.actions.markAsGoing(this.props.data.id)
		}
		else {
			window.location = "https://github.com/login/oauth/authorize?client_id=62ce3a80ad4ab5613df3"
		}
	}

	_handleNotGoing() {
		this.setState({going_count: (this.state.going_count - 1), am_i_going: false})
	}

	render() {
		let am_i_going;
		if (this.state.am_i_going) {
			am_i_going = <span onClick={this._handleNotGoing.bind(this)} className="clickable label label-success">You're going <i className="fa fa-close"></i></span>
		}
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					{this.props.data.name}
				</div>
				<div className="panel-body">
					<span onClick={this._handleGoing.bind(this)} className="clickable label label-warning">{this.state.going_count} going</span>&nbsp;
					{am_i_going}
					<br />
					{this.props.data.address.street} {this.props.data.address.city} {this.props.data.address.prov}.
				</div>
			</div>
		)	
		
	}
}

export default SearchResultItem