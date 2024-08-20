import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from './ConfirmModal';
import { ChakraProvider } from '@chakra-ui/react';

describe('ConfirmModal', () => {

    const mockOnClose = jest.fn();
    const confirmationModal = {
      isOpen: true,
      onClose: mockOnClose
    };
    const resetForm = jest.fn()
    const data = {
        time: "17:00"
    }

   const renderComponent = () => render(
        <ChakraProvider>
          <ConfirmModal
            confirmationModal={confirmationModal}
            resetForm={resetForm}
            data={data}
          />
        </ChakraProvider>
      );


  it('renders the modal with correct content when open', () => {
    renderComponent()

    expect(screen.getByText(/Thank you for booking/i)).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveStyle(`background-color: #EEEFEE`);
    expect(screen.getByText(/Your table is reserved for 17:00! See you then./i)).toBeInTheDocument();
  });

  it('closes the modal', () => {
    renderComponent()
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
   
  })
});
