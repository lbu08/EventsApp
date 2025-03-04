import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddEventForm } from "../components/AddEventForm";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ModalTest = ({ categories }) => {
  console.log("categories passed onto ModalTest:", categories);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [setCategories] = useState([]);
  const [setEvents] = useState([]);
  //const [isEditing, setIsEditing] = useState(false);
  const { reset } = useForm();

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
    onClose();
  };

  return (
    <>
      <Button
        w="20%"
        backgroundColor="darkolivegreen"
        color="white"
        onClick={onOpen}
      >
        Add New Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <b>Add New Event</b>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddEventForm categories={categories} onAddEvent={addEvent} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} type="button">
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              type="button"
              onClick={() => reset()}
            >
              Reset form
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose} type="submit">
              Submit form
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
