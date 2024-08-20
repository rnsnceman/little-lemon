

import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import BookingForm from "./BookingForm";
import { ChakraProvider } from "@chakra-ui/react";

describe("BookingForm component", () => {
  const renderComponent = () => {
    render(
      <ChakraProvider>
        <BookingForm isOpen={true} onClose={() => {}} />
      </ChakraProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renders the BookingForm heading', () => {
    renderComponent();
    const headingElement = screen.getByText(/Reserve a Table/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('Has initial value of 1', () => {
    renderComponent();
    const heading = screen.getByTestId("currentNumber");
    expect(heading.value).toBe("1");
  });

  it("Adds one guest", () => {
    renderComponent();
    const heading = screen.getByTestId("currentNumber");
    const btn = screen.getByTestId("add-one");

    fireEvent.click(btn);

    expect(heading.value).toBe("2");
  });

  it("Subtracts one guest", () => {
    renderComponent();
    const heading = screen.getByTestId("currentNumber");
    const addOneBtn = screen.getByTestId("add-one");
    const subtractOneBtn = screen.getByTestId("subtract-one");

    fireEvent.click(addOneBtn);
    fireEvent.click(subtractOneBtn);

    expect(heading.value).toBe("1");
    });

    test('displays validation errors', async () => {
    renderComponent();

    fireEvent.click(screen.getByText(/Make Your Reservation/i));

    await waitFor(() => {
    const errorMessages = screen.queryAllByText(/Required/i);
    expect(errorMessages.length).toBeGreaterThan(0);
    });
    });
});
