import DirectionControls from "../../../celestial_bodies/components/celestialBody-direction-controls";
import { Button, Icon } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import TelescopeService from "../../../../services/external/telescope.service";

import styled from "styled-components";
import { Spacer } from "../../../../components/spacer/spacer";
import { InfoCardTitle } from "../../../celestial_bodies/components/celestialBody-detail-card.styles";
import { Text } from "../../../../components/typography/text";
import { SectionTitle } from "./SectionTitle";
const ButtonContainer = styled.View``;
const Container = styled.View`
  flex-direction: row;
  justify-content: center;
`;
export function TelescopeSection(props) {
  const [navigate, setNavigate] = useState(false);
  const [adjust, setAdjust] = useState(false);
  const [showTelescope, setShowTelescope] = useState(false);
  function toggleAdjust() {
    adjust ? setAdjust(false) : setAdjust(true);
  }
  const TelescopeIcon = (props) => <Icon {...props} name="telescope" />;
  const GamePadIcon = (props) => <Icon {...props} name="gamepad" />;
  useEffect(() => {}, [navigate]);

  return (
    <>
      <SectionTitle title="Telescope" update={setShowTelescope} />
      {showTelescope && (
        <>
          <Spacer position="bottom" size="medium" />
          <Container>
            <ButtonContainer>
              <Button
                icon="telescope"
                status="primary"
                appearance="outline"
                accessoryLeft={TelescopeIcon}
                onPress={() => {
                  setNavigate(true);
                  TelescopeService.Align(
                    props.rightAscension,
                    props.declination,
                    props.type
                  );
                }}
              >
                navigate
              </Button>
            </ButtonContainer>
            {navigate && (
              <>
                <Spacer position="right" size="small" />
                <ButtonContainer>
                  <Button
                    icon="telescope"
                    status="primary"
                    appearance="outline"
                    accessoryLeft={GamePadIcon}
                    onPress={() => toggleAdjust()}
                  >
                    Adjust
                  </Button>
                </ButtonContainer>
              </>
            )}
          </Container>
          {adjust && <DirectionControls />}
        </>
      )}
    </>
  );
}
