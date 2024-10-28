import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationCard from './index';
import { APPROVED, REVIEW } from '../../../../constants';

describe('RegistrationCard', () => {
  const mockOnChangeStatus = jest.fn();
  const mockOnDeleteCard = jest.fn();

  const mockData = {
    id: '1',
    employeeName: 'John Doe',
    email: 'john.doe@example.com',
    admissionDate: '2023-10-01',
    cpf: '972.790.870-51',
    status: REVIEW,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the card with employee data', () => {
    render(<RegistrationCard data={mockData} onChangeStatus={mockOnChangeStatus} onDeleteCard={mockOnDeleteCard} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-10-01/i)).toBeInTheDocument();
  });

  test('should call onChangeStatus with REPROVED when "Reprovar" button is clicked', () => {
    render(<RegistrationCard data={mockData} onChangeStatus={mockOnChangeStatus} onDeleteCard={mockOnDeleteCard} />);

    fireEvent.click(screen.getByText(/Reprovar/i));

    expect(mockOnChangeStatus).toHaveBeenCalledWith({ id: '1', status: 'REPROVED' });
  });

  test('should call onChangeStatus with APPROVED when "Aprovar" button is clicked', () => {
    render(<RegistrationCard data={mockData} onChangeStatus={mockOnChangeStatus} onDeleteCard={mockOnDeleteCard} />);

    fireEvent.click(screen.getByText(/Aprovar/i));

    expect(mockOnChangeStatus).toHaveBeenCalledWith({ id: '1', status: 'APPROVED' });
  });

  test('should call onChangeStatus with REVIEW when "Revisar novamente" button is clicked', () => {
    const mockDataWithApprovedStatus = { ...mockData, status: APPROVED };

    render(<RegistrationCard data={mockDataWithApprovedStatus} onChangeStatus={mockOnChangeStatus} onDeleteCard={mockOnDeleteCard} />);

    fireEvent.click(screen.getByText(/Revisar novamente/i));

    expect(mockOnChangeStatus).toHaveBeenCalledWith({ id: '1', status: 'REVIEW' });
  });

  test('should call onDeleteCard when trash icon is clicked', () => {
    render(<RegistrationCard data={mockData} onChangeStatus={mockOnChangeStatus} onDeleteCard={mockOnDeleteCard} />);

    fireEvent.click(screen.getByTestId('delete-icon'));

    expect(mockOnDeleteCard).toHaveBeenCalledWith('1');
  });
});