/*import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { allBooksSelector } from "../../reducers/books";

const TopNavigation = ({ user, logout, hasBooks }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
    {hasBooks && (
      <Menu.Item as={Link} to="/books/new">
        Add new book
      </Menu.Item>
    )}
    <Menu.Menu position="right">
      <Dropdown>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);*/

/*======================================================*/

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { allBooksSelector } from "../../../reducers/books";

import { StyledHeader, StyledMenuIcon, StyledIcon } from "./style";
import Search from "../../search/search/search";

import menuLogo from "../../../img/menu.png";
import vectorGR from "../../../img/vector.png";
import permIndentity from "../../../img/perm_identity.png";

const TopNavigation = ({ user, logout, hasBooks }) => (
  <StyledHeader>
    <StyledMenuIcon src={menuLogo} alt="Menu" />
    <Link to="/">
      <StyledIcon src={vectorGR} alt="Go to main page" />
    </Link>
      <Search />
    <StyledIcon src={permIndentity} alt=""/>
  </StyledHeader>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  hasBooks: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function MapStateToProps(state) {
  return {
    user: state.user,
    hasBooks: allBooksSelector(state).length > 0
  };
}

export default connect(
  MapStateToProps,
  { logout }
)(TopNavigation);
