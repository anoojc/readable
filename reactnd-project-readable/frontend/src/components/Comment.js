import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as API from '../utils/Readable_API'
import { editComment,deleteComment,upvoteComment,downvoteComment,getPost } from '../actions'

/*This component represent individual comment*/
class Comment extends Component {

	state = {
		body: '',
		timestamp:'',
		votescore:'',
		enableEdit: false
	};

	editButtonClickHandler() {
		const { commentObj } = this.props

		this.setState({ enableEdit: true, body:commentObj.body });
	}

	updateButtonClickHandler() {
		const { commentObj } = this.props

		let updateCommentObj = {
			timestamp: Date.now(),
			body: this.state.body
		}

		API.edit_comment(commentObj.id,updateCommentObj).then(updatedCommentObj => {
			this.setState({ body:updatedCommentObj.body,timestamp:updatedCommentObj.timestamp,enableEdit: false });
		})
	}

	cancelButtonClickHandler() {
		this.setState({ enableEdit: false });
	}

	deleteCommentHandler() {
		const { commentObj } = this.props
		const commentId = commentObj.id

		API.delete_comment(commentId).then(commentObj => {
			this.props.delete(commentObj);

			API.get_post(commentObj.parentId).then(postObj => {
				this.props.getPost(postObj);
			})
		})


	}

	upvoteCommentHandler() {
		const { commentObj } = this.props
		const commentId = commentObj.id

		API.upvote_comment(commentId).then(commentObj => {
			this.setState({votescore:commentObj.votescore})
			this.props.upvoteComment(commentObj);
		})
	}

	downvoteCommentHandler() {
		const { commentObj } = this.props
		const commentId = commentObj.id

		API.downvote_comment(commentId).then(commentObj => {
			this.setState({votescore:commentObj.votescore})
			this.props.downvoteComment(commentObj);
		})
	}	

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		const { commentObj } = this.props
		const { enableEdit } = this.state

		return (
			<div>
				{
					enableEdit && (
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col col-md-9">
										<textarea name="body" className="form-control" value={this.state.body} rows="3" onChange={e => this.handleChange(e)}></textarea>
									</div>
									<div className="col col-md-3">
										<button className="btn btn-link float-center" onClick={() => {this.updateButtonClickHandler()}}><i className="material-icons">check</i> Update</button>
										<button className="btn btn-link float-center" title="Cancel" onClick={() => {this.cancelButtonClickHandler()}}>
											<i className="material-icons">cancel</i> Cancel
										</button>
									</div>
								</div>
							</div>
						</div>
					)
				}
				{
					!enableEdit && (	
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col col-md-12">{ this.state.body ? this.state.body : commentObj.body}</div>
								</div>
								<div className="row">
									<div className="col col-md-6"></div>
									<div className="col col-md-6">Posted By : {commentObj.author}</div>
								</div>
								<div className="row">
									<div className="col col-md-6">Votes : <b>{ this.state.voteScore ? this.state.voteScore : commentObj.voteScore}</b></div>
									<div className="col col-md-6">Posted On : { this.state.timestamp ? new Date(this.state.timestamp).toLocaleString() : new Date(commentObj.timestamp).toLocaleString()}</div>
								</div>
								<div className="row">
									<div className="col col-md-6">
										<button type="button" className="btn btn-link btn-sm" onClick={() => {this.upvoteCommentHandler()}}>
											<i className="material-icons">thumb_up</i>
										</button>
										<button type="button" className="btn btn-link btn-sm" onClick={() => {this.downvoteCommentHandler()}}>
											<i className="material-icons">thumb_down</i>
										</button>
									</div>
									<div className="col col-md-6">
										<button type="button" className="btn btn-link float-right" onClick={() => {this.deleteCommentHandler()}}>
											<i className="material-icons">delete</i>
										</button>
										<button type="button" className="btn btn-link float-right" onClick={() => {this.editButtonClickHandler()}}>
											<i className="material-icons">edit</i>
										</button>
									</div>
								</div>
							</div>
						</div>
					)
				}	
			</div>		
		)
	}
};

function mapStateToProps({category,post,comment}) {
	return {
		comments: comment.comments
	}
}

function mapDispatchToProps (dispatch) {
	return {
		update: (updatedCommentObj) => dispatch(editComment(updatedCommentObj)),
		delete: (deleteCommentObj) => dispatch(deleteComment(deleteCommentObj)),
		upvoteComment: (commentObj) => dispatch(upvoteComment(commentObj)),
    	downvoteComment: (commentObj) => dispatch(downvoteComment(commentObj)),
    	getPost: (postObj) => dispatch(getPost(postObj)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Comment)