import React, { Component } from 'react'

class Header extends Component {
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

	render() {
		var menu;
		if (this._getCookie("token") !== null) {
			window.isUserAuthed = true;
			menu = (
				<a href="/signout" className="pull-right buttonLogin">
					Sign Out
				</a>
			);
		}
		else {
			window.isUserAuthed = false;
			menu = (
				<a href="https://github.com/login/oauth/authorize?client_id=62ce3a80ad4ab5613df3" className="buttonLogin pull-right">
					<i className="fa fa-github"></i> Sign in with Github
				</a>
			);
		}

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
			      <a className="navbar-brand" href="#"><i className="fa fa-glass"></i></a>
			    </div>
			  	<div className="collapse navbar-collapse" id="main-navbar">
				  <ul className="nav navbar-nav navbar-right">
				    <li>{menu}</li>
				  </ul>
				</div>
			  </div>
			</nav>
		)
	}
}

export default Header