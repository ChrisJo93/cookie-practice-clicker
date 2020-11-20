import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    clickCount: 0,
    username: '',
    usernameIsEditable: false,
  };

  componentDidMount() {
    this.getCount();
    this.getUsername();
  }

  // Adding a click means adding to the number that lives on the server
  // We'll POST here
  handleClick = () => {
    axios
      .post('/add-click')
      .then(() => this.getCount())
      .catch((error) => {
        console.log('error making add click post', error);
      });
  };

  saveUsername = (event) => {
    const username = this.state.username;
    this.postUsername(username);
    this.setState({
      usernameIsEditable: false,
    });
  };

  postUsername = (user) => {
    axios
      .post('/add-username', { username: user })
      .then(() => this.getUsername())
      .catch((error) => {
        console.log('error in name post');
      });
  };

  getUsername = () => {
    axios
      .get('/get-username')
      .then((response) => {
        this.setState({
          username: response.data.username,
        });
      })
      .catch((error) => {
        console.log('error adding username', error);
      });
  };

  // Our actual count lives on the server in a session.
  // We need to GET that count
  getCount = () => {
    axios
      .get('/get-clicks')
      .then((response) => {
        this.setState({
          clickCount: response.data.totalClicks,
        });
      })
      .catch((error) => {
        console.log('error making add click post', error);
      });
  };

  editUsername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  };

  handleNameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          <p>
            {this.state.username}
            {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
            {this.state.usernameIsEditable ? (
              <span>
                <input placeholder="feed me" onChange={this.handleNameChange} />
                <button onClick={this.saveUsername}>Save Username</button>{' '}
              </span>
            ) : (
              <button onClick={this.editUsername}>Edit Username</button>
            )}
          </p>
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{ fontSize: '100px', cursor: 'pointer' }}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
