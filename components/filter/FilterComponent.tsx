import React from "react";
import { Search } from "react-feather";
import { categories } from "../../shared/fakeData";
import CategoryItemComponent from "./CategoryItemComponent";

type Props = {
  queryChange: any;
  query: string;
};

const FilterComponent = (props: Props) => {
  const { queryChange, query } = props;

  const handleRecipeUrlChange = (event: any) => queryChange(event.target.value);

  return (
    <div className="flex flex-col ">
      <div className="relative z-0  mb-6 group flex">
        <div className="relative w-full">
          <input
            type="text"
            className="bg-primary rounded-l-lg w-full p-2.5 px-4 focus:outline-none"
            required
            onChange={handleRecipeUrlChange}
            value={query}
            name="search_query"
          />
        </div>
        <button
          type="submit"
          className="p-2.5  text-sm font-medium text-dark bg-primary rounded-r-lg border-0   focus:ring-0 focus:outline-none focus:ring-none "
        >
          <Search />
        </button>
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
