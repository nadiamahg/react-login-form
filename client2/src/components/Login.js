import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import image from '../images/img-01.png';
import Tilt from 'react-tilt'
export class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    componentDidMount() {
      // If logged in and user navigates to Login page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/dashboard"); // Redirect to dashboard when they log in
      }
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.login(userData);
    };
    render() {
        const { errors } = this.state;
        return (
          <div className="limiter">
            <div className="page-container">
              <div className="wrap">
                <div className="login-pic">
                  <Tilt className="Tilt dashboard-img" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
                    <div className="Tilt-inner"> <img src={image} alt="IMG"/></div>
                  </Tilt>
                </div>
                <form className="login-form" onSubmit={this.onSubmit}>
                  <span className="page-title">
                    Login
                  </span>
                  <div className="wrap-input">
                    <input onChange={this.onChange} value={this.state.email} className="input" type="text" id="email" placeholder="Email"/>
                    <div className="login-error red-text" id="emailError">{errors.email}</div>
                  </div>
                  <div className="wrap-input">
                    <input onChange={this.onChange} value={this.state.password} className="input" type="password" id="password" placeholder="Password"/>
                    <div className="login-error red-text" id="passwordError">{errors.password}</div>
                  </div>
                  <div className="container-btn">
                    <button type="submit" className="page-btn">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
    }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { login }
)(Login);