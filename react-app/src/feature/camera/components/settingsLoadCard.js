import React, {useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, Select, SelectItem, Input } from '@ui-kitten/components';

export const SettingsLoadCard = (props) => {

    let choices = [];

    props.loadedSettings.forEach(function (item, index) {
        choices.push(
            <SelectItem title={item.name}
                key={index} />
        )
    });


    return (
        <>
            <Card style={styles.card} header={Header}>
                <Button style={styles.button} status='info' onPress={() => props.fetchData()}>
                    Fetch camera settings
                </Button>
                <Input
                    placeholder='Camera Name'
                    value={props.cameraName}
                    onChangeText={nextValue => props.setCameraName(nextValue)}
                />
                <Button style={styles.button} status='success' onPress={() => props.saveCameraSettings()}>
                    Save these settings
                </Button>
                {props.loadedSettings.length !== 0
                    ?
                    <>
                        <Select style={styles.select}
                            label={() => <Text style={styles.label}>Load preloaded camera settings</Text>}
                            placeholder='Select a camera'
                            selectedIndex={props.selectedIndex}
                            value={choices[props.selectedIndex.row]}
                            onSelect={index => props.setSelectedIndex(index)}>
                            {choices}
                        </Select>
                        <Button style={styles.button} status='success' onPress={() => props.loadCameraSettings(props.selectedIndex.row)}>
                            Load these settings
                        </Button>
                        <Button style={styles.button} status='danger' onPress={() => props.deleteCameraSettings(props.selectedIndex.row)}>
                            Delete these settings
                        </Button>
                    </>
                    :
                    null
                }
            </Card>
        </>
    );
};


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
    label: {

    }
});

const Header = (props) => (
    <View {...props}>
        <Text category='h6'>Load Camera Settings</Text>
    </View>
);
