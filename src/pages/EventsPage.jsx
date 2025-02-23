import React from "react";
import {
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Flex,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // ModalCloseButton,
  Stack,
  Tag,
  Text,
  Button,
  //useDisclosure,
} from "@chakra-ui/react";
import { useLoaderData, NavLink, useParams } from "react-router-dom";
import { useState } from "react";
//import { SearchEvent } from "../components/SearchEvent";
//import { ControlledInputForm } from "../components/ControlledInputForm";

//import { CategorySelect } from "../components/SearchFieldByCategory";
import { SearchEvent } from "../components/SearchEvent";
import { ModalTest } from "../components/ModalTest";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    events: await events.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventsPage = () => {
  const { events, categories, users } = useLoaderData();

  //const [searchQuery, setSearchQuery] = useState("");
  //const { eventId, userId, categoryId } = useParams();
  // const [selectedCategory, setSelectedCategory] = useState([]);
  //const [isDeleting, setIsDeleting] = useState(false);
  //const { isOpen, onOpen, onClose } = useDisclosure();
  //const [loading, setLoading] = useState(true);

  const eventCategory = categories.reduce((match, category) => {
    match[category.id] = category.name;
    return match;
  }, {});

  //const handleChange = (e) => {
  // const filteredEvents = events.filter((event) => {
  //   const titleLowerCase = event.title.toLowerCase();
  //   const lowerCaseSearchQuery = searchQuery.toLowerCase();
  //  const categoryLowerCase = category.toLowerCase();
  //   });
  // };
  //  const matchesSearch = titleLowerCase.includes(lowerCaseSearchQuery);
  //|| categoryLowerCase.includes(lowerCaseSearchQuery);

  // const matchesCategory =
  //  selectedCategory.length === 0 ||
  //  event.categories.some((category) => selectedCategory.includes(category));
  // return matchesSearch && matchesCategory;
  //});
  // setFilteredEvents(filteredEvents);
  //},
  // [events, searchQuery, selectedCategory];

  //const selectedEvent = ({ setResults }) => {
  //    const handleChange = (e) => {
  //   const matchedEvents = events.filter(({ event }) => {
  //      return event.title
  //      .toLowerCase()
  //      .includes(categoryId, event.target.value.toLowerCase);
  //       event.categoryIds.some((categoryId) => {

  //    });
  //    setResults(matchedEvents);
  //   });

  //   const deleteEvent = (event) => {
  //    event.preventDefault();
  //    setIsDeleting(true);
  // };

  //const confirmDelete = async () => {
  // try {
  // const response = await fetch("http://localhost:3000/events/${eventId}",
  //   {
  //   method: "DELETE",
  //  });
  //  if (response.ok) {
  //    Toast.success("event deleted succesfully", );
  //  } else {
  //   console.error("Error deleting event", response.statusText);
  //   Toast.error("Error occured while deleting the event");
  // } finally {
  //  setIsDeleting(false);
  // }
  //};

  //  const removeEvent = (e, event) => {
  //    e.preventDefault();
  //    setIsDeleting(true);
  //  setEventToDelete(eventId);
  // };

  //const categoryData = (categoryIds) => {
  //  return categoryIds;
  // };

  //if (loading) {
  //return (
  // <Box w="100%" textAlign="center" marginTop={10}>
  //   Loading...
  //  </Box>
  // );
  // }

  const CategoryTitle = (categoryIds) => {
    return categoryIds;
  };

  return (
    <>
      <Heading textAlign="center" marginTop={4}>
        List of events
      </Heading>
      <Center>
        <SearchEvent />

        <Button
          w="10%"
          backgroundColor="dimgrey"
          color="white"
          //onClick={() => clickFn()}
          alignContent="center"
          marginLeft={4}
          marginRight={4}
        >
          Search
        </Button>

        <ModalTest />
      </Center>

      <Center margin="0" padding="0" alignContent="center">
        <Flex
          w="90%"
          alignContent="center"

          //alignItems="center"
          //margin="0"
          //padding="0"
        >
          <SimpleGrid
            columns={{ base: 1, sm: 1, md: 2, xl: 4 }}
            max-width="1500px"
            spacing={20}
            alignContent="center"
          >
            {events.map((event) => (
              <div key={event.id} className="event">
                <NavLink to={`/event/${event.id}`}>
                  <Card
                    cursor="pointer"
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                    padding="0px"
                    justify="center"
                    h="20rem"
                    w="300px"
                    marginTop={4}
                    textAlign="center"
                    borderColor="black.600"
                    borderRadius="xl"
                    _hover={{
                      transform: "scale(1.05)",
                      borderRadius: "xl",
                    }}
                  >
                    <CardBody
                      border="0.2px"
                      h="100%"
                      w="100%"
                      backgroundColor="white"
                      borderRadius="xl"
                      padding="0px"
                    >
                      <Image
                        objectFit="cover"
                        position="relative"
                        left="0px"
                        top="0px"
                        w="100%"
                        h="150px"
                        src={event.image}
                        alt={event.title}
                        padding="0px"
                        margin="0px"
                      />

                      <Text
                        paddingTop={3}
                        fontSize="xs"
                        textAlign="left"
                        marginLeft={2}
                      >
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

                      <Stack direction="column" spacing="4px">
                        <Heading
                          paddingTop={3}
                          style={{ letterSpacing: 2 }}
                          textTransform="uppercase"
                          fontWeight="300"
                          fontSize="2xl"
                          color="darkslategrey"
                          textAlign="left"
                          marginLeft={2}
                        >
                          {event.title}
                        </Heading>
                        <Text paddingTop={3} textAlign="left">
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
                            {" "}
                            {event.categoryIds
                              .map((categoryId) => eventCategory[categoryId])
                              .join(", ")}
                          </Tag>
                        </Text>

                        <Text>
                          {
                            events.find((user) => event.createdBy === user.id)
                              .name
                          }
                          <div key={event.id} className="user"></div>
                        </Text>
                        <Text
                          fontSize="s"
                          textAlign="right"
                          //fontWeight="1"
                        >
                          Created by{" "}
                          {
                            users.find(
                              (user) =>
                                String(user.id) === String(event.createdBy)
                            ).name
                          }
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </NavLink>
              </div>
            ))}
            ;
          </SimpleGrid>
        </Flex>
      </Center>
    </>
  );
};
