import {
  VStack,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { fetchAPI, submitAPI } from "../api/api";
import * as Yup from "yup";

const BookingForm = ({ isOpen, onClose }) => {
  const confirmationModal = useDisclosure();
  const currentDate = new Date().toLocaleDateString();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formValues, setFormValues] = useState({
    firstName: "",
    email: "",
    date: "",
    guests: 1,
    time: '',
    occasion: "",
  });
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    date: Yup.date("Choose a date")
      .min(currentDate, ({ min }) => `Date needs to be ${formatDate(min)} or later`)
      .required("Required"),
    guests: Yup.number()
      .min(1, "Must be at least 1 guest")
      .max(20, "The maximum amount of guests per table is 20")
      .required("Required"),
    time: Yup.string().required("Required"),
    occasion: Yup.string(),
  });

  const validateInput = (input) => {
    validationSchema
      .validateAt(input, { [input]: formValues[input] })
      .then(() => {
       setErrors((prevErrors) => ({
          ...prevErrors,
          [input]: undefined,
        }))
      })
      .catch((err) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [input]: err.message,
        }));
      });
  };

  useEffect(() => {
    setAvailableTimes(loadListOfTimes(currentDate));
    setFormValues((prev) => ({
      ...prev,
      time: loadListOfTimes(currentDate)[0],
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuestsChange = (value) => {
    setFormValues((prev) => ({
      ...prev,
      guests: value ? value : '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        const result = submitAPI(formValues);
        if (result) {
          onClose();
          confirmationModal.onOpen();
        }
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  const resetForm = () => {
    setFormValues({
      firstName: "",
      email: "",
      date: "",
      guests: 1,
      time: availableTimes[0],
      occasion: "",
    });
    setErrors({});
  };

  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          resetForm();
        }}
      >
        <ModalOverlay />
        <ModalContent bgColor={"#edefee"} py={4} maxW={600}>
          <ModalHeader id="reservation-header" mx={"auto"} fontSize={"2xl"} color={"#495e57"}>
            Reserve a Table
          </ModalHeader>
          <ModalCloseButton aria-label="Close reservation form" />
          <ModalBody>
            <Box p={8} rounded={"lg"} borderWidth={1} boxShadow={"lg"} backgroundColor={"gray.50"}>
              <form onSubmit={handleSubmit} aria-labelledby="reservation-header">
                <VStack spacing={8} fontSize={"lg"}>
                  <FormControl isInvalid={!!errors.firstName} onChange={() => validateInput('firstName')} onBlurCapture={() => validateInput('firstName')}>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <Input
                      type={"text"}
                      id="firstName"
                      data-testid='firstName'
                      name="firstName"
                      value={formValues.firstName}
                      onChange={handleInputChange}
                      aria-required="true"
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                  <FormControl 
                  isInvalid={!!errors.email}
                  onChange={() => {
                  const email = formValues['email'];
                  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                  if (email === undefined || emailPattern.test(email)) {
                    validateInput('email');
                  }
                }} 
                  onBlurCapture={() => validateInput('email')}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                      id="email"
                      data-testid='email'
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formValues.email}
                      onChange={handleInputChange}
                      aria-required="true"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.guests} onChange={() => validateInput('guests')} onBlurCapture={() => validateInput('guests')}>
                    <FormLabel htmlFor="guests">Number of guests</FormLabel>
                    <NumberInput
                      type="number"
                      id="guests"
                      data-testid='guests'
                      name="guests"
                      value={formValues.guests}
                      onChange={(valueString, valueNumber) => handleGuestsChange(valueNumber)}
                      min={1}
                      max={20}
                      aria-required="true"
                    >
                      <NumberInputField id="currentNumber" data-testid="currentNumber" />
                      <NumberInputStepper>
                        <NumberIncrementStepper
                          id="add-one"
                          data-testid="add-one"
                          onClick={() => formValues.guests < 20 && handleGuestsChange(formValues.guests + 1)}
                        />
                        <NumberDecrementStepper
                          id="subtract-one"
                          data-testid="subtract-one"
                          onClick={() => formValues.guests > 1 && handleGuestsChange(formValues.guests - 1)}
                        />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.guests}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.date} onBlurCapture={() => validateInput('date')}>
                    <FormLabel htmlFor="date">Date</FormLabel>
                    <Input
                      type="date"
                      id="date"
                      data-testid='date'
                      name="date"
                      value={formValues.date}
                      onChange={handleInputChange}
                      aria-required="true"
                    />
                    <FormErrorMessage>{errors.date}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.time}>
                    <FormLabel htmlFor="time">Time</FormLabel>
                    <Select
                      id="time"
                      data-testid='time'
                      name="time"
                      value={formValues.time}
                      onChange={handleInputChange}
                      aria-required="true"
                    >
                      {availableTimes?.map((option, key) => (
                        <option key={key} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.time}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={!!errors.occasion}>
                    <FormLabel htmlFor="occasion">Occasion (if applicable)</FormLabel>
                    <Select
                      id="occasion"
                      data-testid='occasion'
                      name="occasion"
                      value={formValues.occasion}
                      onChange={handleInputChange}
                      aria-required="true"
                    >
                      <option value=""> -- select an option -- </option>
                      <option value="Birthday">Birthday</option>
                      <option value="Anniversary">Anniversary</option>
                    </Select>
                    <FormErrorMessage>{errors.occasion}</FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    bg={"#f4ce14"}
                    color={"#333333"}
                    size={"lg"}
                    _hover={{ bg: "yellow.500" }}
                    aria-label="Submit reservation form"
                  >
                    Make Your Reservation
                  </Button>
                </VStack>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ConfirmModal
        confirmationModal={confirmationModal}
        data={formValues}
        resetForm={resetForm}
      />
    </>
  );
};

const loadListOfTimes = (date) => {
  return fetchAPI(new Date(date));
};

export default BookingForm;
