import { Input, SimpleGrid, Text, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
//import { AddFile } from "../components/AddFile";

export const EditEventForm = ({
  events,
  categories,
  users,
  eventId,
  onClose,
}) => {
  console.log("events passed onto EditEventForm:", events);
  console.log("categpries passed onto EditEventForm:", categories);
  console.log("users passed onto EditEventForm:", users);

  const [setEvent] = useState([]);
  const [setIsEditing] = useState(false);

  const [editName, setEditName] = useState(events.title);
  console.log("edited name:", editName);
  const [editCategory, setEditCategory] = useState(categories.name);
  console.log("edited category:", editCategory);
  const [editDescription, setEditDescription] = useState(events.description);
  console.log("edited description:", editDescription);
  const [editImage, setEditImage] = useState(events.image);
  console.log("edited image http:", editImage);
  const [editStartTime, setEditStartTime] = useState("");
  console.log("edited startTime:", editStartTime);
  const [editEndTime, setEditEndTime] = useState("");
  console.log("edited endTime:", editEndTime);
  const [editUserName, setEditUserName] = useState(users.name);
  console.log("edited userName:", editUserName);

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
    setEditImage(events?.image || "");
  }, [events]);

  useEffect(() => {
    setEditStartTime(events?.startTime || "");
  }, [events]);

  useEffect(() => {
    setEditEndTime(events?.endTime || "");
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

  const handleSubmit = async (e) => {
    console.log("handleSubmit event:", e);
    e.preventDefault();

    const updatedEvent = {
      title: editName,
      description: editCategory,
      categories: editCategory,
      image: editImage,
      startTime: editStartTime,
      endTime: editEndTime,
      user: editUserName,
    };

    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    });
    console.log("response:", response);
    if (response.ok) {
      const updatedEventOk = await response.json();
      setEvent(updatedEventOk);
      setIsEditing(false);
    } else {
      console.error("Error updating event:", response.statusText);
    }
    console.log("updated event :", updatedEvent);
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
          <Text>Edit event name:</Text>
          <Input
            name="EventName"
            defaultValue={events.title}
            onChange={(e) => setEditName(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            type="text"
            //placeholder={events.title}
          />
        </label>
        <label>
          Edit category:
          <Input
            name="EventCategory"
            defaultValue={categories.name}
            onChange={(e) => setEditCategory(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            //placeholder={categories.name}
            type="text"
          />
        </label>

        <label>
          Edit description:
          <Textarea
            name="EventDescription"
            defaultValue={events.description}
            onChange={(e) => setEditDescription(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            //placeholder={events.description}
            type="text"
          />
        </label>
        <Text marginRight={2}>Add Image HTTP adress:</Text>
        <Input
          name="Image"
          defaultValue={events.image}
          //placeholder="http://"
          onChange={(e) => setEditImage(e.target.value)}
          alignItems="center"
          marginTop={2}
          marginBottom={2}
          w="100%"
          type="text"
        />

        <label>
          <Text marginRight={2}>Edit Start date and time:</Text>

          <Input
            name="EventStartDate"
            defaultValue={events.startTime}
            //placeholder={events.startTime}
            onChange={(e) => setEditStartTime(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="80%"
            type="text"
          />
        </label>
        <label>
          <Text>Edit End time:</Text>

          <Input
            name="EventEndDate"
            defaultValue={events.endTime}
            onChange={(e) => setEditEndTime(e.target.value)}
            alignItems="center"
            marginBottom={2}
            w="80%"
            type="text"
            //placeholder={events.endTime}
          />
        </label>
        <label>
          Enter your username:
          <Input
            name="newEventUserName"
            defaultValue={users.name}
            onChange={(e) => setEditUserName(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            marginLeft={2}
            w="100%"
            type="text"
          />
        </label>
      </SimpleGrid>
    </form>
  );
};
