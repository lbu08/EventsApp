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
import { useToast } from "@chakra-ui/react";

export const ModalEdit = ({ events, eventId, categories, users, setEvent }) => {
  console.log("events passed onto ModalEdit:", events);
  console.log("categories passed onto ModalEdit:", categories);
  console.log("users passed onto ModalEdit:", users);
  console.log("eventId passed onto Modal Edit:", eventId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("101", setEvent);

  const [temporarilyEvent, setTemporarilyEvent] = useState(events);
  console.log("temporarilyEvent", temporarilyEvent);




  const addEvent = (events) => {
    console.log("EVENTS", events);
    setEvent(events);
    onClose();
  };

  const toast = useToast();
  const showToast = () => {
    toast({
      title: "New event submitted succesfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  console.log("showTOAST", showToast);

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
              onClose={onClose}
              //setEvent={setEvent}
              temporarilyEvent={temporarilyEvent}
              setTemporarilyEvent={setTemporarilyEvent}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                document.querySelector("form").requestSubmit(); showToast();
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
