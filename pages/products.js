import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: red;
  font-size: 16px;
  text-decoration: none;
  margin: 10px;
  background-color: #17a2b8;
  border-radius: 4px;
  padding: 4px;
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
`;

const StyledHeading = styled.h1`
  color: #17a2b8;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-top: 50px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
  }
`;

const StyledLink2 = styled(Link)`
  color: red;
  font-size: 16px;
  text-decoration: none;
  margin: 10px 10px 10px 400px;
  background-color: #17a2b8;
  border-radius: 4px;

  padding: 4px;
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
`;
const StyledLink3 = styled(Link)`
  color: red;
  font-size: 16px;
  text-decoration: none;
  margin: 10px 10px 10px 250px;
  background-color: red;
  border-radius: 4px;
  padding: 4px;
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
`;

// Media queries for smaller display devices
const StyledLinkResponsive = styled(StyledLink)`
  @media (max-width: 768px) {
    margin: 10px 5px;
  }
`;

const StyledLink2Responsive = styled(StyledLink2)`
  @media (max-width: 768px) {
    margin: 10px 5px 10px 300px;
  }
`;
const StyledP = styled.p`
  margin: 10px;
  color: #17a2b8;
  font-size: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default function products() {
  const [products, setProducts] = useState([]);
    


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error (e.g., display error message to user)
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Layout>
        <StyledLinkResponsive href={"/products/new"}>
          Add new products
        </StyledLinkResponsive>
      </Layout>
      <StyledHeading>Products</StyledHeading>
      <StyledList>
        {products.map((product) => (
          <li key={product._id}>
            <StyledP>{product.name}</StyledP>
            
            <StyledLink2Responsive href={`/products/edit/${product._id}`}>
              Edit
            </StyledLink2Responsive>
            <StyledLink3 href={`/products/delete/${product._id}`}>
              Delete
            </StyledLink3>
          </li>
        ))}
      </StyledList>
    </>
  );
}
