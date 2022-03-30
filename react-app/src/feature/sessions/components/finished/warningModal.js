import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';



export const WarningModal = (props) => {
  
    return (
        <Modal visible={props.visible} >
          <Card disabled={true}>
            <Text>{props.mainText}</Text>
            <Button onPress={() => props.function() }
            style={styles.button}
            status={props.buttonType1}>
              {props.buttonText1}
            </Button>
            <Button onPress={() => props.setVisible(false)} status={props.buttonType2}
            style={styles.button}>
              {props.buttonText2}
            </Button>
          </Card>
        </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    button:{
        margin: 10
    }
  });