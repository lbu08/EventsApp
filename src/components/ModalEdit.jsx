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

export const ModalEdit = ({ events, eventId, categories, users }) => {
  console.log("events passed onto ModalEdit:", events);
  console.log("categories passed onto ModalEdit:", categories);
  console.log("users passed onto ModalEdit:", users);
  console.log("eventId passed onto Modal Edit:", eventId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [setEvents] = useState([]);

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
            <EditEventForm
              events={events}
              eventId={eventId}
              categories={categories}
              users={users}
              onAddEvent={addEvent}
            />
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
