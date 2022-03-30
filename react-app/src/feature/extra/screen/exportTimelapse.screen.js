import React, { useEffect, useState } from "react";
import { SafeArea } from "../../../utils/SafeArea";
import styled from "styled-components";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Button } from '@ui-kitten/components';
import { StyleSheet,View } from 'react-native';



const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;


export const ExportTimelapseScreen = ({ navigation }) => {

  useEffect(() => {
    
  }, []);

  const styles = StyleSheet.create({
    button: {
      margin: 10,                
    },
  });





  return (
    <>
    </>
  );
};
