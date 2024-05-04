import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Chat from "./pages/Chat";
import Blog from "./pages/Blog";
import Doctor from "./pages/manager-school";
import EditSchool from "./pages/Edit-school";
import EditAccount from "./pages/Edit-Account";
import ManagerAccount from "./pages/manager-account";
import ManagerNews from "./pages/manager-news";
import newDetail from "./pages/news-detail";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/sign-in" />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <PrivateRoute exact path="/dashboard" component={Home} />
          <PrivateRoute
            path="/manager-school/edit/:id"
            component={EditSchool}
          />
          <PrivateRoute
            path="/manager-account/edit/:id"
            component={EditAccount}
          />
          <PrivateRoute exact path="/tables" component={Tables} />
          <PrivateRoute exact path="/chat" component={Chat} />
          <PrivateRoute exact path="/new-detail" component={newDetail} />
          <PrivateRoute exact path="/manager-school" component={Doctor} />
          <PrivateRoute
            exact
            path="/manager-account"
            component={ManagerAccount}
          />
          <PrivateRoute exact path="/blog" component={Blog} />
          <PrivateRoute exact path="/manager-news" component={ManagerNews} />
          <PrivateRoute exact path="/billing" component={Billing} />
          <PrivateRoute exact path="/rtl" component={Rtl} />
          <PrivateRoute exact path="/profile" component={Profile} />
          {/* <Redirect from="*" to="/sign-in" /> */}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
