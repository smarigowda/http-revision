import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
})
class Blog extends Component {
    state = {
        auth: true
    }
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                    to="/posts"
                                    activeClassName="my-active"
                                    exact>Posts</NavLink></li>
                            {/* <li><NavLink to="/new-post">New Post</NavLink></li> */}
                            <li><NavLink to={
                                {
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'    
                                }
                            }
                            exact >New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={ () => { return <h1>Home...</h1> } } />
                <Route path="/" render={ () => { return <h1>Home 2...</h1> } } /> */}
                <Switch>
                    { this.state.auth ? <Route path="/new-post" exact component={ AsyncNewPost } /> : null }
                    <Route path="/posts" component={Posts} />
                    <Redirect from="/" exact to="/posts" />
                    <Route render={ () => <h1>Not Found</h1>} />
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;