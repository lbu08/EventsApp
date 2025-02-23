import {
  Box,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddFile } from "../components/AddFile";
import { CategoryDropList } from "./CategoryDropList";

export const AddEventForm = () => {
  const [newEventName, setNewEventName] = useState();
  const [newEventCategory, setNewEventCategory] = useState();
  const [newEventDescription, setNewEventDescription] = useState();
  //const [newEventImage, setNewEventImage] = useState(" ");
  const [newEventStartDate, setNewEventStartDate] = useState();
  const [newEventStartTime, setNewEventStartTime] = useState();
  const [newEventEndDate, setNewEventEndDate] = useState();
  const [newEventEndTime, setNewEventEndTime] = useState();
  const [newEventUserName, setNewEventUserName] = useState();
  //const [textarea, setTextarea] = useState(" ");

  //const handleChange = (event) => {
  //   const name = event.target.name;
  //  const value = event.target.value;
  //  setInputs(values => ({...values, [name]: value}))
  //}

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch("http://localhost:3000/events/new", {
      method: form.method,
      body: formData,
    });

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <SimpleGrid
        rows={{ base: 1, sm: 1, md: 2, xl: 4 }}
        max-width="1500px"
        spacing={3}
        alignContent="center"
      >
        <label>
          <Text>Enter event name:</Text>
          <Input
            name="newEventName"
            id="newEventName"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            placeholder="Event Title"
            type="text"
          />
        </label>
        <label>
          <Stack direction="row" w="100%" h="auto">
            <Box width="50">
              <Text>Create New category:</Text>
              <Input
                name="newEventCategory"
                value={newEventCategory}
                onChange={(e) => setNewEventCategory(e.target.value)}
                alignItems="center"
                marginTop={2}
                marginBottom={2}
                w="70%"
                placeholder="Event Category"
                type="text"
              />
            </Box>
            <Box>
              <Text marginBottom={2}>Or choose from existing: </Text>
              <CategoryDropList />
            </Box>
          </Stack>
        </label>
        <label>
          Enter description:
          <Textarea
            name="newEventDescription"
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            placeholder="Event description"
            type="text"
          />
        </label>
        <AddFile />
        <label>
          <Text marginRight={2}>Start date and time:</Text>
          <Input
            name="newEventStartDate"
            value={newEventStartDate}
            onChange={(e) => setNewEventStartDate(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="35%"
            placeholder="DD-MM-YYYY"
            type="number"
          />
          <Input
            name="newEventStartTime"
            value={newEventStartTime}
            onChange={(e) => setNewEventStartTime(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="30%"
            placeholder="HH:mm"
            type="number"
          />
        </label>
        <label>
          <Text>End time:</Text>
          <Input
            name="newEventEndDate"
            value={newEventEndDate}
            onChange={(e) => setNewEventEndDate(e.target.value)}
            alignItems="center"
            marginBottom={2}
            w="35%"
            placeholder="DD-MM-YYYY"
            input
            type="number"
          />
          <Input
            name="newEventEndTime"
            value={newEventEndTime}
            onChange={(e) => setNewEventEndTime(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="30%"
            placeholder="HH:mm"
            input
            type="number"
          />
        </label>
        <label>
          Enter your username:
          <Input
            name="newEventUserName"
            value={newEventUserName}
            onChange={(e) => setNewEventUserName(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            marginLeft={2}
            w="auto"
            placeholder="your username"
            type="text"
          />
        </label>
      </SimpleGrid>
    </form>
  );
};
