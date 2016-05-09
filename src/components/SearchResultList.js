import React, { Component } from 'react'
import SearchResultItem from './SearchResultItem'

class SearchResultList extends Component {
	render() {
		if (this.props.search.showLoading) {
			return <div />
		}
		else {
			if (this.props.search.data && this.props.search.data.listings.length > 0) {
				return (
					<div>
						{
							this.props.search.data.listings.map((place) => {
								return <SearchResultItem place={place} actions={this.props.actions} />
							})
						}
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