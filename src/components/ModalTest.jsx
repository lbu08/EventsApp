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
//import { useState } from "react";
import { useForm } from "react-hook-form";

export const ModalTest = ({ categories, events, users, setEvents }) => {
  console.log("categories passed onto ModalTest:", categories);
  console.log("events passed onto ModalTest:", events);
  console.log("users passed onto ModalTest:", users);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { reset } = useForm();
  // handleReset = () => { setState(({ name: '', email: '', })) }

  const addEvent = (newEvent) => {
    newEvent.id = events.length + 1;
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
            <AddEventForm
              categories={categories}
              events={events}
              users={users}
              onAddEvent={addEvent}
              onClose={onClose}
            />
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                document.querySelector("form").requestSubmit();
              }}
            >
              Submit form
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
