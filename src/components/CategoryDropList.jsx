import {
  Select,
  //Menu,
  // MenuButton,
  //  MenuList,
  //  MenuItem,
  // Button
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const CategoryDropList = () => {
  const [categories, setCategories] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault();
  };

 // useEffect(() => {
  //  const fetchCategories = async () => {
   //   const response = await fetch(`http://localhost:3000/categories`);
    //  const categories = await response.json();
   //   console.log(categories);
   //   setCategories(categories);
   // };
   // fetchCategories();
//}, []);

  return (
    <>
      <Select w="50%" onChange={handleSearch}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}></option>
        ))}
      </Select>
    </>
  );
};
