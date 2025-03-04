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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ModalDelete = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleDelete = () => {
    //  event.preventDefault();
    setIsDeleting(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch("http://localhost:3000/events/${eventId}", {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/events");
        //    Toast.success("event deleted succesfully", );
      } else {
        console.error("Error deleting event", response.statusText);
        //   toast.error("Error occured while deleting the event");
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsDeleting(false);
    }
  };

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
            <Button
              colorScheme="red"
              mr={3}
              onClick={confirmDelete}
              type="delete"
            >
              Delete Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
