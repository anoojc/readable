const host = 'http://localhost:3001/' || `${process.env.REACT_APP_BACKEND}/`;

const headers = {
    'Authorization': 'whatever-you-want',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

export const get_all_categories = () => {
	const url = host + 'categories';
	return fetch(url,
	    {
	        headers
	    }).then((res)=>res.json())
}

export const get_post_for_category = (categoryName) => {
	const url = host +categoryName+'/posts';
	return fetch(url,
	    {
	        headers
	    }).then((res)=>res.json())
}

export const get_all_posts = () => {
	const url = host +'posts';
	return fetch(url,
	    {
	        headers
	    }).then((res)=>res.json())
}

export const add_new_post = ({id,timestamp,title,body,author,category}) => {
	const url = host +'posts';
    return fetch(url, 
    	{
    		method: 'post', 
    		headers, 
    		body: JSON.stringify({id, timestamp, title, body, author, category})
    	}).then(res => res.json())
}

export const get_post = (post) => {
	const url = host +'posts/'+post;
	return fetch(url,
	    {
	        headers
	    }).then((res)=>res.json())
}

export const upvote_post = (post) => {
	const url = host +'posts/'+post;
	return fetch(url,
	    {
	    	method: 'post',
	    	headers,
	    	body: JSON.stringify({option: "upVote"})
	    }).then((res)=>res.json())
}

export const downvote_post = (post) => {
	const url = host +'posts/'+post;
	return fetch(url,
	    {
	    	method: 'post',
	    	headers,
	    	body: JSON.stringify({option: "downVote"})
	    }).then((res)=>res.json())
}

export const edit_post = (post,{title,body}) => {
	const url = host +'posts/'+post;
	return fetch(url,
	    {
	    	method: 'put',
	    	headers,
	    	body: JSON.stringify({title,body})
	    }).then((res)=>res.json())
}

export const delete_post = (post) => {
	const url = host +'posts/'+post;
	return fetch(url,
	    {
	    	method: 'delete',
	    	headers,
	    }).then((res)=>res.json())
}

export const get_comments_for_post = (post) => {
	const url = host +'posts/'+post+'/comments';
	return fetch(url,
	    {
	        headers
	    }).then((res)=>res.json())
}

export const add_new_comment = ({id,timestamp,body,author,parentId}) => {
	const url = host +'comments';
	return fetch(url,
	    {
	    	method: 'post',
	    	headers,
	    	body: JSON.stringify({id,timestamp,body,author,parentId})
	    }).then((res)=>res.json())
}

export const get_comment = (comment) => {
	const url = host +'comments/'+comment;
	return fetch(url,
	    {
	        headers
	    }).then((res)=>res.json())
}

export const upvote_comment = (comment) => {
	const url = host +'comments/'+comment;
	return fetch(url,
	    {
	    	method: 'post',
	    	headers,
	    	body: JSON.stringify({option: "upVote"})
	    }).then((res)=>res.json())
}

export const downvote_comment = (comment) => {
	const url = host +'comments/'+comment;
	return fetch(url,
	    {
	    	method: 'post',
	    	headers,
	    	body: JSON.stringify({option: "downVote"})
	    }).then((res)=>res.json())
}

export const edit_comment = (comment,{timestamp,body}) => {
	const url = host +'comments/'+comment;
	return fetch(url,
	    {
	    	method: 'put',
	    	headers,
	    	body: JSON.stringify({timestamp,body})
	    }).then((res)=>res.json())
}

export const delete_comment = (comment) => {
	const url = host +'comments/'+comment;
	return fetch(url,
	    {
	    	method: 'delete',
	        headers
	    }).then((res)=>res.json())
}