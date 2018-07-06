import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as API from '../utils/Readable_API'
import { getAllCategories } from '../actions'
import Category from './Category'

class AllCategories extends Component {

	componentDidMount() {
		API.get_all_categories().then(data => {
			this.props.getCategories(data.categories);
		})
	}

	render() {
		const { categories } = this.props
		
		return (
			<div className="container">
				{
					categories && categories.map((c,index) => {
						
						return (
							<div key={index}>
								<Category categoryName={c.name}/>
							</div>
						)
					})
				}
			</div>
		)
	}
}

function mapStateToProps({category,post,comment}) {
	return {
		categories: category.categories
	}
}

function mapDispatchToProps (dispatch) {
 	return {
    	getCategories: (data) => dispatch(getAllCategories(data))
  	}
}

export default connect(mapStateToProps,mapDispatchToProps)(AllCategories)