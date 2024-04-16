import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #17a2b8;
  ;
  padding: 20px;
  display: flex;
  justify-content: center;
  margin: 0 0 20px 0;
  border-bottom: 1px solid #ddd;
 padding: 20px;
 
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const NavList = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 5px;
    }

`;

const NavItem = styled.li`
    margin-right: 10px;
`;

const NavLink = styled.a`
  text-decoration: none;
  padding: 5px;
  color: #333;
  ${(props) =>
    props.isActive &&
    `

    color: #17a2b8;
    font-weight: bold;
    background: #fff;
    border-radius: 16px;
    padding: 2px 10px;
      @media (max-width: 768px) {
        padding: 1px;
        border-radius: 8px;
       
    }


  `}

  &:hover {
    color: #000;
    font-weight: bold;
  }
 
`;
const StyledLogoutButton = styled.button`
    background-color: #333;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 16px;
  
  
   
    &:hover {
        background-color: #000;
    }
    
    
    


    `;


const Header = () => {
  const router = useRouter();
  
  
    return (
      <NavContainer>
        <NavList>
          <NavItem>
            <NavLink
              href="/"
              isActive={router.pathname === "/"}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/orders"
              isActive={router.pathname === "/orders"}
            >
              Orders
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/products"
              isActive={router.pathname === "/products"}
            >
              Products
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/categories"
              isActive={router.pathname === "/categories"}
            >
              Categories
            </NavLink>
          </NavItem>
          <StyledLogoutButton onClick={() => signOut()}>
            Logout
          </StyledLogoutButton>
        </NavList>
      </NavContainer>
    );
};

export default Header;