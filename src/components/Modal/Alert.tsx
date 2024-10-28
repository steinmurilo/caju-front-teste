import { HiX } from "react-icons/hi";
import styled from "styled-components";

interface AlertProps {
  variant: 'default' | 'success' | 'alert' | 'error';
}

const AlertContainer = styled.div<AlertProps>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: gray; 
  color: white;
  padding: 1rem;
  width: 50rem;
  border-radius: 5px;
  z-index: 1000;
  background-color: ${(props) => {
    switch (props.variant) {
      case 'success':
        return '#4caf50';
      case 'alert':
        return '#c2b32e';
      case 'error':
        return '#f44336';
      default:
        return '#747474';
  }
}}
`;

const AlertContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: inherit;
  }
`;

type AlertModalProps = {
  message: string,
  variant: 'default' | 'success' | 'alert' | 'error'
  onClose: () => void,
}

export const Alert = (props: AlertModalProps) => {
  const { message, variant, onClose } = props



  return (
    <AlertContainer variant={variant}>
      <AlertContent>
        <span>{message}</span>
        <button onClick={onClose}><HiX size={18} /></button>
      </AlertContent>
    </AlertContainer>
  );
};