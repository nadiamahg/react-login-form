import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

export class Dashboard extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/"); // Redirect to Login page after logging out
    };


    render() {
        const { user } = this.props.auth;
        return (
            <div className="limiter">
                <div className="page-container">
                    <div className="wrap">
                        <span className="page-title"><b>You are logged in!</b></span>
                        <div className="user-info">
                            <div id="userEmail"><i className="material-icons user-icon">email</i><b>Email:</b> {user.email}</div>
                            <div id="userAge"><i className="material-icons user-icon">face</i><b>Age:</b> {user.age}</div>
                            <div id="userIsAdmin"><i className="material-icons user-icon">admin_panel_settings</i><b>isAdmin:</b> {user.isAdmin + ""}</div>
                        </div>
                        <div className="container-btn">
                            <button onClick={this.onLogoutClick} className="page-btn dashboard-container">
                                Logout
                             </button>
                         </div>
                
                    </div>
                </div>
          </div> 
        );
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps, { logoutUser }
)(Dashboard);