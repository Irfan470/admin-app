import Layout from "@/components/Layout";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import React, { useEffect, useState } from "react";

import styled from "styled-components";

const StyledInput = styled.input`
  padding: 10px;
  margin: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 50%;
  box-sizing: border-box;
`;
const StyledH1 = styled.h1`
  margin: 20px;
  text-align: center;
  color: #17a2b8;

  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;
const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #17a2b8;
  color: white;
  cursor: pointer;
`;
const StyledTable = styled.table`
align-items: center;
  width: 100%;
  border-collapse: collapse;
  margin: 20px;
 
  
  tr {
    border-bottom: 1px solid #ddd;
    
  }
  th {
    text-align: left;
    padding: 10px;
    color: #17a2b8;
  }
  td {
    padding: 10px;
  }

  
  ;`
export default function categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
   getCategories();
    },
      []);
    function getCategories() {
      axios.get("/api/categories").then((res) => {
        setCategories(res.data);
      });
    } 
 
  async function addCategory(e) {
    e.preventDefault();
    await axios.post("/api/categories", {
      name: input,
    });
    setInput("");
    getCategories();
  
  }
  const [input, setInput] = useState("");
  return (
    <Layout>
      <StyledH1>Categories</StyledH1>
      <form onSubmit={addCategory}>
        <StyledInput
          type="text"
          placeholder="Category Name"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <StyledButton type="submit">Add Category</StyledButton>
      </form>
      <StyledTable>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        {categories.map((category) => {
          return (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </StyledTable>
    </Layout>
  );
}
