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
  const [event, setEvent] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  //const [category] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const events = await response.json();
      console.log("eventId:", events);
      setEvent(events);
    };
    fetchEvents();
  }, [eventId]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        `http://localhost:3000/users/${event.createdBy}`
      );
      const createdBy = await response.json();
      console.log("createdBy array:", createdBy);
      setUsers(createdBy);
    };
    fetchUsers();
  }, [event]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `http://localhost:3000/categories/${event.categoryIds}`
      );
      const categoryIds = await response.json();
      console.log("categoryIds:", categoryIds);
      setCategories(categoryIds);
    };
    fetchCategories();
  }, [event]);

  useEffect(() => {
    const fetchCategories2 = async () => {
      const response = await fetch(`http://localhost:3000/categories`);
      const categories = await response.json();
      console.log("all categories:", categories);
      setCategories(categories);
    };
    fetchCategories2();
  }, []);

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
                  <Text
                    paddingTop={3}
                    //paddingLeft={3}
                    textAlign="left"
                    paddingBottom={20}
                    //borderRadius="xl"
                    //borderColor="darkseagreen"
                    //borderWidth={1}
                    //backgroundColor="palegoldenrod"
                  >
                    {event.description}
                  </Text>
                  <Stack direction="row" spacing="4px">
                    <Text
                      fontSize="s"
                      textAlign="left"
                      //fontWeight="1"
                    >
                      Created by:
                    </Text>
                    <Text>
                      <b>{users.name}</b>
                    </Text>
                  </Stack>
                  <Text textAlign="left" marginTop={4}>
                    <b>Category:</b>
                    <Tag
                      bg="grey"
                      color="white"
                      alignItems="center"
                      marginLeft={2}
                    >
                      {categories.name}
                    </Tag>
                  </Text>

                  <Stack direction="row" marginTop={10}>
                    <ModalEdit
                      events={event}
                      eventId={eventId}
                      categories={categories}
                      users={users}
                    />

                    <ModalDelete />
                  </Stack>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Center>
    </>
  );
};
