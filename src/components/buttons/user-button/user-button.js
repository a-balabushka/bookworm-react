import React, { Component } from "react";

import DropdownUserList from "../../lists/dropdown-user-list/dropdown-user-list";

import permIndentity from "../../../img/perm_identity.png";
import { StyledIcon } from "../../navigation/top-navigation/style";

class UserButton extends Component {
  state = {
    visibilityDropdownList: false
  };

  myRef = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ visibilityDropdownList: false });
    }
  };

  handleClickInside = () =>
    this.setState({ visibilityDropdownList: true });

  render() {
    const { visibilityDropdownList } = this.state;
    return (
      <div ref={this.myRef} onClick={this.handleClickInside}>
        <StyledIcon
          src={permIndentity}
          alt="User menu"
        />
        <DropdownUserList
          visibility={visibilityDropdownList}
        />
      </div>
    );
  }
}

export default UserButton;
