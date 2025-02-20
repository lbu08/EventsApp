import { Center, Input, Button } from "@chakra-ui/react";
import { useLoaderData, NavLink } from "react-router-dom";
import { useState } from "react";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const SearchEvent = ({ setResults }) => {
  const { events, categories } = useLoaderData();
  const [searchQuery, setSearchQuery] = useState([]);
  //const handleChange = (event, category) => {
  //const matchesCategory =
  //   selectedCategory.length === 0 ||
  //   event.categories.some((category) => selectedCategory.includes(category));
  //  return matchesSearch && matchesCategory;

  // const filteredEvents = event.filter(event) => {
  //   const titleLowerCase = event.title.toLowerCase();
  //  const lowerCaseSearchQuery = searchQuery.toLowerCase();
  //const categoryLowerCase = category.toLowerCase();

  // const matchesSearch = titleLowerCase.includes(lowerCaseSearchQuery);
  //|| categoryLowerCase.includes(lowerCaseSearchQuery);
  //const matched = event.filter(({ event, category }) => {
  //   return event.title
  //     .toLowerCase()
  //.includes(event.target.value.toLowerCase());
  //  });

  //  setResults(matchesCategory);
  // };
  // setFilteredEvents(filteredEvents);
  // }, [events, searchQuery, selectedCategory];
  //}

  return (
    <>
      <Center>
        <Input
          alignContent="center"
          marginTop={6}
          marginBottom={6}
          w="25%"
          placeholder="Search by Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          w="10%"
          backgroundColor="dimgrey"
          color="white"
          onClick={() => clickFn()}
          alignContent="center"
        >
          <NavLink to="/event/new">Search</NavLink>
        </Button>
        <Button
          w="20%"
          backgroundColor="darkolivegreen"
          color="white"
          onClick={() => clickFn()}
          margin="1rem"
        >
          <NavLink to="/event/new">Add New Event</NavLink>
        </Button>
      </Center>
    </>
  );
};
