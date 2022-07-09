import React, { useEffect } from "react";
import Image from "next/image";
import FavoriteIconComponent from "../../components/recipes/FavoriteIconComponent";

const Index = () => {
  return (
    <div className=" flex flex-col bg-primary min-h-screen	">
      <div
        className="w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            // recipe?.backgroundImageUrl ??
            "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          } )`,
        }}
      />
      <div className="container mx-auto px-4 py-4 -mt-8 rounded-t-3xl bg-primary ">
        <div className=" flex flew-row justify-between">
          <h1 className="text-dark text-3xl font-bold">Poké Bowl met Kip</h1>
          <FavoriteIconComponent favorite={false} notBlurred />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Index;
