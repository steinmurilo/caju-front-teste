import styled, { keyframes } from "styled-components";
import { useLoading } from "../../contexts/LoadingContext";


export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  border: 8px solid #e80536;
  border-radius: 50%;
  border-top: 8px solid #ff7700;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export const Loader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return(
    <LoadingOverlay>
      <LoadingSpinner />
    </LoadingOverlay>
  )
};