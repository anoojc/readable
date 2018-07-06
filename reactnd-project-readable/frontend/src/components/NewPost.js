import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import * as uuid from 'uuid'
import * as API from '../utils/Readable_API'
import { getAllCategories,addNewPost,editPost } from '../actions'

/*This component represent the form to add/update post*/
class NewPost extends Component {

	state = {
		id: '',
		title: '',
		body: '',
		category: 'react',
		author: '',
		disabled:''
	};

	componentDidMount() {
		const { postId } = this.props.match.params

		API.get_all_categories().then(data => {
			this.props.getCategories(data.categories);
		})

		if(this.props.isUpdate) {
			API.get_post(postId).then(postObj => {
				this.setState({
					id:postObj.id,
					title:postObj.title,
					body:postObj.body,
					category:postObj.category,
					author:postObj.author,
					disabled:true
				})
			})
		}
	}

	// This method updates state for any change in form input elements
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	addPostClickHandler() {
	
		if(!this.props.isUpdate) {
			let postObj = {
				id: uuid.v1(),
				timestamp: Date.now(),
				title: this.state.title,
				body: this.state.body,
				author: this.state.author,
				category: this.state.category
			}

			API.add_new_post(postObj).then(res => {
				this.props.add(postObj);
			})
		} else {
			let updatePostObj = {
				title: this.state.title,
				body: this.state.body
			}

			API.edit_post(this.state.id,updatePostObj).then(updatedPostObj => {
				this.props.update(updatedPostObj);
			})
		}	
	}

	render() {
		const { categories } = this.props

		return (
			<div className="container">
				<form>
					<div className="form-group">
						<div className="row">
							<div className="col col-md-2"><label>Title</label></div>
							<div className="col col-md-6"><input name="title" type="text" value={this.state.title} className="form-control" id="titleinput" onChange={e => this.handleChange(e)}/></div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col col-md-2"><label>Body</label></div>
							<div className="col col-md-6"><textarea name="body" className="form-control" value={this.state.body} id="bodyinput" rows="3" onChange={e => this.handleChange(e)}></textarea></div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col col-md-2"><label>Category</label></div>
							<div className="col col-md-6">
								<select name="category" className="form-control" id="categoryselect" value={this.state.category} disabled={(this.state.disabled)? "disabled" : ""} onChange={e => this.handleChange(e)}>
									{
										categories && categories.map((c,index) => {
											return (
												<option key={index} value={c.name}>{c.name}</option>
											)
										})
									}
								</select>
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col col-md-2"><label>Author</label></div>
							<div className="col col-md-6"><input name="author" type="text" className="form-control" value={this.state.author} disabled={(this.state.disabled)? "disabled" : ""} id="authorinput" onChange={e => this.handleChange(e)}/></div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col col-md-2"></div>
							<div className="col col-md-6"><Link to={"/"} className="btn btn-default" onClick={() => {this.addPostClickHandler()}}>Submit</Link></div>
						</div>
					</div>
				</form>
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
		getCategories: (data) => dispatch(getAllCategories(data)),
		add: (postObj) => dispatch(addNewPost(postObj)),
		update: (updatedPostObj) => dispatch(editPost(updatedPostObj))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewPost)