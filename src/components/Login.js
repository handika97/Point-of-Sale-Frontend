import React, { Fragment } from "react";
import "../styles/Login.css";
import Axios from "axios";
import { Link } from "react-router-dom";
//import Axios from "axios"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: { nama: "", password: "" },
      login: "",
      token: "",
      userData: []
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSubmitButton = this.onSubmitButton.bind(this);
  }
  onChangeValue(e) {
    let usernew = { ...this.state.loginUser };
    usernew[e.target.name] = e.target.value;
    this.setState({
      loginUser: usernew
    });
  }
  onSubmitButton(e) {
    e.preventDefault();
    Axios.post("http://localhost:4002/api/v1/user/", {
      nama: this.state.loginUser.nama,
      password: this.state.loginUser.password
    }).then(res => {
      console.log(res);
      if (res.data.token) {
        localStorage.setItem(
          "status",
          JSON.stringify({
            login: false,
            token: res.data.token
          })
        );
        localStorage.setItem("user", this.state.loginUser.nama);
        window.location.href = "http://localhost:3000/home/product";
      }
    });
    this.userData = JSON.parse(localStorage.getItem("status"));
  }
  componentDidMount() {
    // if (!localStorage.getItem("status")) {
    //   window.location.href = "http://localhost:3000/home/product";
    // }
  }

  render() {
    localStorage.clear();
    return (
      <Fragment>
        <div className="container-login">
          <div className="box-login">
            <form>
              <div class="form-group">
                <label>Username</label>
                <input
                  type="text"
                  class="form-control"
                  name="nama"
                  onChange={this.onChangeValue}
                />
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  onChange={this.onChangeValue}
                />
              </div>
              <div style={{ justifyContent: "center" }}>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={this.onSubmitButton}
                >
                  Submit
                </button>
                <div style={{ margin: 5 }}>
                  <text>Already have an account?</text>
                  <Link to="/register">
                    <button class="btn btn-primary">Sign Up</button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
//localStorage.clear();
export default Login;
