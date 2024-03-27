import Layout from '@/components/Layout'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
const StyledP = styled.p`
    color: #17a2b8;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-top: 50px;
`;
const StyledButton = styled.button`
    color: red;
    font-size: 16px;
    text-decoration: none;
    margin : 10px;
   
    border-radius: 4px;
    padding: 4px;
    color: white;
    border: none;
    cursor: pointer;
    color: ${props => props.primary ? 'red' : 'white'};
    background-color: ${props => props.primary ? 'white' : 'red'};
    border: 2px solid #17a2b8;
    &:hover {
        color: white;
        background-color: #17a2b8;
    }
    color: ${props => props.secondary ? 'red' : 'white'};
    background-color: ${props => props.secondary ? 'white' : 'red'};
    border: 2px solid #17a2b8;
    &:hover {
        color: white;
        background-color: #17a2b8;
    }



`;
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;

`;  
export default function DeleteProduct() {
  const [product, setProduct] = useState(null);
  const goBack = () => {
    window.history.back();
  };
  const { id } = useRouter().query;
  useEffect(() => {
    if (id === undefined) {
        return;
        }
    
       axios.get("/api/products?id=" + id).then((response) => {
        setProduct(response.data)
       });
       
    
  }, [id]);
 async function deleteProduct() {
   await axios.delete("/api/products?id=" + id).then((response) => {
      setProduct(response.data);
  
    });
      
    goBack();
  }

  return (
    <Layout>
      <StyledP>delete {product?.name}?</StyledP>
      <ButtonWrapper>
        <StyledButton
          primary
          onClick={deleteProduct}
        >
          Yes
        </StyledButton>
        <StyledButton
          secondary
          onClick={goBack}
        >
          No
        </StyledButton>
      </ButtonWrapper>
    </Layout>
  );
}
