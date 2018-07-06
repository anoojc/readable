import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as API from '../utils/Readable_API'
import {Link} from "react-router-dom"
import * as uuid from 'uuid'
import { getCommentsForPost,deletePost,addNewComment,getPost,upvotePost,downvotePost } from '../actions'
import Comment from './Comment'

/*This component represent individual post*/
class Post extends Component {

	state = {
		id: '',
		body: '',
		author:'',
		parentId:'',
		showForm: false,
		sortBy:'',
		orderAsc:false
	};

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	addButtonClickHandler() {
		const { postObj } = this.props
		const postId = postObj.id

		let commentObj = {
			id: uuid.v1(),
			timestamp: Date.now(),
			body: this.state.body,
			author: this.state.author,
			parentId: postId
		}

		this.setState({ showForm: false, body: '', author:'' });

		API.add_new_comment(commentObj).then(newCommentObj => {
			newCommentObj.parentId= postId
			this.props.addComment(newCommentObj);
		})

		API.get_post(postId).then(postObj => {
			this.setState({postObj:postObj})
			this.props.getPost(postObj);
		})
	}

	addCommentClickHandler() {
		this.setState({ showForm: true });
	}

	hideButtonClickHandler() {
		this.setState({ showForm: false });
	}

	componentDidMount() {
		const { postObj,comments } = this.props
		const postId = postObj.id

		this.setState({postObj:postObj})

		if(postId !== undefined && comments.length === 0) {
			API.get_comments_for_post(postId).then(comments => {
				this.props.getComments({comments,postId});
			})
		}
		
	}

	deletePostHandler() {
		const { postObj } = this.props
		const postId = postObj.id

		API.delete_post(postId).then(postObj => {
			this.props.delete(postObj);
		})
	}

	upvotePostHandler() {
		const { postObj } = this.props
		const postId = postObj.id

		API.upvote_post(postId).then(postObj => {
			this.setState({postObj:postObj})
			this.props.upvote(postObj);
		})
	}

	downvotePostHandler() {
		const { postObj } = this.props
		const postId = postObj.id

		API.downvote_post(postId).then(postObj => {
			this.setState({postObj:postObj})
			this.props.downvote(postObj);
		})
	}	

	sortByDateHandler() {
		const { orderAsc } = this.state

		this.setState({orderAsc:!orderAsc,sortBy:'date'})
	}

	sortByVotesHandler() {
		const { orderAsc } = this.state

		this.setState({orderAsc:!orderAsc,sortBy:'votes'})
	}

	render() {
		const { showComments,comments,postObj } = this.props
		const { sortBy,orderAsc } = this.state
		
		if(sortBy === "votes") {
			 orderAsc ? 
			comments.sort(
				function(c1, c2){
					return c1.voteScore - c2.voteScore
			}) :
			comments.sort(
				function(c1, c2){
					return c2.voteScore - c1.voteScore
			})
		} else if(sortBy === "date") {	
			orderAsc ? 
			comments.sort(
				function(c1, c2){
					return new Date(c1.timestamp) - new Date(c2.timestamp)
			}) :
			comments.sort(
				function(c1, c2){
					return new Date(c2.timestamp) - new Date(c1.timestamp)
			})
		}
							
		return (
			<div>
				{
					postObj && postObj.id ? (
						<div className="container">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col col-md-6">
										</div>
										<div className="col col-md-6">
											<Link to={"/"} className="btn btn-link float-right" onClick={() => {this.deletePostHandler()}}>
												<i className="material-icons">delete</i>
											</Link>
											<Link to={"/post/update/"+postObj.id} className="btn btn-link float-right" title="Edit">
												<i className="material-icons">edit</i>
											</Link>
										</div>
									</div>
									<div className="row">
										<div className="col col-md-8">
											<Link to={"/"+postObj.category+"/"+postObj.id} className="btn btn-default" title={postObj.title}>
												<h4>{postObj.title}</h4>
											</Link>
										</div>
									</div>
									<div className="row">
										<div className="col col-md-8">{postObj.body}</div>
									</div>
									<div className="row">
										<div className="col col-md-6"><b>{postObj.commentCount}</b> Comments</div>
										<div className="col col-md-6">Posted By : {postObj.author}</div>
									</div>
									<div className="row">
										<div className="col col-md-6">
											Votes : <b>{postObj.voteScore}</b>
										</div>
										<div className="col col-md-6">Posted On : {new Date(postObj.timestamp).toLocaleString()}</div>
									</div>
									<div className="row">
										<div className="col col-md-6">
											<button type="button" className="btn btn-link btn-sm" onClick={() => {this.upvotePostHandler()}}>
												<i className="material-icons">thumb_up</i>
											</button>
											<button type="button" className="btn btn-link btn-sm" onClick={() => {this.downvotePostHandler()}}>
												<i className="material-icons">thumb_down</i>
											</button>
										</div>
										<div className="col col-md-6">
										</div>
									</div>
									<div className="row">
										<div className="col col-md-8"></div>
									</div>

									{
										showComments && (
											<div className="container">
												<div className="card">
													<div className="card-body">
														{ this.state.showForm ? (
															<div>
															<div className="row">
																	<div className="col col-md-6"><textarea name="body" className="form-control" placeholder="Type your comment here.." value={this.state.body} rows="3" onChange={e => this.handleChange(e)}></textarea></div>
																	<div className="col col-md-6"><input name="author" type="text" className="form-control" placeholder="Insert your name" value={this.state.author} onChange={e => this.handleChange(e)}/></div>
															</div>
															<div className="row">
																<div className="col col-md-12"><button className="btn btn-link float-right" onClick={() => {this.addButtonClickHandler()}}>
																	<i className="material-icons">add</i> Add
																</button></div>
															</div> </div> )
														 : null }		
														<div className="row">
															<div className="col col-md-6"></div>
															<div className="col col-md-6">
																 { !this.state.showForm ? 
																	<button className="btn btn-link float-right" title="Add new comment" onClick={() => {this.addCommentClickHandler()}}>
																		<i className="material-icons">add_box</i> Add New Comment
																	</button>
																: null }
																{ this.state.showForm ? 
																	<button className="btn btn-link float-right" title="Cancel" onClick={() => {this.hideButtonClickHandler()}}>
																		<i className="material-icons">cancel</i> Cancel
																	</button>
																: null }	
															</div>
														</div>
														<div className="row">
															<div className="col col-md-6"><b>Comments</b></div>
															<div className="col col-md-6"></div>
														</div>
														<div className="text-right" >
															<label><h6>Sort By : </h6></label>
															<button className="btn btn-link" onClick={() => {this.sortByDateHandler()}}>
																<h6><i className="material-icons">{(sortBy === "date" && orderAsc) ? 'expand_less ' : '  ' }</i>Date</h6>	
															</button>
															<button className="btn btn-link" onClick={() => {this.sortByVotesHandler()}}>
																<h6><i className="material-icons">{(sortBy === "votes" && orderAsc) ? 'expand_less ' : '  ' }</i>Votes</h6>
															</button>
														</div>	
													
														{
															comments && comments.map((c,index) => {
																if(c.parentId === postObj.id) {
																	return (
																		<div key={index} className="row">
																			<div key={index} className="col col-md-12">
																				<Comment commentObj={c}/>
																			</div>
																		</div>
																	)	
																}
																
															})
														}
													</div>
												</div>
											</div>
											)
										}
								</div>
							</div>
						</div>
					) : 
					(	<div className="container">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col col-md-12 text-center">
											<label><h1>PAGE NOT FOUND</h1></label>
										</div>
									</div>
									<div className="row">
										<div className="col col-md-12 text-center">
											<label>This page does not exist</label>
										</div>
									</div>	
									<div className="row">
										<div className="col col-md-12 text-center">
											<Link to={"/"} className="btn btn-default float-center">
												Go Back >
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>		
					)	
				}
			</div>	
		)
	}
}

function mapStateToProps({category,post,comment},props) {
	return {
		comments: comment.comments.filter(c => c.parentId === props.postObj.id && !c.deleted)
	}
}

function mapDispatchToProps (dispatch) {
 	return {
    	getComments: ({comments,post}) => dispatch(getCommentsForPost({comments,post})),
    	delete: (deletePostObj) => dispatch(deletePost(deletePostObj)),
    	addComment: (commentObj) => dispatch(addNewComment(commentObj)),
    	getPost: (postObj) => dispatch(getPost(postObj)),
    	upvote: (postObj) => dispatch(upvotePost(postObj)),
    	downvote: (postObj) => dispatch(downvotePost(postObj))
  	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)