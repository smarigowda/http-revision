import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
    }
    componentDidMount() {
        this.setState({error: false});
        console.log('[Blog] componentDidMount called...');
        axios.get('https://jsonplaceholder.typicode.com/posts')
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
                 console.log('[Blog.js] error occurred...');
                 console.log(error);
                 this.setState({error: true});
             });
    }

    selectedPostHandler = id => {
        console.log('cliked on ', id);
        this.setState({ selectedPostId: id });
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post
                        key={`${post.userId}_${post.id}`}
                        title={post.title.substring(0, 5)}
                        author={post.author}
                        clicked={() => {
                            this.selectedPostHandler(post.id);
                        }}/>
        })
        let errorMessage = null;
        if(this.state.error) {
            errorMessage = <p style={
                { textAlign: 'center',
                  color: 'red' }
            }>Error Occurred...please try again</p>;
        }
        return (
            <div>
                {errorMessage}
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;