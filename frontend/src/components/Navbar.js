import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props);


  }


  render(){
    console.log(this.props);

    return(
      <ul className="nav-bar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li><li>
          <Link to="/publicprofile">PublicProfile</Link>
        </li>
        <li>
          <Link to="/reachout">Reach Out!</Link>
        </li>
        <li>
          <Link to="/browse">Browse</Link>
        </li>
        <li>
          <Link to="/" onClick={this.props.logout}>Sign Out</Link>
        </li>
      </ul>

    )
  }
}


export default Navbar;
