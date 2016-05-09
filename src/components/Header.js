import React, { Component } from 'react'

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#">Nightlife-APP</a>
			    </div>
			    <div className="collapse navbar-collapse" id="main-navbar">
			      <ul className="nav navbar-nav navbar-right">
			        <li><a href="#" className="navButton" data-section="contact">Places I'm Going</a></li>
			      </ul>
			    </div>
			  </div>
			</nav>
		)
	}
}

export default Header