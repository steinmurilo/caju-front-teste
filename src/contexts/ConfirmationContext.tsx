import { createContext, ReactNode, useContext, useState } from 'react';
import { ConfirmationModal } from '../components/Modal/Confirmation';

type ConfirmationModalType = {
  openModal: (modalOptions: {
    title: string;
    message: string;
    onConfirm: () => void;
  }) => void;
};

const ConfirmationContext = createContext<ConfirmationModalType | undefined>(undefined);

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error('useConfirmation must be used with a ConfirmationProvider');
  }
  return context;
};

export const ConfirmationProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: (() => void) | null;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const openModal = ({ title, message, onConfirm }: { title: string; message: string; onConfirm: () => void }) => {
    setModal({
      isOpen: true,
      title,
      message,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const handleConfirm = () => {
    if (modal.onConfirm) {
      modal.onConfirm();
    }
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <ConfirmationContext.Provider value={{ openModal }}>
      {children}
      {modal.isOpen && (
        <ConfirmationModal
          title={modal.title}
          message={modal.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationContext.Provider>
  );
};