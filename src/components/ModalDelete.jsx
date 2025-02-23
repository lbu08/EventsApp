import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export const ModalDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        backgroundColor="red"
        color="white"
        marginRight={2}
        onClick={onOpen}
      >
        Delete Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <b>Are you sure you want to delete this Event?</b>
          </ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} type="button">
              Cancel
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose} type="delete">
              Delete Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
