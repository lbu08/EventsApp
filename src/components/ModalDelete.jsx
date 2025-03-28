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
import { useToast } from "@chakra-ui/react";

export const ModalDelete = ({ eventId }) => {
  console.log("eventId passed onto ModalDelete:", eventId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (e) => {
    console.log("handleDelete event:", e);
    e.preventDefault();
    setIsDeleting(true);

    const toast = useToast();
    const showToast = () => {
      toast({
        title: "Event Deleted Successfully!",
        description: "This is a simple toast message.",
        status: "success",
        duration: 3000, // Display duration in milliseconds
        isClosable: true, // Allow users to close the toast
      });
    };

    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });
    console.log("delete response:", response);
    if (response.ok) {

      setIsDeleting(false);
      navigate("/");

    } else {
      console.error("Error deleting event", response.statusText);

    }
    onClose();
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
              onClick={() => { handleDelete(); showToast(); }}
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
