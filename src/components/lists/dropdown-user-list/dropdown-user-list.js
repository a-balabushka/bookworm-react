import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/auth";

import * as S from "./style";

const DropdownUserList = ({ visibility, logout }) => {
  return visibility ? (
    <S.Container>
      <S.Item>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            fontSize: "1.1em"
          }}
          to="/dashboard"
        >
          My Books
        </Link>
      </S.Item>
      <S.Item>
        <S.Button onClick={() => logout()}>Logout</S.Button>
      </S.Item>
    </S.Container>
  ) : null;
};

export default connect(
  null,
  { logout }
)(DropdownUserList);
