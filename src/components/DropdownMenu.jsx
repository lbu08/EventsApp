import { Dropdown } from "react-dropdown";


export const DropdownMenu = ({ categories }) => {
  console.log("categories passed onto Dropdownmenu:", categories);
  //const defaultItem = categories[0];

  return (
    <Dropdown title="Dropdown">
      <Dropdown.Item>Games</Dropdown.Item>
      <Dropdown.Item>Sports</Dropdown.Item>
      <Dropdown.Item>Relaxation</Dropdown.Item>
    </Dropdown>
  );
};
