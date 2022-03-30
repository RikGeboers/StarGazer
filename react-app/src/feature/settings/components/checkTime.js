import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, Divider } from '@ui-kitten/components';
import CameraService from "../../../services/external/camera.service";
import Toast from "react-native-toast-message";
import IndexService from "../../../services/external/index.service";


export const CheckTimeCard = () => {
    const [currentTime, setCurrentTime] = useState(null)

    async function getCurrentTime() {
        let response = await CameraService.GetDeviceCurrentTime();
        if (response.status == 200) {
            setCurrentTime(response.data)
        } else {
            Toast.show({
                type: "error",
                text1: `Failed getting time`
            });
        }

    }

    async function setCurrentTimeFunction() {
        let d = new Date();
        let time = d.toLocaleTimeString();
        let response = await CameraService.SetDeviceCurrentTime(time);
        if (response.status == 200) {
            Toast.show({
                type: "success",
                text1: `Success setting the time`
            });
        } else {
            Toast.show({
                type: "error",
                text1: `Failed setting time`
            });
        }
    }


    return (
        <>
            <Card style={styles.card} header={Header}>
                <Text>
                    When a Raspberry Pi loses its power, and it does not get reconnected to the internet
                    it loses sense of time. Since we use time to schedule our sessions, it is important that
                    the correct time is set on the device.
                </Text>
                <Divider style={styles.divider} />
                <Text>
                    With these buttons you can check the current time on the device, and when incorrect
                    you can send the current mobile device time to the Raspberry Pi.
                </Text>
                <Divider style={styles.divider} />
                <Button style={styles.button} status='info' onPress={() => getCurrentTime()}>
                    Check device time
                </Button>
                {currentTime == null
                    ? null
                    : <>
                        <Text style={styles.text} status='info'>Current time: 
                        <Text style={styles.text} status='success'> {currentTime}</Text>
                        </Text>
                        
                    </>}
                <Divider style={styles.divider} />
                <Button style={styles.button} status='success' onPress={() => setCurrentTimeFunction()}>
                    Send time to device
                </Button>
                <Divider style={styles.divider} />
                <Text>
                    In case this does not work correctly, connect the device to internet via ethernet cable.
                    This will auto sync the time.
                </Text>
                
            </Card>
        </>
    );
};

const Header = (props) => (
    <View {...props}>
        <Text category='h6'>Check the time on the Raspberry Pi</Text>
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
