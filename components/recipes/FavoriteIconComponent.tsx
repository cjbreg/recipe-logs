import React from "react";
import { Star } from "react-feather";
type Props = {
  favorite: boolean;
  notBlurred?: boolean;
};
const FavoriteIconComponent = (props: Props) => {
  if (props.notBlurred) {
    return (
      <div className=" p-3 bg-white rounded-xl backdrop-blur">
        <div className="filter-none">
          <Star
            color={props.favorite ? "#FE9F59" : "#D9D9D9"}
            fill={props.favorite ? "#FE9F59" : "#D9D9D900"}
          />
        </div>
      </div>
    );
  }
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
