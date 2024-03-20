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
const StyledImageContainer = styled.div`
  display: flex;
  gap: 10px;
  img {
    border-radius: 5px;
    width: 70px;
    height: 100px;

  }
`;
export default function ProductForm({
  _id,
  name: existingName,
  price: existingPrice,
  description: existingDescription,
  images: existingImages,
}) {
  const [name, setName] = useState(existingName || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [redirect, setRedirect] = useState(false);
  const [images, setImages] = useState(existingImages || []);

  console.log({ _id });
  async function saveProduct(e) {
    e.preventDefault();
    const product = {
      name,
      price,
      description,
      images,
    };

    if (_id) {
      try {
        const response = await axios.put("/api/products", { ...product, _id });
        console.log("Response:", response);
      } catch (error) {
        console.error("AxiosError:", error);
      }
    } else {
      try {
        const response = await axios.post("/api/products", product);

        console.log("Response:", response);
      } catch (error) {
        console.error("AxiosError:", error);
      }
    }
    setRedirect(true);
  }

  if (redirect) {
    return (window.location = "/products");
  }
  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      const formData = new FormData();

      for (const file of files) {
        formData.append("file", file);
      }
      const res = await axios.post("/api/upload", formData);
  const form = e.target.form;
  if (form) {
    form.reset();
  }      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
     
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
        {!images?.length && <p>No image selected</p>}
        <StyledImageContainer>
          {!!images?.length &&
            images.map((link) => <div key={link}>
            <img src={link} alt="product"  />
            </div>)}
        </StyledImageContainer>
        <input
          type="file"
          accept="image/*"
          onChange={uploadImages}
        ></input>
        <button type="submit">Add Product</button>
      </ProductWrapper>
    </form>
  );
}
