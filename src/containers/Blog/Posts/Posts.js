import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css'

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.setState({error: false});
    axios.get('/posts')
         .then(response => {
             console.log(response);
             const posts = response.data.slice(0, 4);
             const updatedPosts = posts.map(post => {
                 return {
                     ...post,
                     author: 'Santosh'
                 }
             })
             this.setState({ posts: updatedPosts });
         })
         .catch(error => {
            console.log(error);
            //  this.setState({error: true});
         });
  }

  selectedPostHandler = id => {
    console.log('cliked on ', id);
    this.setState({ selectedPostId: id });
  }

  render() {
    const posts = this.state.posts.map(post => {
      return <Post
        key={`${post.userId}_${post.id}`}
        title={post.title.substring(0, 5)}
        author={post.author}
        clicked={() => {
          this.selectedPostHandler(post.id);
        }} />
    })
    return (
      <section className="Posts">
        {posts}
      </section>
    )
  }
}

export default Posts;

