import React from "react";
import {
  Box,
  Card,
  CardBody,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Flex,
  Stack,
  Tag,
  Text,
  Button,
  //useDisclosure,
} from "@chakra-ui/react";

import { useLoaderData, NavLink } from "react-router-dom";
import { useState } from "react";
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
  console.log("events loaded in EventsPage:", events);
  console.log("categories loaded in EventsPage:", categories);
  console.log("users loaded in EventsPage:", users);
  const [searchResults, setResults] = useState([]);
  console.log("searchResult value:", searchResults);

  const [allEvents, setEvents] = useState(events);

  const eventCategory = categories.reduce((match, category) => {
    match[category.id] = category.name;
    return match;
  }, {});

  const CategoryTitle = (categoryIds) => {
    return categoryIds;
  };
  console.log("category title:", CategoryTitle);

  let finalEvents = allEvents;
  if (searchResults.length > 0) {
    finalEvents = searchResults;

  }

  return (
    <>
      <Center bgColor="white"
        flexDir="column"
        alignItems="center">
        <Heading fontSize={{ base: 20, sm: 30, md: 45 }} alignItems="center" textAlign="center" marginTop={4}>
          List of events
        </Heading>

        <Stack direction={{ base: "column", md: "row" }} alignItems="center" textAlign="center" gap="0" spacing="4px" >
          <Box>
            <SearchEvent events={allEvents} categories={categories} setResults={setResults} />

          </Box>
          <Box>
            <Button
              w="autofit"
              backgroundColor="dimgrey"
              color="white"
              alignContent="center"
              marginLeft={4}
              marginRight={4}
              size="md"
            >
              Search
            </Button>
          </Box>
          <Box>

            <ModalTest categories={categories} events={allEvents} users={users} setEvents={setEvents} />
          </Box>
        </Stack>

        <Flex>
          {finalEvents.length > 0 ? (

            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 2, xl: 4 }}
              max-width="1500px"
              spacing={6}
              alignContent="center"
              paddingBottom={6}
            >

              {finalEvents.map((event) => (
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

                          <Text paddingTop={3} textAlign="left" paddingLeft={2}>
                            {event.description}
                          </Text>

                          <Text textAlign="left" marginTop={4} paddingLeft={2}>
                            <b>Category:</b>
                            {event.categoryIds && event.categoryIds.length > 0 && (
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
                            )}
                          </Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  </NavLink>
                </div>
              ))}
            </SimpleGrid>
          ) : (
            <Text>No events found</Text>
          )}
        </Flex>
      </Center>
    </>
  );
};

