import { Text } from "../../../../components/typography/text";
import styled from "styled-components";

import active from "../../../../../assets/icons/active.png";
import { Spacer } from "../../../../components/spacer/spacer";
import { Button } from "@ui-kitten/components";
import React, { useState } from "react";
export const SessionCardContainer = styled.View`
  flex-grow: 1;
  z-index: 1;
  border-radius: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
export const InnerContainer = styled.View`
  margin: ${(props) => props.theme.space[3]};
`;
export const Caption = styled(Text)`
  color: grey;
`;
export const RowContainer = styled.View`
  flex-direction: row;
`;

export const EndRowContainer = styled.View`
  margin-right: 40px;
  flex-direction: row;
  flex-grow: 1;
  justify-content: flex-end;
`;

export const Status = styled.Image`
  margin-top: 4px;
  height: 10px;
  width: 10px;
`;
export function SessionCard(props) {
  const sd = new Date(props.session.startDate);
  const ed = new Date(props.session.endDate);
  const startDate = `${sd.getDate().toString().padStart(2, '0')}/${(sd.getMonth() + 1).toString().padStart(2, '0')}/${sd.getFullYear().toString().padStart(4, '0')} ${sd.getHours().toString().padStart(2, '0')}:${sd.getMinutes().toString().padStart(2, '0')}:${sd.getSeconds().toString().padStart(2, '0')}`
  const endDate = `${ed.getDate().toString().padStart(2, '0')}/${(ed.getMonth() + 1).toString().padStart(2, '0')}/${ed.getFullYear().toString().padStart(4, '0')} ${ed.getHours().toString().padStart(2, '0')}:${ed.getMinutes().toString().padStart(2, '0')}:${ed.getSeconds().toString().padStart(2, '0')}`
  return (
    <SessionCardContainer>
      <InnerContainer>
        <RowContainer>
          <Caption variant="caption">Session:</Caption>
          <EndRowContainer>
            <Caption variant="caption">Status:</Caption>
            <Spacer position="right" size="medium" />
            <Status source={active} />
          </EndRowContainer>
        </RowContainer>
        <RowContainer>
          <Text variant="title">{props.session.sessionName}</Text>
        </RowContainer>
        {props.open && (
          <>
            <RowContainer>
              <Caption variant="caption">Selected mode:</Caption>
            </RowContainer>
            {props.session.intervalMode
              ?
              <>
                <RowContainer>
                  <Text variant="title">Interval</Text>
                </RowContainer>
                <RowContainer>
                  <Caption variant="caption">Start Date:</Caption>
                </RowContainer>
                <RowContainer>
                  <Text variant="title">{startDate}</Text>
                </RowContainer>
                <RowContainer>
                  <Caption variant="caption">End Date:</Caption>
                </RowContainer>
                <RowContainer>
                  <Text variant="title">{endDate}</Text>
                </RowContainer>
                <RowContainer>
                  <Caption variant="caption">Interval value:</Caption>
                </RowContainer>
                <RowContainer>
                  <Text variant="title">{props.session.intervalValue + " minute(s)"}</Text>
                </RowContainer>
              </>
              :
              <>
                <RowContainer>
                  <Text variant="title">Scheduled</Text>
                </RowContainer>
                <RowContainer>
                  <Caption variant="caption">Execute Date:</Caption>
                </RowContainer>
                <RowContainer>
                  <Text variant="title">
                    {props.session.scheduledJobs[props.session.sessionName.slice(-1)].time}
                  </Text>
                </RowContainer>
              </>
            }
            <EndRowContainer>
              <Button status="danger" appearance="outline" onPress={() => props.cancelSession(props.session.sessionName)}>
                Cancel
              </Button>

            </EndRowContainer>
          </>


        )}
      </InnerContainer>
    </SessionCardContainer>
  );
}
