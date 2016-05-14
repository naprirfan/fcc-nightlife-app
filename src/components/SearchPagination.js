import React, { Component } from 'react'

class SearchPagination extends Component {
	_handleNextButtonClick(event) {
		event.preventDefault()
		let nextPage = this.props.search.data.summary.currentPage + 1
		this.props.actions.doSearch(this.props.search.query, nextPage)
	}

	_handlePreviousButtonClick(event) {
		event.preventDefault()
		let prevPage = this.props.search.data.summary.currentPage - 1
		this.props.actions.doSearch(this.props.search.query, prevPage)
	}

	_handlePageClick(page, event) {
		event.preventDefault()
		this.props.actions.doSearch(this.props.search.query, page)
	}

	_createPaginationItem() {
		let summary = this.props.search.data.summary
		let currentPage = summary.currentPage
		let pageCount = summary.pageCount
		let paginationItem = []

		/*
		INSERT PREVIOUS BUTTON
		*/
		let className = ''
		if (currentPage == 1) {
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
					<li onClick={this._handlePageClick.bind(this, i)} className={isActive}>
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
		if (currentPage == pageCount) {
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
		let summary = this.props.search.data.summary
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