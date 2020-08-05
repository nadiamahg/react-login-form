import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <div className="limiter">
          <div className="page-container">
              <div className="wrap">
                  <Link to="/" className="btn-flat waves-effect">
                      <i className="material-icons left">keyboard_backspace</i> Back to login
                   </Link>
                  <span className="page-title"><b>You are NOT logged in!</b></span>
              </div>
            </div>
          </div> 
        )
    }
  />
);
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);