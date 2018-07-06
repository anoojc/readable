import React, { Component } from 'react'
import { connect } from 'react-redux'
import Category from './Category'

class CategoryDetails extends Component {

	render() {
		const { category } = this.props.match.params

		return (
			<Category categoryName={category}/>
		)
	}

}

export default connect()(CategoryDetails)