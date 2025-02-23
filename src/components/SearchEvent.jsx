import { Center, Input, Select } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
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

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchQuery(searchQuery);

    const filteredEvents = events.filter(({ event }) => {
      const titleLowerCase = event.title.toLowerCase();

      const eventCategories = event.categoryIds
        .map(
          (categoryId) => categories.find((cat) => cat.id === categoryId)?.name
        )
        .join(" ")
        .toLowerCase();

      return (
        titleLowerCase.includes(searchQuery) ||
        eventCategories.includes(searchQuery)
      );
    });

    console.log("filteredEvents:", filteredEvents);
    setResults(filteredEvents);
  };

  return (
    <>
      <Center>
        <Input
          alignContent="center"
          marginTop={6}
          marginBottom={6}
          w="70%"
          placeholder="Search by Title"
          value={searchQuery}
          //onChange={(e) => setSearchQuery(e.target.value)}
          onChange={handleSearch}
        />
        <Select w="50%" onChange={handleSearch}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}></option>
          ))}
        </Select>
      </Center>
    </>
  );
};
