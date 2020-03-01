import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
//  import cart from "./components/cart";
import profile from "./components/Profile";
import search from "./components/search";
import history from "./components/history";
import register from "./components/register";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

class AppWithRouter extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/home/" component={App} />
        <Route exact path="/home/product" component={profile} />
        <Route exact path="/home/search" component={search} />
        <Route exact path="/home/history" component={history} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={register} />
      </Router>
    );
  }
}

const AppWithRedux = () => {
  return (
    <Provider store={store}>
      <AppWithRouter />
    </Provider>
  );
};

ReactDOM.render(<AppWithRedux />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
