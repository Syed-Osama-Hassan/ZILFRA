import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../button";
import { Logo } from "../logo";
import { Marginer } from "../marginer";

const NavbarContainer = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BrandContainer = styled.div``;

const AccessibilityContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export function Navbar(props) {
  return (
    <NavbarContainer>
      <BrandContainer>
        <Logo inline />
      </BrandContainer>
      <AccessibilityContainer>
        <NavLink to="/login">
          <Button small>Get Started</Button>
        </NavLink>
        <Marginer direction="horizontal" margin="8px" />
      </AccessibilityContainer>
    </NavbarContainer>
  );
}
