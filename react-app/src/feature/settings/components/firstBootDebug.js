import React, { } from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, Divider } from '@ui-kitten/components';
import CameraService from "../../../services/external/camera.service";
import Toast from "react-native-toast-message";



export const FirstBootDebugCard = () => {

    async function killProcesses(){
        let response = await CameraService.GetKillProcessesAction();
        if(response.status == 200){
            Toast.show({
                type: "success",
                text1: `Successfully ended the required process.`,
              });
        }else{
            Toast.show({
                type: "error",
                text1: `Failed executing the command.`,
              });
        }
    }


    return (
        <>
            <Card style={styles.card} header={Header}>
                <Text>
                    When you just booted the Raspberry Pi, the gPhoto2 library starts some processes, some of these will disable your ability
                    to make use of the camera via usb. We have to kill these processes first.
                </Text>
                <Divider style={styles.divider}/>
                <Text>
                    One of the processes its trying to kill changes each second, this one is not really needed, so seeing an error
                    'No such process' on one of the commands is normal.
                </Text>
                <Divider style={styles.divider}/>
                <Text>
                    Use the button below to kill these processes.
                </Text>
                <Divider style={styles.divider}/>
                <Button style={styles.button} status='success' onPress={() => killProcesses()}>
                    Kill processes
                </Button>
            </Card>
        </>
    );
};

const Header = (props) => (
    <View {...props}>
        <Text category='h6'>Just booted up the Raspberry Pi?</Text>
    </View>
);

const styles = StyleSheet.create({
    button: {
        marginTop: 5,
        marginBottom: 5
        // marginTop: '70%',

    },
    container: {
        margin: 10,
        backgroundColor: 'red'

    },
    card: {
        margin: 10
    },
    divider: {
        marginBottom: 10,
        marginTop: 10,
    },
});
