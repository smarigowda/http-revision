import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css'

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    console.log(this.props);
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
      return (
          <Link to={ '/' + post.id } key={`${post.userId}_${post.id}`}>
            <Post
              title={post.title.substring(0, 50)}
              author={post.author}
              clicked={() => {
                this.selectedPostHandler(post.id);
              }}
            />
          </Link>
      );
    });
    return (
      <section className="Posts">
        {posts}
      </section>
    )
  }
}

export default Posts;

