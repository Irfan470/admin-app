import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledHeading = styled.h1`
  color: #17a2b8;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
`;
export default function EditProduct() {
  const [product, setProduct] = useState(null);
  const {id} = useRouter().query;
  useEffect(() => {
    if(id === undefined) {
      return;
    }
   
      axios.get("/api/products?id=" + id ).then((response) => {
        setProduct(response.data);
        console.log(response.data);
      });
  
  }, [id]);
  return <Layout>
    <StyledHeading>Edit Product</StyledHeading>
    {product === null ? <p>Loading...</p> : null}
    {product &&( <ProductForm {...product} />)}
    
  </Layout>;


}
