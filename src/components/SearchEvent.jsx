import { Center, Input, Select } from "@chakra-ui/react";
import { useState } from "react";

export const SearchEvent = ({ events, categories, setResults }) => {
  console.log("events passed to SearchEvent:", events);
  console.log("categories passed to SearchEvent:", categories);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchQuery(searchQuery);
    console.log("searchQuery", searchQuery)
    const filteredEvents = events.filter((event) => {
      const titleLowerCase = event.title.toLowerCase();
      console.log("Search event:", event)

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
          onChange={handleSearch}
          type="text"
        />

        <Select
          value={searchQuery}
          onChange={handleSearch}
          className="dropdown"
        >
          <option>Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Select>
      </Center>
    </>
  );
};
