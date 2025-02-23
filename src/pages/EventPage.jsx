import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import "../index.css";
import {
  Box,
  Center,
  Card,
  CardBody,
  Image,
  Heading,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
//import { useLoaderData } from "react-router-dom";
import { ModalEdit } from "../components/ModalEdit";
import { ModalDelete } from "../components/ModalDelete";

//export const loader = async () => {
// const events = await fetch("http://localhost:3000/events");
//const categories = await fetch("http://localhost:3000/categories");
// const users = await fetch("http://localhost:3000/users");
// return {
//  events: await events.json(),
//categories: await categories.json(),
//  users: await users.json(),
// };
//};

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  //const { events, categories, users } = useLoaderData();
  //const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const events = await response.json();
      console.log(events);
      setEvent(events);
    };
    fetchEvents();
  }, [eventId]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:3000/users`);
      const users = await response.json();
      console.log(users);
      setUsers(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:3000/categories`);
      const categories = await response.json();
      console.log(categories);
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const eventCategory = categories.reduce((match, category) => {
    [category.id] = category.name;
    return match;
  }, {});

  const CategoryTitle = (categoryIds) => {
    return categoryIds;
  };

  // handleEdit = () => {
  // setIsEditing(true);
  //};

  // const handleSaveEdit = async (e) => {
  // e.preventDefault();
  // const updatedEventData = {
  //  title: e.target.title.value,
  //  description: e.target.description.value,
  // categories: e.target.categories.value,
  // };
  //  const response = await fetch("http://localhost:3000/events/${eventId}", {
  //   method: "POST",
  //  headers: { "Content-Type": "application/json" },
  //  body: JSON.stringify(updatedEventData),
  // });
  //if (response.ok) {
  //  const updatedEvent = await response.json();
  //  setEvent(updatedEvent);
  //  setIsEditing(false);
  //  } else {
  //console.error("Error updating event:", response.statusText);
  //  }
  // };
  return (
    <>
      <Center paddingTop={6}>
        <Box w="100%" justifyItems="center">
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            padding="0px"
            justify="center"
            h="auto"
            w={{ base: "70%", sm: "70%", md: "80%" }}
            marginTop={4}
            borderColor="black.600"
            borderRadius="xl"
          >
            <CardBody
              border="0.2px"
              h="80%"
              w="100%"
              backgroundColor="white"
              borderRadius="xl"
              padding="0px"
              borderColor="grey"
            >
              <Stack direction="row" w="100%" h="auto">
                <Box width="60%">
                  <Image
                    objectFit="cover"
                    position="relative"
                    left="0px"
                    top="0px"
                    w="100%"
                    h="25rem"
                    src={event.image}
                    alt={event.title}
                    padding="0px"
                    margin="0px"
                  />
                </Box>
                <Box width="40%" paddingLeft={10} paddingRight={10}>
                  <Heading
                    style={{ letterSpacing: 2 }}
                    textTransform="uppercase"
                    fontWeight="300"
                    fontSize="4xl"
                    color="darkslategrey"
                    paddingTop={4}
                    paddingBottom={4}
                  >
                    {event.title}
                  </Heading>

                  <Text paddingBottom={6} fontSize="l" textAlign="left">
                    {" "}
                    <b>
                      {new Date(event.startTime)
                        .toLocaleString()
                        .replace(/(.*)\D\d+/, "$1")}{" "}
                      -{" "}
                      {new Date(event.endTime)
                        .toLocaleString()
                        .replace(/(.*)\D\d+/, "$1")}
                    </b>
                  </Text>
                  <Text
                    paddingTop={3}
                    //paddingLeft={3}
                    textAlign="left"
                    paddingBottom={36}
                    //borderRadius="xl"
                    //borderColor="darkseagreen"
                    //borderWidth={1}
                    //backgroundColor="palegoldenrod"
                  >
                    {event.description}
                  </Text>
                  <Text textAlign="left" marginTop={4}>
                    <b>Category:</b>
                    <Tag
                      bg="grey"
                      color="white"
                      alignItems="center"
                      marginLeft={2}
                    >
                      {categories.map((category) => (
                        <div key={category.name} className="category">
                          <Text>{category.name}</Text>
                          {event.categoryIds
                            .map((categoryId) => eventCategory[categoryId])
                            .join(", ")}{" "}
                          <Text>{category.name}</Text>
                        </div>
                      ))}
                    </Tag>
                  </Text>

                  <Box textAlign="right">
                    <ModalEdit />
                    <ModalDelete />
                  </Box>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Center>
    </>
  );
};
