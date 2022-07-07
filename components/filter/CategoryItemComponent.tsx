import React from "react";
import * as Icon from "react-feather";
import { Category } from "../../models/Category";

type Props = {
  category: Category;
};

const CategoryItemComponent = (props: Props) => {
  const size = 32;
  const strokeWidth = 2;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case Category.VEGAN:
        return <Icon.CloudDrizzle size={size} strokeWidth={strokeWidth} />;
      case Category.CHICKEN:
        return <Icon.CloudLightning size={size} strokeWidth={strokeWidth} />;
      case Category.DESERT:
        return <Icon.CloudOff size={size} strokeWidth={strokeWidth} />;
      case Category.FISH:
        return <Icon.CloudRain size={size} strokeWidth={strokeWidth} />;
      case Category.SALAD:
        return <Icon.CloudSnow size={size} strokeWidth={strokeWidth} />;
      case Category.PASTA:
        return <Icon.Cloud size={size} strokeWidth={strokeWidth} />;

      default:
        break;
    }
  };
  return (
    <div className="p-2 m-2 bg-primary rounded-md text-dark drop-shadow-lg">
      {getCategoryIcon(props.category)}
    </div>
  );
};

export default CategoryItemComponent;
