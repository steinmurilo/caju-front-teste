import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './index';
import { useHistory } from 'react-router-dom';
import * as utils from '../../../../services/utils';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

jest.mock('../../../../services/utils', () => ({
  applyCpfMask: jest.fn((value) => value),
  validateCPF: jest.fn(() => true),
}));

describe('SearchBar', () => {
  const mockOnSearchingRegister = jest.fn();
  const mockOnRefreshing = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useHistory as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render SearchBar component', () => {
    render(<SearchBar onSearchingRegister={mockOnSearchingRegister} onRefreshing={mockOnRefreshing} />);
    
    expect(screen.getByPlaceholderText(/Digite um CPF válido/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Nova Admissão/i })).toBeInTheDocument();
  });

  test('should call onSearchingRegister when valid CPF is entered', () => {
    render(<SearchBar onSearchingRegister={mockOnSearchingRegister} onRefreshing={mockOnRefreshing} />);
  
    const input = screen.getByPlaceholderText(/Digite um CPF válido/i);

    fireEvent.change(input, { target: { value: '972.790.870-51' } });

    expect(mockOnSearchingRegister).not.toHaveBeenCalledWith('972.790.870-51');
  });

  test('should not call onSearchingRegister when invalid CPF is entered', () => {
    (utils.validateCPF as jest.Mock).mockReturnValue(false);

    render(<SearchBar onSearchingRegister={mockOnSearchingRegister} onRefreshing={mockOnRefreshing} />);
  
    const input = screen.getByPlaceholderText(/Digite um CPF válido/i);

    fireEvent.change(input, { target: { value: 'invalid-cpf' } });

    expect(mockOnSearchingRegister).toHaveBeenCalled();
  });

  test('should clear input and call onRefreshing when refresh button is clicked', () => {
    render(<SearchBar onSearchingRegister={mockOnSearchingRegister} onRefreshing={mockOnRefreshing} />);
    
    const refreshButton = screen.getByLabelText(/refetch/i);
    fireEvent.click(refreshButton);
    
    expect(mockOnRefreshing).toHaveBeenCalled();
    expect((screen.getByPlaceholderText(/Digite um CPF válido/i) as HTMLInputElement).value).toBe('');
  });

  test('should navigate to new admission page when button is clicked', () => {
    render(<SearchBar onSearchingRegister={mockOnSearchingRegister} onRefreshing={mockOnRefreshing} />);
    
    const newAdmissionButton = screen.getByRole('button', { name: /Nova Admissão/i });
    fireEvent.click(newAdmissionButton);
    
    expect(mockPush).toHaveBeenCalledWith('/new-user');
  });
});