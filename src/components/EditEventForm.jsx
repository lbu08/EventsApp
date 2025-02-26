import { Input, SimpleGrid, Text, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AddFile } from "../components/AddFile";
//import { }

export const EditEventForm = ({ events, categories, users }) => {
  console.log("events passed onto EditEventForm:", events);
  console.log("categpries passed onto EditEventForm:", categories);
  console.log("users passed onto EditEventForm:", users);

  const [editName, setEditName] = useState(events.title);
  const [editCategory, setEditCategory] = useState(categories.name);
  const [editDescription, setEditDescription] = useState(events.description);
  //const [newEventImage, setNewEventImage] = useState(events.image);
  const [editStartDate, setEditStartDate] = useState("");
  const [editStartTime, setEditStartTime] = useState(" ");
  const [editEndDate, setEditEndDate] = useState("");
  const [editEndTime, setEditEndTime] = useState(" ");
  const [editUserName, setEditUserName] = useState(users.name);
  //const [textarea, setTextarea] = useState(" ");
  //const [event, setEvent] = useState([]);
  //const [user, setUser] = useState([]);
  // const [category, setCategory] = useState([]);

  useEffect(() => {
    setEditName(events?.title || "");
  }, [events]);

  useEffect(() => {
    setEditCategory(categories?.name || "");
  }, [categories]);

  useEffect(() => {
    setEditDescription(events?.description || "");
  }, [events]);

  useEffect(() => {
    setEditUserName(users?.name || "");
  }, [users]);

  //const StartDate = () => {
  // {
  //    new Date(events.startTime).toLocaleString().replace(/(.*)\D\d+/);
  // }
  //  return StartDate;
  //};

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch(`http://localhost:3000/events`, {
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
          <Text>Edit event name:</Text>
          <Input
            name="EventName"
            value={editName}
            defaultValue={events.title}
            onChange={(e) => setEditName(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            type="text"
          />
        </label>
        <label>
          Edit category:
          <Input
            name="EventCategory"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            placeholder="Event Category"
            type="text"
          />
        </label>
        <label>
          Edit description:
          <Textarea
            name="EventDescription"
            value={editDescription}
            defaultValue={events.description}
            onChange={(e) => setEditDescription(e.target.value)}
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
          <Text marginRight={2}>Edit Start date and time:</Text>

          <Input
            name="EventStartDate"
            value={editStartDate}
            placeholder="DD-MM-YYYY"
            onChange={(e) => setEditStartDate(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="35%"
            type="number"
          />
          <Input
            name="EventStartTime"
            value={editStartTime}
            onChange={(e) => setEditStartTime(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="30%"
            placeholder="HH:mm"
            type="number"
          />
        </label>
        <label>
          <Text>Edit End time:</Text>
          <Input
            name="EventEndDate"
            value={editEndDate}
            onChange={(e) => setEditEndDate(e.target.value)}
            alignItems="center"
            marginBottom={2}
            w="35%"
            placeholder="DD-MM-YYYY"
            input
            type="number"
          />
          <Input
            name="EventEndTime"
            value={editEndTime}
            onChange={(e) => setEditEndTime(e.target.value)}
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
            value={editUserName}
            onChange={(e) => setEditUserName(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            marginLeft={2}
            w="40%"
            placeholder="your username"
            input
            type="text"
          />
        </label>
      </SimpleGrid>
    </form>
  );
};
