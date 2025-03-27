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
import { ModalEdit } from "../components/ModalEdit";
import { ModalDelete } from "../components/ModalDelete";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState();
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  //const [category] = useState([]);

  const [eventUser, setEventUser] = useState();
  console.log("eventUser", eventUser);

  useEffect(() => {
    const fetchEventId = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const eventResponse = await response.json();
      console.log("eventId in EventsPage:", eventResponse);
      setEvent(eventResponse);
    };
    fetchEventId();
  }, [eventId]);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const response = await fetch(`http://localhost:3000/events`);
  //     const events = await response.json();
  //     console.log("events in EventPage:", events);
  //     setEvents(events);
  //   };
  //   fetchEvents();
  // }, [event]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`http://localhost:3000/categories`);
      const categories = await response.json();
      console.log("all categories in EventPage:", categories);
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:3000/users`);
      const users = await response.json();
      console.log("all users in EventPage:", users);
      setUsers(users);

    };
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   if (users && event && event.createdBy) {
  //     const temporarilyEventUser = users.find(u => u.id === event.createdBy);
  //     //setEventUser(temporarilyEventUser.name);
  //     console.log(" Temporarily User1", temporarilyEventUser)
  //     console.log(" Temporarily User2", temporarilyEventUser.name)
  //   }
  // }, [users, event]);

  useEffect(() => {
    if (users && event && event.createdBy) {
      const temporarilyEventUser = users.find(u => u.id === event.createdBy);

      if (temporarilyEventUser) {
        console.log("Temporarily User1", temporarilyEventUser);
        console.log("Temporarily User2", temporarilyEventUser.name);
        setEventUser(temporarilyEventUser);
      } else {
        console.log("No user found:", event.createdBy);
        setEventUser(null);
      }
    }
  }, [users, event]);

  const eventCategory = categories.reduce((match, category) => {
    match[category.id] = category.name;
    return match;
  }, {});

  const CategoryTitle = (categoryIds) => {
    return categoryIds;
  };

  console.log(CategoryTitle)

  if (!event) return <Heading>Loading..</Heading>

  // useEffect(() => {
  //   // const fetchUsers = async () => {
  //   //   try {
  //   //     const response = await fetch(`http://localhost:3000/users/${event.createdBy}`);
  //   //     const createdBy = await response.json();
  //   //     console.log("createdBy array:", createdBy);
  //   //     setUsers(createdBy);
  //   //   } catch (error) {
  //   //     console.error("Error fetching users:", error);
  //   //   }
  //   // };
  //   const fetchUser = async () => {
  //     const response = await fetch(
  //       `http://localhost:3000/users/${event.createdBy}`
  //     );
  //     const createdBy = await response.json();
  //     console.log("createdBy array:", createdBy);
  //     setUsers(createdBy);
  //   };
  //   fetchUser();
  // }, [event]);

  // useEffect(() => {
  //   if (!event.categoryIds) return;
  //   console.log("event.categoryIds:", event.categoryIds)

  //   const fetchCategories = async () => {
  //     const fetchUrl = `http:/localhost:3000/categories/${event.categoryIds}`
  //     console.log("fetchUrl:", fetchUrl)
  //     const response = await fetch(fetchUrl);


  //     const categoryIds = await response.json();
  //     console.log("categoryIds:", categoryIds);
  //     setCategories(categoryIds);
  //   };
  //   fetchCategories();
  // }, [event]);


  // console.log("EVENT", event)
  // console.log("IMAGE", event.image)
  console.log("user", users)

  // console.log("eventUserNAME", eventUser.name)


  return (
    <>
      <Center
        bgColor="white"
        flexDir="column"
        alignItems="center"
      //paddingTop={6}
      >

        <Box w="100%" justifyItems="center" >
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            padding="0px"
            // justify="center"
            h="auto"
            w={{ base: "95%", sm: "85%", md: "85%" }}
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
              <Stack direction={{ base: "column", md: "row" }} alignItems="center" textAlign="center" gap="0" spacing="4px" >
                <Box>
                  <Image
                    //objectFit="cover"
                    position="relative"
                    left="0px"
                    top="0px"
                    w="100%"
                    h="auto"
                    src={event.image}
                    alt={event.title}
                    padding="0px"
                    margin="0px"
                  />
                </Box>
                <Box paddingLeft={{ base: "0%", sm: "0%", lg: "5%", xl: "5%" }}>
                  <Heading
                    style={{ letterSpacing: 2 }}
                    textTransform="uppercase"
                    fontWeight="300"
                    // fontSize="4xl"
                    textAlign={{ base: "center", sm: "center", md: "left" }}
                    fontSize={{ base: "4xl", sm: "5xl", "lg": "5xl" }}
                    color="darkslategrey"
                    paddingBottom={4}
                  >
                    {event.title}
                  </Heading>

                  <Text paddingBottom={2} textAlign={{ base: "center", sm: "center", md: "left" }} fontSize={{ base: "sm", sm: "sm", lg: "1xl", xl: "2xl" }}>
                    {" "}
                    <b>
                      {
                        new Date(event.startTime)
                          .toLocaleString()
                          .replace(/(.*)\D\d+/, "$1")
                        //.split("T")
                        //.join("")
                      }{" "}
                      -{" "}
                      {
                        new Date(event.endTime)
                          .toLocaleString()
                          .replace(/(.*)\D\d+/, "$1")
                        //.split("T")
                        //.join("")
                      }
                    </b>
                  </Text>
                  <Text width="100%"
                    paddingTop={3}
                    textAlign={{ base: "center", sm: "center", md: "left" }}
                    paddingBottom={2}
                  >
                    {event.description}
                  </Text>

                  <Box key={event.id} className="users">
                    <Text textAlign={{ base: "center", sm: "center", md: "left" }}>
                      Created by:
                      {" "}
                      {/* {users.find(
                        (user) => String(user.id) === String(event.createdBy)
                      )} */}

                      {/* <b>{eventUser}</b> */}
                      <b>{eventUser ? eventUser.name : "Loading"}</b>
                    </Text>
                  </Box>

                  <Text textAlign={{ base: "center", sm: "center", md: "left" }} marginTop={4}>
                    Category:
                    <Tag
                      bg="grey"
                      color="white"
                      alignItems="center"
                      marginLeft={2}
                    >
                      {" "}
                      {event.categoryIds
                        .map((categoryId) => eventCategory[categoryId])
                        .join(", ")}
                    </Tag>
                  </Text>


                </Box>
              </Stack>
              <Stack direction={{ base: "column", md: "row" }} marginTop={10}>
                <ModalEdit
                  events={event}
                  eventId={eventId}
                  categories={categories}
                  users={users}
                />

                <ModalDelete eventId={eventId} />
              </Stack>


            </CardBody>
          </Card>
        </Box>

      </Center >
    </>
  );
};
