import React from "react";
import { Star } from "react-feather";
type Props = {
  favorite: boolean;
};
const FavoriteIconComponent = (props: Props) => {
  return (
    <div className="bg-opacity-60 bg-blur p-3 bg-dark rounded-xl backdrop-blur">
      <div className="filter-none">
        <Star
          color={props.favorite ? "#1BBD66" : "#D9D9D9"}
          fill={props.favorite ? "#1BBD66" : "#D9D9D900"}
        />
      </div>
    </div>
  );
};

export default FavoriteIconComponent;
