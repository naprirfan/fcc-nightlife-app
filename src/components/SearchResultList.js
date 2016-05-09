import React, { Component } from 'react'
import SearchResultItem from './SearchResultItem'

class SearchResultList extends Component {
	render() {
		if (this.props.search.showLoading) {
			return <div />
		}
		else {
			return (
				<SearchResultItem />
			)	
		}
		
	}
}

export default SearchResultList