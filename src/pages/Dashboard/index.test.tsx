import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from './index';
import { LoadingProvider } from '../../contexts/LoadingContext';
import { ConfirmationProvider } from '../../contexts/ConfirmationContext';
import api from '../../services/api';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/api');

const mockData = [
  { id: '1', employeeName: 'John Doe', email: 'john@example.com', admissionDate: '2024-10-27', cpf: '972.790.870-51', status: 'REVIEW' },
];

describe('DashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = () => (
    render(
      <LoadingProvider>
        <ConfirmationProvider>
          <MemoryRouter>
            <DashboardPage />
          </MemoryRouter>
        </ConfirmationProvider>
      </LoadingProvider>
    )
  )

  test('should render the DashboardPage with SearchBar and Columns', () => {
    renderWithProviders();

    expect(screen.getByPlaceholderText(/Digite um CPF válido/i)).toBeInTheDocument();
    expect(screen.getByText(/Pronto para revisar/i)).toBeInTheDocument();
  });

  test('should fetch and display registrations', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });
  
    renderWithProviders();
  
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('registrations');
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  test('should call handleRefresh when refreshing', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    renderWithProviders();

    const refreshButton = (screen.getByTestId('refresh-icon'));
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledTimes(2);
    });
  });

});