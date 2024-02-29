import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import styled from "styled-components";

const StyledH1 = styled.h1`
  color: #17a2b8;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

export default function NewProduct() {
  return (
    
    <Layout>
      <StyledH1>New Product</StyledH1>
      <ProductForm />
    </Layout>
    
  );
}
