import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from "react-router-dom"
import * as API from '../utils/Readable_API'
import { getPostForCategory } from '../actions'
import Post from './Post'

/*This component represent individual category*/
class Category extends Component {
	
	state = {
		sortBy:'',
		orderAsc:false
	}

	sortByDateHandler() {
		const { orderAsc } = this.state

		this.setState({orderAsc:!orderAsc,sortBy:'date'})
	}

	sortByVotesHandler() {
		const { orderAsc } = this.state

		this.setState({orderAsc:!orderAsc,sortBy:'votes'})
	}

	componentDidMount() {
		const { categoryName } = this.props

		API.get_post_for_category(categoryName).then(posts => {
			this.props.getPosts({posts,categoryName});
		})
	}

	render() {
		const { categoryName,posts } = this.props
		const { sortBy,orderAsc } = this.state

		// Check if any sorting is already applied while rendering & order posts accordingly
		if(sortBy === "votes") {
			 orderAsc ? 
			posts.sort(
				function(c1, c2){
					return c1.voteScore - c2.voteScore
			}) :
			posts.sort(
				function(c1, c2){
					return c2.voteScore - c1.voteScore
			})
		} else if(sortBy === "date") {	
			orderAsc ? 
			posts.sort(
				function(c1, c2){
					return new Date(c1.timestamp) - new Date(c2.timestamp)
			}) :
			posts.sort(
				function(c1, c2){
					return new Date(c2.timestamp) - new Date(c1.timestamp)
			})
		}
		
		return (
			<div className="container">
				<div className="card">
					<div className="card-header">
						<div className="row">
							<div className="col col-md-6">
								<Link to={"/"+categoryName} className="btn btn-default" title={categoryName}>
									<b>{categoryName.toUpperCase()}</b>
								</Link>
							</div>
							<div className="col col-md-6">
								<Link to="/post/create" className="float-right" title="Add new post">
									<i className="material-icons">add_box</i> Add New Post
								</Link>
							</div>	
						</div>
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
					<div className="card-body">
						{
							posts && posts.map((p,index) => {
								if(p.category === categoryName) {
									console.log("title::"+p.title);
									return (
										<div key={index}>
											<Post postObj={p} showComments={false}/>
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
}

function mapStateToProps({category,post,comment}, props) {
	return {
		posts: post.posts.filter(post => post.category === props.categoryName && !post.deleted)
	}
}

function mapDispatchToProps (dispatch) {
 	return {
    	getPosts: ({posts,categoryName}) => dispatch(getPostForCategory({posts,categoryName}))
  	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Category)