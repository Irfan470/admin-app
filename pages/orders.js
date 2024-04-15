import { StyledH1 } from '@/components/Heading';
import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
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
  @media (max-width: 768px) {
    th {
      display: none;
    }
    @media (max-width: 768px) {
      padding: 1px;
    }
    td {
      display: block;
    }
  }
`;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
    

  }
  , []);

  return (
    <Layout>
      <StyledH1>Orders</StyledH1>
      <StyledTable>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>
                {order.line_items.map((item) => (
                  <>
                    {item.price_data.product_data.name}X {item.quantity}
                    <br />
                  </>
                ))}
              </td>
              <td>{order.name}</td>
              <td>{order.createdAt.replace("T", " ").substring(0, 16)}</td>
              <td>{order.paid}</td>
              <td>
                <a href={`/orders/${order._id}`}>View</a>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Layout>
  );
}
