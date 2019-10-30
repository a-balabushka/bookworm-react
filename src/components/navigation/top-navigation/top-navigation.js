import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Search from "../../search/search/search";
import UserButton from "../../buttons/user-button/user-button";

import vectorGR from "../../../img/vector.png";

import { StyledHeader, StyledIcon } from "./style";

const TopNavigation = ({ isAuthenticated }) => (
  <StyledHeader>
    <Link to="/">
      <StyledIcon src={vectorGR} alt="Go to main page" />
    </Link>
    <Search />
    {isAuthenticated ? (
      <UserButton />
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

function mapStateToProps(state) {
  return {
    user: state.user,
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(TopNavigation);
