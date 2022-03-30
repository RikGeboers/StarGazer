import TelescopeService from '../../../services/external/telescope.service';
import { useState, useEffect } from 'react';
import styled from "styled-components";
import { ActivityIndicator, Button, Colors } from "react-native-paper";
import { SettingsComponent } from '../components/settingsComponent';
import { Snackbar, Text, IconButton } from 'react-native-paper';

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const RefreshCenter = styled.View`
  margin-top: 50%
  margin-bottom: 50%
  flex-direction: row;
  justify-content: center;
`;

export const TelescopeSettingsScreen = () => {
    const [loading, setIsLoading] = useState(true)
    const [error, setIsError] = useState(false)
    const [telescopes, setTelescopes] = useState([])
    const [currentTelescope, setCurrentTelescope] = useState([])

    useEffect(() => {
      fetchData()
    }, []);

    async function fetchData() {
      try {
        setIsLoading(true)
        setIsError(false)
        let currentTelescope = await TelescopeService.getCurrentTelescope()
        setCurrentTelescope(currentTelescope.data)
        let telescopes = await TelescopeService.getTelescopes()
        setTelescopes(telescopes.data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        setIsError(true)
      }
    }

    return (
       <>
       {loading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      {!loading && !error && (
        <SettingsComponent telescopes={telescopes} currentTelescope={currentTelescope}/>
      )}
      { error && (
        <RefreshCenter>
           <IconButton
            icon="refresh"
            color={"lightgrey"}
            size={100}
            onPress={() => fetchData()}
          />
        </RefreshCenter>
      )}
       </>
    )
}