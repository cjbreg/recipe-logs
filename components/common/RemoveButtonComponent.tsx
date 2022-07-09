import React from "react";
import { Trash } from "react-feather";

const RemoveButtonComponent = () => {
  return (
    <div className="bg-red-200 rounded-xl bg-opacity-80">
      <div className="bg-opacity-60 bg-blur p-3 bg-dark rounded-xl backdrop-blur ">
        <div className="filter-none text-red-500">
          <Trash />
        </div>
      </div>
    </div>
  );
};

export default RemoveButtonComponent;
