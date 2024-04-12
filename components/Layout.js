import styled from "styled-components";
import Header from "../components/Header";
import { useSession, signIn, signOut } from "next-auth/react";
const StyledButton = styled.button`
  background-color: #17a2b8;
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export default function Layout({children}) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
    
        <StyledButton onClick={() => signIn("google")}>
          Login with Google
        </StyledButton>
      </>
    );
  }
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
