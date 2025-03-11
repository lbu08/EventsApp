import {
  Box,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
//import { AddFile } from "../components/AddFile";
//import { CategoryDropList } from "./CategoryDropList";

export const AddEventForm = ({
  categories,
  events,
  users,
  onClose,
}) => {
  console.log("categories received in AddEventForm:", categories);
  console.log("events received in AddEventForm:", events);
  console.log("users received in AddEventForm:", users);

  const [setEvent] = useState([]);
  const [setIsEditing] = useState(false);

  const [newEventName, setNewEventName] = useState("");
  console.log("new event title:", newEventName);

  const [newEventCategory, setNewEventCategory] = useState("");
  console.log("new event category:", newEventCategory);
  const [newEventDescription, setNewEventDescription] = useState("");
  console.log("new event description:", newEventDescription);
  const [newEventImage, setNewEventImage] = useState("");
  console.log("new event Image:", newEventImage);
  const [newEventStartDate, setNewEventStartDate] = useState("");
  console.log("new event startDate:", newEventStartDate);
  const [newEventStartTime, setNewEventStartTime] = useState("");
  console.log("new event StartTime:", newEventStartTime);
  const [newEventEndDate, setNewEventEndDate] = useState("");
  console.log("new event EndDate:", newEventEndDate);
  const [newEventEndTime, setNewEventEndTime] = useState("");
  console.log("new event EndTime:", newEventEndTime);
  const [newEventLocation, setNewEventLocation] = useState("");
  console.log("new event Location:", newEventLocation);
  const [newEventUserName, setNewEventUserName] = useState("");
  console.log("CreatedBy:", newEventUserName);

  useEffect(() => {
    setNewEventName(events?.title || "");
  }, [events]);

  useEffect(() => {
    setNewEventCategory(categories?.name || "");
  }, [categories]);

  useEffect(() => {
    setNewEventDescription(events?.description || "");
  }, [events]);

  useEffect(() => {
    setNewEventImage(events?.image || "");
  }, [events]);

  useEffect(() => {
    setNewEventStartTime(events?.startTime || "");
  }, [events]);

  useEffect(() => {
    setNewEventEndTime(events?.endTime || "");
  }, [events]);

  useEffect(() => {
    setNewEventUserName(users?.name || "");

  }, [users]);

  useEffect(() => {
    setNewEventLocation(events?.location || "");
  }, [events]);

  //const handleChange = async(event) => {
  // const name = event.target.name;
  // const value = event.target.value;
  //  setInputs(values => ({...values, [name]: value}))
  //}
  const eventCategory = categories.reduce((match, category) => {
    match[category.name] = category.id;
    return match;
  }, {});
  console.log("eventCategory:", eventCategory);

  const CategoryTitle = (categoryIds) => {
    return categoryIds;

  };
  console.log("category Id:", { CategoryTitle });

  const handleSubmit = async (e) => {
    console.log("handleSubmit New Event:", e);
    e.preventDefault();


    //const newId = () => (
    //  {state.map((event) => (
    //    <li key={events.eventId}> 
    //   {eventId}
    //  </li>
    // console.log("New eventId:", eventId)
    // ))}
    //);

    //const newUserId = () => (
    //   {users.map((events.createdBy) => (
    // return (newUserId)
    //   )}


    const addEvent = {
      // id: eventId,
      //createdBy: {events.createdBy},
      title: newEventName,
      description: newEventDescription,
      image: newEventImage,
      // categoryIds: setNewEventCategoryId,
      location: newEventLocation,
      startTime: newEventStartTime,
      endTime: newEventEndTime,
    };


    const response = await fetch(`http://localhost:3000/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addEvent),
    });
    if (response.ok) {
      const newEventOk = await response.json();
      setEvent(newEventOk);
      setIsEditing(false);
    } else {
      console.error("Error updating event:", response.statusText);
    }
    console.log("NEW Event:", addEvent);
    onClose();
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
            value={events.title}
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
                //defaultValue={categoryIds}
                //onChange={(e) => setNewEventCategoryId(e.target.value)}
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

              <Select
                //value={searchQuery}
                onChange={handleSubmit}
                // onChange={(e) => setSelectedEvent(e.target.value)}
                className="dropdown"
              >
                <option>--Category--</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Box>
          </Stack>
        </label>
        <label>
          Enter description:
          <Textarea
            name="newEventDescription"
            defaultValue={events.description}
            onChange={(e) => setNewEventDescription(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            placeholder="Event description"
            type="text"
          />
        </label>
        <Text marginRight={2}>Add Image HTTP adress:</Text>
        <Input
          name="newEventImage"
          defaultValue={events.image}
          placeholder="http://"
          onChange={(e) => setNewEventImage(e.target.value)}
          alignItems="center"
          marginTop={2}
          marginBottom={2}
          w="100%"
          type="text"
        />
        <label>
          <Text marginRight={2}>Start date and time:</Text>
          <Input
            name="newEventStartDate"
            defaultValue={events.startTime}
            onChange={(e) => setNewEventStartDate(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="35%"
            placeholder="DD-MM-YYYY"
            type="text"
          />
          <Input
            name="newEventStartTime"
            defaultValue={events.startTime}
            onChange={(e) => setNewEventStartTime(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="30%"
            placeholder="HH:mm"
            type="text"
          />
        </label>
        <label>
          <Text>End time:</Text>
          <Input
            name="newEventEndDate"
            defaultValue={events.endTime}
            onChange={(e) => setNewEventEndDate(e.target.value)}
            alignItems="center"
            marginBottom={2}
            w="35%"
            placeholder="DD-MM-YYYY"
            input
            type="text"
          />
          <Input
            name="newEventEndTime"
            defaultValue={events.endTime}
            onChange={(e) => setNewEventEndTime(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="30%"
            placeholder="HH:mm"
            input
            type="text"
          />
        </label>
        <label>
          Enter Location:
          <Textarea
            name="newEventLocation"
            defaultValue={events.location}
            onChange={(e) => setNewEventLocation(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            marginLeft={2}
            w="80%"
            placeholder="Event location"
            type="text"
          />
        </label>
        <label>
          Enter your username:
          <Input
            name="newEventUserName"
            //key={users.id}
            onChange={(e) => setNewEventUserId(e.target.value)}
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
