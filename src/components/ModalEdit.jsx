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
import { EditEventForm } from "../components/EditEventForm";
import { useState } from "react";

export const ModalEdit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState([]);
  const [setEvents] = useState([]);

  // useEffect(() => {
  // const fetchCategories = async () => {
  //   const response = await fetch(`http://localhost:3000/categories`);
  //  const categories = await response.json();
  //  console.log(categories);
  //   setCategories(categories);
  //  };
  //fetchCategories();c
  //}, []);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
    onClose();
  };

  return (
    <>
      <Button backgroundColor="orange" color="white" onClick={onOpen}>
        Edit Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <b>Edit Event</b>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditEventForm categories={categories} onAddEvent={addEvent} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose} type="submit">
              Submit form
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
