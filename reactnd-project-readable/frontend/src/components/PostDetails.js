import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as API from '../utils/Readable_API'
import { getPost } from '../actions'
import Post from './Post'
import {Link} from "react-router-dom"

class PostDetails extends Component {

	componentDidMount() {
		const { post_id } = this.props.match.params

		API.get_post(post_id).then(postObj => {
			this.props.getPost(postObj);
		})
	}

	render() {
		const { postObj } = this.props

		return (
			<div>
				{postObj ?  (
						<Post postObj={postObj} showComments={true}/>
					)
					: 
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

function mapStateToProps({category,post,comment}, props) {
	return {
		postObj: post.posts.find(p => p.id === props.match.params.post_id)
	}
}

function mapDispatchToProps (dispatch) {
 	return {
    	getPost: (postObj) => dispatch(getPost(postObj))
  	}
}

export default connect(mapStateToProps,mapDispatchToProps)(PostDetails)