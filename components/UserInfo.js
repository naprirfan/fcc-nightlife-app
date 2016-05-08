import React, { Component } from 'react'

class UserInfo extends Component {
	_handleNewId() {
		console.log('dispatch an action')
		this.props.actions.createNewUserID()
	}

	_handleNewIdIfOdd() {
		this.props.actions.createNewUserIDIfOdd()	
	}

	_handleNewIdAsync() {
		this.props.actions.createNewUserIDAsync()
	}

	render() {
		return (
			<li>
				<div>username : {this.props.user.username}</div>
				<div>id: {this.props.user.id}</div>
				<button onClick={this._handleNewId.bind(this)}>Update with random ID</button>
				<button onClick={this._handleNewIdIfOdd.bind(this)}>Update with random ID ONLY IF ODD</button>
				<button onClick={this._handleNewIdAsync.bind(this)}>Update Async</button>
			</li>
		)
	}
}

export default UserInfo