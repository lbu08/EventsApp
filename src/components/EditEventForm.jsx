import { Box, Select, Input, SimpleGrid, Text, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const EditEventForm = ({
  events,
  categories,
  users,
  eventId,
  onAddEvent,
  onClose,

}) => {
  console.log("events passed onto EditEventForm:", events);
  console.log("categpries passed onto EditEventForm:", categories);
  console.log("users passed onto EditEventForm:", users);

  const [event, setEvent] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState(events.title);
  console.log("edited name:", editName);
  const [editCategory, setEditCategory] = useState(categories.name);
  console.log("edited category:", editCategory);
  const [editDescription, setEditDescription] = useState(events.description);
  console.log("edited description:", editDescription);
  const [editImage, setEditImage] = useState(events.image);
  console.log("edited image http:", editImage);
  const [editStartTime, setEditStartTime] = useState(events.startTime);
  console.log("edited startTime:", editStartTime);
  const [editEndTime, setEditEndTime] = useState(events.endTime);
  console.log("edited endTime:", editEndTime);
  const [editUserName, setEditUserName] = useState(users.name);
  console.log("edited CreatedBy:", editUserName);
  const [editLocation, setEditLocation] = useState(events.location);
  console.log("edited location:", editLocation);


  useEffect(() => {
    setEditName(events?.title || "");
  }, [events]);

  useEffect(() => {
    setEditCategory(categories?.name || 1);
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
    setEditUserName(users?.name || 1);
  }, [users]);

  useEffect(() => {
    setEditLocation(events?.location || "");
  }, [events]);

  const handleSubmit = async (e) => {
    console.log("handleSubmit Edited event:", e);
    e.preventDefault();

    console.log("edited usersId:", setEditUserName);

    const editCategoryAsNumber = Number(editCategory);
    const editUserNameAsNumber = Number(editUserName);

    const updatedEvent = {
      createdBy: editUserNameAsNumber,
      title: editName,
      description: editDescription,
      image: editImage,
      categoryIds: [editCategoryAsNumber],
      location: editLocation,
      startTime: editStartTime,
      endTime: editEndTime,
    };
    console.log("edited Event:", updatedEvent);

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
          />
        </label>
        <Box>
          <Text marginBottom={2}>Edit category: </Text>

          <Select
            onChange={(e) => setEditCategory(e.target.value)}
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
            type="text"
          />
        </label>
        <Text marginRight={2}>Edit Image:</Text>
        <Input
          name="Image"
          defaultValue={events.image}
          onChange={(e) => setEditImage(e.target.value)}
          alignItems="center"
          marginTop={2}
          marginBottom={2}
          w="100%"
          type="text"
        />

        <label>
          <Text marginRight={2}>Edit Start Date and Time :</Text>

          <Input
            name="EventStartTime"
            defaultValue={events.startTime}
            onChange={(e) => setEditStartTime(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            w="35%"

            type="datetime-local"
          />

        </label>
        <label>
          <Text>Edit End date and time:</Text>

          <Input
            name="EventEndTime"
            defaultValue={events.endTime}
            onChange={(e) => setEditEndTime(e.target.value)}
            alignItems="center"
            marginBottom={2}
            w="35%"
            type="datetime-local"

          />

        </label>
        <label>
          Edit Location:
          <Textarea
            name="editLocation"
            defaultValue={events.location}
            onChange={(e) => setEditLocation(e.target.value)}
            alignItems="center"
            marginTop={2}
            marginBottom={2}
            marginLeft={2}
            w="80%"
            type="text"
          />
        </label>
        <label>


          <Box>
            <Text marginBottom={2}>Choose your username: </Text>

            <Select
              onChange={(e) => setEditUserName(e.target.value)}
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
