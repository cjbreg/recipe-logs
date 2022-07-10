import React from "react";
import { Plus } from "react-feather";

const AddRecipeComponents = () => {
  return (
    <div className="bg-primary p-3 rounded-full shadow-xl">
      <div className="text-dark">
        <Plus strokeWidth={2} size={28} />
      </div>
    </div>
  );
};

export default AddRecipeComponents;
