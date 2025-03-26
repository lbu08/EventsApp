import {
  Box,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
//import { AddFile } from "../components/AddFile";
//import { CategoryDropList } from "./CategoryDropList";

export const AddEventForm = ({
  events,
  //eventId,
  categories,
  users,
  onAddEvent,
  onClose,
}) => {
  console.log("categories received in AddEventForm:", categories);
  console.log("events received in AddEventForm:", events);
  console.log("users received in AddEventForm:", users);


  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [newEventName, setNewEventName] = useState("");
  console.log("new event title:", newEventName);

  const [newEventCategory, setNewEventCategory] = useState("");
  console.log("new event category:", newEventCategory);
  const [newEventDescription, setNewEventDescription] = useState("");
  console.log("new event description:", newEventDescription);
  const [newEventImage, setNewEventImage] = useState("");
  console.log("new event Image:", newEventImage);
  const [newEventStartTime, setNewEventStartTime] = useState("");
  console.log("new event StartTime:", newEventStartTime);
  const [newEventEndTime, setNewEventEndTime] = useState("");
  console.log("new event EndTime:", newEventEndTime);
  const [newEventLocation, setNewEventLocation] = useState("");
  console.log("new event Location:", newEventLocation);
  const [newEventUserName, setNewEventUserName] = useState(users.name);
  console.log("CreatedBy:", newEventUserName);

  useEffect(() => {
    setNewEventName(events?.title || "");
  }, [events]);

  useEffect(() => {
    setNewEventCategory(categories?.id || 1);
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
    setNewEventUserName(users?.name || 1);

  },);

  useEffect(() => {
    setNewEventLocation(events?.location || "");
  }, [events]);

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

    const addEvent = {
      createdBy: newEventUserName,
      title: newEventName,
      description: newEventDescription,
      image: newEventImage,
      categoryIds: [newEventCategory],
      location: newEventLocation,
      startTime: newEventStartTime,
      endTime: newEventEndTime,


    };
    console.log("addEvent", addEvent)


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
    onAddEvent();
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


          <Box>
            <Text marginBottom={2}>Choose category: </Text>

            <Select
              //value={searchQuery}
              //onChange={handleSubmit}
              onChange={(e) => setNewEventCategory(e.target.value)}
              className="dropdown"
            >
              <option>--Category--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </Box>

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
            onChange={(e) => setNewEventStartTime(e.target.value)
            }
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="35%"
            type="datetime-local"
          />
        </label>
        <label>
          <Text>End date and time:</Text>
          <Input
            name="newEventEndDate"
            defaultValue={events.endTime}
            onChange={(e) => setNewEventEndTime(e.target.value)}
            alignItems="center"
            marginBottom={2}
            w="35%"
            input
            type="datetime-local"
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


          <Box>
            <Text marginBottom={2}>Choose your username: </Text>

            <Select
              //defaultValue={users.name}
              //onChange={handleSubmit}
              onChange={(e) => setNewEventUserName(e.target.value)}
              className="dropdown"
            >
              <option>--User--</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </Box>

        </label>

      </SimpleGrid>
    </form>
  );
};
