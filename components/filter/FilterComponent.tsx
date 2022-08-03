import React from "react";
import { Search } from "react-feather";
import { availableCategories } from "../../src/shared/staticData";
import CategoryItemComponent from "./CategoryItemComponent";

type Props = {
  queryChange: any;
  query: string;
  // categories: any;
  // categoriesChange: any;
};

const FilterComponent = (props: Props) => {
  // const { queryChange, query, categoriesChange, categories } = props;
  const { queryChange, query } = props;

  const handleRecipeUrlChange = (event: any) => queryChange(event.target.value);

  // const categoryIsActive = (categry: string) => {
  //   return categories.includes(categry);
  // };

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
      {/* <div className="flex flex-row pt-4 w-full ">
        {availableCategories.map((category: string, index: number) => {
          const handleCategoriePressed = () => {
            if (categoryIsActive(category)) {
              let updatedCategories: string[] = categories;
              updatedCategories = updatedCategories.filter(
                (item) => item !== category
              );
              categoriesChange(updatedCategories);
              return;
            }
            categoriesChange([category, ...categories]);
          };

          const backgroundColor = categoryIsActive(category)
            ? "bg-secondary"
            : "bg-primary";

          const iconColor = categoryIsActive(category)
            ? "text-white"
            : "text-dark";

          return (
            <div
              className={`p-2 m-2 ${backgroundColor} rounded-md ${iconColor} drop-shadow-lg`}
              onClick={handleCategoriePressed}
              key={index}
            >
              <CategoryItemComponent category={category} />
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default FilterComponent;
