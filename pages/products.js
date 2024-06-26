import { StyledH1 } from "@/components/Heading";
import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledLink = styled(Link)`
  font-size: 16px;
  text-decoration: none;
  margin: 10px 20px;
  background-color: #17a2b8;
  border-radius: 4px;
  padding: 4px;
  color: white;
  border: none;
  cursor: pointer;
  @media (max-width: 768px) {
    margin: 10px 5px;
    display: flex;
    justify-content: center;
  }
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px;

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

const StyledLink2Responsive = styled(StyledLink2)`
  @media (max-width: 768px) {
    margin: 10px 5px 10px 200px;
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
        <StyledH1>Products</StyledH1>
        <StyledLink href={"/products/new"}>Add new products</StyledLink>

        <StyledList>
          {products.map((product) => (
            <li key={product._id}>
              <StyledP>{product.title}</StyledP>

              <StyledLink2Responsive href={`/products/edit/${product._id}`}>
                Edit
              </StyledLink2Responsive>
              <StyledLink3 href={`/products/delete/${product._id}`}>
                Delete
              </StyledLink3>
            </li>
          ))}
        </StyledList>
      </Layout>
    </>
  );
}
