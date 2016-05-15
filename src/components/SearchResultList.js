import React, { Component } from 'react'
import SearchResultItem from './SearchResultItem'
import SearchPagination from './SearchPagination'

class SearchResultList extends Component {
	render() {
		if (this.props.search.showLoading) {
			return <div />
		}
		else {
			if (this.props.search.data && this.props.search.data.listings.length > 0) {
				let placeCounter = this.props.search.data.place_counter || null
				let user = this.props.search.data.user || null

				return (
					<div>
						{
							this.props.search.data.listings.map((data) => {
								return <SearchResultItem placeCounter={placeCounter} user={user} data={data} actions={this.props.actions} />
							})
						}
						<SearchPagination search={this.props.search} actions={this.props.actions} />
					</div>
				)	
			}
			else {
				if (this.props.search.data) {
					return <div className="no-result">Sorry, no result available</div>		
				}
				else {
					return <div />
				}
			}
			
		}
		
	}
}

export default SearchResultList