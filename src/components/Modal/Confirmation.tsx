import styled from 'styled-components';

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;

type ConfirmationModalProps = {
  title: string,
  message: string, 
  onConfirm: () => void,
  onCancel: () => void,
}

export const ConfirmationModal = ( props: ConfirmationModalProps ) => {

  const { title, message, onConfirm, onCancel } = props;

  return (
    <ModalOverlay>
      <ModalContent>
      <h2>{title}</h2>
      <p>{message}</p>
        <div>
          <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};