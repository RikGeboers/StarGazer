import React, { useContext } from "react";
import styled from "styled-components";
import { FavouritesContext } from "../../services/internal/favourites/facourites.context";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  z-index: 9;
`;
export const Favourite = ({ celestialBody }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const isFavourite = favourites.find((f) => f.name === celestialBody.name);
  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? addToFavourites(celestialBody)
          : removeFromFavourites(celestialBody)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={"red"}
      />
    </FavouriteButton>
  );
};
