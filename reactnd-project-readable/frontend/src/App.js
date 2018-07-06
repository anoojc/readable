import React, { Component } from 'react'
import {Route, Switch, Link} from "react-router-dom"
import AllCategories from './components/AllCategories'
import NewPost from './components/NewPost'
import CategoryDetails from './components/CategoryDetails'
import PostDetails from './components/PostDetails'

class App extends Component {
	render() {
		return (
			<div className="App">
				<div>
					<nav className="navbar bg-dark">
						<Link to="/" className="navbar-brand font-weight-bold text-white">
							Readable
						</Link>
					</nav>
				</div>
				
				<Switch>
					<Route exact path='/' component={AllCategories}/>
					<Route exact path='/post/create' component={NewPost}/>
					<Route exact path='/:category' component={CategoryDetails}/>
					<Route exact path='/:category/:post_id' component={PostDetails}/>
					<Route path='/post/update/:postId' render={(props) => (<NewPost isUpdate={true} match={props.match}/>)}/>
				</Switch> 
			</div>
		);
	}
}

export default App;
