import React, { Component } from "react";
import HeadFoot from "./components/HeadFoot";
// import Cart from "./components/cart";
// import { contextApp } from "./contexts/state";
import "./App.css";
// import { Link } from "react-router-dom";
// import plus from "./image/plus.jpg"
// import minus from "./image/minus.jpg"
class HelloMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusNow: ""
    };
   // this.statusNow = this.statusNow.bind(this);
    // this.id_add = this.id_add.bind(this);
  }

 

  render() {
    return (
      <div className="wrapper">
        <div></div>
        

        <div>
          <HeadFoot title="Header" />
        </div>
      </div>
    );
  }
}

export default HelloMessage;
