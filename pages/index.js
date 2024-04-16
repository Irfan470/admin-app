import Layout from '@/components/Layout'
import { useSession } from 'next-auth/react'
import React from 'react'
import styled from 'styled-components'

const UserWrapper = styled.div`
margin: 0 0 266px 0; 
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;

  
  img {
    border-radius: 10%;
    margin-top: 10px;
    width: 50px;
  }
`

export default function index() {

  const {data: session} = useSession()

  return (
    <Layout>
    <UserWrapper>
      <p>Hello, {session?.user.name}</p>
      <img src={session?.user.image} alt="user image" />
    </UserWrapper></Layout>
  )
}
