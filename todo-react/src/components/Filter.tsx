import React, { ChangeEvent } from "react";

interface FilterProps {
  filter_todo: (filterType: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filter_todo }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    filter_todo(e.target.value);
  };

  return (
    <select name="" id="" onChange={handleChange}>
      {/* <option value="">All</option> */}
      <option value="Active">Active</option>
      <option value="Completed">Completed</option>
    </select>
  );
};

export default Filter;
