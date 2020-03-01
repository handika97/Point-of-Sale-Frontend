import React, { Fragment } from "react";
import "../styles/register.css";
import Axios from "axios";
import { Link } from "react-router-dom";
//import Axios from "axios"

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      password: "",
      errors: { nama: "", password: "" },
      login: ""
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    // this.onSubmitButton = this.onSubmitButton.bind(this);
  }
  onChangeValue = e => {
    e.preventDefault();
    const { name, value } = e.target; // { ...this.state.loginUser };
    // usernew[e.target.name] = e.target.value;
    let errors = this.state.errors;

    switch (name) {
      case "nama":
        errors.nama =
          value.length < 5 ? "Username must be 5 characters long!" : "";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  //  this.setState({
  //     loginUser: usernew
  //   });
  // };
  register = e => {
    Axios.post("http://localhost:4002/api/v1/user/register", {
      nama: this.state.nama,
      password: this.state.password
    }).then(res => {
      if (res.data) {
        window.location.href = "http://localhost:3000/login";
      }
    });
  };

  render() {
    localStorage.clear();
    const validateForm = errors => {
      let valid = true;
      Object.values(errors).forEach(val => val.length > 0 && (valid = false));
      return valid;
    };
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
                  noValidate
                />
                {this.state.errors.nama.length > 0 && (
                  <span className="error">{this.state.errors.nama}</span>
                )}
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  onChange={this.onChangeValue}
                  noValidate
                />
                {this.state.errors.password.length > 0 && (
                  <span className="error">{this.state.errors.password}</span>
                )}
              </div>
              {this.state.nama.length >= 5 &&
              this.state.password.length >= 8 &&
              validateForm(this.state.errors) ? (
                <Link to="/login">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={this.register}
                  >
                    Register
                  </button>
                </Link>
              ) : (
                <button type="submit" class="btn btn-primary">
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Register;
