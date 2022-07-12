import React from "react";
import * as Icon from "react-feather";
import { CategoryEnum } from "../../models/CategoryEnum";

type Props = {
  category: string;
};

const CategoryItemComponent = (props: Props) => {
  const size = 32;
  const strokeWidth = 2;

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case CategoryEnum.VEGAN:
        return <Icon.CloudDrizzle size={size} strokeWidth={strokeWidth} />;
      case CategoryEnum.CHICKEN:
        return <Icon.CloudLightning size={size} strokeWidth={strokeWidth} />;
      case CategoryEnum.DESERT:
        return <Icon.CloudOff size={size} strokeWidth={strokeWidth} />;
      case CategoryEnum.FISH:
        return <Icon.CloudRain size={size} strokeWidth={strokeWidth} />;
      case CategoryEnum.SALAD:
        return <Icon.CloudSnow size={size} strokeWidth={strokeWidth} />;
      case CategoryEnum.PASTA:
        return <Icon.Cloud size={size} strokeWidth={strokeWidth} />;

      default:
        break;
    }
  };
  return <div>{getCategoryIcon(props.category)}</div>;
};

export default CategoryItemComponent;
