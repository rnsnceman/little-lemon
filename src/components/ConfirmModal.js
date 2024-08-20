import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react'

const ConfirmModal = ({confirmationModal, data, resetForm}) => {

  return (
    <Modal
      isOpen={confirmationModal.isOpen}
      onClose={() => {confirmationModal.onClose(); resetForm()}}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <ModalOverlay />
      <ModalContent bgColor={"#EEEFEE"} py={4} maxW={600}>
        <ModalHeader
          id="confirmation-modal-title"
          mx={"auto"}
          fontSize={'2xl'}
        >
          Thank you for booking
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign={"center"} id="confirmation-modal-description">
            <p>Your table is reserved for {data.time}! See you then.</p>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
