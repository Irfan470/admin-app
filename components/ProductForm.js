import styled from "styled-components";

import axios from "axios";
import React, { useEffect, useState } from "react";
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
const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 15%;
  `

export default function ProductForm({
  _id,
  name: existingName,
  price: existingPrice,
  description: existingDescription,
  images: existingImages,
  category: existingCategory
}) {
  const [name, setName] = useState(existingName || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [redirect, setRedirect] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(existingCategory || "");
  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const response = await axios.get("/api/categories");
    setCategories(response.data);
  }
  async function saveProduct(e) {
    e.preventDefault();
    const product = {
      name,
      price,
      description,
      images,
      category: selectedCategory,
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
      }
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <ProductWrapper>
        <label>Product name</label>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Product Category</label>
        <StyledSelect
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </StyledSelect>
        <label>Product price</label>
        <input
          type="text"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Product description</label>
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
            images.map((link) => (
              <div key={link}>
                <img
                  src={link}
                  alt="product"
                />
              </div>
            ))}
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
