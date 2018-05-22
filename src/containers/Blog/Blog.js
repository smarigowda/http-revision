import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
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
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-port">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                {errorMessage}
                <section className="Posts">
                    {posts}
                </section>
            </div>
        );
    }
}

export default Blog;