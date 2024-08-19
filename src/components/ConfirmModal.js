import { Box, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react'

const ConfirmModal = ({confirmationModal, response, formik, setResponse}) => {

  return (
    <Modal
      isOpen={confirmationModal.isOpen}
      onClose={() => {confirmationModal.onClose(); setResponse(null)}}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <ModalOverlay />
      <ModalContent bgColor={response?.bgColor} py={4} maxW={600}>
        <ModalHeader
          id="confirmation-modal-title"
          mx={"auto"}
          fontSize={'2xl'}
        >
          {response?.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box textAlign={"center"} id="confirmation-modal-description">
            <p>{response?.message}</p>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
