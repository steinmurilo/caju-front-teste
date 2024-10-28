import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Columns from './index';
import { APPROVED, REPROVED, REVIEW } from '../../../../constants';

describe('Columns', () => {
  const mockOnChangeStatus = jest.fn();
  const mockOnDeleteRegister = jest.fn();

  const mockRegistrations = [
    {
      id: '1',
      employeeName: 'John Doe',
      email: 'john.doe@example.com',
      admissionDate: '2023-10-01',
      cpf: '972.790.870-51',
      status: REVIEW,
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      email: 'jane.smith@example.com',
      admissionDate: '2023-09-15',
      cpf: '972.790.870-51',
      status: APPROVED,
    },
    {
      id: '3',
      employeeName: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      admissionDate: '2023-08-20',
      cpf: '972.790.870-51',
      status: REPROVED,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the columns with correct registration cards', () => {
    render(
      <Columns 
        registrations={mockRegistrations} 
        onChangeStatus={mockOnChangeStatus} 
        onDeleteRegister={mockOnDeleteRegister} 
      />
    );

    expect(screen.getByText(/Pronto para revisar/i)).toBeInTheDocument();
    expect(screen.getByText(/Aprovado/i)).toBeInTheDocument();
    expect(screen.getByText(/Reprovado/i)).toBeInTheDocument();
    
    // Check if the cards are rendered correctly
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Alice Johnson/i)).toBeInTheDocument();
  });

  test('should call onChangeStatus when changing status', () => {
    render(
      <Columns 
        registrations={mockRegistrations} 
        onChangeStatus={mockOnChangeStatus} 
        onDeleteRegister={mockOnDeleteRegister} 
      />
    );

    // Simule a mudança de status
    const approveButton = screen.getAllByRole('button', { name: /Aprovar/i })[0];
    fireEvent.click(approveButton);

    expect(mockOnChangeStatus).toHaveBeenCalledWith({ id: '1', status: APPROVED });
  });

  test('should call onDeleteRegister when delete button is clicked', () => {
    render(
      <Columns 
        registrations={mockRegistrations} 
        onChangeStatus={mockOnChangeStatus} 
        onDeleteRegister={mockOnDeleteRegister} 
      />
    );

    const deleteIcon = screen.getAllByTestId('delete-icon')[0];
    fireEvent.click(deleteIcon);

    expect(mockOnDeleteRegister).toHaveBeenCalledWith('1');
  });
});