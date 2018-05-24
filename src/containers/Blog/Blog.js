import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                    to="/"
                                    activeClassName="my-active"
                                    exact>Home</NavLink></li>
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
                    <Route path="/new-post" exact component={NewPost} />
                    <Route path="/" component={Posts} />
                </Switch>
            </div>
        );
    }
}

export default Blog;