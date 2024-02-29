import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
    background-color: #17a2b8;
    padding: 10px;
`;

const NavList = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const NavItem = styled.li`
    margin-right: 10px;
`;

const NavLink = styled.a`
    text-decoration: none;
    padding: 5px;
    color: #333;

    &:hover {
        color: #000;
        font-weight: bold;
    }
`;

const Header = () => {
    return (
      <NavContainer>
        <NavList>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/orders">Orders</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="products">Products</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="categories">Categories</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Login</NavLink>
          </NavItem>
        </NavList>
      </NavContainer>
    );
};

export default Header   ;