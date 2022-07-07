import React from "react";
import { Search } from "react-feather";
import { categories } from "../shared/fakeData";
import CategoryItemComponent from "./filter/CategoryItemComponent";

const FilterComponent = () => {
  return (
    <div className="flex flex-col ">
      <div className=" relative justify-between items-center text-dark">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-dark">
          <Search size={32} strokeWidth={1} />
        </div>
        <input
          type={"text"}
          className="bg-primary rounded-md w-full p-2 px-4 focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row pt-4 w-full ">
        {categories.map((category: any, index: number) => {
          return <CategoryItemComponent key={index} category={category.enum} />;
        })}
      </div>
    </div>
  );
};

export default FilterComponent;
