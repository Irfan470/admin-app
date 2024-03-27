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
  ${(props) =>
    props.delete &&
    `
    background-color: red;
  `}
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
`;
export default function categories() {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState("");
  const [editCat, setEditCat] = useState(null);
  useEffect(() => {
    getCategories();
  }, []);
  function getCategories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }

  async function addCategory(e) {
    e.preventDefault();
    const data = { name: input };
    if(editCat){
      await axios.put("/api/categories", {
        ...data,
        _id:editCat._id,
        
      });
      setEditCat(false)
    }else{ await axios.post("/api/categories", 
     data   
    );}
   
    setInput("");
    getCategories();
  }
  
  async function editCategory(category) {
    setInput(category.name);
    setEditCat(category)
  }
  async function deleteCategory(category){
    alert("Are you sure you want to delete this category?")
    await axios.delete("/api/categories",{
      data:{_id:category._id}
    })
    getCategories()
  }
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
        <StyledButton type="submit" >{ editCat? "Save" : "Add Category"}</StyledButton>
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
                <StyledButton onClick={() => editCategory(category)}>Edit</StyledButton>
                <StyledButton delete onClick={()=> deleteCategory(category)} >Delete</StyledButton>
              </td>
            </tr>
          );
        })}
      </StyledTable>
    </Layout>
  );
}
