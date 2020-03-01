import React from "react";
// import { contextApp } from "../contexts/state";
import { Link } from "react-router-dom";
import "../styles/HeadFoot.css";

const HeadFoot = props => {
  return (
    <div className="main">
      <div>
        <div>
          <Link to="/login">
            <img
              src="https://cdn1.vectorstock.com/i/1000x1000/26/00/coffee-shop-logo-template-coffee-cup-or-tea-vector-17872600.jpg"
              alt="cofee"
              className="image1"
            />
          </Link>
        </div>
      </div>
      <div className="sidebar">
        <Link to="/home/product">
          <img
            type="image"
            src=" https://lh5.googleusercontent.com/proxy/EFSJacGkNqweR0CqJRx1i8tDj-1k36M8iVTQalU3tZr5hyjnnQSZadfAfV_pjlT5D3E-DSYDTPyJkq17lEz0bWJYdBcQ4ILom2d0XtaQ6KBXT8U9dWOE-mLvJhQ=w1200-h630-p-k-no-nu"
            alt="cofee"
            className="image2"
          />
        </Link>
      </div>
      <Link to="/home/search">
        <img
          type="image"
          src="data:image/png;base64,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"
          alt="cofee"
          className="image3"
        />
      </Link>
      <Link to="/home/history">
        <img
          type="image"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTQmw-95_aNWavjK4WikroUp4VAkMECApfE0wroM4WYwH4W_nY"
          alt="cofee"
          className="image4"
        />
      </Link>
    </div>
  );
};

// HeadFoot.contextType = contextApp;

export default HeadFoot;
