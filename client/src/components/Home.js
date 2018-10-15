import React, { Component } from 'react';
import Signout from './Auth/Signout';

class Home extends Component {
  render() {
    return (
      
      <div className="Home">
      home 
      {localStorage.getItem('firstname') && <div>
        <p>Signed in as: {localStorage.getItem('firstname')}</p>
        <Signout />  
        </div>
       }
      </div>
    );
  }
}

export default Home;
