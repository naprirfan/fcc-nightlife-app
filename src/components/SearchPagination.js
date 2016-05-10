import React, { Component } from 'react'

class SearchPagination extends Component {
	constructor(props, context) {
	    super(props, context)
	    this.state = {
	    	currentPage: this.props.data.summary.currentPage
	    }
  	}

	_handleNextButtonClick(event) {
		event.preventDefault()
		this.setState({currentPage: (this.props.data.summary.currentPage + 1)})
	}

	_handlePreviousButtonClick(event) {
		event.preventDefault()
		this.setState({currentPage: (this.props.data.summary.currentPage - 1)})
	}

	_handlePageClick(page, event) {
		event.preventDefault()
		this.setState({currentPage: page})
	}

	_createPaginationItem() {
		let summary = this.props.data.summary
		let paginationItem = []
		let currentPage = this.state.currentPage
		let pageCount = summary.pageCount

		/*
		INSERT PREVIOUS BUTTON
		*/
		let className = ''
		if (summary.currentPage == 1) {
			className = "disabled"
		}
		paginationItem.push(
			<li onClick={this._handlePreviousButtonClick.bind(this)} className={className}>
		      <a href="#" aria-label="Previous">
		        <span aria-hidden="true">&laquo;</span>
		      </a>
		    </li>
		)

		/*
			DIGG-STYLE PAGINATION
		*/
		// How many adjacent pages should be shown on each side?
		let adjacent = 2

		//not enough pages to bother breaking it up
		if (pageCount < 7 + (adjacent * 2)) {
			for(let i = 1; i <= pageCount; i++) {
				let isActive = ''
				if (currentPage === i) {
					isActive = 'active'
				}
				paginationItem.push(
					<li className={isActive}>
						<a href="#">{i}</a>
					</li>
				)
			}
		}
		//enough pages to hide some
		else if (pageCount > 5 + (adjacent * 2)) {
			//close to beginning; only hide later pages
			if (currentPage < 1 + (adjacent * 2)) {
				for (let i = 1; i < 4 + (adjacent * 2); i++) {
					let isActive = ''
					if (currentPage === i) {
						isActive = 'active'
					}
					paginationItem.push(
						<li onClick={this._handlePageClick.bind(this, i)} className={isActive}>
							<a href="#">{i}</a>
						</li>
					)
				}
				paginationItem.push(
					<li className="disabled">
						<a href="#">...</a>
					</li>
				)
				paginationItem.push(
					<li onClick={this._handlePageClick.bind(this, pageCount)}>
						<a href="#">{pageCount}</a>
					</li>
				)
			}
			//in middle; hide some front and some back
			else if (pageCount - (adjacent * 2) > currentPage && currentPage > (adjacent * 2)) {
				paginationItem.push(
					<li onClick={this._handlePageClick.bind(this, 1)}>
						<a href="#">1</a>
					</li>
				)
				paginationItem.push(
					<li className="disabled">
						<a href="#">...</a>
					</li>
				)

				for (let i = currentPage - adjacent; i <= currentPage + adjacent; i++) {
					let isActive = ''
					if (currentPage === i) {
						isActive = 'active'
					}
					paginationItem.push(
						<li onClick={this._handlePageClick.bind(this, i)} className={isActive}>
							<a href="#">{i}</a>
						</li>
					)
				}

				paginationItem.push(
					<li className="disabled">
						<a href="#">...</a>
					</li>
				)
				paginationItem.push(
					<li onClick={this._handlePageClick.bind(this, pageCount)}>
						<a href="#">{pageCount}</a>
					</li>
				)
			}
			//close to end; only hide early pages
			else {
				paginationItem.push(
					<li onClick={this._handlePageClick.bind(this, 1)}>
						<a href="#">1</a>
					</li>
				)
				paginationItem.push(
					<li className="disabled">
						<a href="#">...</a>
					</li>
				)

				for (let i = pageCount - (2 + (adjacent * 2)); i <= pageCount; i++) {
					let isActive = ''
					if (currentPage === i) {
						isActive = 'active'
					}
					paginationItem.push(
						<li onClick={this._handlePageClick.bind(this, i)} className={isActive}>
							<a href="#">{i}</a>
						</li>
					)
				}				
			}
		}

		/*
		INSERT NEXT BUTTON
		*/
		className = ''
		if (summary.currentPage == summary.pageCount) {
			className = "disabled"
		}
		paginationItem.push(
			<li onClick={this._handleNextButtonClick.bind(this)} className={className}>
		      <a href="#" aria-label="Next">
		        <span aria-hidden="true">&raquo;</span>
		      </a>
		    </li>
		)

		return paginationItem
	}

	render() {
		let summary = this.props.data.summary
		if (summary.pageCount == 1) {
			return <div />
		}
		else {
			return (
				<nav>
				  <ul className="pagination pagination-lg">
				    {this._createPaginationItem()}
				  </ul>
				</nav>
			)
		}
	}
}

export default SearchPagination