import { Input } from "@ui-kitten/components";
import styled from "styled-components";
import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@ui-kitten/components";
import { SafeArea } from "../../../utils/SafeArea";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";

import { Text } from "../../../components/typography/text";
import { RaForm } from "../components/rightAscensionForm";
import { DecForm } from "../components/declination";
import { ManualContext } from "../../../services/internal/manualBodies/manual.context";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { PlanetContext } from "../../../services/internal/bodies/planet.context";
import { MessierContext } from "../../../services/internal/bodies/messier.context";
import { NgcContext } from "../../../services/internal/bodies/ngc.context";
import { Spacer } from "../../../components/spacer/spacer";

const Container = styled.View`
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  height: 73%;
  background-color: rgba(255, 255, 255, 10);
  overflow: hidden;
`;
export function ManualAddBody() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const types = [
    "Star",
    "Galaxy",
    "Meteor",
    "Asteroid",
    "Station",
    "Satelite",
    "Telescope",
    "Rocket",
  ];
  function showToast(toastText, toastType) {
    Toast.show({
      type: toastType,
      text1: toastText,
    });
  }
  const onSubmit = (data) => {
    const unique =
      library.filter((p) => p.name.toUpperCase() === data.name.toUpperCase())
        .length === 0;
    if (unique) {
      data.type = displayValue.toUpperCase();
      data.nakedEyeObject = false;
      data.aboveHorizon = false;
      data.created = true;
      data.rightAscension = ra;
      data.declination = dec;
      addToManuals(data);
      showToast("Celestial object added!", "success");
    } else {
      showToast("This name already exists", "error");
    }
  };
  //data
  const { planetIsLoading, planetError, planets } = useContext(PlanetContext);
  const { messierIsLoading, messierError, messier } =
    useContext(MessierContext);
  const { ngcIsLoading, ngcError, ngc } = useContext(NgcContext);
  const { manuals, addToManuals, removeFromManuals } =
    useContext(ManualContext);
  const library = [...planets, ...messier, ...ngc, ...manuals];
  //input
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const displayValue = types[selectedIndex.row];
  //rightAscension
  const [ra, setRa] = useState(`0:0:0`);
  const [dec, setDec] = useState(`0:0:0`);
  function saveRa(hours, minutes, seconds) {
    const raValue = `${hours}:${minutes}:${seconds}`;
    setRa(raValue);
  }
  function saveDec(degrees, arcMinutes, arcSeconds) {
    const decValue = `${degrees}:${arcMinutes}:${arcSeconds}`;
    setDec(decValue);
  }

  return (
    <Container>
      <Text variant="title">Add a Celestial Body</Text>
      <Spacer position="bottom" size="large" />
      <Controller
        control={control}
        name="name"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Name"
            placeholder="Enter Celestial Body Name"
            value={value}
            // status="danger"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
          />
        )}
      />
      {errors.name && <Text variant="error">required field</Text>}
      <Select
        label="Type"
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        value={displayValue}
      >
        {types.map((type, id) => (
          <SelectItem key={id} title={type} />
        ))}
      </Select>

      <Controller
        control={control}
        name="description"
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <Input
            label="Description"
            placeholder="Enter a description"
            multiline={true}
            onBlur={onBlur}
            textStyle={{ minHeight: 64 }}
            value={value}
            onChangeText={(text) => onChange(text)}
          />
        )}
      />
      {errors.description && <Text variant="error">required field</Text>}
      <Text style={{ color: "#8F9CB4", fontSize: 12 }}>
        Right Ascension (hours, minutes, seconds)
      </Text>
      <Spacer position="bottom" size="small" />
      <RaForm ra={saveRa} />
      <Text style={{ color: "#8F9CB4", fontSize: 12 }}>
        Declination (degrees, arc minutes, arc seconds)
      </Text>
      <Spacer position="bottom" size="small" />
      <DecForm dec={saveDec} />
      <Spacer position="bottom" size="large" />
      <Button title={"Submit"} onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Container>
  );
}
