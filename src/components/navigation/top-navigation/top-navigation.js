import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

import { StyledHeader, StyledIcon } from "./style";
import Search from "../../search/search/search";

import vectorGR from "../../../img/vector.png";
import permIndentity from "../../../img/perm_identity.png";

const TopNavigation = ({ user, logout, isAuthenticated }) => (
  <StyledHeader>
    <Link to="/">
      <StyledIcon src={vectorGR} alt="Go to main page" />
    </Link>
    <Search />
    {isAuthenticated ? (
      <StyledIcon src={permIndentity} alt="" />
    ) : (
      <Link
        style={{ textDecoration: "none", color: "#FFFFFF", fontSize: "1.1em" }}
        to="/login"
      >
        Login
      </Link>
    )}
  </StyledHeader>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
};

function MapStateToProps(state) {
  return {
    user: state.user,
    isAuthenticated: !!state.user.email
  };
}

export default connect(
  MapStateToProps,
  { logout }
)(TopNavigation);
