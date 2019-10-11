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
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { allBooksSelector } from "../../reducers/books";

import Search from "../search/search";

import menuLogo from "../../img/menu.png";
import vectorGR from "../../img/vector.png";
import notificationNone from "../../img/notifications_none.png";
import permIndentity from "../../img/perm_identity.png";

const Header = styled.header`
  position: absolute;
  width: 100%;
  height: 50px;
  left: 0px;
  top: 0px;
  
  background: #414141
`;

const MenuImg = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 15px;
  top: 11px;
`;

const VectorGR = styled.img`
  position: absolute;
  width: 33px;
  height: 33px;
  left: 89px;
  top: 7px;
`;

const Notification = styled.img`
  position: absolute;
  width: 26px;
  height: 26px;
  left: 1272px;
  top: 11px;
`;

const PermIndentity = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  left: 1313px;
  top: 9px;
`;

const SearchPanel = styled.div`
  position: absolute;
  left: 200px
  top: 12px
  
  font-family: Sahitya;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 17px;
  
  color: #C4C4C4;
`;

const TopNavigation = ({ user, logout, hasBooks }) => (
  <Header>
    <MenuImg src={menuLogo} alt="Menu" />
    <Link to="/">
      <VectorGR src={vectorGR} alt="Go to main page" />
    </Link>
    <SearchPanel>
      <Search />
    </SearchPanel>
    <Notification src={notificationNone} alt="Your notification" />
    <PermIndentity src={permIndentity} alt=""/>
  </Header>
);

/*======================================================*/

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
