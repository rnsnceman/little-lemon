import {
    VStack, Box, FormControl, FormLabel, FormErrorMessage, Button, Input, Select, Modal, ModalOverlay,
    ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, NumberInput, NumberInputField,
    NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
  } from "@chakra-ui/react";
  import { useFormik } from "formik";
  import * as Yup from 'yup';
  import ConfirmModal from "./ConfirmModal";
  import useSubmit from "../hooks/useSubmit";
  import { useEffect, useState } from "react";
  import { fetchAPI, submitAPI } from "../api/api";

  const BookingForm = ({ isOpen, onClose }) => {
    const confirmationModal = useDisclosure()
    const { response, setResponse, isLoading, submit } = useSubmit()
    const currentDate = new Date().toLocaleDateString()
    const [availableTimes] = useState(loadListOfTimes(currentDate))

    function formatDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(date).toLocaleDateString("en-US", options)
    }

    const formik = useFormik({
      initialValues: {
        firstName: "",
        email: "",
        date: '',
        guests: 1,
        time: availableTimes[0],
        occasion: ''
      },
      onSubmit: (values) => {
        submit(submitAPI, values)
        console.log(values)
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string(),
        email: Yup.string().email("Invalid email address").required("Required"),
        date: Yup.date('Choose a date').min(
          currentDate,
          ({ min }) => `Date needs to be ${formatDate(min)} or later`,
        ).required('Required'),
        guests: Yup.number().min(1, "Must be at least 1 guest").max(20, "The maximum amount of guests per table is 20").required("Required"),
        time: Yup.string().required("Required"),
        occasion: Yup.string()
      }),
    });

    useEffect(() => {
      if (response?.type) {
        if (response.type === 'success') {
          onClose()
          formik.resetForm()
        }
        confirmationModal.onOpen()
      }
    }, [response])

    return (
      <>
        <Modal isOpen={isOpen} onClose={() => { onClose(); formik.resetForm() }}>
          <ModalOverlay />
          <ModalContent bgColor={'#edefee'} py={4} maxW={600}>
            <ModalHeader id="reservation-header" mx={"auto"} fontSize={'2xl'} color={'#495e57'}>Reserve a Table</ModalHeader>
            <ModalCloseButton aria-label="Close reservation form" />
            <ModalBody>
              <Box p={8} rounded={'lg'} borderWidth={1} boxShadow={'lg'} backgroundColor={'gray.50'}>
                <form onSubmit={formik.handleSubmit} aria-labelledby="reservation-header">
                  <VStack spacing={8} fontSize={'lg'}>
                    <FormControl isInvalid={!!formik.errors.firstName && formik.touched.firstName}>
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Input type={'text'} id="firstName" name="firstName" {...formik.getFieldProps("firstName")} aria-required="true" />
                      <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <Input id="email" name="email" type="email" placeholder="email@example.com" {...formik.getFieldProps("email")} aria-required="true" />
                      <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formik.errors.guests && formik.touched.guests}>
                      <FormLabel htmlFor="guests">Number of guests</FormLabel>
                      <NumberInput type="number" id='guests' name="guests" defaultValue={1} min="1" max="20" {...formik.getFieldProps("guests")} aria-required="true">
                        <NumberInputField id="currentNumber" data-testid="currentNumber" />
                        <NumberInputStepper>
                          <NumberIncrementStepper id="add-one" data-testid="add-one" onClick={() => formik.values.guests < 20 && formik.setFieldValue('guests', formik.values.guests + 1)} />
                          <NumberDecrementStepper id="subtract-one" onClick={() => formik.values.guests > 1 && formik.setFieldValue('guests', formik.values.guests - 1)} />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage>{formik.errors.guests}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formik.errors.date && formik.touched.date}>
                      <FormLabel htmlFor="date">Date</FormLabel>
                      <Input type="date" id="date" name="date" onChange={(e) => formik.setFieldValue('date', e.target.value.toLocaleDateString())} {...formik.getFieldProps("date")} aria-required="true" />
                      <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formik.errors.time && formik.touched.time}>
                      <FormLabel htmlFor="time">Time</FormLabel>
                      <Select id="time" name="time" {...formik.getFieldProps("time")} aria-required="true">
                        {availableTimes.map((option, key) => <option key={key}>{option}</option>)}
                      </Select>
                      <FormErrorMessage>{formik.errors.time}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!formik.errors.occasion && formik.touched.occasion}>
                      <FormLabel htmlFor="occasion">Occasion (if applicable)</FormLabel>
                      <Select id="occasion" name="occasion" {...formik.getFieldProps("occasion")} aria-required="true">
                        <option value=''> -- select an option -- </option>
                        <option>Birthday</option>
                        <option>Anniversary</option>
                      </Select>
                      <FormErrorMessage>{formik.errors.occasion}</FormErrorMessage>
                    </FormControl>
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      bg={'#f4ce14'}
                      color={'#333333'}
                      size={'lg'}
                      _hover={{ bg: 'yellow.500' }}
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
          formik={formik}
          response={response}
          setResponse={setResponse}
        />
      </>
    );
  }

  const loadListOfTimes = (date) =>
    {
      return fetchAPI(new Date(date));
    };

  export default BookingForm;
