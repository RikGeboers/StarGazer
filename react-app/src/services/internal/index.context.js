import { MessierContextProvider } from "./bodies/messier.context";
import { NgcContextProvider } from "./bodies/ngc.context";
import { PlanetContextProvider } from "./bodies/planet.context";
import React from "react";
import { FavouritesContextProvider } from "./favourites/facourites.context";
import { ManualContextProvider } from "./manualBodies/manual.context";
import { CameraSettingsContextProvider } from "./camera/cameraSettings";
import { FavouriteCameraContextProvider } from "./camera/favouriteSetting";
export const Providers = ({ children }) => {
  return (
    <CameraSettingsContextProvider>
      <FavouriteCameraContextProvider>
        <FavouritesContextProvider>
          <ManualContextProvider>
            <PlanetContextProvider>
              <NgcContextProvider>
                <MessierContextProvider>{children}</MessierContextProvider>
              </NgcContextProvider>
            </PlanetContextProvider>
          </ManualContextProvider>
        </FavouritesContextProvider>
      </FavouriteCameraContextProvider>
    </CameraSettingsContextProvider>
  );
};
