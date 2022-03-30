import { Button, Icon } from "@ui-kitten/components";
import { Text } from "../../../../components/typography/text";
import React, { useContext, useEffect, useState } from "react";
import { FavouriteCameraContext } from "../../../../services/internal/camera/favouriteSetting";
import { CameraSettingsContext } from "../../../../services/internal/camera/cameraSettings";
import { SettingsSelect } from "./settingComponent";
import { Settings } from "react-native";
export function CameraSetting(props) {
  const { favourites } = useContext(FavouriteCameraContext);
  const [cameraSetting, setCameraSettings] = useState(props.cameraSetting);
  const [choseSettings, setChoseSettings] = useState([]);
  function manageSetting(setting) {
    const newArray = choseSettings.slice();
    if (
      choseSettings.find((element) => {
        if (element.setting === setting.setting) {
          newArray.splice(element, 1);
          return true;
        }
      })
    ) {
      newArray.push(setting);
      setChoseSettings(newArray);
    } else {
      newArray.push(setting);
      setChoseSettings(newArray);
    }
  }
  useEffect(() => {
    if (props.item != null) {
      props.update(choseSettings, props.item);
    } else {
      props.update(choseSettings);
    }
  }, [choseSettings]);

  return (
    <>
      {cameraSetting.length > 0 ? (
        cameraSetting.map((item, index) =>
          favourites.includes(item.value) ? (
            <SettingsSelect
              update={manageSetting}
              setting={item.value}
              choices={item.choices}
              key={`settingscomp ${index}`}
            />
          ) : null
        )
      ) : (
        <></>
      )}
    </>
  );
}
