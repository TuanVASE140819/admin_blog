/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 BluePink (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by BluePink
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
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
function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/sign-up" exact component={SignUp} /> */}
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route path="/manager-school/edit/:id" component={EditSchool} />
          <Route path="/manager-account/edit/:id" component={EditAccount} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/manager-school" component={Doctor} />
          <Route exact path="/manager-account" component={ManagerAccount} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          {/* <Redirect from="*" to="/sign-in" /> */}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
