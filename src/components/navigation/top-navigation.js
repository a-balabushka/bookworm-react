import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gravatarUrl from "gravatar-url";
import { FormattedMessage } from 'react-intl';
import { logout } from "../../actions/auth";
import { setLocale } from "../../actions/locale";
import { allBooksSelector } from "../../reducers/books";

const TopNavigation = ({ user, logout, hasBooks, setLocale }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      <FormattedMessage id="nav.dashboard" defaultMessage="Dashboard" />
    </Menu.Item>
    {hasBooks && (
      <Menu.Item as={Link} to="/books/new">
        Add new book
      </Menu.Item>
    )}
    <Menu.Menu position="right">

      <a role="button" onClick={() => setLocale('en')}>EN</a> |
      <a role="button" onClick={() => setLocale('ru')}>RU</a>

      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  hasBooks: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  setLocale: PropTypes.func.isRequired
};

function MapStateToProps(state) {
  return {
    user: state.user,
    hasBooks: allBooksSelector(state).length > 0
  };
}

export default connect(
  MapStateToProps,
  { logout, setLocale }
)(TopNavigation);
