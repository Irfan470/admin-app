import styled from "styled-components";

import axios from "axios";
import React, { useState } from "react";
const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  textarea {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #17a2b8;
    color: white;
    cursor: pointer;
  }
  label {
    margin-top: 10px;
  }
`;
export default function ProductForm({_id, name:existingName, price:existingPrice, description:existingDescription }) {
 
  const [name, setName] = useState(existingName ||"");
  const [price, setPrice] = useState(existingPrice ||"");
  const [description, setDescription] = useState( existingDescription ||"");
  const [redirect, setRedirect] = useState(false);
  // const [image, setImage] = useState("");
  
  
 console.log({_id})
  async function saveProduct(e) {
    e.preventDefault();
    const product = {
      name,
      price,
      description,
    };
    try {
      const response = await axios.post("/api/products", product);
      setRedirect(true);
      console.log("Response:", response);
    } catch (error) {
      console.error("AxiosError:", error);
      console.log("Response Data:", error.response.data);
      console.log("Response Status:", error.response.status);
    }
  }
  if (redirect) {
    return (window.location = "/products");
  }
  return (
    
      <form onSubmit={saveProduct}>
        <ProductWrapper>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label for="img">Select image:</label>
          {/* <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></input> */}
          <button type="submit">Add Product</button>
        </ProductWrapper>
      </form>
  
  );
}



