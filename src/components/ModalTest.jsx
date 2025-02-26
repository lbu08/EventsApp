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
import { useEffect, useState } from "react";

export const ModalTest = ({ categories }) => {
  console.log("categories passed onto ModalTest:", categories);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [setCategories] = useState([]);
  const [setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  //useEffect(() => {
  //const fetchCategories = async () => {
  //   const response = await fetch(`http://localhost:3000/categories`);
  //   const categories = await response.json();
  //   console.log(categories);
  //   setCategories(categories);
  //  };
  // fetchCategories();
  // }, []);

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
              type="reset"
              onClick={() => setIsEditing(false)}
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
