import { Center, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = ({ clickFn }) => {
  return (
    <>
      <Center bgColor="dimgrey" w="100vw">
        <Button
          w="fit-content"
          backgroundColor="purple.400"
          color="white"
          onClick={() => clickFn()}
          alignContent="center"
          margin="1rem"
        >
          <Link to="/">Events</Link>
        </Button>
        <Button
          w="fit-content"
          backgroundColor="purple.400"
          color="white"
          onClick={() => clickFn()}
          alignContent="center"
          margin="1rem"
        >
          <Link to="/event/1">Event</Link>
        </Button>
      </Center>
    </>
  );
};
