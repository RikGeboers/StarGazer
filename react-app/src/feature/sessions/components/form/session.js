import { Text } from "../../../../components/typography/text";
import { LogBox } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import NumericInput from "react-native-numeric-input";

import { Input } from "@ui-kitten/components";
import styled from "styled-components";
LogBox.ignoreLogs(["Require cycle:"]);

import {
  ButtonTitleEnd,
  RowContainer,
  TilteArea,
  TilteBorder,
} from "./form-styles";
import { Spacer } from "../../../../components/spacer/spacer";
import { SwitchButton } from "./switchButton";
import { TimePicker } from "./timepicker";
import { ScheduledJobController } from "./scheduledButton";
import { CameraSetting } from "./camera";
import { CameraButton } from "./CameraButton";
import { SettingsLoad } from "./loadCamera";
import { CameraSettingsContext } from "../../../../services/internal/camera/cameraSettings";
import { InfoCardTitle } from "../../../celestial_bodies/components/celestialBody-detail-card.styles";
import { SectionTitle } from "./SectionTitle";
const Container = styled.View`
  margin-bottom: 8px;
`;

export function SessionSection(props) {
  const [sessionName, setSessionName] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [interValTime, setIntervalTime] = useState(0);
  const [interValActive, setInterValActive] = useState(true);
  const [scheduledJobs, setScheduledJobs] = useState([]);
  const [loadedSettings, setLoadedSettings] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cameraSettings, setCameraSettings] = useState([]);
  const [availableCameraSettings, setShowAvailableCameraSettings] =
    useState(false);
  const [showCameraSettings, setShowCameraSettings] = useState(true);
  const [IntervalCameraSetting, setIntervalCameraSetting] = useState([]);
  const [ShowJobs, setShowJobs] = useState(false);
  const [cleared, setCleared] = useState(0);
  const { cameraSavedSettings } = useContext(CameraSettingsContext);
  const initScheduledJob = [
    {
      number: 0,
      time: startTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      open: true,
    },
  ];
  useEffect(() => {
    setScheduledJobs(initScheduledJob);
    setLoadedSettings(cameraSavedSettings);
  }, []);
  useEffect(() => {}, [showCameraSettings]);

  function loadCameraSettings(selectedSettingsIndex) {
    if (selectedSettingsIndex !== undefined) {
      setCameraSettings(cameraSavedSettings[selectedSettingsIndex].settings);
      setShowAvailableCameraSettings(true);
      setShowCameraSettings(true);
    }
  }
  function manageScheduledJob(setting) {
    const newArray = scheduledJobs.slice();
    if (setting === "add") {
      newArray.push({
        number: scheduledJobs.length,
        time: startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        open: true,
      });

      setScheduledJobs(newArray);
    } else {
      newArray.pop();
      setScheduledJobs(newArray);
    }
    updateSession();
  }
  function changeJobTime(time, item) {
    const newArray = scheduledJobs.slice();
    newArray[item].time = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setScheduledJobs(newArray);
    updateSession();
  }
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  function changeSettingJob(setting, item) {
    const newArray = scheduledJobs.slice();
    newArray[item].settings = setting;
    setScheduledJobs(newArray);
    updateSession();
  }

  function updateSession() {
    if (endTime < startTime) {
      let newTime = endTime;
      newTime = newTime.addDays(1);
      setEndTime(newTime);
    }
    const session = {
      sessionName: sessionName,
      startDate: startTime,
      endDate: endTime,
      intervalMode: interValActive,
      intervalValue: interValTime,
      interValCamera: IntervalCameraSetting,
      scheduledJobs: scheduledJobs,
    };
    props.session(session);
  }
  function clear() {
    setSessionName("");
    setStartTime(new Date());
    setEndTime(new Date());
    setIntervalTime(0); //not working
    setInterValActive(true);
    setScheduledJobs(initScheduledJob);
    setSelectedIndex(0);
    setCameraSettings([]);
    setShowCameraSettings(false);
    setShowAvailableCameraSettings(false);
    setIntervalCameraSetting([]);
    setCleared((prev) => prev + 1);
  }
  useEffect(() => {
    setIntervalTime(0);
    clear();
  }, [props.clear]);

  useEffect(() => {
    updateSession();
  }, [
    startTime,
    endTime,
    interValTime,
    sessionName,
    scheduledJobs,
    cameraSettings,
    IntervalCameraSetting,
  ]);
  function updateState(number) {
    let items = scheduledJobs.slice();
    items.map((s) => {
      if (s.number === number) {
        s.open ? (s.open = false) : (s.open = true);
      }
    });
    setScheduledJobs(items);
  }

  return (
    <>
      <Input
        placeholder="Session name"
        value={sessionName}
        onChangeText={(nextValue) => {
          setSessionName(nextValue);
        }}
      />
      <Spacer position="bottom" size="medium" />

      <RowContainer>
        <Text variant="body">
          Start time:
          {startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
        <Spacer position="right" size="large" />
        <TimePicker
          time={setStartTime}
          buttonTitle="Change"
          update={updateSession}
        />
      </RowContainer>
      <Spacer position="bottom" size="medium" />

      <RowContainer>
        <Text variant="body">
          End time:
          {endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>

        <TimePicker
          time={setEndTime}
          buttonTitle="Change"
          update={updateSession}
        />
      </RowContainer>
      <Spacer position="bottom" size="medium" />

      <SettingsLoad
        loadedSettings={loadedSettings}
        selectedIndex={selectedIndex}
        loadCameraSettings={loadCameraSettings}
        setSelectedIndex={setSelectedIndex}
      ></SettingsLoad>
      <Spacer position="bottom" size="medium" />
      <SectionTitle title="Jobs" update={setShowJobs} />
      {ShowJobs && (
        <>
          <Spacer position="bottom" size="medium" />
          <SwitchButton
            clear={cleared}
            active={setInterValActive}
            left="interval"
            right="scheduled"
            update={updateSession}
          />
          <Spacer position="bottom" size="medium" />
          {interValActive && (
            <>
              <RowContainer>
                <Text variant="body">Interval Time in Minutes: </Text>
                <Spacer position="right" size="medium" />
                <NumericInput
                  type="up-down"
                  minValue={0}
                  value={interValTime}
                  totalWidth={100}
                  totalHeight={50}
                  valueType="real"
                  onChange={(value) => {
                    setIntervalTime(value);
                  }}
                />
                {availableCameraSettings && (
                  <CameraButton update={setShowCameraSettings} />
                )}
              </RowContainer>
              {showCameraSettings && (
                <CameraSetting
                  cameraSetting={cameraSettings}
                  update={setIntervalCameraSetting}
                />
              )}
            </>
          )}
          {!interValActive &&
            scheduledJobs.map((j, id) => {
              return (
                <Container key={id}>
                  <RowContainer key={`container+${id}`}>
                    <Text key={`txt+${id}`} variant="body">
                      Picture {j.number + 1} at: {j.time}
                    </Text>

                    <TimePicker
                      key={`timepicker+${id}`}
                      time={changeJobTime}
                      item={j.number}
                      buttonTitle=""
                      update={updateSession}
                      body={`Picture ${j.number + 1} at: ${j.time}`}
                    />
                    {availableCameraSettings && (
                      <CameraButton
                        item={j.number}
                        update={updateState}
                        open={j.open}
                      />
                    )}
                  </RowContainer>

                  {j.open && (
                    <CameraSetting
                      item={j.number}
                      cameraSetting={cameraSettings}
                      update={changeSettingJob}
                    />
                  )}
                </Container>
              );
            })}
          {!interValActive && (
            <ScheduledJobController
              length={scheduledJobs.length}
              control={manageScheduledJob}
              update={updateSession}
            />
          )}
        </>
      )}
    </>
  );
}
