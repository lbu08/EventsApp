import { Input, SimpleGrid, Text, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AddFile } from "../components/AddFile";

export const EditEventForm = () => {
  const [editName, setEditName] = useState(" ");
  const [editCategory, setEditCategory] = useState(" ");
  const [editDescription, setEditDescription] = useState(" ");
  //const [newEventImage, setNewEventImage] = useState(" ");
  const [editStartDate, setEditStartDate] = useState(" ");
  const [editStartTime, setEditStartTime] = useState(" ");
  const [editEndDate, setEditEndDate] = useState(" ");
  const [editEndTime, setEditEndTime] = useState(" ");
  const [editUserName, setEditUserName] = useState(" ");
  //const [textarea, setTextarea] = useState(" ");
  const [event, setEvent] = useState([]);
  const [user, setUser] = useState([]);
  const [category, setCategory] = useState([]);

  //useEffect(() => {
  //  const fetchEvents = async () => {
  //    const response = await fetch(`http://localhost:3000/events`);
  //    const events = await response.json();
//console.log(events);
  //    setEvent(events);
  //  };
//fetchEvents();
//}, [event]);

 // useEffect(() => {
 //   const fetchUsers = async () => {
 //     const response = await fetch(`http://localhost:3000/users`);
 //     const users = await response.json();
  //    console.log(users);
//setUser(users);
  //  };
 //   fetchUsers();
 // }, [user]);

  // useEffect(() => {
  //const fetchCategories = async () => {
  //  const response = await fetch(`http://localhost:3000/categories`);
  //  const categories = await response.json();
  //console.log(categories);
  // setCategory(categories);
  //  };
  //fetchCategories();
  // }, [category]);

  //const handleChange = (event) => {
  //   const name = event.target.name;
  //  const value = event.target.value;
  //  setInputs(values => ({...values, [name]: value}))
  //}

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
            defaultValue={event.title}
            onChange={(e) => setEditName(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            placeholder="Event Title"
            type="text"
          />
        </label>
        <label>
          Edit category:
          <Input
            name="EventCategory"
            value={editCategory}
            defaultValue={category.name}
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
            defaultValue={event.description}
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
            defaultValue={event.name}
            onChange={(e) => setEditStartDate(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="35%"
            placeholder="DD-MM-YYYY"
            type="number"
          />
          <Input
            name="EventStartTime"
            value={editStartTime}
            defaultValue={event.name}
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
            defaultValue={event.name}
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
            defaultValue={event.name}
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
            defaultValue="hi"
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
