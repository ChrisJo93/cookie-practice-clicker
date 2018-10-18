import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link
} from 'react-router-dom';

import {connect} from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Header from './components/Header/Header';
import AboutPage from './components/About/About';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';

import './styles/main.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Header title="Project Base" />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route
              path="/about"
              component={AboutPage}
            />
            <ProtectedRoute
              path="/home"
              component={UserPage}
            />
            <ProtectedRoute
              path="/info"
              component={InfoPage}
            />
            {/* OTHERWISE (no path!) */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <footer>
            <Link to='/home'>Home</Link>
            {' '}
            <Link to='/about'>About</Link>
          </footer>
        </div>
      </Router>
  )}
}

export default connect()(App);
